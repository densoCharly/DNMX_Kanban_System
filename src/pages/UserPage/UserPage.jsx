import React, { useEffect, useState } from 'react'
import Department from '../../requests/Department';
import Users from '../../requests/Users';
import Plant from '../../requests/Plant';
import Area from '../../requests/Area';
import Line from '../../requests/Line';
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
  { field: 'nameFull', headerName: 'Nombre', width: 250 },
  { field: 'payroll', headerName: 'No. Nomina', width: 100 },
  { field: 'mail', headerName: 'Correo', width: 200 },
  { field: 'type_employee', headerName: 'Tipo Empleado', width: 150 },
  { field: 'name_dpt', headerName: 'Departamento', width: 150 },
  { field: 'tel', headerName: 'Tel.', width: 150 },
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

const UserPage = () => {
  
  const [idUser, setIdUser] = useState('')
  const [name, setName] = useState('');
  const [fSurname, setFSurname] = useState('');
  const [mSurname, setMSurname] = useState('');
  const [payroll, setPayroll] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [fotoUser, setFotoUser] = useState("");
  const [idEmployee, setIdEmployee] = useState('');
  const [idPlant, setIdPlant] = useState('');
  const [idDepartment, setIdDepartment] = useState('');
  const [tel, setTel] = useState('');
  const [userList, setUserList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [idArea, setIdArea] = useState('');
  
  const [showTLSA, setShowTLSA] = useState(true);


  const AddUser = (e) => {
    e.preventDefault();
    if(name && fSurname && payroll && password && idEmployee && idPlant && idDepartment && tel){
      
      let data = {
        'name':name,
        'f_surname':fSurname,
        'm_surname':mSurname,
        'payroll':payroll,
        'mail':mail,
        'password':password,
        'foto_user':fotoUser,
        'id_employee':idEmployee,
        'id_plant':idPlant,
        'id_department':idDepartment,
        'tel':tel,
        'id_area':idArea,
      }
      Users.saveUser(data)
      .then(res => {
        if(res.id_inserted){
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado',
            showConfirmButton: false,
            timer: 1500
          })
          cleanState();
          getUserList();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.error,
            showConfirmButton: false,
            timer: 2500
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        showConfirmButton: false,
        timer: 2500
      })
    }
  };

  const DeleteUser = () => {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        Users.deleteUser(idUser)
        .then(res => {
          if(res.id_deleted){
            Swal.fire({
              icon: 'success',
              title: 'Usuario eliminado',
              showConfirmButton: false,
              timer: 1500
            })
            getUserList();
            handleCloseEdit();
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.error,
              showConfirmButton: false,
              timer: 2500
            })
          }
        })
      }
    })
  };
  const [showEdit, setShowEdit] = React.useState(false);
  const handleShowEdit = (row) => {    
    handlePlant(row.id_plant);
    handleDepartment(row.id_department);
    row.id_area? handleArea(row.id_area): setIdArea('');
    setName(row.name);
    setFSurname(row.f_surname);
    setMSurname(row.m_surname);
    setPayroll(row.payroll);
    setMail(row.mail);
    setPassword(row.password);
    setIdEmployee(row.id_employee);
    setIdPlant(row.id_plant);
    setIdUser(row.id_user);
    setTel(row.tel);
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
    cleanState();
  }

  useEffect(() => {
    getSelects();
    getUserList();
  } , []);

  const getUserList = async () => {
    let userList = await Users.getAllUsers();
    setUserList(userList);
  }

  const getSelects = async () => {
    //const departmentList = await Department.getAllDepartments();
    const plantList = await Plant.getAllPlants();
    const emplList = await Users.getEmployees();
    setDepartmentList(departmentList);
    setPlantList(plantList);
    setEmployeesList(emplList);
  }

  const handlePlant = async (e) => {
    if(e === ''){
      setIdPlant('');
      setDepartmentList([]);
    }else{
      setIdPlant(e);
      let dpts;
      try{
        dpts = await Department.getDepartmentsByPlant(e);      
      }catch(err){
        setDepartmentList([]);
        setIdPlant('');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay departamentos para esta planta'
        });
      }
      if(dpts){
        setDepartmentList(dpts);
        
      }
    }
  }

  const handleDepartment = async (e) => {
    if(e === ''){
      setIdDepartment('');
      setAreaList([]);
    }else{
      setIdDepartment(e);
      let areas;
      try{
        await Area.getAreaByDepartment(e).then((res) => {
          if(res.error){
            
          }else{
            areas=res;
          }
        }).catch((res) => {
          areas={'id_area':0, 'name_area':'No hay Areas'};
        });
        if(areas){
          setAreaList(areas);
        }
      }catch(err){
        setAreaList([]);
        setIdDepartment('');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay areas para este departamento'
        });
      }
    }
  }

  const cleanState = () => {
    setName('');
    setFSurname('');
    setMSurname('');
    setPayroll('');
    setMail('');
    setPassword('');
    setFotoUser('');
    setIdEmployee('');
    setIdPlant('');
    setIdDepartment('');
    setTel('');
    setIdArea('');
    setShowTLSA(true);
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(name && fSurname && payroll && password && idEmployee && idPlant && idDepartment && tel){
      let data = {
        'id_user':idUser,
        'name':name,
        'f_surname':fSurname,
        'm_surname':mSurname,
        'payroll':payroll,
        'mail':mail,
        'password':password,
        'foto_user':fotoUser,
        'id_employee':idEmployee,
        'id_plant':idPlant,
        'id_department':idDepartment,
        'tel':tel,
        'id_area':idArea,
      }
      Users.updateUser(data)
      .then(res => {
        if(res.id_updated){
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          cleanState();
          getUserList();
          setShowEdit(false);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.error,
            showConfirmButton: false,
            timer: 2500
          })
        }
      })
    }
  }

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
  const handleEmployee = (e) => {
    if(e){
      setIdEmployee(e);
      
      if(e === '28'){
        setShowTLSA(false);
      }else{
        setShowTLSA(true);
      }
    }else{
      setIdEmployee('');
    }
  }

  const noCharacter = (e, option) => {
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
          switch(option){
            case 1:
              setName(e);
              break;
            case 2:
              setFSurname(e);
              break;
            case 3:
              setMSurname(e);
              break;
            case 4:
              setPassword(e);
              break;
            case 5:
              setMail(e);
              break;
          }
        
      }
    }
  }

  const onlyNumbers = (e, option) => {
    let  numbers = [1,2,3,4,5,6,7,8,9,0]
    let isLetter = true;
    if(e.length){
      if(e.length <= 10){
        numbers.forEach(element => {
          if(element == e[e.length-1]){
            isLetter = false;
            switch(option){
              case 1:
                setPayroll(e);
                break;
              case 2:
                  setTel(e)
                break;
            }
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
      switch(option){
        case 1:
          setPayroll('');
          break;
        case 2:
          setTel('')
          break;
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
          <li><a href="/kanban_system/home">Page Options</a></li>
          <li className="active">Usuarios</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Usuarios</center></h1>
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
                  <form onSubmit={AddUser} className='form-horizontal form-bordered'>
                            <fieldset>
                                <div className='row'>
                                    <div className='col-md-6'>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Nombre</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="name" placeholder="Nombre"  value={name} onChange={ (e) => noCharacter(e.target.value, 1) } />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Apellido Paterno</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="fSurname" placeholder="Apellido"  value={fSurname} onChange={ (e) => noCharacter(e.target.value, 2) } />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Apellido Materno</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="mSurname" placeholder="Apellido"  value={mSurname} onChange={ (e) => noCharacter(e.target.value, 3) } />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">No. Nómina</label>
                                        <div className="col-md-8">
                                            <input type="text"  className="form-control" id="payroll" placeholder="1234"  value={payroll} onChange={ (e) => onlyNumbers(e.target.value, 1) } />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Tipo Empleado</label>
                                        <div className="col-md-8">
                                        <select className='form-control' onChange={(e) => handleEmployee(e.target.value)} value={idEmployee}>
                                                <option value="">Seleccione una opción</option>
                                                {employeesList.map((emp) => (
                                                  emp.id_employee !== 1 ?
                                                    <option key={emp.id_employee} value={emp.id_employee}>{emp.type_employee}</option>
                                                  :
                                                    <option ></option>
                                                ))}
                                            </select>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Contraseña</label>
                                        <div className="col-md-8">
                                            <input type="password" className="form-control" id="password" placeholder="****"  value={password} onChange={ (e) => noCharacter(e.target.value, 4) } />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Email</label>
                                        <div className="col-md-8">
                                            <input type="email" className="form-control" id="mail" placeholder="ola@mail.com"  value={mail} onChange={ (e) => noCharacter(e.target.value, 5) } />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Telefono</label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="tel" placeholder="477..." value={tel} onChange={ (e) => onlyNumbers(e.target.value, 2) } />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Planta</label>
                                        <div className="col-md-8">
                                        <select className='form-control' onChange={(e) => handlePlant(e.target.value)} value={idPlant}>
                                                <option value="">Seleccione una opción</option>
                                                {plantList.map((plant) => (
                                                    <option key={plant.id_plant} value={plant.id_plant}>{plant.name_plt}</option>
                                                ))}
                                            </select>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Departamento</label>
                                        <div className="col-md-8">
                                        <select className='form-control' value={idDepartment} onChange={(e) => handleDepartment(e.target.value)}>
                                                <option value="">Seleccione una opción</option>
                                                {departmentList.map((dpt) => (
                                                    <option key={dpt.id_department} value={dpt.id_department}>{dpt.name_dpt}</option>
                                                ))}
                                            </select>
                                        </div>
                                      </div>
                                        <div hidden={showTLSA}>
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
                                      <div className="form-group">
                                        <label className="control-label col-md-4">Foto</label>
                                        <div className="col-md-8">
                                            <input type="file" className="form-control" accept='image/*' id="fotoUser"  onChange={ (e) => setFotoUser(e.target.files[0]) } />
                                        </div>
                                      </div>
                                    </div>
                                    
                                </div>
                                <br></br>
                                <div className='form-group'>
                                  <center>
                                    <button type="submit" className="btn btn-sm btn-primary m-r-5" >Agregar</button>
                                    <button type="reset" onClick={cleanState} className="btn btn-sm btn-default m-r-5" >Limpiar</button>
                                    <button  className="btn btn-sm btn-danger" data-click="panel-collapse" onClick={cleanState} >Cancelar</button>
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
                      rows={userList}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_user}
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
      <Modal
        show={showEdit} 
        onHide={handleCloseEdit} 
        style={{
          opacity:1 ,
          backgroundColor: '#ffff/0.2',
        }}
        aria-labelledby="contained-modal-title-vcenter" 
        centered
        animation={false}
        size="auto"
      >
        <Modal.Header>
          <Modal.Title className="bg-gray text-center">Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <form onSubmit={handleSubmitEdit}>
              <div className='row'>
                <div className='col-md-6'>
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" placeholder="Nombre" name="name" value={name} onChange={(e) => noCharacter(e.target.value, 1)} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Apellido Paterno</label>
                    
                      <input type="text" className="form-control" placeholder="Apellido Paterno" name="fSurname" value={fSurname} onChange={(e) => noCharacter(e.target.value, 2)} required/>
                    
                  </div>
                  <div className="form-group">
                    <label className="form-label">Apellido Materno</label>
                      <input type="text" className="form-control" placeholder="Apellido Materno" name="mSurname" value={mSurname} onChange={(e) => noCharacter(e.target.value, 3)} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">No. Nómina</label>
                      <input type="text" className="form-control" placeholder="No. Nómina" disabled name="payroll" value={payroll} onChange={(e) => onlyNumbers(e.target.value, 1)} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Correo</label>
                      <input type="text" className="form-control" placeholder="Correo" name="mail" value={mail} onChange={(e) => noCharacter(e.target.value, 5)} required/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tipo de Empleado</label>
                      <select className="form-control" name="idEmployee" value={idEmployee} onChange={(e) => setIdEmployee(e.target.value)} required >
                        <option value="">Seleccione una opción</option>
                        {employeesList.map((emp) => (
                            <option key={emp.id_employee} value={emp.id_employee}>{emp.type_employee}</option>
                        ))}
                      </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Planta</label>
                      <select className="form-control" name="idPlant" value={idPlant} onChange={(e) => handlePlant(e.target.value)} required>
                        <option value="">Seleccione una Opcion</option>
                        {plantList.map((plant) => (
                            <option key={plant.id_plant} value={plant.id_plant}>{plant.name_plt}</option>
                        ))}
                      </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Departamento</label>
                      <select className="form-control" name="idDepartment" value={idDepartment} onChange={(e) => handleDepartment(e.target.value)} required>
                        <option value="">Seleccione</option>
                        {
                          departmentList.map((row) => (
                            <option key={row.id_department} value={row.id_department}>{row.name_dpt}</option>
                          ))
                        }
                      </select>
                  </div>
                  { idEmployee === "28"
                    ?
                    <>
                      <div className="form-group">
                        <label className="control-label">Área</label>
                            <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                              <option value="">Seleccione una opción</option>
                              {areaList.map((area) => (
                                <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                              ))}
                            </select>
                      </div>
                    </>
                    :
                    null
                  }
                  <div className="form-group">
                    <label className="form-label">Teléfono</label>
                      <input type="text" className="form-control" placeholder="Teléfono" name="tel" value={tel} onChange={(e) => onlyNumbers(e.target.value, 2)} required/>                    
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contraseña</label>
                      <input type="password" className="form-control" placeholder="Contraseña" name="password" value={password} onChange={(e) => noCharacter(e.target.value, 4)} required/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                <Button variant="secondary" className="btn btn-danger" onClick={DeleteUser}><i className='fa fa-trash'></i> Eliminar</Button>
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
    </>
  )
}
}

export default UserPage