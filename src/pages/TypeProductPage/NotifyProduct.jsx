import React, { useEffect, useState } from 'react';
import TypeProduct from '../../requests/TypeProduct';
import Department from '../../requests/Department';
import Users from '../../requests/Users';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import { MultiSelect } from "react-multi-select-component";

const NotifyProduct = () => {
  
  const [nameProduct, setNameProduct] = useState('');
  const [plant, setPlant] = useState('');
  const [idTypeProduct, setIdTypeProduct] = useState('');
  const [typeProductList, setTypeProductList] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [listDpt, setListDpt] = useState([]);
  const [idDepartment, setIdDepartment] = useState('');
  const [idType, setIdType] = useState('');
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };


  const getTypeProductList = async () => {
    const resp2 = await TypeProduct.getAllTypeProducts();
    setTypeProductList(resp2);
    let resp = await TypeProduct.getAllTypeProducts();
    setTypesList(resp);
  };

  const getDepartments = async () => {
    const data = await Department.getAllDepartments();
    setListDpt(data);
  }
  const handleUsers = async (id) => {
    await Users.getUserDepartment(id).then( (res) => {
      if(!res.error){
        setUserList(res);
      }else{
        setUserList([{'label':'No Hay Usuarios', 'value':0}]);
      }
    }).catch( (error) => {
      setUserList([{'label':'No Hay Usuarios', 'value':0}]);
    });
  }

  

  useEffect(  () => {
    getTypeProductList();
    getDepartments();
  }, []);

  const AddTypeProduct = (e) => {
    e.preventDefault();
    if(nameProduct && plant){
      const prod = {
        "name_product": nameProduct,
        "plant_id": plant
      };
      TypeProduct.addTypeProduct(prod)
      .then(() => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Se ha agregado el Tipo de Producto',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        getTypeProductList();
        cleanAll();
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  const cleanAll = () => {
    setNameProduct('');
    setPlant('');
    setIdTypeProduct('');
  };
 
  const [showEdit, setShowEdit] = React.useState(false);
 
  const handleCloseEdit = () => {
    setShowEdit(false);
    cleanAll();
  };
  const handleShowEdit = (row) => {
    setIdTypeProduct(row.id_type_product);
    setNameProduct(row.name_product);
    setPlant(row.id_plant);
    setShowEdit(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(nameProduct && plant){
      const prod = {
        "name_product": nameProduct,
        "plant_id": plant,
        "id_type_product": idTypeProduct
      }
      TypeProduct.updateTypeProduct(prod).then(() => {
        Swal.fire({
          title: 'Success',
          text: 'TypeProduct has been edited',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        getTypeProductList();
        handleCloseEdit();
      }).catch(err => {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
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

  const DeleteTypeProduct = (e) => {
    Swal.fire({
      title: 'Esta seguro de Eliminar este Tipo de Producto?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El Tipo de Producto ha sido eliminado.',
          'success'
        )
        TypeProduct.deleteTypeProduct(e.id_type_product)
        .then(() => {
          getTypeProductList();
        })
        .catch(err => {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        })
      }
    })
  }
  if(!localStorage.getItem('token')){
    window.location.href = '/login'
  }else{
  return (
    <>
      <div id="content" className="content">
        {/* <!-- begin breadcrumb --> */}
        <br></br>
        <br></br>
        <ol className="breadcrumb pull-right">
          <li><a href="##">Home</a></li>
          <li><a href="##">Page Options</a></li>
          <li className="active">Plantas</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Notificación de Usuarios segun Departamento y Producto</center></h1>
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
                          <form onSubmit={AddTypeProduct} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Tipo de Producto</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setIdType(e.target.value)} value={idType}>
                                                        <option value="">Seleccione una opción</option>
                                                        {typesList.map((type, index) => (
                                                            <option key={index} value={type.id_type_product}>{type.name_product}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                  <label className="control-label col-md-4">Usuarios a Notificar</label>
                                                  <div className="col-md-8">
                                                      <MultiSelect
                                                        options={userList}
                                                        value={selectedUsers}
                                                        hasSelectAll={false}
                                                        
                                                        onChange={setSelectedUsers}
                                                        labelledBy="Seleccione"
                                                      />
                                                  </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                  <label className="control-label col-md-4">Departamento</label>
                                                  <div className="col-md-8">
                                                      <select className='form-control' onChange={(e) => handleUsers(e.target.value)}>
                                                          <option value=''>Seleccione</option>
                                                          {listDpt.map((item) => (
                                                              <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                                                          ))}
                                                      </select>
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
              <TableContainer component={Paper} sx={{maxHeight:700}}>
                          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                              <TableHead 
                                thstyle={{ fontSize: '35px'}}
                                style={{ opacity: '0.9' }}
                              >
                                  <TableRow>
                                      <TableCell><h6><strong>#</strong></h6></TableCell>
                                      <TableCell ><h6><strong>Nombre Producto</strong></h6></TableCell>
                                      <TableCell ><h6><strong>Planta</strong></h6></TableCell>
                                      <TableCell align="center"><h6><strong>Acciones</strong></h6></TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                              {
                                  typeProductList.length>0?
                                  typeProductList
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)    
                                  .map((row) => (
                                      <TableRow key={row.id_type_product}>
                                          <TableCell component="th" scope="row">
                                              <h6>{row.id_type_product}</h6>
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              <h6>{row.name_product}</h6>
                                          </TableCell>
                                          <TableCell >
                                              <h6>{row.name_plt}</h6>
                                          </TableCell>
                                          <TableCell align="center">
                                              <div className="align-left">
                                                  <Button onClick={() => handleShowEdit(row)} variant="contained" className="btn-sm btn-warning m-r-5">
                                                      <i className="fa fa-pencil"></i>
                                                  </Button>
                                                  <Button onClick={() => DeleteTypeProduct(row)} variant="contained" className="btn-sm btn-danger">
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
                                                      typeProductList.length>0 && typeProductList.length>0?
                                                      'No se encontraron resultados'
                                                      :'No hay Planes de Producción registrados'
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
                              count={typeProductList.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                          />
            </div>
          </div>
			  </div>
			</div>
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
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Tipo de Producto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="nameProduct">Tipo de Producto</label>
                    <input type="text" className="form-control" id="nameProduct" name="nameProduct" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                  <label htmlFor="idDepartment">Departamento</label>
                    <select className="form-control" id="idDepartment" name="idDepartment" value={idDepartment} onChange={(e) => setIdDepartment(e.target.value)} required>
                      <option value="">Seleccione un Departamento</option>
                      {listDpt.map((item) => (
                          <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                      ))}
                    </select>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmitEdit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
      
    </>
  )
}
}

export default NotifyProduct