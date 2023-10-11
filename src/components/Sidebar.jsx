import React from 'react'
import User from '../requests/User';
import config from '../requests/config';
import zIndex from '@mui/material/styles/zIndex';

let urlImage = config.imageURL();

const Sidebar = () => {
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

    switch (role) {
        case '1':
            
            return(
            <div >
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
                                        <small>Developer</small>
                                    </div>
                                </li>
                            </ul>
                            {/*<!-- end sidebar user -->*/}
                            {/*<!-- begin sidebar nav -->*/}
                            <ul className="nav">
                                <li className="nav-header">Adiministración Base</li>
                                <li className="has-sub">
                                    <a href="/kanban_system/plants">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-laptop"></i>
                                        <span>Plantas</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/departments">
                                        {/* <span className="badge pull-right">10</span> */}
                                        <i className="fa fa-inbox"></i> 
                                        <span>Departamentos</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/areas">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cog"></i>
                                        <span>Areas </span> 
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/lines">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cog"></i>
                                        <span>Lineas</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/type_subassy">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cog"></i>
                                        <span>Tipos Subensamble</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/type_product">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cog"></i>
                                        <span>Tipos de Producto</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/client">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cog"></i>
                                        <span>Clientes</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/provider">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cog"></i>
                                        <span>Proveedores Empaque</span>
                                    </a>
                                </li>
                                <li className="nav-header">Sistema</li>
                                <li className="has-sub">
                                    <a href="/kanban_system/homeFilter">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-rebel"></i>
                                        <span>Home</span>
                                    </a>
                                </li>
                                {/* <li className="has-sub">
                                    <a href="/kanban_system/home">
                                        <i className="fa fa-rebel"></i>
                                        <span>Home L1</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/homeL2">
                                        <i className="fa fa-rebel"></i>
                                        <span>Home L2</span>
                                    </a>
                                </li> */}
                                <li className="has-sub">
                                    <a href="/kanban_system/productionPlan">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Plan de Producción</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/reportProductionPlan">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Reporte de Plan de Producción</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/productionPlanTL">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Plan de Producción TL</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/products">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-th"></i>
                                        <span>Productos</span>
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
                                    <a href="/kanban_system/package">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cubes"></i>
                                        <span>Empaque</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/stockPackage">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cubes"></i>
                                        <span>Recepción Empaque</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/inventoryPackage">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-cubes"></i>
                                        <span>Inventario Empaque</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                        <a href="/kanban_system/inventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Empaque PC</span>
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
                                        <a href="/kanban_system/finishGood">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good Crg</span>
                                        </a>
                                </li>
                                <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
                                        </a>
                                </li>
                                <li className="has-sub">
                                        <a href="/kanban_system/historyFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Historial FG</span>
                                        </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/users">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-users"></i>
                                        <span>Usuarios</span>
                                    </a>
                                </li>
                                {/*<!-- begin sidebar minify button -->*/}
                                <li><a href="##" className="sidebar-minify-btn" onClick={hideSideBar}><i className="fa fa-angle-double-left"></i></a></li>
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
        
        {/** --------------------- Materialista PR -------------------*/}
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
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
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
                                            <small>Materialista PR</small>
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
                                        <a href="/kanban_system/productionPlanTL">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Plan de Producción TL</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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
        
        {/** --------------------- Team Leader PR -------------------*/}
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
                                            {
                                                localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                            }
                                        {/* <img src="assets/img/user-13.jpg" alt="" />  */}
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
                                        <small>Team Leader F.A. PR</small>
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
                                    <a href="/kanban_system/productionPlanTL">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Plan de Producción TL</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                        <a href="/kanban_system/subinventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Subensambles</span>
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
                                            <span>Finish Good</span>
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
        

        {/** --------------------- Supervisor PR -------------------*/}
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
                                        <small>Supervisor PR</small>
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
                                    <a href="/kanban_system/reportProductionPlan">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Reporte de Plan de Producción</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                        <a href="/kanban_system/subinventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Subensambles</span>
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
                                            <span>Finish Good</span>
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
        
        {/** --------------------- Ass. Manager PR -------------------*/}
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
                                            <small>Ass. Manager PR</small>
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
                                        <a href="/kanban_system/reportProductionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Reporte de Plan de Producción</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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
        
        {/** --------------------- Gerente PR -------------------*/}
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
                                            <small>Gerente PR</small>
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
                                        <a href="/kanban_system/reportProductionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Reporte de Plan de Producción</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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
                
        {/** --------------------- Especialista PC -------------------*/}
        case '8':
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
                                        <small>Especialista PC</small>
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
                                    <a href="/kanban_system/productionPlan">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Plan de Producción</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                        <a href="/kanban_system/reportProductionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Reporte de Plan de Producción</span>
                                        </a>
                                    </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/products">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-th"></i>
                                        <span>Productos</span>
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
                                        <a href="/kanban_system/package">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
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
                                            <span>Finish Good</span>
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
            
        {/** --------------------- Supervisor PC -------------------*/}
        case '9':
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
                                        <small>Supervisor PC</small>
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
                                    <a href="/kanban_system/productionPlan">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Plan de Producción</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/reportProductionPlan">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-file-o"></i>
                                        <span>Reporte de Plan de Producción</span>
                                    </a>
                                </li>
                                <li className="has-sub">
                                    <a href="/kanban_system/products">
                                        {/* <b className="caret pull-right"></b> */}
                                        <i className="fa fa-th"></i>
                                        <span>Productos</span>
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
                                        <a href="/kanban_system/package">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
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
                                        <a href="/kanban_system/subinventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Subensambles</span>
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
                                        <span>Finish Good</span>
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
        
        {/** --------------------- Ass. Manager PC -------------------*/}
        case '10':
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
                                            <small>Ass. Manager PC</small>
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
                                        <a href="/kanban_system/productionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Plan de Producción</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/reportProductionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Reporte de Plan de Producción</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/products">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-th"></i>
                                            <span>Productos</span>
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
                                            <a href="/kanban_system/package">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>Empaque</span>
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
                                            <span>Finish Good</span>
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
            
        {/** --------------------- Gerente PC -------------------*/}
        case '11':
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
                                            <small>Gerente PC</small>
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
                                        <a href="/kanban_system/productionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Plan de Producción</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/reportProductionPlan">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-file-o"></i>
                                            <span>Reporte de Plan de Producción</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/homeL2">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-th"></i>
                                            <span>Productos</span>
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
                                            <a href="/kanban_system/package">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>Empaque</span>
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
                                            <span>Finish Good</span>
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

        {/** --------------------- Materialista LOG C -------------------*/}
        case '12':
            break;
            
        {/** --------------------- Team Leader LOG C -------------------*/}
        case '13':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Team Leader LOG C</small>
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
                                        <a href="/kanban_system/components">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Componentes</span>
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
        
        case '14':
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
                                    <img src="logo250.png" alt="" width="145px" />
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
                                            <small>Especialista PC Empaque</small>
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
                                            <a href="/kanban_system/package">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>Empaque</span>
                                            </a>
                                        </li>
                                        {/* <li className="has-sub">
                                            <a href="/stockPackage">
                                                {/* <b className="caret pull-right"></b>  
                                                <i className="fa fa-cubes"></i>
                                                <span>Recepción Empaque</span>
                                            </a>
                                        </li> */}
                                        <li className="has-sub">
                                            <a href="/kanban_system/inventoryPC">
                                                {/* <b className="caret pull-right"></b> */}
                                                <i className="fa fa-cubes"></i>
                                                <span>Inventario Empaque</span>
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
                                                <span>Finish Good</span>
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
        
        
        case '15':
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
                                            <small>Especialista PC Componentes</small>
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
                                        <a href="/kanban_system/products">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-th"></i>
                                            <span>Productos</span>
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
                                                <span>Finish Good</span>
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

        {/** --------------------- Supervisor LOG C -------------------*/}
        case '16':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Supervisor LOG C</small>
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
                                        <a href="/kanban_system/components">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Componentes</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/subinventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Subensambles</span>
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
                                            <span>Finish Good</span>
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
        
        {/** --------------------- Ass. Manager LOG C -------------------*/}
        case '17':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Ass. Manager LOG C</small>
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
                                        <a href="/kanban_system/components">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Componentes</span>
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
                                            <span>Finish Good</span>
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
        
        {/** --------------------- Gerente LOG C -------------------*/}
        case '18':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Gerente LOG C</small>
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
                                        <a href="/kanban_system/components">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Componentes</span>
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
                                            <span>Finish Good</span>
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
        {/** --------------------- Materialista LOG E -------------------*/}
        case '19':
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
                                            <small>Materialista LOG E</small>
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
                                        <a href="/kanban_system/inventoryPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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

        {/** --------------------- Team Leader LOG E -------------------*/}
        case '20':
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
                                            <small>Team Leader LOG E</small>
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
                                        <a href="/kanban_system/package">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/stockPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Recepción Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Empaque</span>
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
                                        <a href="/kanban_system/finishGood">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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

        {/** --------------------- Supervisor LOG E -------------------*/}
        case '21':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Supervisor LOG E</small>
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
                                        <a href="/kanban_system/package">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/stockPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Recepción Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/subinventoryPC">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Subensambles</span>
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
                                            <span>Finish Good</span>
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

        {/** --------------------- Ass. Manager LOG E -------------------*/}
        case '22':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Ass. Manager LOG E</small>
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
                                        <a href="/kanban_system/package">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/stockPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Recepción Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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

        {/** --------------------- Gerente LOG E -------------------*/}
        case '23':
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
                                            <li><a href="editProfile">Edit Profile</a></li>
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
                                            <small>Gerente LOG E</small>
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
                                        <a href="/kanban_system/package">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/stockPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Recepción Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryPackage">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Inventario Empaque</span>
                                        </a>
                                    </li>
                                    <li className="has-sub">
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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

        {/** --------------------- Especialista TIE -------------------*/}
        case '24':
            break;

        {/** --------------------- Supervisor TIE -------------------*/}
        case '25':
            break;
        
        {/** --------------------- Ass. Manager TIE -------------------*/}
        case '26':
            break;
        
        {/** --------------------- Gerente TIE -------------------*/}
        case '27':
            break;

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
                                                {
                                                    localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                }
                                            {/* <img src="assets/img/user-13.jpg" alt="" />  */}
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
                                            <small>Team Leader S.A. PR</small>
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
                                        <a href="/kanban_system/subassy">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Subensambles</span>
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
                                        <a href="/kanban_system/inventoryFG">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-cubes"></i>
                                            <span>Finish Good</span>
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
        
        case '29':
            break;

        default:

            break;
    }
    
    }

export default Sidebar
