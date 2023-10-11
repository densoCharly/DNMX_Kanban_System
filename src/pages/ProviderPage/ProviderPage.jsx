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
import Provider from '../../requests/ProviderPck';
import FormHelperText from '@mui/material/FormHelperText';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';



const ProviderPage = () => {
  const [nameProvider, setNameProvider] = useState('');
  const [idProvider, setIdProvider] = useState('');
  const [listProvider, setListProvider] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};
  

  const addProvider = (e) => {
    e.preventDefault();
    if(!nameProvider){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique que todos los campos esten llenos',
      })
    }else{
      const data = {
        "name_provider":nameProvider,
      }
      Provider.addProvider(data).then((res) => {
        if(res.id_inserted){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proveedor Agregado!',
            showConfirmButton: false,
            timer: 1500
          })
          cleanAll();
          getLists();
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.error.name_provider,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }).catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un error',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  };


  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const data2 = await Provider.getAllProviders();
    setListProvider(data2);
  }

  const cleanAll = () => {
    setNameProvider('');
    setIdProvider('');
  }

  const deleteProvider = (e) => {
    Swal.fire({
      title: 'Esta seguro de Eliminar este Proveedor?',
      text: "No podra revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Provider.deleteProvider(e.id_provider).then(() => {
          Swal.fire(
            'Eliminado!',
            'El Proveedor ha sido Eliminado.',
            'success'
          )
          getLists();
        }).catch(() => {
          Swal.fire(
            'Ocurrio un error',
            'El Proveedor no ha sido Eliminado.',
            'error'
          )
        })
      }
    })
  }

   //Modals
   const [showEdit, setShowEdit] = React.useState(false);
 
   const handleCloseEdit = () => {
      setShowEdit(false);
      cleanAll();
    }
   const handleShowEdit = (e) => {
    setNameProvider(e.name_provider);
    setIdProvider(e.id_provider);
    setShowEdit(true);
    }

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(nameProvider){
      const data = {
        "name_provider":nameProvider,
        "id_provider":idProvider
      }
      Provider.updateProvider(data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Proveedor actualizado!',
          showConfirmButton: false,
          timer: 1500
        })
        handleCloseEdit();
        getLists();
      }).catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un error',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique que todos los campos esten llenos',
      })
    }
  }

  const noCharacter = (e ) => {
    if(e.length > 100){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten más de 100 carácteres'
        });
    }else{
      if(e.includes("'") || e.includes('"')){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permite dicho caracter'
          });
      }else{    
        setNameProvider(e)
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
          <li className="active">Areas</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Poveedores Empaque </center></h1>
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
                          <form onSubmit={addProvider} className='form-horizontal form-bordered'>
                                    <br></br>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Nombre</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="nameProvider" placeholder="Name"  value={nameProvider} onChange={ (e) => noCharacter(e.target.value) } />
                                                    <FormHelperText>Required</FormHelperText>
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                          <center>
                                            <button type="submit" className="btn btn-sm btn-primary m-r-5" >Agregar</button>
                                            <button onClick={cleanAll} type="reset" className="btn btn-sm btn-default m-r-5" >Limpiar</button>
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
            <TableContainer component={Paper} sx={{maxHeight:700}}>
                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                        <TableHead 
                          thstyle={{ fontSize: '35px'}}
                        >
                            <TableRow>
                                <TableCell><h6><strong>#</strong></h6></TableCell>
                                <TableCell><h6><strong>Proveedor</strong></h6></TableCell>
                                <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            listProvider.length>0?
                            listProvider
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                            .map((row, id_provider) => (                            
                                <TableRow key={id_provider}>
                                    <TableCell component="th" scope="row">
                                        <h6>{row.id_provider}</h6>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <h6>{row.name_provider}</h6>
                                    </TableCell>
                                    <TableCell align="center">                                                                        
                                        <div className="align-left">
                                            <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-5" title="Editar">
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                            <Button onClick={() => deleteProvider(row)} variant="contained" className="btn-sm btn-danger" title="Eliminar">
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
                                    <TableCell colSpan={4} align="center">
                                        <p className="no-service-available">
                                            {
                                                listProvider.length>0 && listProvider.length>0?
                                                'No se encontraron resultados'
                                                :'No hay Proveedores registrados'
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
                        count={listProvider.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </div>
          </div>
			  </div>
			</div>
      <Modal
        show={showEdit} 
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
            Editar Proveedor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form >
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="nameProvider">Nombre</label>
                    <input type="text" className="form-control" id="nameProvider" name="nameProvider" value={nameProvider} onChange={(e) => noCharacter(e.target.value)} required/>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="secondary" className='btn btn-danger' onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" color="primary" type="submit" onClick={handleSubmitEdit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>

      <div>
        
      </div>
      
    </>
  )
}
}

export default ProviderPage