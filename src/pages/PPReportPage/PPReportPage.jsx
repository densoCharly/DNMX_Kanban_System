import React, { useState, useEffect } from 'react';
import ProductionPlan from '../../requests/ProductionPlan';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Button, Modal } from 'react-bootstrap';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import ExportToExcel from '../../components/ExportToExcel';
import StatusChip from '../../components/StatusChip';

const PPReport = () => {
    const [plansList, setPlansList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [idPp, setIdPp] = useState(0);
    const [noPart, setNoPart] = useState("");
    const [planP, setPlanP] = useState(0);
    const [packing, setPacking] = useState("");
    const [line, setLine] = useState("");
    const [model, setModel] = useState("");
    const [real, setReal] = useState(0);
    const [destiny, setDestiny] = useState("");
    const [review, setReview] = useState("");
    const [createdBy, setCreated_by] = useState("");
    const [updatedBy, setUpdated_by] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [excelTable, setExcelTable] = useState([]);

    var headersTable = [["No.", "No Part", "Plan", "Real", "Status", "Package", "Destiny", "Review", "Instructions", "Area", "Line", "Model", "Created By", "Ended By"]];


    const cleanStates = () => {
        setIdPp(0);
        setNoPart("");
        setPlanP(0);
        setPacking("");
        setLine("");
        setModel("");
        setReal(0);
        setDestiny("");
        setReview("");
        setCreated_by("");
        setUpdated_by("");
        setCreatedAt("");
        setStartTime("");
        setEndTime("");
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getPlanList = async () => {
        setPlansList([]);
        const response = await ProductionPlan.getTableReport();
        setPlansList(response);
        const resp = await ProductionPlan.getTableExcel();
        setExcelTable(resp);
    };


    useEffect(  () => {
        getPlanList();
    }, []);

    const [showEdit, setShoEdit] = useState(false);

    const reactivarPlan = async () => {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡El Plan Volverá a estar disponible para Producirse!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, deseo reactivarlo!'
        }).then((result) => {
            if (result.value) {
                ProductionPlan.reactivatePlan(idPp).then(res => {
                    if (res.id_updated) {
                        getPlanList();
                        Swal.fire({
                            title: '¡Plan Reactivado!',
                            icon: 'success',
                        });
                        
                        handleCloseEdit();
                    }else{
                        Swal.fire({
                            title: '¡Error!',
                            text: 'No se pudo Reactivar el Plan.',
                            icon: 'error',
                        });
                    }
                })
            }
        })
    }

    const handleCloseEdit = () => {
        setShoEdit(false);
        cleanStates();
    }

    const handleShowEdit = (row) => {
    setPlanP(row.planP);
    setIdPp(row.id_production_plan);
    setNoPart(row.no_part);
    setPacking(row.package);
    setLine(row.name_ln);
    setModel(row.model);
    setReal(row.real);
    setDestiny(row.destiny);
    setReview(row.review);
    setCreated_by(row.name + " " + row.f_surname + " " + row.m_surname);
    setUpdated_by(row.name2 + " " + row.f_surname2 + " " + row.m_surname2);
    setCreatedAt(row.created_at);
    setStartTime(row.start_time);
    setEndTime(row.end_time);
    setShoEdit(true);
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
          <li className="active">Reporte de Plan de Producción</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        <h1 className="page-title"><center>Reporte de Plan de Producción </center></h1>
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
                            <h4 className="panel-title">Reporte</h4>
                        </div>
                        <div className="panel-body">
                            <div style={{float:'right'}}>
                                <ExportToExcel apiData={excelTable} fileName={"PlanReport"} headers={headersTable}
                                />
                                <br/>
                            </div>
                        <TableContainer component={Paper} sx={{maxHeight:900}}>
                            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                <TableHead 
                                    thstyle={{ fontSize: '35px'}}
                                >
                                    <TableRow>
                                        <TableCell><h6><strong>#</strong></h6></TableCell>
                                        <TableCell><h6><strong>Producto</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Plan</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Hora Registro</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Hora Inicio</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Hora Fin</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Linea</strong></h6></TableCell>
                                        <TableCell><h6><strong>Real</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Estado</strong></h6></TableCell>
                                        <TableCell ><h6><strong>Acciones</strong></h6></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    plansList.length>0?
                                    plansList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                    .map((row, id_production_plan) => (                            
                                        <TableRow key={id_production_plan}>
                                            <TableCell component="th" scope="row">
                                                <h6>{row.id_production_plan}</h6>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <h6>{row.no_part}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.planP}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.created_at}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.start_time}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.end_time}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.name_ln}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <h6>{row.real}</h6>
                                            </TableCell>
                                            <TableCell >
                                                <StatusChip status={row.status}/>
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="align-left-flex">
                                                    <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-primary" title="Ver">
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
                                            <TableCell colSpan={8} align="center">
                                                <p className="no-service-available">
                                                    {
                                                        plansList.length>0 && plansList.length>0?
                                                        'No se encontraron resultados'
                                                        :'No hay Planes de Producción registrados'
                                                    }
                                                    <br></br>
                                                    <BiGhost color='#252525' size='34px'/>
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>            
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                component="div"
                                count={plansList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </div>
			    </div>
			</div>
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
      <div>
          <Modal 
            show={showEdit} 
            onHide={handleCloseEdit} 
            size="auto"  
            style={{opacity:1}}  
            animation={false}
            aria-labelledby="contained-modal-title-vcenter" 
            centered 
            className='m-t-35'
        > 
                <Modal.Header>
                    <Modal.Title>
                        <center>
                            <h4>
                                <i className="fa fa-edit"></i>
                                Detalles Plan de Producción
                            </h4>
                        </center>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>No. Plan</label>
                                <input type="text" className="form-control" value={idPp} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Producto</label>
                                <input type="text" className="form-control" value={noPart} disabled/>
                            </div>
                            <div className='form-group'>
                                <label>Familia</label>
                                <input type="text" className="form-control" value={model} disabled />
                            </div>
                            <div className="form-group">
                                <label>Plan</label>
                                <input type="text" className="form-control" value={planP} disabled/>
                            </div>
                            <div className='form-group'>
                                <label>Empaque</label>
                                <input type="text" className="form-control" value={packing} disabled/>
                            </div>
                            <div className='form-group'>
                                <label>Linea</label>
                                <input type="text" className="form-control" value={line} disabled/>
                            </div>
                            <div className='form-group'>
                                <label>Real</label>
                                <input type="text" className="form-control" value={real} disabled/>
                            </div>
                    </div>
                    <div className="col-md-6">
                            <div className='form-group'>
                                <label>Destino</label>
                                <input type="text" className="form-control" value={destiny} disabled/>
                            </div>
                            <div className='form-group'>
                                <label>Registrado Por</label>
                                <input type="text" className="form-control" value={createdBy} disabled/>
                            </div>
                            <div className='form-group'>
                                <label>Terminado Por</label>
                                <input type="text" className="form-control" value={updatedBy} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Fecha Registro</label>
                                <input type="text" className="form-control" value={createdAt} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Fecha Inicio</label>
                                <input type="text" className="form-control" value={startTime} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Fecha Fin</label>
                                <input type="text" className="form-control" value={endTime} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Comentario</label>
                                <textarea type="text" className='form-control' value={review} disabled />
                            </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="btn btn-warning" onClick={reactivarPlan}>
                        Reactivar
                    </Button>
                </Modal.Footer>
          </Modal>
      </div>
    </>
  )
}
}

export default PPReport