import React, { useEffect, useState } from 'react'
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
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

const InventoryPage = () => {
    const [packList, setPackList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [inventory, setInventory] = useState('');
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    useEffect(() => {
      getLists();
    }, []);
  
    const getLists = async () => {
      const resp = await Package.getInventory();
      setPackList(resp);
    }
  
    const cleanAll = () => {
      setInventory('');
    };

    const saveInventory = (e) => {
      e.preventDefault();
      if(inventory){
          Package.updateInventory(inventory).then(res => {
              if(res.id_updated){
                  Swal.fire({
                    title: 'Success',
                    text: 'Inventory Updated!!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                  getLists();
                  cleanAll();
                }else{
                  Swal.fire({
                    title: 'Error',
                    text: res.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
                  cleanAll();
                }
          })
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Verifique que todos los campos esten llenos',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
  }

    const deletePack = (row) => {
      Swal.fire({
        title: 'Estas seguro de Eliminar este Empaque?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.value) {
          Package.deleteInventory(row.id_inv_package).then( res => {
            if(res.id_deleted){
              Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
              )
              getLists();
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
            <li className="active">Carga de Empaque</li>
          </ol>
          {/* <!-- end breadcrumb -->
          <!-- begin page-header --> */}
          
          <h1 className="page-title"><center>Carga de Empaque </center></h1>
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
                          <form onSubmit={saveInventory} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Seleccionar Archivo</label>
                                                <div className="col-md-8">
                                                    <input type="file" className="form-control" id="inventory" accept=".xlsx, .xls" onChange={ (e) => setInventory(e.target.files[0]) } />
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
                <TableContainer component={Paper} sx={{maxHeight:850}}>
                      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                          <TableHead 
                            thstyle={{ fontSize: '35px'}}
                          >
                              <TableRow>
                                  <TableCell><h6><strong>Empaque</strong></h6></TableCell>
                                  <TableCell><h6><strong>Cliente</strong></h6></TableCell>
                                  <TableCell align='left'><h6><strong>Lote</strong></h6></TableCell>
                                  <TableCell colSpan={2} align="center"><h6><strong>Piso</strong></h6></TableCell>
                                  <TableCell colSpan={2} align="center"><h6><strong>Caja de Renta</strong></h6></TableCell>
                                  <TableCell align='center'><h6><strong>Total</strong></h6></TableCell>
                                  <TableCell><h6><strong>Comentarios</strong></h6></TableCell>
                                  <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                              </TableRow>
                              <TableRow>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell align="center"><h6><strong>Cartón</strong></h6></TableCell>
                                    <TableCell align="center"><h6><strong>Plástico</strong></h6></TableCell>
                                    <TableCell align="center"><h6><strong>Cartón</strong></h6></TableCell>
                                    <TableCell align="center"><h6><strong>Plástico</strong></h6></TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell/>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                          {
                              packList.length>0?
                              packList
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                              .map((row) => (                            
                                  <TableRow key={row.id_inv_package}>
                                      <TableCell component="th" scope="row">
                                          <h6>{row.package}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                          <h6>{row.client}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="left">
                                          <h6>{row.lot_size}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="center">
                                          <h6>{row.stock_carton}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="center">
                                          <h6>{row.stock_plastic}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="center">
                                          <h6>{row.rent_carton}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="center">
                                          <h6>{row.rent_plastic}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="center">
                                          <h6>{row.total}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" align="center">
                                          <h6>{row.comments}</h6>
                                      </TableCell>
                                      <TableCell align="center">                                                                        
                                          <div className="align-left">
                                              <Button onClick={() => deletePack(row)} variant="contained" className="btn-sm btn-danger" title="Eliminar">
                                                  <i className="fa fa-trash"></i>
                                              </Button>
                                          </div>
                                      </TableCell>
                                  </TableRow>
                                  )
                              )
                              :
                              (
                                  <TableRow>
                                      <TableCell colSpan={12} align="center">
                                          <p className="no-service-available">
                                              {
                                                  packList.length>0 && packList.length>0?
                                                  'No se encontraron resultados'
                                                  :'No hay Inventario registrado'
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
                          count={packList.length}
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
      </>
    )
  }
}

export default InventoryPage