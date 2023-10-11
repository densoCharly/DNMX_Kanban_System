import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi";
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import Train from '../../requests/Train';
import Area from '../../requests/Area';
import Department from '../../requests/Department';
import Line from '../../requests/Line';
import Printer from '../../requests/Printer';
import { MultiSelect } from "react-multi-select-component";

const PrinterPage = () => {

    const [printerList, setPrinterList] = useState([]);
    const [idPrinter, setIdPrinter] = useState('');
    const [rowsPerPage2, setRowsPerPage2] = useState(10);
    const [page2, setPage2] = useState(0);
    
    const [idArea, setIdArea] = useState(0);
    const [idLine, setIdLine] = useState(0);
    const [idDpt, setIdDpt] = useState(0);
    const [areaList, setAreaList] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [listDpt, setListDpt] = useState([]);
    const [ipAddress, setIpAddress] = useState('');
    const [printerName, setPrinterName] = useState('');

    const handleChangePage2 = (event2, newPage2) => {
        setPage2(newPage2);
    };

    const handleChangeRowsPerPage2 = (event2) => {
        setRowsPerPage2(+event2.target.value);
        setPage2(0);
    };

    const getPrinters = async () => {
        const resp2 = await Printer.getTablePrinters();
        setPrinterList(resp2);
    }

    useEffect( () => {
        getPrinters();
        getDptList();
    }, []);

    const cleanAll = () => {
        setIdArea(0);
        setIdLine(0);
        setAreaList([]);
        setLineList([]);
        setIpAddress('');
        setIdPrinter('');
        setIdDpt(0);
        setPrinterName('');
    }

    const addPrinter = () => {
        if(ipAddress && idLine){
            let data = {
                'ip_address': ipAddress,
                'printer_name': printerName,
                'id_line': idLine,
            }
            Printer.addPrinter(data).then( (res) => {
                if(res.error){
                    Swal.fire({
                        title: 'Error',
                        text: res.error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }else{
                    if(res.id_inserted){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Impresora Agregada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        cleanAll();
                        getPrinters();
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Error al Agregar Impresora',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        cleanAll();
                        getPrinters();
                    }
                }
                
            }).catch(err =>{
                Swal.fire({
                    title: 'Error',
                    text: JSON.stringify(err.error),
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Please fill all the fields',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const [showEdit, setShowEdit] = React.useState(false);
    const handleCloseEdit = () => {
        setShowEdit(false);
        cleanAll();
    }

    const handleShowEdit = (row) => {
        setIpAddress(row.ip_address);
        handleDept(row.id_department);
        handleArea(row.id_area);
        setIdLine(row.id_line);
        setPrinterName(row.printer_name);
        setIdPrinter(row.id_printer);
        setShowEdit(true);
    }

    const handleSubmitEdit = () => {
        if(ipAddress && idLine && printerName){
            let data = {
                'ip_address': ipAddress,
                'printer_name': printerName,
                'id_line': idLine,
                'id_printer': idPrinter,
            }
            Printer.updatePrinter(data).then( (res) => {
                if(res.id_updated){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Imnpresora Actualizado!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cleanAll();
                    getPrinters();
                    handleCloseEdit();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al Modificar Impresora',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    cleanAll();
                    getPrinters();
                    handleCloseEdit();
                }
            })
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Verifique que los campos esten llenos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const getDptList = async () => {
        const data = await Department.getAllDepartments();
        setListDpt(data);
    }

    const handleDept = (e) => {
        if(e){
            setAreaList([]);
            setLineList([]);
            //setIdArea("");
            //setIdLine("");
            setIdDpt(e);
            const resp = Area.getAreaByDepartment(e);
            resp.then(res => {
            if(res.error){
                Swal.fire({
                title: 'Error',
                text: 'No hay Areas en ese Departamento',
                icon: 'error',
                confirmButtonText: 'OK'
                })
                setAreaList([]);
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
            setAreaList([]);
            });
        }else{
            setAreaList([]);
        }
    }
    const handleArea = (e) => {
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
            });
        }else{
            setIdArea('');
            setLineList([]);
        }
    }

    const deletePrinter = (e) => {
        Swal.fire({
            title: 'Estas seguro de Eliminar esta Impresora?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
            if (result.value) {
                Printer.deletePrinter(e.id_printer).then( res => {
                if(res.id_deleted){
                    Swal.fire(
                    'Eliminado!',
                    'La Impresora ha sido eliminada.',
                    'success'
                    )
                    getPrinters();
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

    
  const noCharacter = (e, option ) => {
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
        switch(option){
            case 1:
                onlyNumbers(e)
                break;
            case 2:
                setPrinterName(e)
                break;
        }
        // (e)
      }
    }
  }

  const onlyNumbers = (e) => {
    let  numbers = [1,2,3,4,5,6,7,8,9,0,'.']
    let isLetter = true;
    if(e.length){
      if(e.length <= 15){
        numbers.forEach(element => {
          if(element == e[e.length-1]){
            isLetter = false;
            setIpAddress(e)
          }      
        });
    
        if(isLetter){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Solo se permiten números y el punto (.)'
            });
        }
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se permiten más de 15 carácteres'
          });
      }
    }else{
        setIpAddress('')
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
                    <li className="active">Impresoras</li>
                    </ol>
                    {/* <!-- end breadcrumb -->
                    <!-- begin page-header --> */}
                    
                    {/* <!-- end page-header --> */}
                    <h1 className="page-title"><center>Impresoras</center></h1>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-inverse">
                                <div className="panel-heading">
                                    <div className="panel-heading-btn">
                                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                    </div>
                                    <h4 className="panel-title">Registrar Impresora</h4>
                                </div>
                                <div className="panel-body panel-form">
                                    <form className='form-horizontal form-bordered' onSubmit={addPrinter}>
                                        <fieldset>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">IP Address</label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" id="ipAddress" placeholder="0.0.0.0" value={ipAddress} onChange={(e) => noCharacter(e.target.value, 1)}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Nombre</label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" id="printerName" placeholder="" value={printerName} onChange={(e) => noCharacter(e.target.value, 2)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Departamento</label>
                                                        <div className="col-md-8">
                                                        <select className='form-control' value={idDpt} onChange={(e) => handleDept(e.target.value)}>
                                                            <option value=''>Seleccione</option>
                                                            {listDpt.map((item) => (
                                                            <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                                                            ))}
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Area</label>
                                                        <div className="col-md-8">
                                                            <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                                                                <option>Seleccione...</option>
                                                                {areaList.map((area) => (
                                                                    <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Linea</label>
                                                        <div className="col-md-8">
                                                            <select className='form-control' value={idLine} onChange={(e) => setIdLine(e.target.value)}>
                                                                <option>Seleccione...</option>
                                                                {lineList.map((line) => (
                                                                    <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className='form-group'>
                                            <center>
                                                <button type="button" className="btn btn-sm btn-primary m-r-5" onClick={addPrinter}>Agregar</button>
                                                <button type="reset" onClick={cleanAll} className="btn btn-sm btn-default m-r-5" >Limpiar</button>
                                                <button  className="btn btn-sm btn-danger" data-click="panel-collapse"  >Cancelar</button>
                                            </center>
                                            </div>
                                        </fieldset>
                                    </form>
                                    <br></br>
                                    <hr/>
                                    <TableContainer component={Paper} sx={{maxHeight:500}}>
                                        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                                            <TableHead 
                                            thstyle={{ fontSize: '35px',}}
                                            style={{ opacity: '0.9' }}
                                            >
                                                <TableRow>
                                                    <TableCell><h6><strong>#</strong></h6></TableCell>
                                                    <TableCell><h6><strong>IP Addres</strong></h6></TableCell>
                                                    <TableCell><h6><strong>Nombre</strong></h6></TableCell>
                                                    <TableCell><h6><strong>Area</strong></h6></TableCell>
                                                    <TableCell><h6><strong>Linea</strong></h6></TableCell>
                                                    <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                printerList.length>0?
                                                printerList
                                                .slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)    
                                                .map((row, index) => (                            
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.id_train}</h6>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.ip_address}</h6>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.printer_name}</h6>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.name_area}</h6>
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <h6>{row.name_ln}</h6>
                                                        </TableCell>
                                                        <TableCell align="center">                                                                        
                                                            <div className="align-left">
                                                                <Button  variant="contained" className="btn-sm btn-warning m-r-5" title="Editar" onClick={() => handleShowEdit(row)}>
                                                                    <i className="fa fa-pencil"></i>
                                                                </Button>
                                                                <Button  variant="contained" className="btn-sm btn-danger" title="Eliminar" onClick={() => deletePrinter(row)}>
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
                                                        <TableCell colSpan={6} align="center">
                                                            <p className="no-service-available">
                                                                {
                                                                    printerList.length>0 && printerList.length>0?
                                                                    'No se encontraron resultados'
                                                                    :'No hay Impresoras registradas'
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
                                            count={printerList.length}
                                            rowsPerPage={rowsPerPage2}
                                            page={page2}
                                            onPageChange={handleChangePage2}
                                            onRowsPerPageChange={handleChangeRowsPerPage2}
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
                    
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered
                    animation={false}
                    size="auto"
                >
                    <Modal.Header  >
                        <Modal.Title className="bg-gray text-center"><i className='fa fa-edit'></i>   Editar Tren</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label"> Ip Address:{' '}</label>
                                        <input type="text" className="form-control" id="ipAddress" placeholder=""  value={ipAddress} onChange={ (e) => setIpAddress(e.target.value) } />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"> Nombre:{' '}</label>
                                        <input type="text" className="form-control" id="printerName" placeholder=""  value={printerName} onChange={ (e) => setPrinterName(e.target.value) } />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"> Departamento:{' '}</label>
                                        <select className='form-control' value={idDpt} onChange={(e) => handleDept(e.target.value)}>
                                            <option value=''>Seleccione</option>
                                            {listDpt.map((item) => (
                                            <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"> Área:{' '}</label>
                                        <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                                            <option>Seleccione...</option>
                                            {areaList.map((area) => (
                                                <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"> Linea:{' '}</label>
                                        <select className='form-control' value={idLine} onChange={(e) => setIdLine(e.target.value)}>
                                            <option>Seleccione...</option>
                                            {lineList.map((line) => (
                                                <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleSubmitEdit}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
                </div>
            </>
        )
    }
}

export default PrinterPage