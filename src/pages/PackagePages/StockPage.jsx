import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import Package from '../../requests/Package';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const StockPage = () => {
    const [idPack, setIdPack] = useState('');
    const [idProvider, setIdProvider] = useState('');
    const [noBox, setNoBox] = useState('');
    const [noManifest, setNoManifest] = useState('');
    const [manifest, setManifest] = useState('');
    const [real, setReal] = useState('');
    const [tipo, setTipo] = useState('');
    const [material, setMaterial] = useState('');
    const [packList, setPackList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [providers, setProviders] = useState([]);
    const [packages, setPackages] = useState([]);
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    useEffect(() => {
      getLists();
      getProviders();
      getPacks();
    }, []);

    const getPacks = async () => {
        const response = await Package.getAllPackages();
        setPackages(response);
    }
  
    const getLists = async () => {
      const resp = await Package.getReceiptTable();
      setPackList(resp);
    }

    const getProviders = async () => {
        const resp = await Package.getProviders();
        setProviders(resp);
    }
  
    const addStock = async (e) => {
      e.preventDefault();
      if(material && noBox && noManifest && real && tipo && idProvider && idPack && manifest){
        let diff = noManifest - real;
        let data = {
            "id_pack": idPack,
            "id_provider": idProvider,
            "no_box": noBox,
            "no_manifest": noManifest,
            "manifest": manifest,
            "real": real,
            "diff": diff,
            "type": tipo,
            "material": material
        }
        Package.addStock(data).then(res => {
          if(res.id_inserted){
            Swal.fire({
              icon: 'success',
              title: 'Se ha agregado el empaque!',
              showConfirmButton: false,
              timer: 2500
            })
            getLists();
            cleanAll();
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

      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'Verifique que todos los campos esten llenos',
          showConfirmButton: false,
          timer: 2500
        });
      }
  
    };
  
    const cleanAll = () => {
      setIdPack('');
      setIdProvider('');
      setNoBox('');
      setNoManifest('');
      setManifest('');
      setReal('');
      setTipo('');
      setMaterial('');

    };
  
    const guardarCambios = async () => {
      if(material){
        let data = {
          "id_package": idPack,
        }

        Package.updatePackage(data).then( res => {
          if(res.id_updated){  
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Empaque Actualizado!!',
              showConfirmButton: false,
              timer: 2500
            })
            getLists();
            cleanAll();
            handleCloseEdit();
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: res.error,
              showConfirmButton: false,
              timer: 2500
            });
          }
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Veirfique que todos los campos esten llenos',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
   
    const [showEdit, setShowEdit] = React.useState(false);
   
    const handleCloseEdit = () => {
       setShowEdit(false);
       cleanAll();
     }
    const handleShowEdit = (row) => {
      
      setShowEdit(true);
    }
  
    const deletePack = async (row) => {
      Swal.fire({
        title: 'Estas seguro de eliminar este Empaque?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          Package.deletePackage(row.id_package).then(res => {
            if(res.id_deleted){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Empaque Eliminado!',
                showConfirmButton: false,
                timer: 2500
              });
              getLists();
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: res.error,
                showConfirmButton: true,
                
              });
            }
          })
        }
      })
    }

    const captureCant = (e, option) => {
      if(e >= 0){
        switch(option){
          case 1:
            setReal(e);      
          break;
          case 2:
            setNoManifest(e);
            break;

        }
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten números negativos'
          });

          switch(Number(option)){
            case 1:
              setReal("");
              break;
            case 2: 
              setNoManifest("")
              break;
          }
      }
    }

    const captureNoBox = (e) => {
      if(e.length > 100){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten más de 100 carácteres'
          });
      }else{
        if(e.includes("'") || e.includes('"')){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No se permite dicho caracter'
            });
        }else{
          setNoBox(e);
        }  
      }
    }

    const captureNoManifest = (e) => {
      if(e.length > 100){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten más de 250 carácteres'
          });
      }else{
        if(e.includes("'") || e.includes('"')){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No se permite dicho caracter'
            });
        }else{
          setManifest(e);
        }  
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
            <li><a href="/kanban_system/home">Home</a></li>
            <li><a href="##">Page Options</a></li>
            <li className="active">Inventario</li>
          </ol>
          {/* <!-- end breadcrumb -->
          <!-- begin page-header --> */}
          
          <h1 className="page-title"><center>Recepción de Empaque </center></h1>
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
                                <h4 className="panel-title">Registrar</h4>
                            </div>
                            <div className="panel-body panel-form">
                            <form onSubmit={addStock} className='form-horizontal form-bordered'>
                                      <fieldset>
                                          {/* <legend>Defecto</legend> */}
                                          <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Empaque</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setIdPack(e.target.value)} value={idPack}>
                                                        <option value="">Seleccione una opción</option>
                                                        {packages.map((pack) => (
                                                            <option key={pack.id_package} value={pack.id_package}>{pack.name_package}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Cliente</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setIdProvider(e.target.value)} value={idProvider}>
                                                        <option value="">Seleccione una opción</option>
                                                        {providers.map((prov) => (
                                                            <option key={prov.id_provider} value={prov.id_provider}>{prov.name_provider}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Tipo</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setTipo(e.target.value)} value={tipo}>
                                                        <option value="">Seleccione una opción</option>
                                                        <option value="1">Piso</option>
                                                        <option value="2">Caja de Renta</option>
                                                        <option value="3">Renta</option>
                                                        <option value="4">Dañado</option>
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Material</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setMaterial(e.target.value)} value={material}>
                                                        <option value="">Seleccione una opción</option>
                                                        <option value="1">Plástico</option>
                                                        <option value="2">Cartón</option>
                                                    </select>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Cantidad Real</label>
                                                <div className="col-md-8">
                                                    <input type="number" className="form-control" id="real" placeholder="0"  value={real} onChange={ (e) => captureCant(e.target.value, 1) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Cantidad en Manifiesto</label>
                                                <div className="col-md-8">
                                                    <input type="number" className="form-control" id="noManifest" placeholder="0"  value={noManifest} onChange={ (e) => captureCant(e.target.value, 2) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">No. Caja</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="noBox" placeholder="0" value={noBox} onChange={(e) => captureNoBox(e.target.value)}/>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">No. Manifiesto o Factura</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="manifiesto" placeholder="0" value={manifest} onChange={(e) => captureNoManifest(e.target.value)}/>
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
                  <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" onClick={getLists} data-click="panel-reload"><i className="fa fa-repeat"></i></a>
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
                                  <TableCell><h6><strong>Empaque</strong></h6></TableCell>

                                  <TableCell><h6><strong>Cliente</strong></h6></TableCell>
                                  <TableCell><h6><strong>Cant. Real</strong></h6></TableCell>
                                  <TableCell><h6><strong>Cant. Manifiesto</strong></h6></TableCell>
                                  <TableCell><h6><strong>Diferencia</strong></h6></TableCell>
                                  <TableCell><h6><strong>No. Manifiesto</strong></h6></TableCell>
                                  <TableCell><h6><strong>Fecha</strong></h6></TableCell>
                                  {/* <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell> */}
                              </TableRow>
                              
                          </TableHead>
                          <TableBody>
                          {
                              packList.length>0?
                              packList
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                              .map((row) => (                            
                                  <TableRow key={row.id_packing_receipt}>
                                      <TableCell component="th" scope="row">
                                          <h6>{row.id_packing_receipt}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                          <h6>{row.name_package}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                          <h6>{row.name_provider}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" >
                                          <h6>{row.real}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" >
                                          <h6>{row.no_manifest}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" >
                                          <h6>{row.difference}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" >
                                          <h6>{row.manifest}</h6>
                                      </TableCell>
                                      <TableCell component="th" scope="row" >
                                          <h6>{row.created_at}</h6>
                                      </TableCell>
                                      {/* <TableCell align="center">                                                                        
                                          <div className="align-left">
                                              <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-5" title="Editar">
                                                  <i className="fa fa-pencil"></i>
                                              </Button>
                                              <Button onClick={() => deletePack(row)} variant="contained" className="btn-sm btn-danger" title="Eliminar">
                                                  <i className="fa fa-trash"></i>
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
                                                  packList.length>0 && packList.length>0?
                                                  'No se encontraron resultados'
                                                  :'No hay Areas registradas'
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
                                          <input type="text" className="form-control" id="idPack" placeholder=""  value={idPack} onChange={ (e) => setIdPack(e.target.value) } />
                                      </div>
                                      <div className="form-group">
                                          <label className="form-label"> Lote:{' '}</label>
                                          <input type="number" className="form-control" id="idProvider" placeholder=""  value={idProvider} onChange={ (e) => setIdProvider(e.target.value) } />
                                      </div>
                                      <div className="form-group">
                                          <label className="form-label">Productos:</label>
                                          <select></select>
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

export default StockPage