import React, { useState, useEffect } from 'react';
import ProductionPlan from '../../requests/ProductionPlan';
import Product from '../../requests/Product';
import Package from '../../requests/Package';
import Line from '../../requests/Line';
import { Button, Modal } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { BiGhost } from "react-icons/bi"
import Swal from 'sweetalert2';
import Select from 'react-select';
import ExportToExcel from '../../components/ExportToExcel';
import TableFilter from '../../components/TableFilter';

const ProductionPlanPage = () => {
  
  const [idProduct, setIdProduct] = useState("");
  const [idProductionPlan, setIdProductionPlan] = useState("");
  const [family, setFamily] = useState("");
  const [plan, setPlan] = useState("");
  const [packing, setPacking] = useState("");
  const [packingList, setPackingList] = useState([]);
  const [line, setLine] = useState("");
  const [destiny, setDestiny] = useState("");
  const [manpower, setManpower] = useState("");
  const [auxName, setAuxName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [productList, setProductList] = useState([]);
  const [productList2, setProductList2] = useState([]);
  const [plansList, setPlansList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [lotSize, setLotSize] = useState(0);
  //--------- search plan ----------
  const [idLine, setIdLine] = useState(0);
  //--------- old data -------------
  const [destinyOld, setDestinyOld] = useState("");
  const [packingOld, setPackingOld] = useState("");
  const [planOld, setPlanOld] = useState("");
  const [instructionsOld, setInstructionsOld] = useState("");

  const [listToExcel, setListToExcel] = useState([]);

  var headersTable = [["No.", "No Part", "Plan", "Produced",  "Real","Status", "Package", "Destiny", "Review",  "Area", "Line", "Model", "Instructions", "Manpower", "Created At", "Start Time", "End Stimated"]];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };


  const getProductList = async () => {
    const resp1 = await Product.getProductsSlc();
    const resp = await Product.getSelectsPack();
    setProductList2(resp);
    setProductList(resp1);
  };

  const getLineList = async (e) => {
    const resp2 = await Line.getLineProd(e);
    setLineList(resp2);
  };

  const getPlanList = async () => {
    const response = await ProductionPlan.getTableData();

    setPlansList(response);
  };

  const packList = [
    {
      value: 'Carton',
      label: 'Carton'
    },
    {
      value: 'Plastico',
      label: 'Plastico'
    },
    {
      value: 'Plastico y Carton',
      label: 'Plastico y Carton'
    }
  ];

  useEffect(  () => {
    getProductList();
  }, []);

  useEffect(  () => {
    
  }, [idProduct]);

  const addPlan = async (e) => {
    e.preventDefault();
    if(!(plan%lotSize)){
      if(instructions.length<=150){
        if(idProduct && plan && packing && line && destiny){
          let instruct;
          instructions ? instruct = instructions : instruct="";

          let productionPlan = {
            "id_product": idProduct,
            "plan": plan,
            "packing": packing,
            "id_line": line,
            "destiny": destiny,
            "instructions": instruct,
          }
          if(manpower){
            Swal.fire({
              title: 'Se necesitan '+manpower+' asociados para la producción de este plan',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, agregar!',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                const response = await ProductionPlan.saveProductionPlan(productionPlan);    
                if(!response.error){
                  getPlanList();
                  setLineList([]);
                  setProductList([]);
                  getProductList();
                  cleanAll();
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Plan de Producción Agregado'      
                  });
                }else{
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Agregar Plan de Producción'      
                  });
                }
              }
            })
          }else{
            const response = await ProductionPlan.saveProductionPlan(productionPlan);    
                if(!response.error){
                  buscarPlan();
                  setLineList([]);
                  setProductList([]);
                  getProductList();
                  cleanAll();
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Plan de Producción Agregado'      
                  });
                }else{
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Agregar Plan de Producción'      
                  });
                }
          }
            
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Verifique que los Campos esten Correctos'
          })
        }
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Las Instrucciones deben tener menos de 100 caracteres'
        })
      }
    }
    //if de plan%60
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El Plan a Producir debe ser Multiplo de '+lotSize
      })
    }
  }

  const [showEdit, setShoEdit] = useState(false);

  const handleCloseEdit = () => {
      setShoEdit(false);
      cleanAll();
  }

  const handleShowEdit = (row) => {
    Package.getPackageByProduct(row.id_product).then( (resp) => {
      if(!resp.error){
        setPackingList(resp);
      }
    });
    setDestiny(row.destiny);
    setDestinyOld(row.destiny);
    setLine(row.id_line);
    setPacking(row.package);
    setPackingOld(row.package);
    setPlan(row.planP);
    setPlanOld(row.planP);
    setIdProduct(row.id_product);
    setFamily(row.model);
    setAuxName(row.no_part);
    setIdProductionPlan(row.id_production_plan);
    setInstructions(row.instructions);
    setInstructionsOld(row.instructions);
    setLotSize(row.lot_size);
    getLineList(row.id_product);
    setShoEdit(true);
  }

  const onClickSaveDates = async (e) => {
    e.preventDefault();
    if(!(plan%lotSize)){
      if(instructions.length<=150){
        if(idProduct && plan && packing && line && destiny && idProductionPlan){
          let instruct;
          
          instructions ? instruct = instructions : instruct="";
          let productionPlan = {
            "id": idProductionPlan,
            "id_product": idProduct,
            "plan": plan,
            "packing": packing,
            "id_line": line,
            "destiny": destiny,
            "no_part": auxName,
            "instructions": instruct,
            "planOld": planOld,
            "packingOld": packingOld,
            "destinyOld": destinyOld,
            "instructionsOld": instructionsOld,
          }

          Swal.fire({
            title: '¿Estas seguro de actualizar el Plan de Producción?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Actualizar!',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              const response = ProductionPlan.updateProductionPlan(productionPlan);
              if(!response.error){
                buscarPlan();
                handleCloseEdit();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Plan de Producción Actualizado'      
                });
              }else{
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Error al Actualizar Plan de Producción'      
                });
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Faltan Datos'
        });
        }
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Las Instrucciones deben tener menos de 150 caracteres'
        })
      }
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El Plan a Producir debe ser Multiplo de '+lotSize
      })
    }
  }

  const handleFamProd = (e) => {
    setIdProduct(e.value);
    getLineList(e.value);
    let resp = Package.getPackageByProduct(e.value);
    resp.then(res => {
      if(res.error){
        setPackingList([]);
      }else{
        setPackingList(res);
      }
    }).catch(err => {
      setPackingList(packList);
    })
    
    //let prod = productList2.find(p => p.value === e);
    setFamily(e.model);
    setManpower(e.manpower);
    setLotSize(e.lot_size);
  }

  const cleanAll = () => {
    setIdProduct(null);
    setFamily("");
    setPlan("");
    setPacking("");
    setLine(null);
    setManpower('');
    setDestiny("");
    setIdProductionPlan("");
    setAuxName("");
    setInstructions("");
    setPlanOld("");
    setDestinyOld("");
    setInstructionsOld("");
    setPackingOld("");
    setPackingList([]);
    setLineList([]);
    setLotSize('');
  }

  const handleDelete = async (row) => {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        ProductionPlan.deleteProductionPlan(row.id_production_plan).then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Plan de Producción Eliminado'
            });
            buscarPlan();
        }).catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al Eliminar'
            });
        });
      }
    })
  }

  const moveDown = async (row) => {
    let data = {
      "id_production_plan": row.id_production_plan,
      "priority": row.priority,
      "id_line": row.id_line,
    }
    await ProductionPlan.changePriorityDown(data);
    buscarPlan();
  }

  const moveUp = async (row) => {
    let data = {
      "id_production_plan": row.id_production_plan,
      "priority": row.priority,
      "id_line": row.id_line,
    }
    await ProductionPlan.changePriorityUp(data);
    buscarPlan();
  }

  const newName = (row) => {
    let [first, second] = row.split('-');
    return first;
  }
  const newName2 = (row) => {
    let [first, second] = row.split('-');
    return second;
  }

  const buscarPlan = async () => {
    const resp = await ProductionPlan.plansFilter(idLine);
    setPlansList(resp);
    const resp2 = await ProductionPlan.planListToExcel(idLine);
    setListToExcel(resp2);
  }

  const handleList = (event) => {
    setPlansList(event);
  }
  const handleReport = (event) => {
    setListToExcel(event);
  }

  const setLineComponent = (event) => {
    setIdLine(event);
  }

  const capturePlan = (e) => {
    if(e >= 0){
      setPlan(e);
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten números negativos'
        });
        setPlan("");
    }
  }

  const captureDestiny = (e) => {
    if(e.length > 10){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten más de 10 carácteres'
        });
        setDestiny("");
    }else{
      if(e.includes("'") || e.includes('"')){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permite dicho caracter'
          });
      }else{
        setDestiny(e);
      }

    }
  }

  const captureInstruction = (e) => {
    if(e.length > 200){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten más de 200 carácteres'
        });
        setInstructions("");
    }else{
      if(e.includes("'") || e.includes('"')){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permite dicho caracter'
          });
      }else{
        setInstructions(e);
      }

    }
  }

  if(!localStorage.getItem('token')){
    window.location.href = '/kanban_system/login'
  }else{
  return (
    <>
      <div id="content" className="content">
        {/* <!-- begin breadcrumb --> */}
        <br></br>
        <br></br>
        <ol className="breadcrumb pull-right">
          <li><a href="##">Home</a></li>
          <li><a href="##">Page Options</a></li>
          <li className="active">Plan de Producción</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Plan de Producción</center></h1>
        {/* <!-- end page-header --> */}
        
        <div className="row">
            <div className="col-md-12">
                      <div className="panel panel-inverse">
                          <div className="panel-heading">
                              <div className="panel-heading-btn">
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                              </div>
                              <h4 className="panel-title">Registrar</h4>
                          </div>
                          <div className="panel-body panel-form">
                          <form onSubmit={addPlan} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Producto</label>
                                                <div className="col-md-8">
                                                    <Select
                                                        options={productList2}
                                                        defaultValue={idProduct}
                                                        onChange={handleFamProd}
                                                        id="select_product"
                                                        
                                                      />
                                                    
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Manpower</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="manpower" placeholder="# asociados"  disabled value={manpower}/>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Familia</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="familia" placeholder="Familia"  disabled value={family}/>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Plan</label>
                                                <div className="col-md-8">
                                                    {/* <input type="number" className="form-control" id="plan" placeholder="0"  value={plan} onChange={ (e) => setPlan(e.target.value) } /> */}
                                                    <input type="number" className="form-control" id="plan" placeholder="0"  value={plan} onChange={ (e) => capturePlan(e.target.value) } />
                                                </div>
                                              </div>
                                              
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                  <label className="control-label col-md-3">Empaque</label>
                                                  <div className="col-md-8">
                                                    <select className="form-control" value={packing} onChange={ (e) => setPacking(e.target.value) }>
                                                        <option value="">Seleccione</option>
                                                        {packingList.map((packing) => (
                                                            <option key={packing.value} value={packing.label}>{packing.label}</option>
                                                        ))}
                                                        <option value="Carton">Cartón</option>
                                                        <option value="Plastico">Plástico</option>
                                                        <option value="Plastico y Carton">Plástico y Cartón</option>
                                                    </select>
                                                  </div>
                                              </div>
                                              <div className="form-group">
                                                  <label className="control-label col-md-3">Linea</label>
                                                  <div className="col-md-8">
                                                      
                                                      <select className='form-control' onChange={(e) => setLine(e.target.value)}>
                                                          <option value="">Seleccione</option>
                                                          {lineList.map((line) => (
                                                              <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                                          ))}
                                                      </select>
                                                  </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-3">Destino</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="Destino" placeholder="Destino" value={destiny} onChange={ (e) => captureDestiny(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-3">Instrucciones Especiales</label>
                                                <div className="col-md-8">
                                                    <textarea type="text" className="form-control" id="Destino" placeholder="Opcional..." value={instructions} onChange={ (e) => captureInstruction(e.target.value) } />
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                          <center>
                                            <button type="submit" className="btn btn-sm btn-primary m-r-5" >Agregar</button>
                                            <button type="reset" onClick={cleanAll} className="btn btn-sm btn-default m-r-5" >Limpiar</button>
                                            <button  className="btn btn-sm btn-danger" data-click="panel-collapse"  >Cancelar</button>
                                          </center>
                                        </div>
                                    </fieldset>
                                </form>
                                <br></br>
                          </div>
                      </div>
            </div>
        </div>
        
      <div className="row">
			  <div className="col-md-12">
          <div className="panel panel-inverse">
            <div className="panel-heading">
              <div className="panel-heading-btn">
                <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
              </div>
              <h4 className="panel-title">Actuales Buscar</h4>
            </div>
            <div className="panel-body">
                <TableFilter handleList={handleList} handleReport={handleReport} setLine={setLineComponent} typeFilter={1}/>
              <hr/>
              <div className="pull-right">
                {
                   plansList.length>0?
                   <ExportToExcel apiData={listToExcel} fileName={"PlanList"} headers={headersTable}/>
                   :null
                }
                <br/>
              </div>
            <TableContainer component={Paper} sx={{maxHeight:1000}}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                        <TableHead 
                          thstyle={{ fontSize: '35px'}}
                        >
                            <TableRow>
                                <TableCell><h6><strong>#</strong></h6></TableCell>
                                <TableCell><h6><strong>Producto</strong></h6></TableCell>
                                <TableCell component="th"><h6><strong>Plan</strong></h6></TableCell>
                                <TableCell component="th"><h6><strong>Hora Registro</strong></h6></TableCell>
                                <TableCell component="th"><h6><strong>Hora Inicio</strong></h6></TableCell>
                                <TableCell component="th"><h6><strong>Fin Estimado</strong></h6></TableCell>
                                <TableCell component="th"><h6><strong>Linea</strong></h6></TableCell>
                                <TableCell align="center" component="th"><h6><strong>Estado</strong></h6></TableCell>
                                <TableCell component="th" align="center"><h6><strong>Acciones</strong></h6></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            plansList.length>0?
                            plansList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                            .map((row, index) => (                            
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <h6>{row.id_production_plan}</h6>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <h6>{newName(row.no_part)}-</h6><h5><strong>{newName2(row.no_part)}</strong></h5>
                                    </TableCell>
                                    <TableCell >
                                        <h6>{row.planP}</h6>
                                    </TableCell>
                                    <TableCell >
                                    <h6>{row.created_at}</h6>
                                    </TableCell>
                                    <TableCell >
                                    <h6>{row.start_time}</h6>
                                    </TableCell>
                                    <TableCell >
                                    <h6>{row.end_estimated}</h6>
                                    </TableCell>
                                    <TableCell >
                                    <h6>{row.name_ln}</h6>
                                    </TableCell>
                                    {
                                        row.status==='1'?
                                        <TableCell align="center">
                                            <Chip label="Current" color="success" size='large' />
                                        </TableCell>
                                        : row.status==='2'?
                                        <TableCell align="center">
                                            <Chip label="On Hold" color="warning" />
                                        </TableCell>
                                        : 
                                        <TableCell align="center">
                                            <Chip label="Delayed" color="error" />
                                        </TableCell>

                                    }
                                      { page===0?
                                        index<2 ?
                                        null
                                        : index===2?
                                        <TableCell align="center">
                                            <div className="align-left">
                                                <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-2" title="Editar">
                                                    <i className="fa fa-pencil"></i>
                                                </Button>
                                                <Button onClick={() => handleDelete(row)} variant="contained" className="btn-sm btn-danger m-r-2" title="Eliminar">
                                                    <i className="fa fa-trash"></i>
                                                </Button>
                                                <Button onClick={() => moveDown(row)} variant="contained" className="btn-sm btn-primary m-r-2" title="Bajar">
                                                    <i className="fa fa-arrow-down"></i>
                                                </Button>
                                            </div>
                                        </TableCell>
                                        :
                                        <TableCell align="center">
                                            <div className="align-left">
                                                <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-2" title="Editar">
                                                    <i className="fa fa-pencil"></i>
                                                </Button>
                                                <Button onClick={() => handleDelete(row)} variant="contained" className="btn-sm btn-danger m-r-2" title="Eliminar">
                                                    <i className="fa fa-trash"></i>
                                                </Button>
                                                <Button onClick={() => moveUp(row)} variant="contained" className="btn-sm btn-primary m-r-2" title="Subir">
                                                    <i className="fa fa-arrow-up"></i>
                                                </Button>
                                                <Button onClick={() => moveDown(row)} variant="contained" className="btn-sm btn-primary m-r-2" title="Bajar">
                                                    <i className="fa fa-arrow-down"></i>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    : 
                                      <TableCell align="center">
                                          <div className="align-left">
                                              <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-2" title="Editar">
                                                  <i className="fa fa-pencil"></i>
                                              </Button>
                                              <Button onClick={() => handleDelete(row)} variant="contained" className="btn-sm btn-danger m-r-2" title="Eliminar">
                                                  <i className="fa fa-trash"></i>
                                              </Button>
                                              <Button onClick={() => moveUp(row)} variant="contained" className="btn-sm btn-primary m-r-2" title="Subir">
                                                  <i className="fa fa-arrow-up"></i>
                                              </Button>
                                              <Button onClick={() => moveDown(row)} variant="contained" className="btn-sm btn-primary m-r-2" title="Bajar">
                                                  <i className="fa fa-arrow-down"></i>
                                              </Button>
                                          </div>
                                      </TableCell>  
                                    }
                                </TableRow>
                                )
                            )
                            :
                            (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <p className="no-service-available">
                                            {
                                                plansList.length>0 && plansList.length>0?
                                                'No se encontraron resultados'
                                                :'No hay Planes de Producción registrados'
                                            }
                                            <br></br>
                                            <BiGhost color='#252525' size='24px'/>
                                        </p>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={plansList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
          </div>
			  </div>
			</div>

      

        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
      <Modal 
          show={showEdit} 
          onHide={handleCloseEdit} 
          size="auto"  
          style={{opacity:1}}  
          animation={false}
          aria-labelledby="contained-modal-title-vcenter" 
          centered 
          className='m-t-35'>
                <Modal.Header >
                  <Modal.Title >Modificar Plan de Producción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <div className="row">
                  <div className="col-md-12">
                      <form >
                        <fieldset>
                          <div className='form-group'>
                            <label > No. Parte </label>
                            <input type="text" onChange={(e) => setIdProduct(e.target.value)} className="form-control"
                                name="id_defecto"
                                value={auxName} 
                                disabled />
                          </div>
                          
                          <div className='form-group'>
                              <label> Familia</label>
                              <input type="text" className='form-control'
                                  onChange={(e) => setFamily(e.target.value)}
                                  name="family"
                                  value={family}
                                  disabled
                                  autoComplete="off"
                                  aria-describedby="family" />

                          </div>
                          <div className='form-group'>
                              <label htmlFor="plan"> Plan </label>
                              <input type="text" className='form-control'
                                  onChange={(e) => setPlan(e.target.value)}
                                  name="plan"
                                  value={plan}
                                  autoComplete="off"
                                  aria-describedby="plan" />
                          </div>

                          <div className='form-group'>
                              <label htmlFor="pakcing"> Empaque </label>
                                  <select className="form-control" value={packing} onChange={ (e) => setPacking(e.target.value) }>
                                      <option value="">Seleccione</option>
                                    {packingList.map((packing) => (
                                      <option key={packing.value} value={packing.label}>{packing.label}</option>
                                    ))}
                                      <option value="Carton">Cartón</option>
                                      <option value="Plastico">Plástico</option>
                                      <option value="Plastico y Carton">Plástico y Cartón</option>
                                  </select>
                          </div>
                          <div className='form-group'>
                              <label htmlFor="line"> Linea </label>
                              <select  onChange={(e) => setLine(e.target.value)} value={line} disabled className='form-control'>
                                <option value="">Seleccione</option>
                                {lineList.map((line) => (
                                  <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                ))}
                              </select>
                          </div>
                          <div className='form-group'>
                              <label htmlFor="destiny"> Destino </label>
                              <input type="text"
                                  onChange={(e) => setDestiny(e.target.value)}
                                  name="destiny"
                                  value={destiny}
                                  autoComplete="off"
                                  className='form-control'
                                  aria-describedby="destiny" />
                          </div>
                          <div className='form-group'>
                              <label htmlFor="instructions"> Instrucciones Especiales </label>
                              <textarea type="text"
                                  onChange={(e) => setInstructions(e.target.value)}
                                  name="instructions"
                                  value={instructions}
                                  autoComplete="off"
                                  className='form-control'
                                  aria-describedby="instructions" />
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                
                </Modal.Body>
                <Modal.Footer>

                <Button variant="primary" onClick={onClickSaveDates}>
                    Guardar
                </Button>
                <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
    </>
  )
}
}

export default ProductionPlanPage