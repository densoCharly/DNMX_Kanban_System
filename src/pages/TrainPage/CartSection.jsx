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
import { MultiSelect } from "react-multi-select-component";

const CartSection = (props) => {
    const [cartList, setCartList] = useState([]);
    const [cart, setCart] = useState('');
    const [idCArt, setIdCart] = useState('');
    const [typeCart, setTypeCart] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const getCarts = async () => {
        const resp = await Train.getCarts();
        setCartList(resp);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addCart = () => {
        if(cart && typeCart){
            let data = {
                'no_cart': cart,
                'type': typeCart
            }
            Train.addCart(data).then( (res) => {
                if(res.message){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Carro agregado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cleanAll();
                    getCarts();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al Agregar Carro',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ocurrio un error',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        }else{
            Swal.fire({
                title: 'Error',
                text: 'verifique que todos los campos esten llenos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    useEffect( () => {
        getCarts();
    }, []);

    const cleanAll = () => {
        setCart('');
        setTypeCart('');
        setIdCart('');
    }

    const [showEdit, setShowEdit] = React.useState(false);

    const handleEdit = (row) => {
        setCart(row.no_cart);
        setTypeCart(row.type);
        setIdCart(row.id_cart);
        setShowEdit(true);
    }

    const handleClose = () => {
        setShowEdit(false);
        cleanAll();
    }

    const handleSubmitEdit = () => {
        if(cart && typeCart){
            let data = {
                'no_cart': cart,
                'type': typeCart,
                'id_cart': idCArt
            }
            Train.updateCart(data).then( (res) => {
                if(res.id_updated){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Carro Actualizado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cleanAll();
                    getCarts();
                    handleClose();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al Actualizar Carro',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ocurrio un error',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        }else{
            Swal.fire({
                title: 'Error',
                text: 'verifique que todos los campos esten llenos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }

    const DeleteCart = (e) => {
        Swal.fire({
            title: 'Estas seguro de Eliminar este Carro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
            if (result.value) {
                Train.deleteCart(e.id_cart).then( res => {
                if(res.id_deleted){
                    Swal.fire(
                    'Eliminado!',
                    'El Carro ha sido eliminado.',
                    'success'
                    )
                    getCarts();
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

    
  const noCharacter = (e ) => {
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
        setCart(e)
      }
    }
  }

    return (
    <>
        <h1 className="page-title"><center>Carritos</center></h1>
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
                        <h4 className="panel-title">Registrar Carrito</h4>
                    </div>
                    <div className="panel-body panel-form">
                        <form onSubmit={addCart} className='form-horizontal form-bordered'>
                            <fieldset>
                                {/* <legend>Defecto</legend> */}
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label className="control-label col-md-4">Número</label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" id="plant" placeholder="C1" value={cart} onChange={e => noCharacter(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label className="control-label col-md-4">Tipo</label>
                                            <div className="col-md-8">
                                                <select className='form-control' value={typeCart} onChange={e => setTypeCart(e.target.value)}>
                                                    <option value="">Seleccione...</option>
                                                    <option value='1' >Rectificador</option>
                                                    <option value='2' >Frame</option>
                                                    <option value='3'>Stator</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className='form-group'>
                                <center>
                                    <button type="button" onClick={addCart} className="btn btn-sm btn-primary m-r-5" >Agregar</button>
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
                                <TableHead thstyle={{ fontSize: '35px'}}>
                                    <TableRow>
                                        <TableCell><h6><strong>No. Carro</strong></h6></TableCell>
                                        <TableCell><h6><strong>Tipo</strong></h6></TableCell>
                                        <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    cartList.length>0?
                                    cartList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                    .map((row) => (                            
                                        <TableRow key={row.id_cart}>
                                            <TableCell component="th" scope="row">
                                                <h6>{row.no_cart}</h6>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <h6>
                                                {
                                                    row.type==='1'?'Rectificador':
                                                    row.type==='2'?'Frame':
                                                    'Stator'
                                                }
                                                </h6>
                                            </TableCell>
                                            <TableCell align="center">                                                                        
                                                <div className="align-left">
                                                    <Button  variant="contained" className="btn-sm btn-warning m-r-5" title="Editar" onClick={ () => handleEdit(row)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </Button>
                                                    <Button  variant="contained" className="btn-sm btn-danger" title="Eliminar" onClick={ () => DeleteCart(row)}>
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
                                                        cartList.length>0 && cartList.length>0?
                                                        'No se encontraron resultados'
                                                        :'No hay Carros registrados'
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
                                count={cartList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                    </div>
                </div>
            </div>
        </div>
        <Modal show={showEdit}
                onHide={handleClose}
                size="auto"  
                style={{opacity:1}}  
                animation={false}
                aria-labelledby="contained-modal-title-vcenter" 
                centered 
                className='m-t-35'
            >
            <Modal.Header >
                <Modal.Title className="center">
                Editar Carro
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                <div className="col-md-12">
                    <form >
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="cart">No. Carro</label>
                            <input type="text" className="form-control" id="cart" name="cart" value={cart} onChange={ (e) => noCharacter(e.target.value) }/>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-4">Tipo</label>
                            <select className="form-control" id="typeCart" value={typeCart} onChange={ (e) => setTypeCart(e.target.value) }>
                                <option value="">Seleccione...</option>
                                <option value="1">Rectificador</option>
                                <option value="2">Frame</option>
                                <option value="3">Stator</option>
                            </select>
                        </div>
                    </fieldset>
                    </form>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn btn-danger" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" type="submit" form="form-edit" onClick={handleSubmitEdit}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default CartSection