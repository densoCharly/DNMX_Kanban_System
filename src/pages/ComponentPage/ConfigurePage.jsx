import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import LocalComponents from '../../requests/LocalComponents';
//import FormHelperText from '@mui/material/FormHelperText';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import {  DataGrid, GridToolbarQuickFilter, GridLinkOperator  } from '@mui/x-data-grid';

const columnsTable = [
    { field: 'sku', headerName: 'SKU', width:300 },
    { field: 'sku_desc', headerName: 'SKU DESC', width: 400 },
    { field: 'kind', headerName: 'Tipo', width: 150 },
    { field: 'qty_box', headerName: 'Cant. Caja', width: 150 },
    { field: 'location', headerName: 'Ubicación', width: 150 },
];

function QuickSearchToolbar() {
    return (
        <Box
        sx={{
            p: 2,
            pb: 1,
            fontSize: '25px',
        }}
        >
        <GridToolbarQuickFilter
            sx={{ fontSize: '25px' }}
            quickFilterParser={(searchInput) =>
                searchInput
                .split(',')
                .map((value) => value.trim())
                .filter((value) => value !== '')
            }
        />
        </Box>
    );
}

const ConfigurePage = () => {
    const [idComponent, setIdComponent] = React.useState(0);
    const [sku, setSku] = React.useState('');
    const [skuDesc, setSkuDesc] = React.useState('');
    const [kind, setKind] = React.useState(0);
    const [qtyBox, setQtyBox] = React.useState(0);
    const [location, setLocation] = React.useState('');
    const [componentsList, setComponentsList] = React.useState([]);
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
        const resp = await LocalComponents.getComponents();
        setComponentsList(resp);

    }

    const addComponent = async (e) => {
        e.preventDefault();
        if(sku && skuDesc && kind && qtyBox && location){
            let data = {
                "sku": sku,
                "sku_desc": skuDesc,
                "kind": kind,
                "qty_box": qtyBox,
                "location": location
            }
            LocalComponents.addComponent(data).then((res) => {
                if(res.message){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: "Componente Agregado",
                        showConfirmButton: false,
                        timer: 3500
                    })
                    getLists();
                    cleanAll();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res.error,
                        showConfirmButton: false,
                        timer: 3500
                    });
                }
            }).catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error adding sku',
                    showConfirmButton: false,
                    timer: 3500
                });
            })
        }else{
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Formulario Incompleto, verifique que todos los campos esten llenos',
            showConfirmButton: false,
            timer: 1500
            });
        }

    };

    const cleanAll = () => {
        setSku('');
        setLocation('');
        setQtyBox('');
        setSkuDesc('');
        setKind('');
    };

    const guardarCambios = async () => {
        if(sku && skuDesc && qtyBox && location){
            let data = {
                "sku": sku,
                "sku_desc": skuDesc,
                "kind": kind,
                "qty_box": qtyBox,
                "location": location,
                "id_component": idComponent
            }
            LocalComponents.configureComponent(data).then((res) => {
                if(res.message){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Componente Configurado Exitosamente!',
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
                        title: 'Error al Actualizar',
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            }).catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Actualizar',
                    showConfirmButton: false,
                    timer: 2500
                });
            });
        }else{
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Verifique que todos los campos esten llenos',
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
        setSku(row.sku);
        setLocation(row.location);
        setQtyBox(row.qty_box);
        setSkuDesc(row.sku_desc);
        setKind(row.kind);
        setIdComponent(row.id_component);
        setShowEdit(true);
    }

    const deletePlant = async (row) => {
        Swal.fire({
            title: 'Estas seguro de eliminar esta Planta?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.value) {
            LocalComponents.deletePlant(row.id_plant).then(() => {
                Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'LocalComponents deleted successfully',
                showConfirmButton: false,
                timer: 1500
                });
                getLists();
            }).catch(err => {
                Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error deleting sku',
                showConfirmButton: false,
                timer: 1500
                });
            })
            }
        })
    }

    const importComponents = () => {
        
        Swal.fire({
            title: '¿Estas seguro de importar los Componentes?',
            text: "Podrías perder algunas configuraciones al sobreescribir datos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Importar!'
        }).then((result) => {
            if (result.value) {
            LocalComponents.importComponents().then((res) => {
                if(res.message){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Componentes Importados Exitosamente',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    getLists();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al Importar Componentes',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
            }).catch(err => {
                Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al Importar Componentes',
                showConfirmButton: false,
                timer: 1500
                });
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
                <li className="active">Componentes Importados</li>
            </ol>
            {/* <!-- end breadcrumb -->
            <!-- begin page-header --> */}
            
            <h1 className="page-title"><center>Componentes Importados</center></h1>
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
                                <form onSubmit={addComponent} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        {/* <legend>Defecto</legend> */}
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">SKU</label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" id="sku" placeholder=""  value={sku} onChange={ (e) => setSku(e.target.value) } />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">SKU DESC</label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" id="skuDesc" placeholder=""  value={skuDesc} onChange={ (e) => setSkuDesc(e.target.value) } />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">Tipo</label>
                                                    <div className="col-md-8">
                                                        <select className="form-control" id="kind" value={kind} onChange={ (e) => setKind(e.target.value) }>
                                                            <option value="">Seleccione...</option>
                                                            <option value="Rectificador">Rectificador</option>
                                                            <option value="Frame">Frame</option>
                                                            <option value="Stator">Stator</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">Cantidad P/Caja</label>
                                                    <div className="col-md-8">
                                                        <input type="number" className="form-control" id="qtyBox" placeholder=""  value={qtyBox} onChange={ (e) => setQtyBox(e.target.value) } />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">Ubicación</label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" id="location" placeholder=""  value={location} onChange={ (e) => setLocation(e.target.value) } />
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
                                <hr/>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label className="control-label col-md-8 m-t-5">
                                                <i className="fa fa-warning"></i> Importar Componentes de Softeon <i className="fa fa-warning"></i>
                                            </label>
                                            <div className="col-md-4">
                                                <button className='btn btn-sm btn-warning' onClick={importComponents}>Importar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                    {/* <a href="##" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times"></i></a> */}
                    </div>
                    <h4 className="panel-title">Actuales</h4>
                </div>
                <div className="panel-body">
                    <TableContainer component={Paper} sx={{maxHeight:900}}>
                        <Table sx={{ minWidth: 900 }} stickyHeader aria-label="sticky table">
                            <TableHead 
                                thstyle={{ fontSize: '35px'}}
                            >
                                <TableRow>
                                    <TableCell><h6><strong>#</strong></h6></TableCell>
                                    <TableCell><h6><strong>SKU</strong></h6></TableCell>
                                    <TableCell><h6><strong>SKU DESC</strong></h6></TableCell>
                                    <TableCell><h6><strong>Tipo</strong></h6></TableCell>
                                    <TableCell><h6><strong>Cant. Caja</strong></h6></TableCell>
                                    <TableCell><h6><strong>Ubicación</strong></h6></TableCell>
                                    <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                componentsList.length>0?
                                componentsList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                .map((row) => (                            
                                    <TableRow key={row.id_component}>
                                        <TableCell component="th" scope="row">
                                            <h6>{row.id_component}</h6>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <h6>{row.sku}</h6>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <h6>{row.sku_desc}</h6>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <h6>{row.kind}</h6>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <h6>{row.qty_box}</h6>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <h6>{row.location}</h6>
                                        </TableCell>
                                        <TableCell align="center">                                                                        
                                            <div className="align-left">
                                                <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-5" title="Editar">
                                                    <i className="fa fa-pencil"></i>
                                                </Button>
                                                <Button onClick={() => deletePlant(row)} variant="contained" className="btn-sm btn-danger" title="Eliminar">
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
                                        <TableCell colSpan={7} align="center">
                                            <p className="no-service-available">
                                                {
                                                    componentsList.length>0 && componentsList.length>0?
                                                    'No se encontraron resultados'
                                                    :'No hay Componentes registradas'
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
                            rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                            component="div"
                            count={componentsList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        <br></br>
                        <br></br>
                    <div hidden={true}>
                        <Box sx={{ height: 900, width: 1 }}>
                            <DataGrid
                                rows={componentsList}
                                columns={columnsTable}
                                getRowId={(row) => row.id_component}
                                onRowClick={(row) => handleShowEdit(row)}
                                sx={{ height: '100%', width: '100%', fontSize: '15px' }}
                                initialState={{
                                    filter: {
                                        filterModel: {
                                        items: [],
                                        quickFilterLogicOperator: GridLinkOperator.Or,
                                        },
                                    },
                                }}
                                components={{ Toolbar: QuickSearchToolbar }}
                            />
                        </Box>
                    </div>
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
                        <Modal.Header closeButton >
                            <Modal.Title className="bg-gray text-center">Configurar Componente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">SKU</label>
                                            <input type="text" className="form-control" id="sku" placeholder=""  value={sku} onChange={ (e) => setSku(e.target.value) } />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">SKU DESC</label>
                                            <input type="text" className="form-control" id="skuDesc" placeholder=""  value={skuDesc} onChange={ (e) => setSkuDesc(e.target.value) } />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Tipo</label>
                                            <select className="form-control" id="kind" value={kind} onChange={ (e) => setKind(e.target.value) }>
                                                <option value="">Seleccione...</option>
                                                <option value="Rectificador">Rectificador</option>
                                                <option value="Frame">Frame</option>
                                                <option value="Stator">Stator</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Cantidad P/Caja</label>
                                            <input type="number" className="form-control" id="qtyBox" placeholder=""  value={qtyBox} onChange={ (e) => setQtyBox(e.target.value) } />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Ubicación</label>
                                            <input type="text" className="form-control" id="location" placeholder=""  value={location} onChange={ (e) => setLocation(e.target.value) } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" className="btn btn-danger footer-left" onClick={handleCloseEdit}>
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

export default ConfigurePage