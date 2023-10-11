import React, { useRef, useState } from 'react'
import User from '../requests/User';
import config from '../requests/config';
import { viewerRoutes, materialistRoutes, finalAssyRoutes, plannerRoutes, shippingRoutes } from '../routes';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import { finishRoutes, developRoutes, packageRoutes, planRoutes, productRoutes, shoppingRoutes, subassyRoutes } from './Data';

let urlImage = config.imageURL();


const SidebarComp = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);

    const [open2, setOpen2] = React.useState(false);
    const anchorRef2 = React.useRef(null);
    const handleToggle2 = () => {
        setOpen2((prevOpen2) => !prevOpen2);
    };

    const handleClose2 = (event) => {
        if (anchorRef2.current && anchorRef2.current.contains(event.target)) {
        return;
        }

        setOpen2(false);
    };

    function handleListKeyDown2(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen2(false);
        } else if (event.key === 'Escape') {
        setOpen2(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen2 = React.useRef(open2);

    //////////////////////
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
    ////////////////////////////////////////////////
    const [open3, setOpen3] = React.useState(false);
    const anchorRef3 = React.useRef(null);
    const handleToggle3 = () => {
        setOpen3((prevOpen3) => !prevOpen3);
    };

    const handleClose3 = (event) => {
        if (anchorRef3.current && anchorRef3.current.contains(event.target)) {
        return;
        }

        setOpen3(false);
    };

    function handleListKeyDown3(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen3(false);
        } else if (event.key === 'Escape') {
        setOpen3(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen3 = useRef(open3);
    
    ///////////////////////////
    const [open4, setOpen4] = React.useState(false);
    const anchorRef4 = React.useRef(null);
    const handleToggle4 = () => {
        setOpen4((prevOpen4) => !prevOpen4);
    };

    const handleClose4 = (event) => {
        if (anchorRef4.current && anchorRef4.current.contains(event.target)) {
        return;
        }

        setOpen4(false);
    };

    function handleListKeyDown4(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen4(false);
        } else if (event.key === 'Escape') {
        setOpen4(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen4 = React.useRef(open4);

    ////////////////////////////////////////////////
    const [open5, setOpen5] = React.useState(false);
    const anchorRef5 = React.useRef(null);
    const handleToggle5 = () => {
        setOpen5((prevOpen5) => !prevOpen5);
    };

    const handleClose5 = (event) => {
        if (anchorRef5.current && anchorRef5.current.contains(event.target)) {
        return;
        }

        setOpen5(false);
    };

    function handleListKeyDown5(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen5(false);
        } else if (event.key === 'Escape') {
        setOpen5(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen5 = React.useRef(open5);

    //////////////////////Shopping List//////////////////////////
    const [open6, setOpen6] = React.useState(false);
    const anchorRef6 = React.useRef(null);
    const handleToggle6 = () => {
        setOpen6((prevOpen6) => !prevOpen6);
    };

    const handleClose6 = (event) => {
        if (anchorRef6.current && anchorRef6.current.contains(event.target)) {
        return;
        }

        setOpen6(false);
    };

    function handleListKeyDown6(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen6(false);
        } else if (event.key === 'Escape') {
            setOpen6(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen6 = React.useRef(open6);

    //////////////////////BASE//////////////////////////
    const [open1, setOpen1] = React.useState(false);
    const anchorRef1 = React.useRef(null);
    const handleToggle1 = () => {
        setOpen1((prevOpen1) => !prevOpen1);
    };

    const handleClose1 = (event) => {
        if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
        return;
        }

        setOpen1(false);
    };

    function handleListKeyDown1(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen1(false);
        } else if (event.key === 'Escape') {
            setOpen1(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen1 = React.useRef(open1);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;

        if (prevOpen2.current === true && open2 === false) {
            anchorRef2.current.focus();
        }
        prevOpen2.current = open2;

        if (prevOpen3.current === true && open3 === false) {
        anchorRef3.current.focus();
        }
        prevOpen3.current = open3;

        if (prevOpen4.current === true && open4 === false) {
            anchorRef4.current.focus();
        }
        prevOpen4.current = open4;

        if (prevOpen5.current === true && open5 === false) {
            anchorRef5.current.focus();
        }
        prevOpen5.current = open5;

        if (prevOpen6.current === true && open6 === false) {
            anchorRef6.current.focus();
        }
        prevOpen6.current = open6;

        if (prevOpen1.current === true && open6 === false) {
            anchorRef1.current.focus();
        }
        prevOpen1.current = open1;

    }, [open, open1, open2, open3, open4, open5, open6]);
    

    // return focus to the button when we transitioned from !open -> open
    


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
                        <div id="sidebar" className="sidebar" style={{position: 'fixed'}}>
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
                                    <br/>
                                    <div>
                                        <Button
                                            ref={anchorRef1}
                                            id="composition-button"
                                            aria-controls={open1 ? 'composition-menu' : undefined}
                                            aria-expanded={open1 ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle1}
                                            disabled={open?true:false || open2?true:false || open3?true:false || open4?true:false || open5?true:false || open6?true:false}
                                            sx={{color:"white"}}
                                        >
                                            Administracion Base
                                        </Button>
                                        <Popper
                                        open={open1}
                                        anchorEl={anchorRef1.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose1}>
                                                <MenuList
                                                    autoFocusItem={open1}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    aria-controls='lock-menu'
                                                    onKeyDown={handleListKeyDown1}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        developRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem >
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                    </div>
                                    <div>
                                        <br/>
                                        <li className="nav-header m-l-10">
                                            Sistema
                                        </li>
                                        <br/>
                                        <Button
                                            ref={anchorRef}
                                            id="composition-button"
                                            aria-controls={open ? 'composition-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle}
                                            sx={{color:"white"}}
                                            disabled={open1?true:false || open2?true:false || open3?true:false || open4?true:false || open5?true:false || open6?true:false}
                                            >
                                        Plan de Producción
                                        </Button>
                                        <Popper
                                            open={open}
                                            anchorEl={anchorRef.current}
                                            role={undefined}
                                            placement="bottom-start"
                                            transition
                                            disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        planRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem href={path}>
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                        <br></br>
                                        {/* ---------------- Productos ----------------- */}
                                        <Button
                                            ref={anchorRef3}
                                            id="composition-button"
                                            aria-controls={open3 ? 'composition-menu' : undefined}
                                            aria-expanded={open3 ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle3}
                                            sx={{color:"white"}}
                                            disabled={open1?true:false || open2?true:false || open?true:false || open4?true:false || open5?true:false || open6?true:false}
                                            >
                                        Productos
                                        </Button>
                                        <Popper
                                            open={open3}
                                            anchorEl={anchorRef3.current}
                                            role={undefined}
                                            placement="bottom-start"
                                            transition
                                            disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose3}>
                                                <MenuList
                                                    autoFocusItem={open3}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown3}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        productRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem href={path}>
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                        <br></br>
                                        {/* ---------------- Package ----------------- */}
                                        <Button
                                            ref={anchorRef4}
                                            id="composition-button"
                                            aria-controls={open4 ? 'composition-menu' : undefined}
                                            aria-expanded={open4 ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle4}
                                            sx={{color:"white"}}
                                            disabled={open1?true:false || open2?true:false || open3?true:false || open?true:false || open5?true:false || open6?true:false}
                                            >
                                        Empaque
                                        </Button>
                                        <Popper
                                            open={open4}
                                            anchorEl={anchorRef4.current}
                                            role={undefined}
                                            placement="bottom-start"
                                            transition
                                            disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose4}>
                                                <MenuList
                                                    autoFocusItem={open4}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown4}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        packageRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem href={path}>
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                        <br></br>
                                        {/* ---------------- Subassy ----------------- */}
                                        <Button
                                            ref={anchorRef5}
                                            id="composition-button"
                                            aria-controls={open5 ? 'composition-menu' : undefined}
                                            aria-expanded={open5 ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle5}
                                            sx={{color:"white"}}
                                            disabled={open1?true:false || open2?true:false || open3?true:false || open4?true:false || open?true:false || open6?true:false}
                                            >
                                        Subensambles
                                        </Button>
                                        <Popper
                                            open={open5}
                                            anchorEl={anchorRef5.current}
                                            role={undefined}
                                            placement="bottom-start"
                                            transition
                                            disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose5}>
                                                <MenuList
                                                    autoFocusItem={open5}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown5}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        subassyRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem href={path}>
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                        <br></br>
                                        {/* ---------------- Finish Good ----------------- */}
                                        <Button
                                            ref={anchorRef2}
                                            id="composition-button"
                                            aria-controls={open2 ? 'composition-menu' : undefined}
                                            aria-expanded={open2 ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle2}
                                            sx={{color:"white"}}
                                            disabled={open1?true:false || open?true:false || open3?true:false || open4?true:false || open5?true:false || open6?true:false}
                                            >
                                            Finish Good
                                        </Button>
                                        <Popper
                                            open={open2}
                                            anchorEl={anchorRef2.current}
                                            role={undefined}
                                            placement="bottom-start"
                                            transition
                                            disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose2}>
                                                <MenuList
                                                    autoFocusItem={open2}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown2}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        finishRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem href={path}>
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                        <br></br>
                                        {/* ---------------- Shopping List ----------------- */}
                                        <Button
                                            ref={anchorRef6}
                                            id="composition-button"
                                            aria-controls={open6 ? 'composition-menu' : undefined}
                                            aria-expanded={open6 ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle6}
                                            sx={{color:"white"}}
                                            disabled={open1?true:false || open2?true:false || open3?true:false || open4?true:false || open5?true:false || open?true:false}
                                            >
                                        Shopping List
                                        </Button>
                                        <Popper
                                            open={open6}
                                            anchorEl={anchorRef6.current}
                                            role={undefined}
                                            placement="bottom-start"
                                            transition
                                            disablePortal
                                        >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose6}>
                                                <MenuList
                                                    autoFocusItem={open6}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown6}
                                                    sx={{background:'#2a353c'}}
                                                >
                                                    <MenuItem sx={{color:'white'}}>
                                                        Seleccione
                                                    </MenuItem>
                                                    {
                                                        shoppingRoutes.map(({index, name, icon, path}) => {
                                                            return(
                                                                <MenuItem href={path}>
                                                                    <ListItemIcon>
                                                                        {icon}
                                                                    </ListItemIcon>
                                                                    <a href={path} style={{color:'white'}}>{name}</a>
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>
                                    </div>
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
                        <div id="sidebar" className="sidebar" style={{position:'fixed'}}>
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
                                    
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="dropdown navbar-user">
                                                <a href="##" className="dropdown-toggle" data-toggle="dropdown">
                                                    {
                                                        localStorage.getItem('foto_user') ? <img src={urlImage+"/"+localStorage.getItem('foto_user')} alt="" /> : <img src="assets/img/user-13.jpg" alt="" />
                                                    }
                                                    <span className="hidden-xs">{localStorage.getItem('user')}</span> <b className="caret"></b>
                                                </a>
                                                <ul className="dropdown-menu animated fadeInLeft">
                                                    <li className="arrow"></li>
                                                    <li><a href="/kanban_system/homeFilter">Home</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="/kanban_system/shoppingRoute">Materialista Ruta</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="/kanban_system/shoppingLists">Materialista Logistica</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="/kanban_system/lineRoute">Materialista Linea</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="/kanban_system/editProfile">Edit Profile</a></li>
                                                    <li className="divider"></li>
                                                    <li><a href="##" onClick={Logout}>Log Out</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
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
                                        <a href="/kanban_system/subassyTicket">
                                            {/* <b className="caret pull-right"></b> */}
                                            <i className="fa fa-print"></i>
                                            <span>Ticket Subensambles</span>
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