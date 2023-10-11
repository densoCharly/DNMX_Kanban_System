import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Modal } from 'react-bootstrap';
import FormHelperText from '@mui/material/FormHelperText';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import LocalComponents from '../../requests/LocalComponents';
import ComponentsList from './ComponentsList';
import { render } from '@testing-library/react';
import { CheckBox } from '@mui/icons-material';

const ShoppingListPage = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [id_shopping_list, setId_shopping_list] = useState(0);
    const [shoppingLists, setShoppingLists] = React.useState([]);
    const [tableList, setTableList] = useState(false);
    const [componentsList, setComponentsList] = useState([]);
    const [viewList, setViewList] = useState(true);
    const [idCloseList, setIdCloseList] = useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        getLists();
    }, [componentsList]);

    const getLists = async () => {
        
        const resp = await LocalComponents.getLists();
        setShoppingLists(resp);
    }

    const getComponents = async (row) => {
        setId_shopping_list(row.id_shopping_list);
        const data = await LocalComponents.getComponentsList(row);
        setTableList(true);
        setViewList(false);
        data.sort((x, y) => x.kind.localeCompare(y.kind))
        setComponentsList(data);
    }

    const closeList = () => {
        LocalComponents.closeList(id_shopping_list, idCloseList).then((res) => {
            if(res.message){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 2500
                })
                getLists();
                setTableList(false);
                setViewList(true);
                cleanState();
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Terminar Lista',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al Terminar Lista',
                showConfirmButton: false,
                timer: 2500
            });
        });;
    }

    const partialClose = (event) => {
        setIdCloseList(event);
    }


    const cleanState = () => {
        setComponentsList('');
        setIdCloseList('');
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
            <li><a href="##">Home</a></li>
            <li><a href="##">Page Options</a></li>
            <li className="active">Shopping List</li>
            </ol>
            {/* <!-- end breadcrumb -->
            <!-- begin page-header --> */}
            <h1 className="page-title"><center>Shopping Lists</center></h1>
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
                                <h4 className="panel-title">Actuales Buscar</h4>
                            </div>
                            <div className="panel-body">
                            
                            <hr/>
                            <div hidden={tableList}>
                            <TableContainer component={Paper} sx={{maxHeight:1000}}>
                            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                <TableHead 
                                    thstyle={{ fontSize: '35px'}}
                                >
                                    <TableRow>
                                        <TableCell><h6><strong>Área</strong></h6></TableCell>
                                        <TableCell><h6><strong>Linea</strong></h6></TableCell>
                                        <TableCell><h6><strong>No. Parte</strong></h6></TableCell>
                                        <TableCell><h6><strong>Lotes</strong></h6></TableCell>
                                        <TableCell><h6><strong>Lote Actual</strong></h6></TableCell>
                                        <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    shoppingLists.length>0?
                                    shoppingLists
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                    .map((row, index) => (                            
                                        <TableRow key={index}>
                                            <TableCell >
                                                <h6>{row.name_area}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.name_ln}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.no_part}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.lots}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.current_lot}</h6>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className="align-center-flex">
                                                    <Button onClick={() => getComponents(row)} variant="contained" className="btn-sm btn-warning" title="Ver Componentes">
                                                        <i className="fa fa-eye"></i>
                                                    </Button>
                                                </div>
                                                
                                            </TableCell>
                                        </TableRow>
                                        )
                                    )
                                    :
                                    (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                <p className="no-service-available">
                                                    {
                                                        shoppingLists.length>0 && shoppingLists.length>0?
                                                        'No se encontraron resultados'
                                                        :'No hay Shopping Lists Activas'
                                                    }
                                                    <br></br>
                                                    <BiGhost color='#252525' size='24px'/>
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                </TableBody>
                            </Table>
                            </TableContainer>            
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={shoppingLists.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            </div>
                            <div hidden={viewList}>
                                <center><h3 ><strong>Componentes a Surtir</strong></h3></center>
                                <hr/>
                                <ComponentsList componentsList={componentsList} partialClose={partialClose} viewList={viewList}/>
                                <hr/>
                                <center><button className='btn btn-bg btn-primary' onClick={closeList}>Terminar</button></center>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                

            {/* <!-- begin scroll to top btn --> */}
            <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
            {/* <!-- end scroll to top btn --> */}
        </div>
        </>
    )
    }
}

export default ShoppingListPage