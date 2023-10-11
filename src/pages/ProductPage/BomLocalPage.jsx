import React, {useState, useEffect} from 'react'
import Product from '../../requests/Product';
import Components from '../../requests/Components';
import Subassy from '../../requests/Subassy';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Switch } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import FormBOM from '../../components/FormBOM';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLinkOperator,
  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const tableColumns = [
    { field: 'no_part', headerName: 'No Part', width:200 },
    { field: 'sku', headerName: 'Componente', width: 200 },
    { field: 'sku_desc', headerName: 'Comp. Desc.', width: 300 },
    { field: 'qty_pc', headerName: 'Cantidad P/U', width: 250 },
    { field: 'qty_box', headerName: 'Cantidad P/Caja', width: 150 },
  ];
  
function quickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 2,
          pb: 1,
          fontSize: '25px',
        }}
      >
        <GridToolbarQuickFilter
            sx={{ fontSize: '25px' }}
            quickFilterParser={(searchInput) =>
                searchInput
                .split(',')
                .map((value) => value.trim())
                .filter((value) => value !== '')
          }
        />
      </Box>
    );
}

const BomLocalPage = () => {

    const [idProductSearch, setIdProductSearch] = useState('');
    const [idProductPomponent, setIdProductPomponent] = useState('');
    const [componentList, setComponentList] = useState([]);
    const [selectComp, setSelectComp] = useState([]);
    const [productList2, setProductList2] = useState([]);
    const [idProduct, setIdProduct] = useState('');
    const [idComponent, setIdComponent] = useState('');
    const [skuDesc, setSkuDesc] = useState('');
    const [pzsComp, setPzsComp] = useState('');
    const [location, setLocation] = useState('');
    const [process, setProcess] = useState('');
    const [qtyBox, setQtyBox] = useState('');
    const [locationList, setLocationList] = useState([]);
    const [model, setModel] = useState('');
    const [switchButton, setSwitchButton] = useState(false);
    const [subassyList, setSubassyList] = useState([]);
    const [dataRow, setDataRow] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [noPart, setNoPart] = useState('');
    const [kind, setKind] = useState('');
    const [qtyPc, setQtyPc] = useState('');
    const [sku, setSku] = useState('');
    const [inpLoc, setInpLoc] = useState(false);
    const [fotoComponent, setFotoComponent] = useState("");

    const showComponent = () => {
      if(switchButton){
        setSwitchButton(false);
      }else{
        setSwitchButton(true);
      }
    }

    const getSelects = async () => {
        const resp = await Product.getSelectsPack();
        setProductList2(resp);
        const resp3 = await Subassy.getSelectsSub();
        setSubassyList(resp3);
        const resp2 = await Components.getSelectSKU();
        //setSelectComp([]);
        resp2.forEach(element => {
          selectComp.push({value:element.SKU, label:element.SKU+" -- "+element.SKU_DESC, sku_desc:element.SKU_DESC});
        });
        //setSelectComp(resp2);
      }
    
    useEffect(  () => {
        //getComponentList();
        getSelects();
    }, []);

    const cleanAll = () => {
      setIdProductSearch('');
      setComponentList('');
      //setProductList2('');
      setIdProduct('');
      setIdComponent('');
      setSkuDesc('');
      setPzsComp('');
      setLocation('');
      setProcess('');
      setQtyBox('');
      setModel('');
      setSwitchButton(false);
      setLocationList([]);
    }


    const handleSearchProd = (e) => {
      setIdProductSearch(e.value);
    }

    const searchBom = async () => {
      Product.getBomProduct(idProductSearch).then( (resp1) => {
          setComponentList(resp1);
        }
      ).catch(err => {
        setComponentList("");
        console.error(err);
        Swal.fire("No Existe BOM de este Producto ");
      });
    }

    const handleComp = async (e) => {
      setIdComponent(e.value);
      setSkuDesc(e.sku_desc);
      const resp = await Components.getComponentLocations(e.value);
      resp.forEach(element => {
        locationList.push({value:element.LOC_ID, label:element.LOC_ID});
      });
    }

    const handleSubassy = (e) => {
      setIdComponent(e.label);
      setSkuDesc(e.type_name);

    }

    const handleProduct = (e) => {
      setIdProduct(e.value);
      setModel(e.model);
    }

    const addBom = () => {
      // 1 Subassy    0 Component
      var kind_asign = switchButton?1:0;
      let data={
        "id_product": idProduct,
        "sku": idComponent,
        "sku_desc": skuDesc,
        "qty_pc": pzsComp,
        "qty_box": qtyBox,
        "location": location,
        "process": process,
        "model": model,
        "kind_asign": kind_asign,
      };
      Product.addProductComponent(data).then( (res) => {
        if(res.id_inserted){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Componente agregado a Producto correctamente',
            showConfirmButton: true,
            
          });
          cleanAll();
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al agregar el componente',
            showConfirmButton: false,
            timer: 1500
          });
          console.error(res.error);
        }
      }).catch( err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al agregar el componente',
          showConfirmButton: false,
          timer: 1500
        });
      })
    }

    const createBom = () => {
      Swal.fire({
        title: '¿Estas seguro de Generar un nuevo BOM?',
        text: "Los Datos Actuales Serán Sobreescritos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Generar!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Generando',
            position: 'center',
            allowEscapeKey:false,
            allowOutsideClick:false,
            didOpen: () => {
              Swal.showLoading();
              Product.createBOM().then((res) => {
                if(res.id_inserted){
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'BOM Generado Correctamente',
                    showConfirmButton: true,
                  });
                }else{
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Generar',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              } )
              .catch(err => {
                console.error(err);
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Error al Generar',
                  showConfirmButton: false,
                  timer: 1500
                });
              });
            }
          });
        }
      })
    }

    const handleEdit = (row) => {
      setLocation(row.location);
      setSku(row.sku);
      setIdProductPomponent(row.id_product_component);
      setIdProduct(row.id_product);
      setKind(row.kind);
      setNoPart(row.no_part);
      setProcess(row.process);
      setQtyBox(row.qty_box);
      setQtyPc(row.qty_pc);
      setSkuDesc(row.sku_desc);
      getLocations(row.sku);
      setShowEdit(true);
    }

    const getLocations = async (e) => {
      const resp = await Components.getComponentLocations(e);
      resp.error?setInpLoc(false):setInpLoc(true);
      resp.forEach(element => {
          locationList.push({value:element.LOC_ID, label:element.LOC_ID});
      });
    }

    const handleClose = () => {
      setLocationList([]);
      setShowEdit(false);
    }

    const handleSubmitEdit = () => {
      if(fotoComponent){   
        let data = {
          'id_product_component': idProductPomponent,
          'kind': kind,
          'qty_box': qtyBox,
          'qty_pc': qtyPc,
          'process': process,
          'location': location,
          'foto_component': fotoComponent,
        }
        Product.updateProductComponentFoto(data).then( res => {
          if(res.id_inserted){
            Swal.fire({
              title: 'Success',
              text: 'BOM Actualizado!!!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            cleanAll();
            setShowEdit(false);
          }else{
            Swal.fire({
              title: 'Error',
              text: res.error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }else{
        let data = {
          'id_product_component': idProductPomponent,
          'kind': kind,
          'qty_box': qtyBox,
          'qty_pc': qtyPc,
          'process': process,
          'location': location,
        }
        Product.updateProductComponent(data).then( res => {
          if(res.id_inserted){
            Swal.fire({
              title: 'Success',
              text: 'BOM Actualizado!!!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            cleanAll();
            setShowEdit(false);
          }else{
            Swal.fire({
              title: 'Error',
              text: res.error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }

    }

    if(!localStorage.getItem('token')){
        window.location.href = '/kanban_system/login'
    }else{
    return (
        <>
        <div id="content" className="content">
            <br></br>
                <br></br>
                <ol className="breadcrumb pull-right">
                <li><a href="/home">Home</a></li>
                <li><a href="/home">Page Options</a></li>
                <li className="active">BOM Local</li>
                </ol>
                {/* <!-- end breadcrumb -->
                <!-- begin page-header --> */}
                
                <h1 className="page-title"><center>BOM Local </center></h1>
                {/* <!-- end page-header --> */}
                <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <div className="panel-heading-btn">
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand">
                          <i className="fa fa-expand"></i>
                        </a>
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload">
                          <i className="fa fa-repeat"></i>
                        </a>
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse">
                          <i className="fa fa-minus"></i>
                        </a>
                      </div>
                      <h4 className="panel-title">Registrar</h4>
                    </div>
                    <div className="panel-body panel-form">
                      <form className="form-horizontal form-bordered">
                        <fieldset>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-4">Número de Parte</label>
                                <div className="col-md-8">
                                    <Select
                                        options={productList2}
                                        defaultValue={idProduct}
                                        onChange={(e) => handleProduct(e)}
                                        id="select_product"
                                      />
                                </div>
                              </div>
                              <div className='form-group'>
                                <Switch onChange={showComponent}/>
                                <label className="control-label col-md-4">Componente</label>
                              </div>
                              <div className="form-group" hidden={switchButton===true}>
                                  <label className="control-label col-md-4">SKU</label>
                                  <div className="col-md-8">
                                    <Select
                                      options={selectComp}
                                      defaultValue={idComponent}
                                      onChange={handleComp}
                                      id="select_component"
                                      />
                                  </div>
                                  <label className="control-label col-md-4">Ubicación</label>
                                  <div className="col-md-8">
                                    <Select
                                        options={locationList}
                                        defaultValue={location}
                                        onChange={e => setLocation(e.value)}
                                        id="select_component"
                                      />
                                  </div>
                              </div>
                              <div className='form-group' hidden={switchButton===false}>
                                  <label className="control-label col-md-4">Subassy</label>
                                  <div className="col-md-8">
                                    <Select
                                      options={subassyList}
                                      defaultValue={idComponent}
                                      onChange={handleSubassy}
                                      id="select_component"
                                      />
                                  </div>
                                  <label className="control-label col-md-4">Ubicación</label>
                                  <div className="col-md-8">
                                    <input type='text' className='form-control' placeholder='Ubicacion...' onChange={(e) => setLocation(e.target.value)}/>
                                  </div>
                              </div>
                              <div className="form-group">
                                
                              </div>
                              
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-4">Proceso</label>
                                <div className="col-md-8">
                                  <select className='form-control' onChange={(e) => setProcess(e.target.value)} value={process}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="1">Final Assy</option>
                                    <option value="2">SubAssy</option>
                                    <option value="3">Initial Process</option>
                                    <option value="4">Sub-Initial Process</option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-md-4">Cantidad</label>
                                <div className="col-md-8">
                                  <input type="number" className="form-control" id="pzsComp" placeholder="0" value={pzsComp} onChange={(e) => setPzsComp(e.target.value)} />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-md-4">Piezas P/Caja</label>
                                <div className="col-md-8">
                                  <input type="number" className="form-control" id="qtyBox" placeholder="0" value={qtyBox} onChange={(e) => setQtyBox(e.target.value)} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <center>
                              <button type="button" onClick={addBom} className="btn btn-sm btn-primary m-r-5">Agregar</button>
                              <button type="reset" onClick={cleanAll} className="btn btn-sm btn-default m-r-5">Limpiar</button>
                              <button className="btn btn-sm btn-danger" data-click="panel-collapse">Cancelar</button>
                            </center>
                          </div>
                        </fieldset>
                      </form>
                      <br></br>
                      <hr/>
                      <div className='row'>
                          <div className='col-md-6'>
                              <div className="form-group">
                                  <label className="control-label col-md-8 m-t-5">
                                      <i className="fa fa-warning"></i> Generar BOM Hibrido <i className="fa fa-warning"></i>
                                  </label>
                                  <div className="col-md-4">
                                      <button className='btn btn-sm btn-warning' onClick={createBom} >Generar</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <hr/>
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
                        <h4 className="panel-title">Buscar BOM</h4>
                      </div>
                      <div className="panel-body">
                        <form className='form-horizontal form-bordered'>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className="form-group">
                                <label className="control-label col-md-4">Número de Parte</label>
                                <div className="col-md-8">
                                  <Select
                                    options={productList2}
                                    defaultValue={idProductSearch}
                                    onChange={handleSearchProd}
                                    id="select_product"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className="form-group">
                                <div className="col-md-8">
                                  <button type="button" onClick={searchBom} className="btn btn-sm btn-primary m-r-5" >Buscar</button>
                                </div>
                              </div>                                  
                            </div>
                          </div>
                        </form>
                        <br></br>
                              <Box sx={{ height: 900, width: 1 }}>
                                  <DataGrid
                                      rows={componentList}
                                      columns={tableColumns}
                                      onRowClick={(params) => handleEdit(params.row)}
                                      getRowId={(row) => row.id_product_component}
                                      sx={{ height: '100%', width: '100%', fontSize: '15px' }}
                                      initialState={{
                                      filter: {
                                          filterModel: {
                                          items: [],
                                          quickFilterLogicOperator: GridLinkOperator.Or,
                                          },
                                      },
                                      }}
                                      components={{ Toolbar: quickSearchToolbar }}
                                  />
                              </Box>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Modal show={showEdit}
                onHide={handleClose}
                size="auto"  
                style={{opacity:1}}  
                animation={false}
                aria-labelledby="contained-modal-title-vcenter" 
                centered 
                className='m-t-35'
              >
            <Modal.Header >
                <Modal.Title className="center">
                Editar BOM de {noPart}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                <div className="col-md-12">
                    <form >
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="noPart">Componente</label>
                            <input type="text" className="form-control" id="slu" name="sku" value={sku} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="skuDesc">Descripción</label>
                            <input type="text" className="form-control" id="skuDesc" name="skuDesc" value={skuDesc} disabled/>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-4">Tipo</label>
                            <select className="form-control" id="kind" value={kind} onChange={ (e) => setKind(e.target.value) }>
                                <option value="">Seleccione...</option>
                                <option value="Rectificador">Rectificador</option>
                                <option value="Frame">Frame</option>
                                <option value="Stator">Stator</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qtyBox">Cantidad por Caja</label>
                            <input type='number' className="form-control" id="qtyBox" name="qtyBox" value={qtyBox} onChange={(e) => setQtyBox(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="area">Cantidad requerida por Unidad</label>
                            <input type='number' className="form-control" id="qtyPc" name="qtyPc" value={qtyPc} onChange={(e) => setQtyPc(e.target.value)} required />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="linea">Proceso</label>
                            <select className='form-control' onChange={(e) => setProcess(e.target.value)} value={process}>
                                <option value="">Seleccione una opción</option>
                                <option value="1">Final Assy</option>
                                <option value="2">SubAssy</option>
                                <option value="3">Initial Process</option>
                                <option value="4">Sub-Initial Process</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="manpower">Ubicación</label>
                            { inpLoc?
                                <Select
                                options={locationList}
                                defaultValue={location}
                                onChange={e => setLocation(e.value)}
                                id="select_component"
                                />
                                :
                                <input type="text" className="form-control" id="location" placeholder="" value={location} onChange={(e) => setLocation(e.target.value)}/>
                            }
                        </div>
                        <div className="form-group">
                          <label className="control-label">Foto</label>
                          <input type="file" className="form-control" accept='image/*' id="fotoComponent"  onChange={ (e) => setFotoComponent(e.target.files[0]) } />
                        </div>
                    </fieldset>
                    </form>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn btn-danger" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" type="submit" form="form-edit" onClick={handleSubmitEdit}>Guardar</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
}

export default BomLocalPage