import React, { useEffect, useState } from 'react'
import Product from '../../requests/Product';
import Components from '../../requests/Components';
import Subassy from '../../requests/Subassy';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Switch } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import TableFilter from '../../components/TableFilter';
import Partial from '../../requests/Partial';
import PartialTable from './PartialTable';

const PartialView = () => {

    const [component, setComponent] = React.useState('');
    const [idLine, setIdLine] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [listLine, setListLine] = React.useState([]);
    const [listPartial, setListPartial] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getLists = async () => {
        const data2 = await Partial.getTableData();
        setListPartial(data2);
    }

    useEffect(  () => {
        //getLists();
    }, [listPartial]);

    const cleanAll = () => {
    }
    const setLine = (event) => {
        setIdLine(event);
    }
    const handleList = (event) => {
        console.log(event);
        setListPartial(event);
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
                <li><a href="/home">Home</a></li>
                <li><a href="/home">Page Options</a></li>
                <li className="active">Parciales</li>
                </ol>
                {/* <!-- end breadcrumb -->
                <!-- begin page-header --> */}
                
                <h1 className="page-title"><center>Ver Parciales</center></h1>
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
                                    <h4 className="panel-title">Seleccionar</h4>
                                </div>
                                <div className="panel-body panel-form">
                                    <h4 className='m-l-10'>Selecciona una Linea</h4>
                                    <TableFilter handleList={handleList} setLine={setLine} typeFilter={3}/>
                                    <hr/>
                                    <TableContainer component={Paper} sx={{maxHeight:700}}>
                                        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                            <TableHead 
                                                thstyle={{ fontSize: '35px'}}
                                            >
                                                <TableRow>
                                                    <TableCell><h6><strong>Componente</strong></h6></TableCell>
                                                    <TableCell ><h6><strong>Cantidad</strong></h6></TableCell>
                                                    <TableCell ><h6><strong>Linea</strong></h6></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                listPartial.length>0?
                                                listPartial
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                                .map((row, index) => (                            
                                                    <TableRow key={row.id_partial_component}>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.component}</h6>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.stock}</h6>
                                                        </TableCell>
                                                        <TableCell >
                                                            <h6>{row.name_ln}</h6>
                                                        </TableCell>
                                                    </TableRow>
                                                    )
                                                )
                                                :
                                                (
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="center">
                                                            <p className="no-service-available">
                                                                {
                                                                    listPartial.length>0 && listPartial.length>0?
                                                                    'No se encontraron resultados'
                                                                    :'No hay Parciales registrados'
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
                                            count={listPartial.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            
            </>
        )
    }
}

export default PartialView