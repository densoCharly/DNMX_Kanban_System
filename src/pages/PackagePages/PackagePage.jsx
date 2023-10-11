import React, { useEffect } from 'react'
import "./Package.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import Package from '../../requests/Package';
import Product from '../../requests/Product';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import { MultiSelect } from "react-multi-select-component";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


const tableColumns = [
  { field: 'id_package', headerName: '#', width:80 },
  { field: 'name_package', headerName: 'Cliente', width: 200 },
  { field: 'lot', headerName: 'Lote', width: 100 },
  { field: 'products', headerName: 'Productos', width: 1000 }, 
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


const PackagePage = () => {
    const [name, setName] = React.useState('');
    const [lot, setLot] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [idPack, setIdPack] = React.useState('');
    const [packList, setPackList] = React.useState([]);
    const [productList, setProductList] = React.useState([]);
  
    useEffect(() => {
      getLists();
      getProductList();
    }, []);

    const getProductList = async () => {
        const resp1 = await Product.getSelectsPack();
        setProductList(resp1);
    };
  
    const getLists = async () => {
      const resp = await Package.getTableData();
      setPackList(resp);
  
    }
  
    const addPack = async (e) => {
      e.preventDefault();

      if(name && lot && products.length>0){
        let data = {
          "name": name,
          "lot": lot,
          "products": products,
        }
        Package.addPackage(data).then(res => {
          if(res.id_inserted){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Package added successfully',
              showConfirmButton: false,
              timer: 2000
            });
            getLists();
            cleanAll();
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: res.error,
              showConfirmButton: false,
              timer: 2500
            });
          }
              
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'Verifique que todos los campos esten llenos',
          showConfirmButton: false,
          timer: 2500
        });
      }
  
    };
  
    const cleanAll = () => {
      setName('');
      setIdPack('');
      setLot('');
      setProducts([]);
    };
  
    const guardarCambios = async () => {
      if(name && lot && products.length>0){
        let data = {
          "id_package": idPack,
          "name": name,
          "products": products,
          "lot": lot
        }
        Package.updatePackage(data).then( res => {
          if(res.id_updated){  
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Empaque Actualizado!!',
              showConfirmButton: false,
              timer: 2500
            })
            getLists();
            cleanAll();
            handleCloseEdit();
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: res.error,
              showConfirmButton: false,
              timer: 2500
            });
          }
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Veirfique que todos los campos esten llenos',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
   
    const [showEdit, setShowEdit] = React.useState(false);
   
    const handleCloseEdit = () => {
       setShowEdit(false);
       cleanAll();
     }
    const handleShowEdit = (row) => {
      setName(row.name_package);
      setIdPack(row.id_package);
      setLot(row.lot);
      Package.getModalPackage(parseInt(row.id_package)).then(res => {
        setProducts(res);
      })
      setShowEdit(true);
    }
  
    const deletePack = async () => {
      Swal.fire({
        title: 'Estas seguro de eliminar este Empaque?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          Package.deletePackage(idPack).then(res => {
            if(res.id_deleted){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Empaque Eliminado!',
                showConfirmButton: false,
                timer: 2500
              });
              getLists();
              handleCloseEdit();
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: res.error,
                showConfirmButton: true,
                
              });
            }
          })
        }
      })
    }

    const captureName = (e) => {
      // setName
      if(e.length > 150){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten más de 150 carácteres'
          });
          setName("");
      }else{
        if(e.includes("'") || e.includes('"')){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No se permite dicho caracter'
            });
        }else{
          setName(e);
        }
  
      }
    };

    const captureLote = (e) => {
      if(e >= 0){
        setLot(e);      
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten números negativos'
          });
      }
    };
   
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
            <li><a href="/kanban_system/home">Home</a></li>
            <li><a href="##">Page Options</a></li>
            <li className="active">Empaque</li>
          </ol>
          {/* <!-- end breadcrumb -->
          <!-- begin page-header --> */}
          
          <h1 className="page-title"><center>Empaque </center></h1>
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
                            <form onSubmit={addPack} className='form-horizontal form-bordered'>
                                      <fieldset>
                                          <div className='row'>
                                              <div className='col-md-6'>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Nombre</label>
                                                  <div className="col-md-8">
                                                      <input type="text" className="form-control" id="name" placeholder="C4"  value={name} onChange={ (e) => captureName(e.target.value) } />
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Lote</label>
                                                  <div className="col-md-8">
                                                      <input type="number" className="form-control" id="lot" placeholder="0"  value={lot} onChange={ (e) => captureLote(e.target.value) } />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Productos</label>
                                                  <div className="col-md-8">
                                                      <MultiSelect
                                                        options={productList}
                                                        value={products}
                                                        hasSelectAll={false}
                                                        
                                                        onChange={setProducts}
                                                        labelledBy="Seleccione"
                                                      />
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
                        rows={packList}
                        columns={tableColumns}
                        onRowClick={(params) => handleShowEdit(params.row)}
                        getRowId={(row) => row.id_package}
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
          {/* <!-- begin scroll to top btn --> */}
          <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
          {/* <!-- end scroll to top btn --> */}
        </div>
        <div>            
                  <Modal 
                    show={showEdit} 
                    onHide={handleCloseEdit} 
                    
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered
                    animation={false}
                    size="auto"
                  >
                      <Modal.Header  >
                          <Modal.Title className="bg-gray text-center"><i className='fa fa-edit'></i>   Editar Empaque</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="container">
                              <div className="row">
                                  <div className="col-md-6">
                                      <div className="form-group">
                                          <label className="form-label"> Nombre:{' '}</label>
                                          <input type="text" className="form-control" id="name" placeholder=""  value={name} onChange={ (e) => captureName(e.target.value) } />
                                      </div>
                                      <div className="form-group">
                                          <label className="form-label"> Lote:{' '}</label>
                                          <input type="number" className="form-control" id="lot" placeholder=""  value={lot} onChange={ (e) => captureLote(e.target.value) } />
                                      </div>
                                      <div className="form-group">
                                          <label className="form-label">Productos:</label>
                                          
                                            <MultiSelect
                                                options={productList}
                                                value={products}
                                                onChange={setProducts}
                                                labelledBy="Seleccione"
                                            />
                                          
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </Modal.Body>
                      <Modal.Footer>
                          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                            <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                              <Button variant="secondary" className="btn btn-danger" onClick={deletePack}><i className='fa fa-trash'></i> Eliminar</Button>
                            </Grid>
                            <Grid xs={4} md={2} mdOffset="auto">
                              <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>Cancelar</Button>
                            </Grid>
                            <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                              <Button variant="primary" type="submit" form="form-edit" onClick={guardarCambios}>Guardar</Button>
                            </Grid>
                          </Grid>
                      </Modal.Footer>
                  </Modal>
        </div>
      </>
    )
  }
}

export default PackagePage