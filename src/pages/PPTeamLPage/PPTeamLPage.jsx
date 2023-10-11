import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import ProductionPlan from '../../requests/ProductionPlan';
import Department from '../../requests/Department';
import Area from '../../requests/Area';
import Line from '../../requests/Line';
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
//import Button from '@mui/material/Button';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import TableFilter from '../../components/TableFilter';
import StatusChip from '../../components/StatusChip';

const PPTeamL = () => {
  
  const [plansList, setPlansList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [idProductionPlan, setIdProductionPlan] = useState('');
  const [planP, setPlanP] = useState('');
  const [noPart, setNoPart] = useState('');
  const [status, setStatus] = useState('');
  const [real, setReal] = useState(0);
  const [produced, setProduced] = useState('');
  const [review, setReview] = useState('');
  const [family, setFamily] = useState('');
  const [manpower, setManpower] = useState('');
  const [idLine, setIdLine] = useState(0);
  const [listToExcel, setListToExcel] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };


  useEffect(  () => {
    
  }, []);

  const [showEdit, setShoEdit] = useState(false);

  const handleCloseEdit = () => {
      setShoEdit(false);
      cleanState();
  }
  const handleShowEdit = (row) => {
        setFamily(row.model);
        setNoPart(row.no_part);
        setStatus(row.status);
        setReal(row.real);
        setReview(row.review);
        setIdProductionPlan(row.id_production_plan);
        setPlanP(row.planP);
        setManpower(row.manpower);
        setProduced(row.produced);
        setShoEdit(true);
    }

  const cleanState = () => {
    setFamily('');
    setNoPart('');
    setStatus('');
    setReal('');
    setReview('');
    setIdProductionPlan('');
    setPlanP('');
    setManpower('');
    setProduced('');
  }

  const newName = (row) => {
    let [first, second] = row.split('-');
    return first;
  }
  const newName2 = (row) => {
    let [first, second] = row.split('-');
    return second;
  }

  const onClickSaveDates = async () => {
      if(status){
            const prodPlan = {
                "id_production_plan": idProductionPlan,
                "real": real,
                "status": status,
                "review": review,
                "planP": planP,
                "produced":produced
            }
            if(status === "1"){
                Swal.fire({
                    title: 'Se necesitan '+manpower+' asociados para la producción de este plan',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, producir!',
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        await ProductionPlan.updateProductionPlanTL(prodPlan).then(() => {
                            Swal.fire({
                                title: 'Actualizado',
                                text: 'Se actualizo correctamente',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                                }).then(() => {
                                    setShoEdit(false);
                                    buscarPlan();
                                    cleanState();
                                }
                                );
                            }).catch(() => {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'No se pudo actualizar',
                                    icon: 'error',
                                    confirmButtonText: 'Ok'
                                });
                            }
                            );
                    }
                });
                
            }else{
                await ProductionPlan.updateProductionPlanTL(prodPlan).then(() => {
                    Swal.fire({
                        title: 'Actualizado',
                        text: 'Se actualizo correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                        }).then(() => {
                            setShoEdit(false);
                            buscarPlan();
                            cleanState();
                        }
                        );
                    }).catch(() => {
                        Swal.fire({
                            title: 'Error',
                            text: 'No se pudo actualizar',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                    );
            }
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Datos Faltantes para Actualizar',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
      }
  }

  const buscarPlan = async () => {
    const resp = await ProductionPlan.plansFilter(idLine);
    setPlansList(resp);
  }

  const handleList = (event) => {
    setPlansList(event);
  }

  const setLine = (event) => {
    setIdLine(event);
  }

  const handleReport = (event) => {
    setListToExcel(event);
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
          <li className="active">Plan de Producción</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        <h1 className="page-title"><center>Plan de Producción </center></h1>
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
                        <h4 className="panel-title">Actuales Buscar</h4>
                    </div>
                    <div className="panel-body">
                        <TableFilter handleList={handleList} handleReport={handleReport} setLine={setLine} typeFilter={1}/>
                        <hr/>
                        <TableContainer component={Paper} sx={{maxHeight:1000}}>
                        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                            <TableHead 
                                thstyle={{ fontSize: '35px'}}
                            >
                                <TableRow>
                                    <TableCell><h6><strong>Sec.</strong></h6></TableCell>
                                    <TableCell><h6><strong>Producto</strong></h6></TableCell>
                                    <TableCell><h6><strong>Plan</strong></h6></TableCell>
                                    <TableCell><h6><strong>Hora Registro</strong></h6></TableCell>
                                    <TableCell><h6><strong>Hora Inicio</strong></h6></TableCell>
                                    <TableCell><h6><strong>Fin Estimado</strong></h6></TableCell>
                                    <TableCell><h6><strong>Linea</strong></h6></TableCell>
                                    <TableCell><h6><strong>Modelo</strong></h6></TableCell>
                                    <TableCell><h6><strong>Destino</strong></h6></TableCell>
                                    <TableCell><h6><strong>Estado</strong></h6></TableCell>
                                    <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                plansList.length>0?
                                plansList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                .map((row, index) => (                            
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <h6>{page===0?1+index:page*10+1+index}</h6>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <h6>{newName(row.no_part)}-</h6><h5><strong>{newName2(row.no_part)}</strong></h5>
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
                                            <h6>{row.end_estimated}</h6>
                                        </TableCell>
                                        <TableCell >
                                            <h6>{row.name_ln}</h6>
                                        </TableCell>
                                        <TableCell>
                                            <h6>{row.model}</h6>
                                        </TableCell>
                                        <TableCell >
                                            <h6>{row.destiny}</h6>
                                        </TableCell>
                                        <TableCell>
                                            <StatusChip status={row.status} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <div className="align-center-flex">
                                                <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning">
                                                    <i className="fa fa-pencil"></i>
                                                </Button>
                                            </div>
                                            
                                        </TableCell>
                                    </TableRow>
                                    )
                                )
                                :
                                (
                                    <TableRow>
                                        <TableCell colSpan={11} align="center">
                                            <p className="no-service-available">
                                                {
                                                    plansList.length>0 && plansList.length>0?
                                                    'No se encontraron resultados'
                                                    :'No hay Planes de Producción registrados'
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
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar Plan de Producción
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Plan de Producción</label>
                                <input type="text" className="form-control" value={idProductionPlan} disabled />
                            </div>
                            <div className='form-group'>
                                <label>Producto</label>
                                <input type="text" className="form-control" value={noPart} disabled/>
                            </div>
                            <div className="form-group">
                                <label>Plan</label>
                                <input type="text" className="form-control" value={planP} disabled />
                            </div>
                            <div className="form-group">
                                <label>Familia</label>
                                <input type="text" className="form-control" value={family} disabled />
                            </div>
                            
                            <div className="form-group">
                                <label>Estatus</label>
                                <select className="form-control" value={status} onChange={ (e) => setStatus(e.target.value) }>
                                    <option value="1">Current</option>
                                    <option value="2">On Hold</option>
                                    <option value="5">Delayed</option>
                                    <option value="3">Complete</option>
                                </select>
                            </div>
                            {
                                status === '5' ? 
                                <div className="form-group">
                                    <label>Producidos</label>
                                    <input type="text" className="form-control" value={produced} onChange={ (e) => setProduced(e.target.value) } />
                                </div>
                                : status === '3'?
                                <div className="form-group">
                                    <label>Real</label>
                                    <input type="text" className="form-control" value={real} onChange={ (e) => setReal(e.target.value) } />
                                </div>
                                :
                                null
                            }
                            <div className="form-group">
                                <label>Observaciones</label>
                                <textarea className="form-control" value={review} onChange={ (e) => setReview(e.target.value) }></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onClickSaveDates}>
                        Guardar
                    </Button>
                    <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
    </>
  )
}
}

export default PPTeamL