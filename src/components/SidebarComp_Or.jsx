import React from 'react'
import User from '../requests/User';
import config from '../requests/config';
import { adminRoutes, developRoutes, viewerRoutes, materialistRoutes, finalAssyRoutes, plannerRoutes, shippingRoutes } from '../routes';
import { render } from '@testing-library/react';

let urlImage = config.imageURL();


const SidebarComp = () => {
    const [showSide, setShowSide] = React.useState(true);
    let role = localStorage.getItem('user_role');
    const Logout = async(e) => {
        e.preventDefault();
        const response = await User.logout();
        if(response.id_inserted === 1){
            //alert("Sesión cerrada");
            User.deleteToken();
            //logout;
            window.location.href = '/kanban_system/login';
        }
    }

    const hideSideBar = () => {
        showSide ? setShowSide(false) : setShowSide(true)
    }

    switch(role){
        case '1':
            return(
                <div >
                    <div >
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            //fontFamily:'AbrilFatface-Regular',
                                            //src:"../../../public/assets/Abril_Fatface/AbrilFatface-Regular.ttf",
                                            fontSize:'170%',
                                        }}><strong>PSbK</strong></label>
                                        <button type="button" className="navbar-toggle " data-click="sidebar-toggled">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>
                                    
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                    </li>
                                    <li className="dropdown">
                                        <a href="##" data-toggle="dropdown" className="dropdown-toggle f-s-14">
                                            <i className="fa fa-bell-o"></i>
                                            <span className="label">5</span>
                                        </a>
                                        {/* <ul className="dropdown-menu media-list pull-right animated fadeInDown"> */}
                                        <ul className="dropdown-menu media-list pull-right animated ">
                                            <li className="dropdown-header">Notifications (5)</li>
                                            <li className="media">
                                                <a href="##">
                                                    <div className="media-left"><i className="fa fa-bug media-object bg-red"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Server Error Reports</h6>
                                                        <div className="text-muted f-s-11">3 minutes ago</div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="media">
                                                <a href="##">
                                                    <div className="media-left"><img src="assets/img/user-1.jpg" className="media-object" alt="" /></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">John Smith</h6>
                                                        <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
                                                        <div className="text-muted f-s-11">25 minutes ago</div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="media">
                                                <a href="##">
                                                    <div className="media-left"><img src="assets/img/user-2.jpg" className="media-object" alt="" /></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading">Olivia</h6>
                                                        <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
                                                        <div className="text-muted f-s-11">35 minutes ago</div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="media">
                                                <a href="##">
                                                    <div className="media-left"><i className="fa fa-plus media-object bg-green"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading"> New User Registered</h6>
                                                        <div className="text-muted f-s-11">1 hour ago</div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="media">
                                                <a href="##">
                                                    <div className="media-left"><i className="fa fa-envelope media-object bg-blue"></i></div>
                                                    <div className="media-body">
                                                        <h6 className="media-heading"> New Email From John</h6>
                                                        <div className="text-muted f-s-11">2 hour ago</div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="dropdown-footer text-center">
                                                <a href="##">View more</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown navbar-user">
                                        <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                        {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInLeft">
                                            <li className="arrow"></li>
                                            <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                            <li><a href="##"><span className="badge badge-danger pull-right">2</span> Inbox</a></li>
                                            <li><a href="##">Calendar</a></li>
                                            <li><a href="##">Setting</a></li>
                                            <li className="divider"></li>
                                            <li><a href="##" onClick={Logout}>Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>    
                    <div >
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Developer</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header ">
                                        Adiministración Base
                                        {/* <ul className='dropdown-menu'> */}
                                    </li>
                                    {
                                        developRoutes.map((item) => {
                                            return(
                                            <li className="has-sub" key={item.index}>
                                                <a href={item.path}>
                                                    <i className={item.icon}></i>
                                                    <span>{item.name}</span>
                                                </a>
                                            </li>)
                                        })
                                    }
                                    {/* </ul> */}
                                {/* </li> */}
                                    <li className="nav-header">Sistema</li>
                                    {
                                        adminRoutes.map(({index, name, icon, path}) => {
                                            return(
                                                <li className="has-sub" key={index}>
                                                    <a href={path}>
                                                        <i className={icon}></i>
                                                        <span>{name}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li>
                                        <a className="sidebar-minify-btn" data-click="sidebar-minify">
                                            <i className="fa fa-angle-double-left"></i>
                                        </a>
                                    </li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar 963.53 941.36 scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}
                        
                    </div>
                </div>
            );
        case '3':
            return(
                <div> 
                    <div>
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            //fontFamily:'AbrilFatface-Regular',
                                            //src:"../../../public/assets/Abril_Fatface/AbrilFatface-Regular.ttf",
                                            fontSize:'170%',
                                        }}><strong>PSbK</strong></label>
                                        <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <form className="navbar-form full-width">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter keyword" />
                                                <button type="submit" className="btn btn-search"><i className="fa fa-search"></i></button>
                                            </div>
                                        </form>
                                    </li>
                                    <li className="dropdown">
                                        <a href="##" data-toggle="dropdown" className="dropdown-toggle f-s-14">
                                            <i className="fa fa-bell-o"></i>
                                            {/* <span className="label">5</span> */}
                                        </a>
                                        {/* <ul className="dropdown-menu media-list pull-right animated fadeInDown"> */}
                                        <ul className="dropdown-menu media-list pull-right animated ">
                                            <li className="dropdown-header">Notifications </li>                
                                        </ul>
                                    </li>
                                    <li className="dropdown navbar-user">
                                        <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInLeft">
                                            <li className="arrow"></li>
                                            <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                            <li className="divider"></li>
                                            <li><a href="##" onClick={Logout}>Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>
                    <div>
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                                {/* <img src="assets/img/user-13.jpg" alt="" /> */}
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Viewer</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header">Sistema</li>
                                    {
                                        viewerRoutes.map(({index, name, icon, path}) => {
                                            return(
                                                <li className="has-sub" key={index}>
                                                    <a href={path}>
                                                        <i className={icon}></i>
                                                        <span>{name}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li><a href="##" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}                    
                    </div>
                </div>
            );
        case '4':
            return(
                <div> 
                    <div>
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            //fontFamily:'AbrilFatface-Regular',
                                            //src:"../../../public/assets/Abril_Fatface/AbrilFatface-Regular.ttf",
                                            fontSize:'170%',
                                        }}><strong>Production System by Kanban</strong></label>
                                    </div>
                                    <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <form className="navbar-form full-width">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter keyword" />
                                                <button type="submit" className="btn btn-search"><i className="fa fa-search"></i></button>
                                            </div>
                                        </form>
                                    </li>
                                    <li className="dropdown">
                                        <a href="##" data-toggle="dropdown" className="dropdown-toggle f-s-14">
                                            <i className="fa fa-bell-o"></i>
                                            {/* <span className="label">5</span> */}
                                        </a>
                                        {/* <ul className="dropdown-menu media-list pull-right animated fadeInDown"> */}
                                        <ul className="dropdown-menu media-list pull-right animated ">
                                            <li className="dropdown-header">Notifications </li>                
                                        </ul>
                                    </li>
                                    <li className="dropdown navbar-user">
                                        <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInLeft">
                                            <li className="arrow"></li>
                                            <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                            <li className="divider"></li>
                                            <li><a href="##" onClick={Logout}>Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>
                    <div>
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                                {/* <img src="assets/img/user-13.jpg" alt="" /> */}
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Final Assy</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header">Sistema</li>
                                    {
                                        finalAssyRoutes.map(({index, name, icon, path}) => {
                                            return(
                                                <li className="has-sub" key={index}>
                                                    <a href={path}>
                                                        <i className={icon}></i>
                                                        <span>{name}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li><a href="##" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}                    
                    </div>
                </div>
            );
        case '5':
            return(
                <div> 
                    <div>
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            //fontFamily:'AbrilFatface-Regular',
                                            //src:"../../../public/assets/Abril_Fatface/AbrilFatface-Regular.ttf",
                                            fontSize:'170%',
                                        }}><strong>Production System by Kanban</strong></label>
                                    </div>
                                    <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <form className="navbar-form full-width">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter keyword" />
                                                <button type="submit" className="btn btn-search"><i className="fa fa-search"></i></button>
                                            </div>
                                        </form>
                                    </li>
                                    <li className="dropdown">
                                        <a href="##" data-toggle="dropdown" className="dropdown-toggle f-s-14">
                                            <i className="fa fa-bell-o"></i>
                                            {/* <span className="label">5</span> */}
                                        </a>
                                        {/* <ul className="dropdown-menu media-list pull-right animated fadeInDown"> */}
                                        <ul className="dropdown-menu media-list pull-right animated ">
                                            <li className="dropdown-header">Notifications </li>                
                                        </ul>
                                    </li>
                                    <li className="dropdown navbar-user">
                                        <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInLeft">
                                            <li className="arrow"></li>
                                            <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                            <li className="divider"></li>
                                            <li><a href="##" onClick={Logout}>Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>
                    <div>
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                                {/* <img src="assets/img/user-13.jpg" alt="" /> */}
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Planner</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header">Sistema</li>
                                    {
                                        plannerRoutes.map(({index, name, icon, path}) => {
                                            return(
                                                <li className="has-sub" key={index}>
                                                    <a href={path}>
                                                        <i className={icon}></i>
                                                        <span>{name}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li><a href="##" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}                    
                    </div>
                </div>
            );
        case '6':
            return(
                <div>
                    <div>
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            //fontFamily:'AbrilFatface-Regular',
                                            //src:"../../../public/assets/Abril_Fatface/AbrilFatface-Regular.ttf",
                                            fontSize:'170%',
                                        }}><strong>Production System by Kanban</strong></label>
                                    </div>
                                    <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <form className="navbar-form full-width">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter keyword" />
                                                <button type="submit" className="btn btn-search"><i className="fa fa-search"></i></button>
                                            </div>
                                        </form>
                                    </li>
                                    <li className="dropdown">
                                        <a href="##" data-toggle="dropdown" className="dropdown-toggle f-s-14">
                                            <i className="fa fa-bell-o"></i>
                                            {/* <span className="label">5</span> */}
                                        </a>
                                        {/* <ul className="dropdown-menu media-list pull-right animated fadeInDown"> */}
                                        <ul className="dropdown-menu media-list pull-right animated ">
                                            <li className="dropdown-header">Notifications </li>
                                            
                                        </ul>
                                    </li>
                                    <li className="dropdown navbar-user">
                                        <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInLeft">
                                            <li className="arrow"></li>
                                            <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                            <li className="divider"></li>
                                            <li><a href="##" onClick={Logout}>Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>
                    <div>
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                                {/* <img src="assets/img/user-13.jpg" alt="" /> */}
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Shipping</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header">Sistema</li>
                                    {
                                        shippingRoutes.map(({index, name, icon, path}) => {
                                            return(
                                                <li className="has-sub" key={index}>
                                                    <a href={path}>
                                                        <i className={icon}></i>
                                                        <span>{name}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li><a href="##" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}  
                    </div>
                </div>
            );
        case '7':
            return(
                <div>
                    <div>
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            fontSize:'170%',
                                        }}><strong>PSbK</strong></label>
                                        
                                        <ul className="nav navbar-nav navbar-right" >
                                            <li className="dropdown navbar-user">
                                                <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                                    {
                                                        localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                    }
                                                    <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                                </a>
                                                <ul className="dropdown-menu animated fadeInLeft">
                                                    <li className="arrow"></li>
                                                    <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="##" onClick={Logout}>Log Out</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>
                    <div>
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Materialist</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header">Sistema</li>
                                    {
                                        materialistRoutes.map(({index, name, icon, path}) => {
                                            return(
                                                <li className="has-sub" key={index}>
                                                    <a href={path}>
                                                        <i className={icon}></i>
                                                        <span>{name}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li><a href="##" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}  
                    </div>
                </div>
                );
        case '28':
            return(
                <div> 
                    <div>
                        {/*<!-- begin #header -->*/}
                        <div id="header" className="header navbar navbar-default navbar-fixed-top">
                            {/*<!-- begin container-fluid -->*/}
                            <div className="container-fluid">
                                {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                                <div className="navbar-header">
                                    {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                                    <div className='row'>
                                        <img className='m-t-2' src="logo250.png" alt="" width="145px" style={{paddingRight:'30px'}}/>
                                        <label className='m-t-10' style={{
                                            //fontFamily:'AbrilFatface-Regular',
                                            //src:"../../../public/assets/Abril_Fatface/AbrilFatface-Regular.ttf",
                                            fontSize:'170%',
                                        }}><strong>Production System by Kanban</strong></label>
                                    </div>
                                    <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                {/*<!-- end mobile sidebar expand / collapse button -->*/}
                                
                                {/*<!-- begin header navigation right -->*/}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <form className="navbar-form full-width">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Enter keyword" />
                                                <button type="submit" className="btn btn-search"><i className="fa fa-search"></i></button>
                                            </div>
                                        </form>
                                    </li>
                                    <li className="dropdown">
                                        <a href="##" data-toggle="dropdown" className="dropdown-toggle f-s-14">
                                            <i className="fa fa-bell-o"></i>
                                            {/* <span className="label">5</span> */}
                                        </a>
                                        {/* <ul className="dropdown-menu media-list pull-right animated fadeInDown"> */}
                                        <ul className="dropdown-menu media-list pull-right animated ">
                                            <li className="dropdown-header">Notifications </li>                
                                        </ul>
                                    </li>
                                    <li className="dropdown navbar-user">
                                        <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                            <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                        </a>
                                        <ul className="dropdown-menu animated fadeInLeft">
                                            <li className="arrow"></li>
                                            <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                            <li className="divider"></li>
                                            <li><a href="##" onClick={Logout}>Log Out</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                {/*<!-- end header navigation right -->*/}
                            </div>
                            {/*<!-- end container-fluid -->*/}
                        </div>
                    </div>
                    <div>
                        {/*<!-- begin #sidebar -->*/}
                        <div id="sidebar" className="sidebar">
                            {/*<!-- begin sidebar scrollbar -->*/}
                            <div data-scrollbar="true" data-height="100%">
                                {/*<!-- begin sidebar user -->*/}
                                <ul className="nav">
                                    <li className="nav-profile">
                                        <div className="image">
                                            <a href="##">
                                                {/* <img src="assets/img/user-13.jpg" alt="" /> */}
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            </a>
                                        </div>
                                        <div className="info">
                                            {localStorage.getItem('user')}
                                            <small>Sub Assy</small>
                                        </div>
                                    </li>
                                </ul>
                                {/*<!-- end sidebar user -->*/}
                                {/*<!-- begin sidebar nav -->*/}
                                <ul className="nav">
                                    <li className="nav-header">Sistema</li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/homeFilter">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-rebel"></i>
                                            <span>Home</span>
                                        </a>
                                    </li>
                                    
                                    <li className="has-sub">
                                        <a href="/kanban_system/bomproduct">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-th"></i>
                                            <span>BOM Productos</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/components">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Componentes</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/packageHistory">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Historial Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                            <a href="/kanban_system/subassy">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>Subensambles</span>
                                            </a>
                                    </li>
                                    <li className="has-sub">
                                            <a href="/kanban_system/bomsubassy">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>BOM Subensambles</span>
                                            </a>
                                    </li>
                                    <li className="has-sub">
                                            <a href="/kanban_system/subinventory">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>Subensambles TL</span>
                                            </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/subinventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Subensambles</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/subassyHistory">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Historial Subensambles</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Finish Good</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/historyFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Historial Finish Good</span>
                                        </a>
                                    </li>
                                    {/*<!-- begin sidebar minify button -->*/}
                                    <li><a href="##" className="sidebar-minify-btn" data-click="sidebar-minify"><i className="fa fa-angle-double-left"></i></a></li>
                                    {/*<!-- end sidebar minify button -->*/}
                                </ul>
                                {/*<!-- end sidebar nav -->*/}
                            </div>
                            {/*<!-- end sidebar scrollbar -->*/}
                        </div>
                        <div className="sidebar-bg"></div>
                        {/*<!-- end #sidebar -->*/}                    
                    </div>
                </div>
            );
    }
    return (
        <div>SidebarComp</div>
    )
}

export default SidebarComp