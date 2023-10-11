import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { Button, Modal } from 'react-bootstrap';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import LocalComponents from '../../requests/LocalComponents';
import Train from '../../requests/Train';
import TableFilter from '../../components/TableFilter';

const AsignPage = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [shoppingLists, setShoppingLists] = React.useState([]);
  const [componentsList, setComponentsList] = useState([]);
  const [plan, setPlan] = useState('');
  const [line, setIdLine] = useState("");
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

  useEffect(() => {

  }, [componentsList]);

  const handleList = async (event) => {
      setShoppingLists(event);
  }
  const getLists = async () => {
    const resp = await LocalComponents.getFilterList(line);
    setShoppingLists(resp);
}

  const [showEdit, setShowEdit] = React.useState(false);
  
  const handleCloseEdit = () => {
    setShowEdit(false);
    cleanAll();
  }
  const handleShowEdit = (row) => {
    setPlan(row.no_part);
    setIdLine(row.name_ln);
    setLot(row.current_lot);
    setIdShoppingList(row.id_shopping_list);
    setShowEdit(true);
  }

  const asignTrain = async () => {
 
    if(trainCode)
    {
      let data = {
        'id_shopping_list': idShoppingList,
        'trainCode': trainCode,
        'lot': lot,
      }
      console.log("Datos enviados");
      console.log(data);
      Train.asignTrain(data).then( (res) => {
        console.log(res.id_asigned);
        console.log(res);
        if(res.id_asigned){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tren Asignado',
            showConfirmButton: false,
            timer: 1500
          });
          getLists();
          handleCloseEdit();
          setIdLine('');
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al Asignar Tren',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }else{
        
        let data = {
            'id_shopping_list': idShoppingList,
            'trainCode': 'no hay',
            'lot': lot,
          }
          console.log("Datos enviados");
          console.log(data);
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ingresa codigo del tren',
            showConfirmButton: false,
            timer: 1500
          });
    }
  }

  const cleanAll = () => {
    setTrainCode('');
  }

    const setLine = async (event) => {
        if(event){
            setIdLine(event);
            try {
                const resp = await LocalComponents.getFilterList(event);
                console.log("Resdefuncion= ",resp);
                if(Boolean(resp.error)){
                  
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: resp.error,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }else{
                    setShoppingLists(resp);
                }
                
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Ha ocurrido el siguiente error: "+ error,
                    showConfirmButton: false,
                    timer: 1500
                  });
              
            }
             
            
        }
    }
  
  if(!localStorage.getItem('token')){
    window.location.href = '/kanban_system/login'
  }else{
    return (
      <>
            <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-inverse">
                            <div className="panel-heading">
                                <div className="panel-heading-btn">
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                </div>
                                <h4 className="panel-title">Asignar</h4>
                            </div>
                            <div className="panel-body">
                            
                            <br/>
                            <div>
                            <h4>Asignar Tren a Shopping</h4>
                            <hr/>
                            <form className='form-horizontal form-bordered'>
                                <fieldset>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className="form-group">
                                                <label className="control-label col-md-4">Código de Línea</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="transitCode" autoFocus value={line} onChange={(e) => setLine(e.target.value)}/>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    {/* <br></br>
                                    <div className='form-group'>
                                    <center>
                                        <button type="button" className="btn btn-sm btn-primary m-r-5" onClick={setTransitTrain}>En Transito</button>
                                        <button  className="btn btn-sm btn-danger" data-click="panel-collapse"  >Cancelar</button>
                                    </center>
                                    </div> */}
                                </fieldset>
                            </form>
                            {/* <TableFilter handleList={handleList} setLine={setLine} typeFilter={3}/> */}
                            <br/>
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
                                        <TableCell><h6><strong>Estatus Plan</strong></h6></TableCell>
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
                                            <TableCell >
                                            {
                                                row.status=='1'?
                                                <TableCell align="center">
                                                    <Chip label="Current" color="success" size='large' />
                                                </TableCell>
                                                : row.status=='2'?
                                                <TableCell align="center">
                                                    <Chip label="On Hold" color="warning" />
                                                </TableCell>
                                                : 
                                                <TableCell align="center">
                                                    <Chip label="Delayed" color="error" />
                                                </TableCell>
                                            }
                                            </TableCell>
                                            <TableCell align="center">
                                                <div className="align-center-flex">
                                                    <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning" title="Ver Componentes">
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
                                    <Button variant="primary" onClick={asignTrain}>
                                      Guardar Cambios
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            </div>
                        </div>
                    </div>
                </div>
      </>
    )
  }
}

export default AsignPage