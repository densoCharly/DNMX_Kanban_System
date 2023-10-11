import React, { useEffect } from 'react'
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


const InventoryFGPage = () => {

const [packList, setPackList] = React.useState([]);
const [rowsPerPage, setRowsPerPage] = React.useState(10);
const [page, setPage] = React.useState(0);

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
            <h4 className="panel-title">Actuales</h4>
          </div>
          <div className="panel-body">
            <TableContainer component={Paper} sx={{maxHeight:850}}>
                  <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                      <TableHead 
                        thstyle={{ fontSize: '35px'}}
                      >
                          <TableRow>
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
  </>
    )
}

}

export default InventoryFGPage