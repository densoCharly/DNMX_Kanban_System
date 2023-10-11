import React, { useEffect } from 'react'
import Users from '../../requests/Users';
import Swal from 'sweetalert2';
import User from '../../requests/User';

const EditProfilePage = () => {
  const [idUser, setIdUser] = React.useState('')
  const [name, setName] = React.useState('');
  const [fSurname, setFSurname] = React.useState('');
  const [mSurname, setMSurname] = React.useState('');
  const [payroll, setPayroll] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fotoUser, setFotoUser] = React.useState();
  const [tel, setTel] = React.useState('');

  

  const getUser = async () => {
    const usr = await Users.getUser();
    setIdUser(usr.id_user);
    setName(usr.name);
    setFSurname(usr.f_surname);
    setMSurname(usr.m_surname);
    setPayroll(usr.payroll);
    setMail(usr.mail);
    setPassword(usr.password);
    setTel(usr.tel);
    
  }

  useEffect(() => { 
    getUser();
  } , []);

  const AddUser = (e) => {
    e.preventDefault();
    if(name && fSurname && mSurname && mail && password && tel){
      let data = {
        'name':name,
        'f_surname':fSurname,
        'm_surname':mSurname,
        'mail':mail,
        'password':password,
        'foto_user':fotoUser,
        'tel':tel,
        'id_user':idUser
      }
      Users.editUser(data)
      .then(res => {
        try{
          if(res.id_updated){
            Swal.fire({
              title: 'Cerrando Sesion...',
              text: "Se cerrará la sesion para que los cambios sean efectivos",
              icon: 'warning',
              
              confirmButtonColor: '#3085d6',
              
              confirmButtonText: 'Continuar'
            }).then((result) => {
              if (result.value) {
                User.logout();
                User.deleteToken();
                window.location.href = '/login';
              }
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.error,
              showConfirmButton: false,
              timer: 2500
            })
          }
        }catch(error){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
            showConfirmButton: false,
            timer: 2500
          })
        }
      })
    }
  };

  const abortDD = () => {
    window.location.href = '/home';
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFotoUser(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setFotoUser();
  };

  const cleanState = () => {
    setName('');
    setFSurname('');
    setMSurname('');
    setPayroll('');
    setMail('');
    setPassword('');
    setFotoUser('');
    setTel('');
  }

  return (
    <>
        <div id="content" className="content">
        {/* <!-- begin breadcrumb --> */}
        <br></br>
        <br></br>
        <ol className="breadcrumb pull-right">
          <li><a href="/kanban_system/home">Home</a></li>
          <li><a href="/kanban_system/home">Page Options</a></li>
          <li className="active">Usuario</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Usuario</center></h1>
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
                                                    <input type="text" className="form-control" id="name" placeholder="Nombre"  value={name} onChange={ (e) => setName(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Apellido Paterno</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="fSurname" placeholder="Apellido"  value={fSurname} onChange={ (e) => setFSurname(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Apellido Materno</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="mSurname" placeholder="Apellido"  value={mSurname} onChange={ (e) => setMSurname(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">No. Nómina</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="payroll" placeholder="" disabled value={payroll} onChange={ (e) => setPayroll(e.target.value) } />
                                                </div>
                                              </div>
                                            </div>
                                            <div className='col-md-6'>
                                              
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Email</label>
                                                <div className="col-md-8">
                                                    <input type="email" className="form-control" id="mail" placeholder="ola@mail.com"  value={mail} onChange={ (e) => setMail(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Telefono</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="tel" placeholder="+52" value={tel} onChange={ (e) => setTel(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Contraseña</label>
                                                <div className="col-md-8">
                                                    <input type="password" className="form-control" id="password" placeholder="****"  value={password} onChange={ (e) => setPassword(e.target.value) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Foto</label>
                                                <div className="col-md-8">
                                                    <input type="file" className="form-control" accept='image/*' id="fotoUser"  onChange={(e) => setFotoUser(e.target.files[0])} />
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                          <center>
                                            <button type="submit" className="btn btn-sm btn-primary m-r-5" >Guardar</button>
                                            <button  className="btn btn-sm btn-danger" data-click="panel-collapse" onClick={abortDD} >Cancelar</button>
                                          </center>
                                        </div>
                                    </fieldset>
                                </form>
                                <br></br>
                          </div>
                      </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default EditProfilePage