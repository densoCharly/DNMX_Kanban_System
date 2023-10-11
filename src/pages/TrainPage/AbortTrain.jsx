import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Button, Modal } from 'react-bootstrap';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import Train from '../../requests/Train';
import './train.css';


const AbortTrain = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [trainList, setTrainList] = React.useState([]);
    const [componentsList, setComponentsList] = useState([]);
    const [plan, setPlan] = useState('');
    const [line, setId_line] = useState("");
    const [lot, setLot] = useState('');
    const [trainCode, setTrainCode] = useState('');
    const [idShoppingList, setIdShoppingList] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getLists = async () => {
        const resp = await Train.followTrains();
        setTrainList(resp);
    }

    const setLine = (event) => {
        setId_line(event);
    }

    useEffect(() => {
        getLists();
    }, [componentsList]);

    const abortLot = (row) => {
        Swal.fire({
                title: 'Estas a punto de Abortar un Viaje de Material',
                text: "No podras revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Abortar!'
            }).then((result) => {
                if (result.value) {
                    Train.abortTrip(row).then(res => {
                        if(res.id_updated){
                            Swal.fire({
                                icon: 'success',
                                title: 'Viaje Abortado',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            getLists();
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

    const cleanAll = () => {

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
                    <li className="active">Abortar Viajes</li>
                    </ol>
                    {/* <!-- end breadcrumb -->
                    <!-- begin page-header --> */}
                    <h1 className="page-title"><center>Abortar Viaje</center></h1>
                    {/* <!-- end page-header --> */}
                    <div className='row'>
                        
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
                                    
                                    <hr/>
                                    <div>
                                    <TableContainer component={Paper} sx={{maxHeight:1000}}>
                                    <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                        <TableHead 
                                            thstyle={{ fontSize: '35px'}}
                                        >
                                            <TableRow>
                                                <TableCell><h6><strong>Código Tren</strong></h6></TableCell>
                                                <TableCell><h6><strong>Linea</strong></h6></TableCell>
                                                <TableCell><h6><strong>No. Part</strong></h6></TableCell>
                                                <TableCell align="center"><h6><strong>Viaje</strong></h6></TableCell>
                                                <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {
                                            trainList.length>0?
                                            trainList
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                            .map((row, index) => (                            
                                                <TableRow key={index}>
                                                    <TableCell >
                                                        <h6>{row.code}</h6>
                                                    </TableCell>
                                                    <TableCell >
                                                        <h6>{row.name_ln}</h6>
                                                    </TableCell>
                                                    <TableCell >
                                                        <h6>{row.no_part}</h6>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <h6>{row.lot}</h6>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button  variant="danger" onClick={() => abortLot(row)} className="btn-sm btn-danger m-r-2" title="Abortar">
                                                            <i className="fa fa-warning"></i>
                                                        </Button>
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
                                                                trainList.length>0 && trainList.length>0?
                                                                'No se encontraron resultados'
                                                                :'No hay Trenes Activos'
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
                                            count={trainList.length}
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
                    {/* <!-- begin scroll to top btn --> */}
                    <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
                    {/* <!-- end scroll to top btn --> */}
                </div>
            </>
        )
    }
}

export default AbortTrain