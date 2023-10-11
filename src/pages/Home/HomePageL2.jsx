import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import ProductionPlan from '../../requests/ProductionPlan';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Button, Modal } from 'react-bootstrap';
//import Button from '@mui/material/Button';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';

const HomePage = () => {
  const [plansList, setPlansList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  

  const getPlanList = async () => {
    const response = await ProductionPlan.getTableDataL2();
    setPlansList(response);
    //console.log(plansList);
  };

  const newName = (row) => {
    let [first, second] = row.split('-');
    return first;
  }
  const newName2 = (row) => {
    let [first, second] = row.split('-');
    return second;
  }

  useEffect(  () => {
    getPlanList();
    
  }, []);


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
        <h1 className="page-title"><center>Plan de Producción Línea 2</center></h1>
        {/* <!-- end page-header --> */}
        
        <div className="row">
			    <div className="col-md-12">
                    <div className="panel panel-inverse">
                        <div className="panel-heading">
                            <div className="panel-heading-btn">
                                <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" onClick={getPlanList} data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                {/* <a href="##" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times"></i></a> */}
                            </div>
                            <h4 className="panel-title"><strong>Actuales Línea 2</strong></h4>
                        </div>
                        <div className="panel-body">
                        <TableContainer component={Paper} sx={{maxHeight:1000}}>
                          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                              <TableHead 
                                thstyle={{ fontSize: '35px'}}
                              >
                                  <TableRow>
                                      <TableCell><h6><strong>Sec.</strong></h6></TableCell>
                                      <TableCell><h6><strong>Producto</strong></h6></TableCell>
                                      <TableCell><h6><strong>Plan</strong></h6></TableCell>
                                      {/* <TableCell><h6><strong>Hora Registro</strong></h6></TableCell> */}
                                      <TableCell><h6><strong>Producidos</strong></h6></TableCell>
                                      <TableCell><h6><strong>Diferencia</strong></h6></TableCell>
                                      <TableCell><h6><strong>Hora Inicio</strong></h6></TableCell>
                                      <TableCell><h6><strong>Fin Estimado</strong></h6></TableCell>
                                      {/* <TableCell><h6><strong>Linea</strong></h6></TableCell> */}
                                      <TableCell><h6><strong>Modelo</strong></h6></TableCell>
                                      <TableCell><h6><strong>Destino</strong></h6></TableCell>
                                      <TableCell><h6><strong>Empaque</strong></h6></TableCell>
                                      <TableCell><h6><strong>Instrucciones</strong></h6></TableCell>
                                      <TableCell><h6><strong>Estado</strong></h6></TableCell>
                                      {/* <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell> */}
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
                                          {/* <TableCell >
                                            <h6>{row.created_at}</h6>
                                          </TableCell> */}
                                          <TableCell >
                                            <h6>{row.produced}</h6>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.produced? (row.planP-row.produced) : null}</h6>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.start_time}</h6>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.end_estimated}</h6>
                                          </TableCell>
                                          {/* <TableCell >
                                            <h6>{row.name_ln}</h6>
                                          </TableCell> */}
                                          <TableCell>
                                            <h6>{row.model}</h6>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.destiny}</h6>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.package}</h6>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.instructions}</h6>
                                          </TableCell>
                                          {
                                              row.status==='1'?
                                              <TableCell >
                                                  <Chip label="Current" color="success" />
                                              </TableCell>
                                              : row.status==='2'?
                                              <TableCell >
                                                  <Chip label="On Hold" color="warning" />
                                              </TableCell>
                                              : 
                                              <TableCell >
                                                  <Chip label="Delayed" color="error" />
                                              </TableCell>

                                          }                                          
                                          {/* <TableCell align="center">
                                              <div className="align-center-flex">
                                                  <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning">
                                                      <i className="fa fa-pencil"></i>
                                                  </Button>
                                              </div>
                                              
                                          </TableCell> */}
                                      </TableRow>
                                      )
                                  )
                                  :
                                  (
                                      <TableRow>
                                          <TableCell colSpan={4} align="center">
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
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
    </>
    )
  }
}

export default HomePage