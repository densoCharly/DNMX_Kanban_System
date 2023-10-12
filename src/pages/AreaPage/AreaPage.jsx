import React, { useEffect } from 'react'
import Department from '../../requests/Department';
import Area from '../../requests/Area';
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
import PrinterComponent from './PrinterComponent';


const tableColumns = [
  { field: 'id_area', headerName: '#', width:80 },
  { field: 'name_area', headerName: 'Nombre', width: 300 },
  { field: 'name_department', headerName: 'Departamento', width: 250 },
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


const AreaPage = () => {
  const [nameArea, setNameArea] = React.useState('');
  const [idDepartment, setIdDepartment] = React.useState('');
  const [idArea, setIdArea] = React.useState('');
  const [listDpt, setListDpt] = React.useState([]);
  const [listArea, setListArea] = React.useState([]);

  const AddArea = (e) => {
    e.preventDefault();
    if(nameArea === '' || idDepartment === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique que todos los campos esten llenos',
      })
    }else{
      const data = {
        "nameArea":nameArea,
        "idDepartment":idDepartment
      }
      Area.saveArea(data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Area agregada',
          showConfirmButton: false,
          timer: 1500
        })
        cleanAll();
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
      
      
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const data = await Department.getAllDepartments();
    setListDpt(data);

    const data2 = await Area.getTableData();
    setListArea(data2);
  }

  const cleanAll = () => {
    setNameArea('');
    setIdDepartment('');
    setIdArea('');
  }

  const DeleteArea = () => {
    Swal.fire({
      title: 'Esta seguro de Eliminar esta Area?',
      text: "No podra revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Area.deleteArea(idArea).then(() => {
          Swal.fire(
            'Eliminado!',
            'La Area ha sido Eliminada.',
            'success'
          )
          getLists();
          handleCloseEdit();
        }).catch(() => {
          Swal.fire(
            'Ocurrio un error',
            'La Area no ha sido Eliminada.',
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
    setIdDepartment(e.id_department); 
    setNameArea(e.name_area);
    setIdArea(e.id_area);
    setShowEdit(true);
    }

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(nameArea && idDepartment){
      const data = {
        "nameArea":nameArea,
        "idDepartment":idDepartment,
        "idArea":idArea
      }
      Area.updateArea(data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Area actualizada!',
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
        setNameArea(e)
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
        
        <h1 className="page-title"><center>Areas </center></h1>
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
                          <form onSubmit={AddArea} className='form-horizontal form-bordered'>
                                    <br></br>
                                    <fieldset>
                                        {/* <legend>Defecto</legend> */}
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Nombre</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="nameArea" placeholder="Name"  value={nameArea} onChange={ (e) => noCharacter(e.target.value) } />
                                                </div>
                                              </div>
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Departamento</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setIdDepartment(e.target.value)}>
                                                        <option value=''>Seleccione</option>
                                                        {listDpt.map((item) => (
                                                            <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                                                        ))}
                                                    </select>
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
              <Box sx={{ height: 900, width: 1 }}>
                  <DataGrid
                      rows={listArea}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_area}
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
        <PrinterComponent />
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
            Editar Area
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form >
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="name_area">Nombre</label>
                    <input type="text" className="form-control" id="name_area" name="name_area" value={nameArea} onChange={(e) => setNameArea(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="idDepartment">Departamento</label>
                    <select className="form-control" id="idDepartment" name="idDepartment" value={idDepartment} onChange={(e) => setIdDepartment(e.target.value)} required>
                      <option value="">Seleccione un Departamento</option>
                      {listDpt.map((item) => (
                          <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
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
              <Button variant="secondary" className="btn btn-danger" onClick={DeleteArea}><i className='fa fa-trash'></i> Eliminar</Button>
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

export default AreaPage