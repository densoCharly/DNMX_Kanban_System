import React, { useEffect } from 'react'
import Plant from '../../requests/Plant';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


const tableColumns = [
  { field: 'id_plant', headerName: '#', width:100 },
  { field: 'name_plt', headerName: 'Nombre', width: 200 },
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

const PlantPage = () => {
  
  const [plant, setPlant] = React.useState('');
  const [idPlant, setIdPlant] = React.useState('');
  const [statusPlt, setStatusPlt] = React.useState('');
  const [createdBy, setCreatedBy] = React.useState('');
  const [plantList, setPlantList] = React.useState([]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const resp = await Plant.getAllPlants();
    setPlantList(resp);

  }

  const addPlant = async (e) => {
    e.preventDefault();
    if(plant){
      Plant.savePlant(plant).then((res) => {
        if(res.id_inserted){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Planta Agregada',
            showConfirmButton: false,
            timer: 1500
          })
          getLists();
          cleanAll();
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Error al añadir Planta",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error adding plant',
          showConfirmButton: false,
          timer: 1500
        });
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please enter a plant name',
        showConfirmButton: false,
        timer: 1500
      });
    }

  };

  const cleanAll = () => {
    setPlant('');
    setIdPlant('');
  };

  const guardarCambios = async () => {
    if(plant){
      let data = {
        "id_plant": idPlant,
        "name_plt": plant,
        "status_plt": statusPlt,
        "created_by": createdBy
      }
      Plant.updatePlant(data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plant updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        getLists();
        cleanAll();
        handleCloseEdit();
      }).catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error updating plant',
          showConfirmButton: false,
          timer: 1500
        });
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please enter a plant name',
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
    setPlant(row.name_plt);
    setIdPlant(row.id_plant);
    setStatusPlt(row.status_plt);
    setCreatedBy(row.created_by);
    setShowEdit(true);
  }

  const deletePlant = async () => {
    Swal.fire({
      title: 'Estas seguro de eliminar esta Planta?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        Plant.deletePlant(idPlant).then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Plant deleted successfully',
            showConfirmButton: false,
            timer: 1500
          });
          getLists();
          handleCloseEdit();
        }).catch(err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error deleting plant',
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    })
  }

  const capturePlant = (e) =>{
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
        setPlant(e)
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
          <li><a href="/kanban_system/home">Home</a></li>
          <li><a href="##">Page Options</a></li>
          <li className="active">Plantas</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Plantas </center></h1>
        {/* <!-- end page-header --> */}
        
        <div className="row">
            <div className="col-md-12">
                      <div className="panel panel-inverse">
                          <div className="panel-heading">
                              <div className="panel-heading-btn">
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                  {/* <a href="##" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times"></i></a> */}
                              </div>
                              <h4 className="panel-title">Registrar</h4>
                          </div>
                          <div className="panel-body panel-form">
                          <form onSubmit={addPlant} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        {/* <legend>Defecto</legend> */}
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Nombre</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="plant" placeholder=""  value={plant} onChange={ (e) => capturePlant(e.target.value) } />
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
                {/* <a href="##" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times"></i></a> */}
              </div>
              <h4 className="panel-title">Actuales</h4>
            </div>
            <div className="panel-body">
              <Box sx={{ height: 900, width: 1 }}>
                  <DataGrid
                      rows={plantList}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_plant}
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
                  style={{opacity:1}} 
                  aria-labelledby="contained-modal-title-vcenter" 
                  centered
                  animation={false}
                  size="auto"
                >
                    <Modal.Header>
                        <Modal.Title className="bg-gray text-center">Editar Planta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label"> Nombre:{' '}</label>
                                        <input type="text" className="form-control" id="name_plt" placeholder=""  value={plant} onChange={ (e) => capturePlant(e.target.value) } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                          <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                            <Button variant="secondary" className="btn btn-danger" onClick={deletePlant}><i className='fa fa-trash'></i> Eliminar</Button>
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

export default PlantPage