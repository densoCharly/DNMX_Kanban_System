import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi";
import FinishGood from '../../requests/FinishGood';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';


const FinishGoodPage = () => {

const [namePack, setNamePack] = useState('');
const [inventory, setInventory] = useState('');
const [stockPlastic, setStockPlastic] = useState('');
const [stockRent, setStockRent] = useState('');
const [stockHarmed, setStockHarmed] = useState('');
const [rentCarton, setRentCarton] = useState('');
const [rentPlastic, setRentPlastic] = useState('');
const [newScarton, setNewScarton] = useState(0);
const [newRcarton, setNewRcarton] = useState(0);
const [newSplastic, setNewSplastic] = useState(0);
const [newRplastic, setNewRplastic] = useState(0);
const [newSrent, setNewSrent] = useState(0);
const [newSharmed, setNewSharmed] = useState(0);
const [packList, setPackList] = useState([]);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [page, setPage] = useState(0);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

useEffect(() => {
  getLists();
}, []);

const getLists = async () => {
  const resp = await FinishGood.getInventory();
  setPackList(resp);
}

const cleanAll = () => {
  setInventory("");
};

const saveInventory = (e) => {
    e.preventDefault();
    if(inventory){
        FinishGood.updateInventory(inventory).then(res => {
            if(res.id_updated){
                Swal.fire({
                  title: 'Success',
                  text: 'Inventory Updated!!',
                  icon: 'success',
                  confirmButtonText: 'OK'
                })
                getLists();
                cleanAll();
              }else{
                Swal.fire({
                  title: 'Error',
                  text: res.error,
                  icon: 'error',
                  confirmButtonText: 'OK'
                })
                cleanAll();
              }
        })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
}

const guardarCambios = async () => {
  
}

const [showEdit, setShowEdit] = React.useState(false);

const handleCloseEdit = () => {
   setShowEdit(false);
   cleanAll();
 }
const handleShowEdit = (row) => {
  
  setShowEdit(true);
}

const deletePack = (e, row) => {
    
    Swal.fire({
      title: 'Estas seguro de Eliminar este producto?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        FinishGood.deleteFG(row.id_finish_good).then( res => {
          if(res.id_deleted){
            Swal.fire(
              'Eliminado!',
              'El Empaque ha sido eliminado.',
              'success'
            )
            getLists();
          }else{
            Swal.fire({
              title: 'Error',
              text: res.error,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }
    })
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
        <li><a href="/kanban_system/home">Home</a></li>
        <li><a href="##">Page Options</a></li>
        <li className="active">Finish Good</li>
      </ol>
      {/* <!-- end breadcrumb -->
      <!-- begin page-header --> */}
      
      <h1 className="page-title"><center>Inventario de Finish Good </center></h1>
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
                              <h4 className="panel-title">Registrar</h4>
                          </div>
                          <div className="panel-body panel-form">
                          <form onSubmit={saveInventory} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Seleccionar Archivo</label>
                                                <div className="col-md-8">
                                                    <input type="file" className="form-control" id="inventory" accept=".xlsx, .xls" onChange={ (e) => setInventory(e.target.files[0]) } />
                                                </div>
                                              </div>
                                              
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='form-group'>
                                          <center>
                                            <button type="submit" className="btn btn-sm btn-primary m-r-5" >Agregar</button>
                                            <button type="reset" onClick={cleanAll} className="btn btn-sm btn-default m-r-5" >Limpiar</button>
                                            <button  className="btn btn-sm btn-danger" data-click="panel-collapse"  >Cancelar</button>
                                          </center>
                                        </div>
                                    </fieldset>
                                </form>
                                <br></br>
                          </div>
                      </div>
            </div>
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
            <TableContainer component={Paper} sx={{maxHeight:850}}>
                  <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead 
                        thstyle={{ fontSize: '35px'}}
                      >
                          <TableRow>
                              {/* <TableCell><h6><strong>#</strong></h6></TableCell> */}
                              <TableCell><h6><strong>No. Parte</strong></h6></TableCell>
                              <TableCell><h6><strong>Cliente</strong></h6></TableCell>
                              <TableCell align='left'><h6><strong>Lote</strong></h6></TableCell>
                              <TableCell colSpan={2} align="center"><h6><strong>Rodillos</strong></h6></TableCell>
                              <TableCell colSpan={2} align="center"><h6><strong>Over Flow</strong></h6></TableCell>
                              <TableCell colSpan={2} align="center"><h6><strong>Embarques</strong></h6></TableCell>
                              <TableCell align='center'><h6><strong>Parcial</strong></h6></TableCell>
                              <TableCell align='center'><h6><strong>Parcial(Sistema)</strong></h6></TableCell>
                              <TableCell align='center'><h6><strong>Total</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Sistema</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Dif, Pzas</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Dif en cajas</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Diferencia</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Motivo Dif</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Responsable</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Discrepancia</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Actualizado</strong></h6></TableCell>
                              <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                          </TableRow>
                          <TableRow
                            size="small"
                          >
                                {/* <TableCell/> */}
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell align="center"><h6><strong>Cartón</strong></h6></TableCell>
                                <TableCell align="center"><h6><strong>Plástico</strong></h6></TableCell>
                                <TableCell align="center"><h6><strong>Cartón</strong></h6></TableCell>
                                <TableCell align="center"><h6><strong>Plástico</strong></h6></TableCell>
                                <TableCell align="center"><h6><strong>Cartón</strong></h6></TableCell>
                                <TableCell align="center"><h6><strong>Plástico</strong></h6></TableCell>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                      {
                          packList.length>0?
                          packList
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                          .map((row) => (                            
                              <TableRow key={row.id_pack}>
                                  <TableCell component="th" scope="row">
                                      <h6>{row.no_part}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                      <h6>{row.client}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="left">
                                      <h6>{row.lot_size}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.rod_carton}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.rod_plastic}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.of_carton}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.of_plastic}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.ship_carton}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.ship_plastic}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.partial}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.sys_partial}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.total}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.sistem}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.dif_pcs}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.dif_box}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.difference}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.motif_dif}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.responsible}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center">
                                      <h6>{row.date_mismatch}</h6>
                                  </TableCell>
                                  <TableCell component="th" scope="row" align="center"> 
                                      <h6>{row.updated_at}</h6>      
                                  </TableCell>
                                  <TableCell>
                                    <div className="align-left">
                                        {/* <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning " title="Editar">
                                            <i className="fa fa-pencil"></i>
                                        </Button> */}
                                        <Button onClick={(e) => deletePack(e, row)} variant="contained" className="btn-sm btn-danger" title="Eliminar">
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                    </div>
                                  </TableCell>
                              </TableRow>
                              )
                          )
                          :
                          (
                              <TableRow>
                                  <TableCell colSpan={19} align="center">
                                      <p className="no-service-available">
                                          {
                                              packList.length>0 && packList.length>0?
                                              'No se encontraron resultados'
                                              :'No hay Inventario registrados'
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
                      count={packList.length}
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
                style={{opacity:1}} 
                aria-labelledby="contained-modal-title-vcenter" 
                centered
                animation={false}
                size="auto"
              >
                  <Modal.Header  >
                      <Modal.Title className="bg-gray text-center"><i className='fa fa-edit'></i>   Editar Empaque</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="container">
                          <div className="row">
                              <div className="col-md-6">
                                  <div className="form-group">
                                      <label className="form-label"> Empaque:{' '}</label>
                                      <input type="text" className="form-control" id="namePack" placeholder=""  value={namePack} disabled />
                                  </div>
                                  <div className="form-group">
                                      <label className="form-label"> Cartón en Piso:{' '}</label>
                                      <input type="number" className="form-control" id="stock_carton" placeholder=""  value={inventory} disabled />
                                      <br/>
                                      <label className="form-label"> Cantidad a Descontar:{' '}</label>
                                      <input type="number" className="form-control" id="new_stock_carton" placeholder="0"   onChange={ (e) => setNewScarton(e.target.value) } /> 
                                  </div>
                                  <hr/>
                                  <div className="form-group">
                                      <label className="form-label"> Plástico en Piso:{' '}</label>
                                      <input type="number" className="form-control" id="stockPlastic" placeholder=""  value={stockPlastic} disabled />
                                      <br/>
                                      <label className="form-label"> Cantidad a Descontar:{' '}</label>
                                      <input type="number" className="form-control" id="newSplastic" placeholder="0"   onChange={ (e) => setNewSplastic(e.target.value) } /> 
                                  </div>
                                  <hr/>
                                  <div className="form-group">
                                      <label className="form-label"> Cartón en Caja de Renta:{' '}</label>
                                      <input type="number" className="form-control" id="rentCarton" placeholder=""  value={rentCarton} disabled />
                                      <br/>
                                      <label className="form-label"> Cantidad a Descontar:{' '}</label>
                                      <input type="number" className="form-control" id="newRcarton" placeholder="0"  onChange={ (e) => setNewRcarton(e.target.value) } />
                                  </div>
                                  <hr/>
                                  <div className="form-group">
                                      <label className="form-label"> Plástico en Caja de Renta:{' '}</label>
                                      <input type="number" className="form-control" id="rentPlastic" placeholder=""  value={rentPlastic} disabled />
                                      <br/>
                                      <label className="form-label"> Cantidad a Descontar:{' '}</label>
                                      <input type="number" className="form-control" id="newRplastic" placeholder="0"  onChange={ (e) => setNewRplastic(e.target.value) } />
                                  </div>
                                  <hr/>
                                  <div className="form-group">
                                      <label className="form-label"> Empaque Rentado:{' '}</label>
                                      <input type="number" className="form-control" id="stockRent" placeholder=""  value={stockRent} disabled />
                                      <br/>
                                      <label className="form-label"> Cantidad a Descontar:{' '}</label>
                                      <input type="number" className="form-control" id="newSrent" placeholder="0"  onChange={ (e) => setNewSrent(e.target.value) } />
                                  </div>
                                  <hr/>
                                  <div className="form-group">
                                      <label className="form-label"> Empaque Dañado:{' '}</label>
                                      <input type="number" className="form-control" id="stockHarmed" placeholder=""  value={stockHarmed} disabled />
                                      <br/>
                                      <label className="form-label"> Cantidad a Descontar:{' '}</label>
                                      <input type="number" className="form-control" id="newSharmed" placeholder="0"  onChange={ (e) => setNewSharmed(e.target.value) } />
                                  </div>
                              </div>
                          </div>
                      </div>

                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>
                          Cerrar
                      </Button>
                      <Button variant="primary" onClick={guardarCambios}>
                        Guardar Cambios
                      </Button>
                  </Modal.Footer>
              </Modal>
    </div>
  </>
    )
}

}

export default FinishGoodPage