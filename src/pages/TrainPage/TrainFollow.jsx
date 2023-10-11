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
import TrainPicture from './TrainPicture';


const TrainFollow = () => {
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

    const [showEdit, setShowEdit] = React.useState(false);

    const handleCloseEdit = () => {
        setShowEdit(false);
        cleanAll();
    }
    const handleShowEdit = (row) => {
        setPlan(row.no_part);
        setId_line(row.name_ln);
        setLot(row.current_lot);
        setIdShoppingList(row.id_shopping_list);
        setShowEdit(true);
    }

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
                    <li className="active">Shopping List</li>
                    </ol>
                    {/* <!-- end breadcrumb -->
                    <!-- begin page-header --> */}
                    <h1 className="page-title"><center>Trenes</center></h1>
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
                                                <TableCell align="center"><h6><strong>Estatus</strong></h6></TableCell>
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
                                                    <TableCell align="center">
                                                        <TrainPicture status={row.status}/>
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
                                    <Modal 
                                    show={showEdit} 
                                    onHide={handleCloseEdit} 
                                    
                                    aria-labelledby="contained-modal-title-vcenter" 
                                    centered
                                    animation={false}
                                    size="auto"
                                    >
                                        <Modal.Header  >
                                            <Modal.Title className="bg-gray text-center"><i className='fa fa-edit'></i>   Asignar Shopping List a Tren</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="form-label"> Plan:{' '}</label>
                                                            <input type="text" className="form-control" id="plan" disabled  value={plan} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label"> Lote:{' '}</label>
                                                            <input type="number" className="form-control" id="lot" disabled  value={lot} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label"> Linea:{' '}</label>
                                                            <input type="text" className="form-control" id="line" disabled  value={line} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form-label">Código Tren:</label>
                                                            <input autoFocus type="text" className="form-control" id="trainCode" value={trainCode} onChange={ (e) => setTrainCode(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>
                                                Cerrar
                                            </Button>
                                            <Button variant="primary" >
                                            Guardar Cambios
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
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

export default TrainFollow