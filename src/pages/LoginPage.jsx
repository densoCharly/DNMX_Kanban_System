import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import User from '../requests/User'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const history = useHistory();
    let [user, setUser] = React.useState('')
    let [password, setPassword] = React.useState('')

    
    
    const Login = async(e) => {
        e.preventDefault()
        const mail_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(!user){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'El campo usuario esta vacio',
                showConfirmButton: false,
                timer: 1500
            });
            return
        }

        if(password.length<1){
            Swal.fire({
                icon: 'warning',
                title: 'Ingresa una contraseña',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }

        const response = await User.login(user, password)
        if(response.msg==='error'){

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.error,
                showConfirmButton: false,
                timer: 2500

            });
            //alert('Error: '+response.message);
        }else{
            let {user_role} = response.user_role

            if(user_role===0){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No tienes permisos para acceder a esta sección',
                    showConfirmButton: false,
                    timer: 2500
                });
                return
            }
                    
            User.storeToken({...response})
            
            window.location.href = '/kanban_system/homeFilter'
        }
    }
    if(localStorage.getItem('token')){
        window.location.href = '/kanban_system/homeFilter'
    }else{
    return (
        <>
            <div>
                <div className="container">
                <div className="login-cover">
                            <div className="login-cover-image"><img src="assets/img/login-bg/bg-3.jpg" data-id="login-cover-image" alt="" /></div>
                            <div className="login-cover-bg"></div>
                        </div>
                    <div className="row">
                        <div className="center">
                            <div id="page-container" className="login login-v2">
                                <div className="card">
                                    <div className="card-header m-10" style={{color:'lightyellow'}}>
                                        <h3 style={{color:'white'}}><i className="fa fa-sign-in"></i>          Iniciar sesión</h3>
                                        <p>Ingresa tu nombre de usuario y contraseña</p>
                                        
                                        <form onSubmit={Login}>
                                            <div className="form-group m-10">
                                                <label htmlFor="user">Nombre de usuario</label>
                                                <input type="text" className="form-control" id="user" aria-describedby="emailHelp" placeholder="Ingresa tu nombre de usuario" onChange={(e) => setUser(e.target.value)}/><br/>
                                                <label htmlFor="password">Contraseña</label>
                                                <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" onChange={(e) => setPassword(e.target.value)}/><br/>
                                                <center><button type="submit" className="btn btn-primary m-b-10">Iniciar sesión</button></center>
                                                <p className="text-center">¿No tienes una cuenta? <a href="/register">Regístrate</a></p>
                                                <p className="text-center">¿Olvidaste tu contraseña? <a href="/forgot">Recuperar contraseña</a></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
                {/* <div className='pace-top'>
                    {/*<!-- begin #page-loader -->*
                    <div id="page-loader" className="fade in"><span className="spinner"></span></div>
                    {/*<!-- end #page-loader -->*
                    
                    <div className="login-cover">
                        <div className="login-cover-image"><img src="assets/img/login-bg/bg-3.jpg" data-id="login-cover-image" alt="" /></div>
                        <div className="login-cover-bg"></div>
                    </div>
                    {/*<!-- begin #page-container -->*
                    <div id="page-container" className="fade">
                        {/*<!-- begin login -->*
                        {/* <div className="login login-v2" data-pageload-addclassName="animated fadeIn"> *
                        <div className="login login-v2">
                            {/*<!-- begin brand -->*
                            <div className="login-header">
                                <div className="brand">
                                    {/* <span className="logo"></span> Color Admin
                                    <img src="assets/img/g36.png" alt="" width="150px" />
    <small>responsive bootstrap 3 admin template</small> *
                                    <img src="/logo192.png" alt="" width=""></img>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-sign-in"></i>
                                </div>
                            </div>
                            {/*<!-- end brand -->*
                            <div className="login-content">
                                <form onSubmit={Login} className="margin-bottom-0">
                                    <div className="form-group m-b-20">
                                        <input type="text" className="form-control input-lg" value={user}
                                        onChange={(e) => setUser(e.target.value) } placeholder="Usuario" required />
                                    </div>
                                    <div className="form-group m-b-20">
                                        <input type="password" className="form-control input-lg" 
                                        value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                                    </div>
                                    <div className="login-buttons">
                                        <button type="submit" className="btn btn-success btn-block btn-lg">Iniciar Sesión</button>
                                    </div>                                
                                </form>
                            </div>
                        </div>
                        {/*<!-- end login -->*
                    </div>
                </div> */}
        </>
  )
}
}

export default Login