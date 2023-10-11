import React, { useEffect, useState } from 'react';
import Department from '../../requests/Department';
import Plant from '../../requests/Plant';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


const tableColumns = [
  { field: 'id_department', headerName: '#', width:100 },
  { field: 'name_dpt', headerName: 'Nombre', width: 300 },
  { field: 'no_department', headerName: 'Número', width: 100 }
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

const DepartmentPage = () => {
  
  const [nameDep, setNameDep] = useState('');
  const [noDepto, setNoDepto] = useState('');
  const [plant, setPlant] = useState('');
  const [idDepartment, setIdDepartment] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [plantList, setPlantList] = useState([]);


  const getDepartmentList = async () => {
    const resp2 = await Department.getAllDepartments();
    setDepartmentList(resp2);
  };

  const getPlantList = async () => {
    const resp2 = await Plant.getAllPlants();
    setPlantList(resp2);
  }

  

  useEffect(  () => {
    getDepartmentList();
    getPlantList();
  }, []);

  const AddDepartment = (e) => {
    e.preventDefault();
    if(nameDep && noDepto && plant){
      const depart = {
        "name": nameDep,
        "no_department": noDepto,
        "plant_id": plant
      };
      Department.addDepartment(depart)
      .then(() => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha agregado el departamento',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        getDepartmentList();
        cleanAll();
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  const cleanAll = () => {
    setNameDep('');
    setNoDepto('');
    setPlant('');
    setIdDepartment('');
  };
 
  const [showEdit, setShowEdit] = React.useState(false);
 
  const handleCloseEdit = () => {
    setShowEdit(false);
    cleanAll();
  };
  const handleShowEdit = (row) => {
    setIdDepartment(row.id_department);
    setNameDep(row.name_dpt);
    setNoDepto(row.no_department);
    setPlant(row.id_plant);
    setShowEdit(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(nameDep && noDepto && plant){
      const depart = {
        "name_dpt": nameDep,
        "no_department": noDepto,
        "plant_id": plant,
        "id_department": idDepartment
      }
      Department.updateDepartment(depart).then(() => {
        Swal.fire({
          title: 'Success',
          text: 'Department has been edited',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        getDepartmentList();
        handleCloseEdit();
      }).catch(err => {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
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

  const DeleteDepartment = () => {
    Swal.fire({
      title: 'Esta seguro de Eliminar este Departamento?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El Departamento ha sido eliminado.',
          'success'
        )
        Department.deleteDepartment(idDepartment)
        .then(() => {
          getDepartmentList();
          handleCloseEdit();
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
      }
    })
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
        setNameDep(e);        
      }
    }
  }
  const onlyNumbers = (e ) => {
    let  numbers = [1,2,3,4,5,6,7,8,9,0]
    let isLetter = true;
    if(e.length){
      if(e.length <= 10){
        numbers.forEach(element => {
          console.log(element)
          if(element == e[e.length-1]){
            isLetter = false;
            setNoDepto(e)
          }      
        });
    
        if(isLetter){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Solo se permiten números'
            });
        }
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten más de 10 carácteres'
          });
      }
    }else{
      setNoDepto('')
    }
  }

  if(!localStorage.getItem('token')){
    window.location.href = '/login'
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
          <li className="active">Plantas</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Departamentos</center></h1>
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
                          <form onSubmit={AddDepartment} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Nombre</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="nameDep" placeholder="Name"  value={nameDep} onChange={ (e) => noCharacter(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">No. Departamento</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="noDepto" placeholder="1234"  value={noDepto} onChange={ (e) => onlyNumbers(e.target.value) } />
                                                </div>
                                              </div>
                                              
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Planta</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setPlant(e.target.value)} value={plant}>
                                                        <option value="">Seleccione</option>
                                                        {plantList.map((item) => (
                                                            <option key={item.id_plant} value={item.id_plant}>{item.name_plt}</option>
                                                        ))}
                                                    </select>
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
                      rows={departmentList}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_department}
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
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Departamento
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="name_dpt">Nombre</label>
                    <input type="text" className="form-control" id="name_dpt" name="name_dpt" value={nameDep} onChange={(e) => noCharacter(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="noDepto">No. Departamento</label>
                    <input type="text" className="form-control" id="noDepto" name="noDepto" value={noDepto} onChange={(e) => onlyNumbers(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="planta">Planta</label>
                    <select className="form-control" id="planta" name="planta" value={plant} onChange={(e) => setPlant(e.target.value)} required>
                      <option value="">Seleccione una planta</option>
                      {plantList.map((item) => (
                          <option key={item.id_plant} value={item.id_plant}>{item.name_plt}</option>
                      ))}
                    </select>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                <Button variant="secondary" className="btn btn-danger" onClick={DeleteDepartment}><i className='fa fa-trash'></i> Eliminar</Button>
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
      
    </>
  )
}
}

export default DepartmentPage