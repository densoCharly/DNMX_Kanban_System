import React, { useContext } from 'react'
import User from '../requests/User'

const Navbar = () => {
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
    if(localStorage.getItem('token')){
        return (
            <div>
                
                {/*<!-- begin #header -->*/}
                <div id="header" className="header navbar navbar-default navbar-fixed-top">
                    {/*<!-- begin container-fluid -->*/}
                    <div className="container-fluid">
                        {/*<!-- begin mobile sidebar expand / collapse button -->*/}
                        <div className="navbar-header">
                            {/* <a href="index.html" className="navbar-brand"><span className="navbar-logo"></span> Color Admin</a> */}
                            <img src="logo192.png" alt="" width="145px" />
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
                                    <img src="assets/img/user-13.jpg" alt="" /> 
                                    <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                </a>
                                <ul className="dropdown-menu animated fadeInLeft">
                                    <li className="arrow"></li>
                                    <li><a href="##">Edit Profile</a></li>
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
        )
    }else{

    }
}

export default Navbar
