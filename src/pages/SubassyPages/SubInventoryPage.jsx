import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Button, Modal } from 'react-bootstrap';
import { BiGhost } from "react-icons/bi"
import Swal from 'sweetalert2';
import Subassy from "../../requests/Subassy";

const SubInventoryPage = () => {
    const [noSubassy, setNoSubassy] = useState('');
    const [type, setType] = useState('');
    const [idArea, setIdArea] = useState('');
    const [idLine, setIdLine] = useState('');
    const [idSubassy, setIdSubassy] = useState('');  
    const [stock, setStock] = useState('');
    const [subassyList, setSubassyList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);    
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
  
    const getSubassyList = async () => {
      const resp2 = await Subassy.getInventory();
      setSubassyList(resp2);
    };
  
    useEffect(  () => {
      getSubassyList();
    }, []);
    
    const [showEdit, setShowEdit] = React.useState(false);
   
    const handleCloseEdit = () => {
      setShowEdit(false);
      cleanAll();
    };
    const handleShowEdit = (e) => {
      setIdArea(e.name_area);
      setIdLine(e.name_ln);
      setNoSubassy(e.no_subassy);
      setType(e.type);
      setIdSubassy(e.id_subassy);
      setStock(e.stock);
      setShowEdit(true);
    };

  
    const cleanAll = () => {
      setNoSubassy('');
      setType('');
      setIdArea('');
      setIdLine('');
      setIdSubassy('');
      setStock('');
    }
  
    const handleSubmitEdit = (e) => {
      e.preventDefault();
      if(stock){
        const data = {
          "stock": stock,
          "id_subassy":idSubassy,
        }
        Subassy.updateStock(data).then( res => {
          if(res.updated){
            Swal.fire({
              title: 'Success',
              text: 'Subensamble Actualizado!!!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            getSubassyList();
            cleanAll();
            setShowEdit(false);
          }else{
            Swal.fire({
              title: 'Error',
              text: res.error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Verifique que todos los campos esten llenos',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
    const captureStock = (e) => {
      if(e > 0){
        setStock(e);      
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten números negativos'
          });
      }
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
              <li><a href="/home">Home</a></li>
              <li><a href="/home">Page Options</a></li>
              <li className="active">Subensamble</li>
            </ol>
            {/* <!-- end breadcrumb -->
            <!-- begin page-header --> */}
            
            <h1 className="page-title"><center>Inventario de Subensambles</center></h1>
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
                  <h4 className="panel-title">Actuales</h4>
                </div>
                <div className="panel-body">
                  <TableContainer component={Paper} sx={{maxHeight:850}}>
                                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                    <TableHead 
                                      thstyle={{ fontSize: '35px'}}
                                    >
                                        <TableRow>
                                            <TableCell><h6><strong>#</strong></h6></TableCell>
                                            <TableCell><h6><strong>No. Subensamble</strong></h6></TableCell>
                                            <TableCell><h6><strong>Tipo</strong></h6></TableCell>
                                            <TableCell><h6><strong>Stock</strong></h6></TableCell>
                                            <TableCell><h6><strong>Linea</strong></h6></TableCell>
                                            <TableCell><h6><strong>Actualizado</strong></h6></TableCell>
                                            <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                        subassyList.length>0?
                                        subassyList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                        .map((row, index) => (                            
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    <h6>{row.id_subassy}</h6>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <h6>{row.no_subassy}</h6>
                                                </TableCell>
                                                <TableCell>
                                                    <h6>{row.type_name}</h6>
                                                </TableCell>
                                                <TableCell>
                                                    <h6>{row.stock}</h6>
                                                </TableCell>
                                                <TableCell>
                                                    <h6>{row.name_ln}</h6>
                                                </TableCell>
                                                <TableCell>
                                                    <h6>{row.updated_at}</h6>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div className="align-left">
                                                        <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-5" title="Editar" >
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
                                                <TableCell colSpan={7} align="center">
                                                    <p className="no-service-available">
                                                        {
                                                            subassyList.length>0 && subassyList.length>0?
                                                            'No se encontraron resultados'
                                                            :'No hay Subensambles registrados'
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
                                  count={subassyList.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal show={showEdit} 
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
                  Editar Subensamble
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <form >
                      <fieldset>
                        <div className="form-group">
                          <label htmlFor="noSubassy">No. Subensamble</label>
                          <input type="text" className="form-control" id="noSubassy" name="noSubassy" value={noSubassy} disabled/>
                        </div>
                        <div className="form-group">
                          <label htmlFor='type'>Tipo</label>
                          <input type="text" className="form-control" id="type" name="type" value={type} disabled/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="area">Área</label>
                          <input type="text" className="form-control" id="area" name="area" value={idArea} disabled/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="linea">Línea</label>
                          <input type="text" className="form-control" id="line" name="line" value={idLine} disabled/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="linea">Stock</label>
                          <input type="number" className="form-control" id="stock" name="stock" value={stock} onChange={(e) => captureStock(e.target.value)}/>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>Cancelar</Button>
                <Button variant="primary" type="submit" form="form-edit" onClick={handleSubmitEdit}>Guardar</Button>
              </Modal.Footer>
            </Modal>
          </div>
            {/* <!-- begin scroll to top btn --> */}
            <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
            {/* <!-- end scroll to top btn --> */}
          </div>
          
        </>
      )
    }
  }
  

export default SubInventoryPage