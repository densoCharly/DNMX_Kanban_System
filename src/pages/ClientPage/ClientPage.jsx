import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import Client from '../../requests/Client';
import FormHelperText from '@mui/material/FormHelperText';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


const tableColumns = [
  { field: 'id_client', headerName: '#', width:80 },
  { field: 'name_client', headerName: 'Cliente', width: 200 },
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


const ClientPage = () => {
  const [nameClient, setNameClient] = React.useState('');
  const [idClient, setIdClient] = React.useState('');
  const [listClient, setListClient] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};
  

  const addClient = (e) => {
    e.preventDefault();
    if(!nameClient){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique que todos los campos esten llenos',
      })
    }else{
      const data = {
        "nameClient":nameClient,
      }
      Client.addClient(data).then((res) => {
        if(res.id_inserted){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cliente Agregado!',
            showConfirmButton: false,
            timer: 1500
          })
          cleanAll();
          getLists();
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.error.name_client,
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
    const data2 = await Client.getAllClients();
    setListClient(data2);
  }

  const cleanAll = () => {
    setNameClient('');
    setIdClient('');
  }

  const deleteClient = () => {
    Swal.fire({
      title: 'Esta seguro de Eliminar este Cliente?',
      text: "No podra revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Client.deleteClient(idClient).then(() => {
          Swal.fire(
            'Eliminado!',
            'El Cliente ha sido Eliminado.',
            'success'
          )
          getLists();
          handleCloseEdit();
        }).catch(() => {
          Swal.fire(
            'Ocurrio un error',
            'El Cliente no ha sido Eliminado.',
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
    setNameClient(e.name_client);
    setIdClient(e.id_client);
    setShowEdit(true);
    }

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(nameClient){
      const data = {
        "nameClient":nameClient,
        "idClient":idClient
      }
      Client.updateClient(data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente actualizado!',
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
        setNameClient(e)
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
        
        <h1 className="page-title"><center>Clientes</center></h1>
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
                          <form onSubmit={addClient} className='form-horizontal form-bordered'>
                                    <br></br>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Nombre</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="nameClient" placeholder="Name"  value={nameClient} onChange={ (e) => noCharacter(e.target.value) } />
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
              <Box sx={{ height: 700, width: 1 }}>
                  <DataGrid
                      rows={listClient}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_client}
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
            Editar Cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form >
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="nameClient">Nombre</label>
                    <input type="text" className="form-control" id="nameClient" name="nameClient" value={nameClient} onChange={(e) => noCharacter(e.target.value)} required/>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
              <Button variant="secondary" className="btn btn-danger" onClick={deleteClient}><i className='fa fa-trash'></i> Eliminar</Button>
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

export default ClientPage