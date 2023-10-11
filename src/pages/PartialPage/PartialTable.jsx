import React, { useEffect, useState } from 'react'
import Product from '../../requests/Product';
import Components from '../../requests/Components';
import Subassy from '../../requests/Subassy';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Switch } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import TableFilter from '../../components/TableFilter';
import Partial from '../../requests/Partial';
import Line from '../../requests/Line';

const PartialTable = () => {
    const [component, setComponent] = React.useState('');
    const [idLine, setIdLine] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [listLine, setListLine] = React.useState([]);
    const [listPartial, setListPartial] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [idPartial, setIdPartial] = useState('');

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
        const data2 = await Partial.getTableData();
        setListPartial(data2);
    }

    const [showEdit, setShowEdit] = React.useState(false);

    const handleCloseEdit = () => {
        setShowEdit(false);
        cleanAll();
    }
    const handleShowEdit = async (row) => {
        setIdPartial(row.id_partial_component);
        setIdLine(row.id_line);
        setComponent(row.component);
        const resp = await Line.getLineByArea(row.id_area);
        setListLine(resp);
        setStock(row.stock);
        setShowEdit(true);
    }

    const cleanAll = () => {
        setIdLine('');
        setComponent('');
        setStock('');
    }

    const DeletePartial = (e) => {
        Swal.fire({
            title: 'Esta seguro de Eliminar este Parcial?',
            text: "No podra revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
            if (result.value) {
                Partial.deletePartial(e.id_partial_component).then(() => {
                Swal.fire(
                    'Eliminado!',
                    'El Parcial ha sido Eliminado.',
                    'success'
                )
                getLists();
                }).catch(() => {
                Swal.fire(
                    'Ocurrio un error',
                    'El Parcial no ha sido Eliminado.',
                    'error'
                )
                })
            }
        })
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        if(component && idLine && stock){
            const data = {
                "component":component,
                "id_line":idLine,
                "stock":stock,
                "id": idPartial,
            }
            Partial.updatePartial(data).then(() => {
                Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Parcial actualizado!',
                showConfirmButton: false,
                timer: 1500
                })
                handleCloseEdit();
                getLists();
            }).catch(() => {
                Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ocurrio un error',
                showConfirmButton: false,
                timer: 1500
                })
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifique que todos los campos esten llenos',
            })
        }
    }

    return (
        <div>
            <TableContainer component={Paper} sx={{maxHeight:700}}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                    <TableHead 
                        thstyle={{ fontSize: '35px'}}
                    >
                        <TableRow>
                            <TableCell><h6><strong>Componente</strong></h6></TableCell>
                            <TableCell ><h6><strong>Cantidad</strong></h6></TableCell>
                            <TableCell ><h6><strong>Linea</strong></h6></TableCell>
                            <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        listPartial.length>0?
                        listPartial
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                        .map((row, id_partial_component) => (                            
                            <TableRow key={id_partial_component}>
                                <TableCell component="th" scope="row">
                                    <h6>{row.component}</h6>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <h6>{row.stock}</h6>
                                </TableCell>
                                <TableCell >
                                    <h6>{row.name_ln}</h6>
                                </TableCell>
                                <TableCell align="center">                                                                        
                                    <div className="align-left">
                                        <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-5" title="Editar">
                                            <i className="fa fa-pencil"></i>
                                        </Button>
                                        <Button onClick={() => DeletePartial(row)} variant="contained" className="btn-sm btn-danger" title="Eliminar">
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
                                <TableCell colSpan={4} align="center">
                                    <p className="no-service-available">
                                        {
                                            listPartial.length>0 && listPartial.length>0?
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
                    count={listPartial.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
                show={showEdit} 
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
                    Editar Area
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                    <form >
                        <fieldset>
                        <div className="form-group">
                            <label htmlFor="name_area">Componente</label>
                            <input type="text" className="form-control" id="component" name="component" value={component} onChange={(e) => setComponent(e.target.value)} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name_area">Cantidad de Piezas</label>
                            <input type="number" className="form-control" id="stock" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idLine">Linea</label>
                            <select className="form-control" id="idLine" name="idLine" value={idLine} onChange={(e) => setIdLine(e.target.value)} required>
                            <option value="">Seleccione una Linea</option>
                            {listLine.map((item) => (
                                <option key={item.id_line} value={item.id_line}>{item.name_ln}</option>
                            ))}
                            </select>
                        </div>
                        </fieldset>
                    </form>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="contained" color="secondary" className='btn btn-danger' onClick={handleCloseEdit}>
                    Cancelar
                </Button>
                <Button variant="primary" color="primary" type="submit" onClick={handleSubmitEdit}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PartialTable