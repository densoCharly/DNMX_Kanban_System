import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Product from "../../requests/Product";
import Line from '../../requests/Line';
import Area from '../../requests/Area';
import TypeProduct from '../../requests/TypeProduct';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


const tableColumns = [
  { field: 'no_part', headerName: 'No. Parte', width:200 },
  { field: 'model', headerName: 'Modelo', width: 100 },
  { field: 'name_client', headerName: 'Cliente', width: 150 },
  { field: 'manpower', headerName: 'Manpower', width: 100 },
  { field: 'name_product', headerName: 'Tipo', width: 150 },
  { field: 'lot_size', headerName: 'Lote', width: 100 },
  { field: 'cicle', headerName: 'Ciclo (s)', width: 100 },
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

const ProductPage = () => {
  const [noPart, setNoPart] = useState('');
  const [model, setModel] = useState('');
  const [idArea, setIdArea] = useState('');
  const [idLine, setIdLine] = useState('');
  const [idProduct, setIdProduct] = useState('');
  const [manpower, setManpower] = useState('');
  const [productList, setProductList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [idClient, setIdClient] = useState('');
  const [typesList, setTypesList] = useState([]);
  const [idType, setId_type] = useState('');
  const [lotSize, setLotSize] = useState('');


  const getProductList = async () => {
    let resp2 = await Product.getTableData();
    setProductList(resp2);
    let resp = await TypeProduct.getAllTypeProducts();
    setTypesList(resp);
  };

  const getClientsList = async () => {
    const resp2 = await Product.getSelectsClient();
    setClientList(resp2);
  }

  const getAreaList = async () => {
    const resp2 = await Area.getAllAreas();
    if(resp2.error){

    }else{
      setAreaList(resp2);
    }
  }  

  useEffect(  () => {
    getProductList();
    getAreaList();
    getClientsList();
  }, []);
  

  const addProduct = (e) => {
    e.preventDefault();
    if(noPart && model && idLine){
        const data = {
          "no_part":noPart,
          "model":model,
          "line":idLine,
          "id_client":idClient,
          "manpower":manpower,
          "id_type_product":idType,
          "lot_size": lotSize
        }
        Product.saveProduct(data).then( (res) => {
          if(res.id_inserted){
            Swal.fire({
              title: 'Success',
              text: 'Product Added',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            getProductList();
            cleanAll();
          }else{
            Swal.fire({
              title: 'Error',
              text: JSON.stringify(res.error),
              icon: 'error',
              confirmButtonText: 'OK'
            })
            cleanAll();
          }
        }).catch(err => {
          Swal.fire({
            title: 'Error',
            text: "Reporta el siguiente error al área de F-IoT:  \n"+ err,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
     

    }else{
      Swal.fire({
        title: 'Error',
        text: 'Please fill all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };
  
  const [showEdit, setShowEdit] = React.useState(false);
 
  const handleCloseEdit = () => {
    setShowEdit(false);
    cleanAll();
  };
  const handleShowEdit = (e) => {
    setIdArea(e.id_area);
    setIdLine(e.id_line);
    setNoPart(e.no_part);
    setModel(e.model);
    setIdProduct(e.id_product);
    setIdClient(e.id_client);
    setManpower(e.manpower);
    setId_type(e.id_type_product);
    setLotSize(e.lot_size);
    setLineList([]);
    const lines = Line.getLineByArea(e.id_area);
    lines.then(res => {
      setLineList(res);
    });
    setShowEdit(true);
  };

  const handleArea = (e) => {
    if(e){
      setIdArea(e);
      setLineList([]);
      const lines = Line.getLineByArea(e);
      lines.then(res => {
        setLineList(res);
      }).catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No hay Lineas en esa Area',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        setIdArea('');
        setLineList([]);
      });
    }else{
      setIdArea('');
      setLineList([]);
    }
  }

  const cleanAll = () => {
    setNoPart('');
    setModel('');
    setIdArea('');
    setIdLine('');
    setIdProduct('');
    setIdClient('');
    setManpower('');
    setId_type('');
    setLotSize('');
  }

  const DeleteProduct = () => {
    console.log(idProduct);
    Swal.fire({
      title: 'Estas seguro de Eliminar este producto?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Product.deleteProduct(idProduct).then( res => {
          if(res.id_deleted){
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            )
            getProductList();
            handleCloseEdit();
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
    })
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(noPart && model && idLine){
      const data = {
        "no_part":noPart,
        "model":model,
        "id_line":idLine,
        "id_product":idProduct,
        "id_client":idClient,
        "manpower":manpower,
        "id_type_product":idType,
        "lot_size":lotSize,
      }
      Product.updateProduct(data).then( res => {
        if(res.id_inserted){
          Swal.fire({
            title: 'Success',
            text: 'Producto Actualizado!!!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          getProductList();
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
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const captureManpower = (e) => {
    if(e >= 0){
      setManpower(e);
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten números negativos'
        });
        setManpower("");
    }
  }

  const captureSize = (e) => {
    if(e >= 0){
      setLotSize(e);      
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten números negativos'
        });
        setLotSize("");
    }
  }
  const captureParte = (e) => {
    if(e.length > 100){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten más de 100 carácteres'
        });
        setNoPart("");
    }else{
      if(e.includes("'") || e.includes('"')){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permite dicho caracter'
          });
      }else{
        setNoPart(e);
      }

    }
  }

  const captureModel = (e) =>{
    if(e.length > 100){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten más de 100 carácteres'
        });
        setNoPart("");
    }else{
      if(e.includes("'") || e.includes('"')){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permite dicho caracter'
          });
      }else{
        setModel(e);
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
          <li><a href="/home">Home</a></li>
          <li><a href="/home">Page Options</a></li>
          <li className="active">Productos</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Productos</center></h1>
        {/* <!-- end page-header --> */}
        
        <div className="row">
            <div className="col-md-12">
                      <div className="panel panel-inverse">
                          <div className="panel-heading">
                              <div className="panel-heading-btn">
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" onClick={getProductList} data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                              </div>
                              <h4 className="panel-title">Registrar</h4>
                          </div>
                          <div className="panel-body panel-form">
                          <form onSubmit={addProduct} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">No. Parte</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="noPart" placeholder="MX..." 
                                                      value={noPart} onChange={ (e) => captureParte(e.target.value) }
                                                      />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Tipo de Producto</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setId_type(e.target.value)} value={idType}>
                                                        <option value="">Seleccione una opción</option>
                                                        {typesList.map((type, index) => (
                                                            <option key={index} value={type.id_type_product}>{type.name_product}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Familia</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="model" placeholder="CS..."  value={model} onChange={ (e) => captureModel(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Área</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                                                        <option value="">Seleccione una opción</option>
                                                        {areaList.map((area) => (
                                                            <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Linea</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' value={idLine} onChange={(e) => setIdLine(e.target.value)}>
                                                        <option value="">Seleccione una opción</option>
                                                        {lineList.map((line) => (
                                                            <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Cliente</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' value={idClient} onChange={(e) => setIdClient(e.target.value)}>
                                                        <option value="">Seleccione una opción</option>
                                                        {clientList.map((client) => (
                                                            <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Manpower</label>
                                                <div className="col-md-8">
                                                    <input type="number" className="form-control" id="manpower" placeholder="" value={manpower} onChange={(e) => captureManpower(e.target.value)}/>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Tamaño de Lote</label>
                                                <div className="col-md-8">
                                                    <input type="number" className="form-control" id="lotSize" placeholder="" value={lotSize} onChange={(e) => captureSize(e.target.value)}/>
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
              <h4 className="panel-title">Actuales</h4>
            </div>
            <div className="panel-body">
              <Box sx={{ height: 900, width: 1 }}>
                  <DataGrid
                      rows={productList}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_product}
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
      <div>
        <Modal show={showEdit} 
                onHide={handleCloseEdit} 
                size="auto"  
                style={{opacity:1}}  
                animation={false}
                aria-labelledby="contained-modal-title-vcenter" 
                centered 
                className='m-t-35'
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              Editar Producto
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <form >
                  <fieldset>
                    <div className="form-group">
                      <label htmlFor="noPart">No. Parte</label>
                      <input type="text" className="form-control" id="noPart" name="noPart" value={noPart} onChange={(e) => setNoPart(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="type">Tipo de Producto</label>
                      <select className="form-control" id="type" name="type" value={idType} onChange={(e) => setId_type(e.target.value)} required>
                      <option value="">Seleccione una opción</option>
                      {typesList.map((type, index) => (
                        <option key={index} value={type.id_type_product}>{type.name_product}</option>
                      ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="model">Modelo</label>
                      <input type="text" className="form-control" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="client">Cliente</label>
                      <select className="form-control" id="client" name="client" value={idClient} onChange={(e) => setIdClient(e.target.value)} required>
                      <option value="">Seleccione una opción</option>
                      {clientList.map((client) => (
                        <option key={client.id_client} value={client.id_client}>{client.name_client}</option>
                      ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="area">Área</label>
                      <select className="form-control" id="area" name="area" value={idArea} onChange={(e) => handleArea(e.target.value)} required>
                        <option value="">Seleccione una opción</option>
                        {areaList.map((area) => (
                            <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="linea">Línea</label>
                      <select className='form-control' value={idLine} onChange={(e) => setIdLine(e.target.value)} required>
                          <option value="">Seleccione una opción</option>
                          {lineList.map((line) => (
                              <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="manpower">Manpower</label>
                      <input type="number" className="form-control" id="manpower" placeholder="" value={manpower} onChange={(e) => setManpower(e.target.value)}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lotSize">Tamaño de Lote</label>
                      <input type="number" className="form-control" id="lotSize" placeholder="" value={lotSize} onChange={(e) => setLotSize(e.target.value)}/>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                <Button variant="secondary" className="btn btn-danger" onClick={DeleteProduct}><i className='fa fa-trash'></i> Eliminar</Button>
              </Grid>
              <Grid xs={4} md={2} mdOffset="auto">
                <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>Cancelar</Button>
              </Grid>
              <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                <Button variant="primary" type="submit" form="form-edit" onClick={handleSubmitEdit}>Guardar</Button>
              </Grid>
            </Grid>
          </Modal.Footer>
        </Modal>
      </div>
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
      
    </>
  )
}
}

export default ProductPage