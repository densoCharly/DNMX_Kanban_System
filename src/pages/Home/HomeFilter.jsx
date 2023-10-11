import React, { useEffect, useState } from 'react'
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
import FormHelperText from '@mui/material/FormHelperText';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { connectSocket, disconnectSocket } from '../../reducers/SocketState';
import { store } from '../../store';
import StatusChip from '../../components/StatusChip';


// const socket = io('http://localhost:3015',{
//         query:{"loggeduser": localStorage.getItem('id_user')},
//         path: "/kanban/socket/production",
//         resource: '/kanban/socket/production',
//       });


const HomeFilter = () => {
  const [plansList, setPlansList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [counter, setCounter] = useState(0);
  const [idArea, setIdArea] = useState(0);
  const [idDepartment, setIdDepartment] = useState(0);
  const [areaList, setAreaList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [listDpt, setListDpt] = React.useState([]);
  const [idLine, setIdLine] = useState(0);
  const dispatch = useDispatch();
  const socket = useSelector(state => state);
  const [watcher, setWachador] = useState(false);
  const [btnActivo, SetBtnActivo]= useState (true);
  //const socket = store.getState();


  //dispatch(connectSocket(localStorage.getItem('id_user')));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  

  const getPlanList = async () => {
    const response = await ProductionPlan.getTableData();
    setPlansList(response);
    setCounter(plansList.length);
  };
  const handleArea = (e) => {
    //dispatch(connectSocket(localStorage.getItem('id_user')));
    setWachador(true);
    dispatch({
      type: 'connect',
      data: {id: localStorage.getItem('id_user') },
    });
    if(e){
      setIdArea(e);
      setLineList([]);
      const resp = Line.getLineByArea(e);
      resp.then(res => {
        if(res.error){
          Swal.fire({
            title: 'Error',
            text: 'No hay Lineas en esa Area',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          setIdArea('');
          setLineList([]); 
          SetBtnActivo(true); 
          setPlansList([]);
        }else{
          setLineList(res);
        }
      }).catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No hay Lineas en esa Area',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        setIdArea('');
        setLineList([]);
        SetBtnActivo(true);
        setPlansList([]);
      });
    }else{
      setIdArea('');
      setLineList([]);
      SetBtnActivo(true);
      setPlansList([]);
    }
  }

  const buscarPlan = async () => {
    const resp = await ProductionPlan.plansFilter(idLine);
    console.log(resp)
    if(resp.error){
      Swal.fire({
        title: 'Error',
        text: resp.error,
        icon: 'error',
        confirmButtonText: 'OK'
      })
      setPlansList([]);
    }else{
      setPlansList(resp);
    }
  }

  const newName = (row) => {
    let [first, second] = row.split('-');
    return first;
  }
  const newName2 = (row) => {
    let [first, second] = row.split('-');
    return second;
  }
  const getAreaList = async () => {
    const resp = await Area.getAllAreas();
    setAreaList(resp);
    
  }

  const getDptList = async () => {
    const data = await Department.getAllDepartments();
    setListDpt(data);
  }

  const handleLine = (e) => {
    setIdLine(e);
    if(e){
      SetBtnActivo(false)
    }else{
        SetBtnActivo(true)
        setPlansList([]);
    }
    socket.emit('kanban:production', {id_line: e, id_socket: socket.id});
  }

  const handleDept = (e) => {

    if(e){
      setIdDepartment(e);
      setAreaList([]);
      setLineList([]);
      setIdArea("");
      setIdLine("");
      const resp = Area.getAreaByDepartment(e);
      resp.then(res => {
        if(res.error){
          Swal.fire({
            title: 'Error',
            text: 'No hay Areas en ese Departamento',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          setIdDepartment('');
          setAreaList([]);
          SetBtnActivo(true)
          setPlansList([]);
        }else{
          setAreaList(res);
        }
      }).catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No hay Areas en ese Departamento',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        setIdDepartment('');
        setAreaList([]);
        SetBtnActivo(true)
        setPlansList([]);
      });
    }else{
      setIdDepartment('');
      setAreaList([]);
      SetBtnActivo(true)
      setPlansList([]);
    }
  }

  const buscarPlanSocket = async (line) => {
    const resp = await ProductionPlan.plansFilter(line);
    setPlansList(resp);
  }

  useEffect(  () => {
    getDptList();
    if(watcher){
      socket.on('kanban:production', (data) => {
        if(data){
          setIdLine(data.id_line);
          buscarPlanSocket(data.id_line);
        }
      });
    }
    return() => {
      if(watcher){dispatch({type: 'disconnect'})}
    };
  },[watcher]);
  


  if(!localStorage.getItem('token')){
    window.location.href = '/kanban_system/login'
  }else{
    return (
      <>
      <div id="content" className="content">
        <br/>
        <br/>
        {/* <!-- begin breadcrumb --> */}
        <ol className="breadcrumb pull-right">
          <li><a href="##">Home</a></li>
          <li><a href="##">Page Options</a></li>
          <li className="active">Plan de Producción</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        <h1 className="page-title"><center>Plan de Producción</center></h1>
        {/* <!-- end page-header --> */}
        
        <div className="row">
			    <div className="">
                    <div className="panel panel-inverse">
                        <div className="panel-heading">
                            <div className="panel-heading-btn">
                                <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" onClick={getPlanList} data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                            </div>
                            <h4 className="panel-title"><strong>Plan Actual</strong></h4>
                        </div>
                        <div className="panel-body">
                          <form onSubmit={buscarPlan} className='form-horizontal form-bordered'>
                            <div className="row">
                            <div className="col-md-4">
                              <div className="form-group">
                                <label className="control-label col-md-4">Departamento</label>
                                <div className="col-md-8">
                                  <select className='form-control' onChange={(e) => handleDept(e.target.value)}>
                                    <option value=''>Seleccione</option>
                                    {listDpt.map((item) => (
                                      <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                                    ))}
                                  </select>
                                  <FormHelperText>Required</FormHelperText>
                                </div>
                              </div>
                            </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                    <label className="control-label col-md-4">Area</label>
                                    <div className="col-md-8">
                                      <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                                        <option value=''>Seleccione</option>
                                        {areaList.map((area) => (
                                            <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                                        ))}
                                      </select>
                                      <FormHelperText>Required</FormHelperText>
                                    </div>
                                </div>
                              </div>
                              <div className='col-md-4'>
                                <div className="form-group">
                                    <label className="control-label col-md-4">Linea</label>
                                    <div className="col-md-8">
                                      <select className='form-control' value={idLine} onChange={(e) => handleLine(e.target.value)}>
                                        <option value="">Seleccione una opción</option>
                                        {lineList.map((line) => (
                                          <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                        ))}
                                      </select>
                                      <FormHelperText>Required</FormHelperText>
                                    </div>
                                </div>
                              </div>
                            </div>
                            <div className='row'>
                              <center>
                                <button type="button" onClick={buscarPlan} className="btn btn-sm btn-primary " disabled = {btnActivo}>Buscar</button>
                              </center>
                            </div>
                          </form>
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
                                      <TableCell><h6><strong>Producidos</strong></h6></TableCell>
                                      <TableCell><h6><strong>Diferencia</strong></h6></TableCell>
                                      <TableCell><h6><strong>Hora Inicio</strong></h6></TableCell>
                                      <TableCell><h6><strong>Fin Estimado</strong></h6></TableCell>
                                      <TableCell><h6><strong>Modelo</strong></h6></TableCell>
                                      <TableCell><h6><strong>Destino</strong></h6></TableCell>
                                      <TableCell><h6><strong>Empaque</strong></h6></TableCell>
                                      <TableCell><h6><strong>Instrucciones</strong></h6></TableCell>
                                      <TableCell><h6><strong>Estado</strong></h6></TableCell>
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
                                              <h6>{
                                                page===0?1+index:page*10+1+index
                                              }</h6>
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                            <h6>{newName(row.no_part)}-</h6><h5><strong>{newName2(row.no_part)}</strong></h5>
                                          </TableCell>
                                          <TableCell >
                                            <h6>{row.planP}</h6>
                                          </TableCell>
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
                                          <TableCell>
                                            <StatusChip status={row.status} />
                                          </TableCell>                                       
                                      </TableRow>
                                      )
                                  )
                                  :
                                  (
                                      <TableRow>
                                          <TableCell colSpan={12} align="center">
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

export default HomeFilter