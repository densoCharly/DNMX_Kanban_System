import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ThemeProvider, createTheme } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi";
import FormHelperText from '@mui/material/FormHelperText';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import config from '../../requests/config';

const theme = createTheme({
    components: {
      // Name of the component
        MuiTableRow: {
            styleOverrides: {
            // Name of the slot
                root: {
                    // Some CSS
                    backgroundColor: '#00ff00',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#ffff',
                }
            }
        }
    },
});

const themeBlank = createTheme({
    components: {
      // Name of the component
        MuiTableRow: {
            styleOverrides: {
            // Name of the slot
                root: {
                    // Some CSS
                    backgroundColor: '#ffff',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#000',
                }
            }
        }
    },
});

const DownList = (props) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [showList, setShowList] = useState([]);
    const [car, setCar] = useState('');
    const [boxScan, setBoxScan] = useState('');
    const [locationScan, setLocationScan] = useState('');
    const [validate, setValidate] = useState(false);
    const [photo, setPhoto] = useState('');
    const url = config.componentURL();
    const locationRef = useRef(null);
    const componentRef = useRef(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if(props.viewList){
            setShowList('');
            setCar('');
        }
    })

    const handleList = (scan) => {
        if(scan){
            let parts = scan.split(',');
            setCar(parts[0]);
            if(parts[1]){
                let resp = props.componentsList;
                let cleanResp=[];
                resp.map((item) => {
                    if(item.kind===parts[1].trim()){
                        cleanResp.push(item);
                    }
                });
                let id_list = []
                cleanResp.map((item) => {id_list.push(item)})
                props.partialClose(id_list);
                setShowList(cleanResp);
                setLocationScan('');
                locationRef.current.focus();
            }
        }
    }

    const handleLocation = (e) => {
        var fill = false;
        showList.map((item) => {
            if(item.sku.includes(e)){
                setLocationScan(e);
                setValidate(true);
                fill=true;
                componentRef.current.focus();
            }
        });
        if(!fill){
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Esta ubicación no se encuentra en tu lista a surtir',
                showConfirmButton: false,
                timer: 3000
            });
        }
    }

    const handleScan = (e) => {
        if(validate && locationScan){
            let newList=[];
            newList = showList.map((item) => {
                if(e.includes(item.sku)){
                    if(parseInt(item.no_boxes,10)===parseInt(item.full_boxes,10)){
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Ya has dejado todas las cajas necesarias de este componente',
                            showConfirmButton: false,
                            timer: 2500
                        });
                        setLocationScan('');
                        setValidate(false);
                    }else{
                        if(item.sku.includes(locationScan)){
                            item.no_boxes = parseInt(item.no_boxes,10)+1;
                            if(parseInt(item.no_boxes,10)===parseInt(item.full_boxes,10)){
                                setLocationScan('');
                                locationRef.current.focus();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Dejaste todas las cajas correctamente',
                                    showConfirmButton: false,
                                    timer: 2500,
                                    didClose: () => {locationRef.current.focus()},
                                });
                            }
                        }else{
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: 'El Componente Escaneado no Pertenece a la ubicación',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            setLocationScan('');
                            setValidate(false);
                            locationRef.current.focus();
                        }
                    }
                }
                return item;
            });
            props.partialClose(newList);
            setShowList(newList);
        }else{
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No hay componentes Compatibles en esta Ubicación',
                showConfirmButton: false,
                timer: 4500
            });
            setLocationScan('');
            setValidate(false);
        }
    }

    const [showImage, setShowImage] = React.useState(false);

    const handleCloseImage = () => {
        setShowImage(false);
        setPhoto('');
    }
    const handleShowImage = (img) => {
        setPhoto(img);
        setShowImage(true);
    }

    const cleanAll = () => {
        setCar('');
        setLocationScan('');
        setBoxScan('');
        setShowList([]);
    }

    return (
        <>
        <div className='row'>
            <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-4">Selecciona Carrito</label>
                    <div className="col-md-8">
                        {/* <select className="form-control" value={car} onChange={ (e) => setCar(e.target.value) }>
                            <option value=''>Seleccione</option>
                            <option value="Rectificador">Rectificador</option>
                            <option value="Frame">Frame</option>
                            <option value="Stator">Stator</option>
                        </select> */}
                        <input type="text" className="form-control" id="carScan" autoFocus value={car} onChange={(e) => handleList(e.target.value)}/>
                        <FormHelperText>Required</FormHelperText>
                    </div>
                </div>
                
            </div>
            {/* <div className='col-md-2'>
                <button className='btn btn-primary' onClick={handleList}>Listar</button>
            </div> */}
            <div className="col-md-6">
                <div className="form-group">
                    <label className="control-label col-md-3">Escanea Ubicación</label>
                    <div className="col-md-8">
                        <input type="text" className="form-control" id="locationScan" ref={locationRef} value={locationScan} onChange={(e) => handleLocation(e.target.value)}/>
                        <FormHelperText>Required</FormHelperText>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-md-3">Escanea Caja</label>
                    <div className="col-md-8">
                        <input type="text" className="form-control" id="boxScan" ref={componentRef} value={boxScan} onChange={(e) => handleScan(e.target.value)}/>
                        <FormHelperText>Required</FormHelperText>
                    </div>
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-sm btn-default' onClick={cleanAll}>Limpiar</button>
                </div> 
            </div>
            
        </div>
        <hr></hr>
        <div>
            <TableContainer component={Paper} sx={{maxHeight:1000}}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                    <TableHead 
                        thstyle={{ fontSize: '35px'}}
                    >
                        <TableRow >
                            <TableCell><h6><strong>Cajas</strong></h6></TableCell>
                            <TableCell><h6><strong>Cajas a Tomar</strong></h6></TableCell>
                            <TableCell><h6><strong>SKU DESC</strong></h6></TableCell>
                            <TableCell><h6><strong>SKU</strong></h6></TableCell>
                            <TableCell><h6><strong>Pzs/Caja</strong></h6></TableCell>
                            <TableCell align="center"><h6><strong>Carro</strong></h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        showList.length>0?
                        showList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                        .map((row, index) => (                            
                            <ThemeProvider theme={row.no_boxes==row.full_boxes? theme:themeBlank}>
                                <TableRow key={row.id_component_shopping} >
                                    <TableCell >
                                        <h6>{row.full_boxes}</h6>
                                    </TableCell>
                                    <TableCell >
                                        <h6>{row.no_boxes}</h6>
                                    </TableCell>
                                    <TableCell >
                                        <h6>{row.sku_desc}</h6>
                                    </TableCell>
                                    <TableCell >
                                        <h6>{row.sku}</h6>
                                    </TableCell>
                                    <TableCell >
                                        <h6>{row.qty_box}</h6>
                                    </TableCell>
                                    <TableCell >
                                        <h6><strong>{row.kind}</strong></h6>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleShowImage(row.photo)} variant="contained" size='sm' className="btn-primary" title="Ver">
                                            <i className="fa fa-eye"></i>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </ThemeProvider>
                            )
                        )
                        :
                        (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <p className="no-service-available">
                                        {
                                            props.componentsList.length>0 && props.componentsList.length>0?
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
                    rowsPerPageOptions={[ 5, 10, 15, 20]}
                    component="div"
                    count={showList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
        <div>
            <Modal
                show={showImage} 
                onHide={handleCloseImage} 
                size="auto"  
                style={{opacity:1}}  
                animation={false}
                aria-labelledby="contained-modal-title-vcenter" 
                centered 
                className='m-t-35'
            >
                <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Foto
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <center>
                        <img alt="" width="200px" src={url+photo}></img>
                    </center>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="contained" color="secondary" className='btn btn-danger' onClick={handleCloseImage}>
                    Cerrar
                </Button>
                
                </Modal.Footer>
            </Modal>
        </div>
        </>
    )
}

export default DownList