import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Subassy from "../../requests/Subassy";
import Line from '../../requests/Line';
import Area from '../../requests/Area';
import TypeSA from '../../requests/TypeSA';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

console.log("HOLAT1");
const tableColumns = [
  { field: 'id_subassy', headerName: '#', width:80 },
  { field: 'no_subassy', headerName: 'No. Subensamble', width: 250 },
  { field: 'type_name', headerName: 'Tipo', width: 200 },
  { field: 'name_area', headerName: 'Area', width: 200 },
  { field: 'name_ln', headerName: 'Linea', width: 200 },
];
console.log("HOLAT2");
function quickSearchToolbar() {
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

console.log("HOLAT3");

const SubassyPage = () => {
  // console.log("HOLA1");
  const [noSubassy, setNoSubassy] = useState('');
  const [type, setType] = useState('');
  const [idArea, setIdArea] = useState('');
  const [idLine, setIdLine] = useState('');
  const [idSubassy, setIdSubassy] = useState('');  
  const [subassyList, setSubassyList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  // console.log("HOLAT4");

  const getSubassyList = async () => {
    const resp2 = await Subassy.getAllSubassys();
    setSubassyList(resp2);
    const resp = await TypeSA.getAllTypes();
    setTypeList(resp);
    
  };

  const getAreaList = async () => {
    const resp2 = await Area.getAllAreas();
    // console.log("HOLA");
    setAreaList(resp2);
    
  }  

  useEffect(  () => {
    getSubassyList();
    getAreaList();
  }, []);
  

  const addSubassy = (e) => {
    e.preventDefault();
    if(noSubassy && type && idLine){
      const data = {
        "no_subassy":noSubassy,
        "type":type,
        "id_line":idLine,
      }
      Subassy.saveSubassy(data).then( res => {
        if(res.inserted){
          Swal.fire({
            title: 'Success',
            text: 'Subassy Added',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          getSubassyList();
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
        text: 'Please fill all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };
  
  const [showEdit, setShowEdit] = React.useState(false);
 
  const handleCloseEdit = () => {
    setShowEdit(false);
    cleanAll();
  };
  const handleShowEdit = (e) => {
    setIdArea(e.id_area);
    setIdLine(e.id_line);
    setNoSubassy(e.no_subassy);
    setType(e.type);
    setIdSubassy(e.id_subassy);
    setLineList([]);
    const lines = Line.getLineByArea(e.id_area);
    lines.then(res => {
      setLineList(res);
    });
    setShowEdit(true);
  };

  const handleArea = (e) => {
    if(e){
      setIdArea(e);
      setLineList([]);
      const lines = Line.getLineByArea(e);
      lines.then(res => {
        setLineList(res);
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

  const cleanAll = () => {
    setNoSubassy('');
    setType('');
    setIdArea('');
    setIdLine('');
    setIdSubassy('');
  }

  const DeleteSubassy = () => {
    Swal.fire({
      title: 'Estas seguro de Eliminar este Subensamble?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Subassy.deleteSubassy(idSubassy).then( res => {
          if(res.id_deleted){
            Swal.fire(
              'Eliminado!',
              'El Subensamble ha sido eliminado.',
              'success'
            )
            getSubassyList();
            handleCloseEdit();
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

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(noSubassy && type && idLine){
      const data = {
        "no_subassy":noSubassy,
        "type":type,
        "id_line":idLine,
        "id_subassy":idSubassy,
      }
      Subassy.updateSubassy(data).then( res => {
        if(res.id_updated){
          Swal.fire({
            title: 'Success',
            text: 'Producto Actualizado!!!',
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

  const captureSubensamble = (e) => {
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
        setNoSubassy(e);
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
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Page Options</a></li>
            <li className="active">Subensamble</li>
          </ol>
          {/* <!-- end breadcrumb -->
          <!-- begin page-header --> */}
          
          <h1 className="page-title"><center>Subensambles</center></h1>
          {/* <!-- end page-header --> */}
          
          <div className="row">
              <div className="col-md-12">
                        <div className="panel panel-inverse">
                            <div className="panel-heading">
                                <div className="panel-heading-btn">
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" onClick={getSubassyList} data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                </div>
                                <h4 className="panel-title">Registrar</h4>
                            </div>
                            <div className="panel-body panel-form">
                            <form onSubmit={addSubassy} className='form-horizontal form-bordered'>
                                      <fieldset>
                                          <div className='row'>
                                              <div className='col-md-6'>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">No. Subensamble</label>
                                                  <div className="col-md-8">
                                                      <input type="text" className="form-control" id="noSubassy" placeholder="MX..."  value={noSubassy} onChange={ (e) => captureSubensamble(e.target.value) } />
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Tipo</label>
                                                  <div className="col-md-8">
                                                      <select className='form-control' value={type} onChange={(e) => setType(e.target.value)}>
                                                        <option value=''>Seleccione</option>
                                                        {typeList.map((type) => (
                                                              <option key={type.id_type_subassy} value={type.id_type_subassy}>{type.type_name}</option>
                                                          ))}
                                                      </select>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='col-md-6'>
                                              <div className="form-group">
                                                  <label className="control-label col-md-4">Área</label>
                                                  <div className="col-md-8">
                                                      <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                                                          <option value="">Seleccione una opción</option>
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
                                                          <option value="">Seleccione una opción</option>
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
              <Box sx={{ height: 900, width: 1 }}>
                  <DataGrid
                      rows={subassyList}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_subassy}
                      sx={{ height: '100%', width: '100%', fontSize: '15px' }}
                      initialState={{
                      filter: {
                          filterModel: {
                          items: [],
                          quickFilterLogicOperator: GridLinkOperator.Or,
                          },
                      },
                      }}
                      components={{ Toolbar: quickSearchToolbar }}
                  />
              </Box>
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
                        <input type="text" className="form-control" id="noSubassy" name="noSubassy" value={noSubassy} onChange={(e) => captureSubensamble(e.target.value)} required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor='type'>Tipo</label>
                        <select className='form-control' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value=''>Seleccione</option>
                            <option value='1'>Rectificador</option>
                            <option value='2'>Regulador</option>
                            <option value='3'>Drive Frame</option>
                            <option value='4'>Rear Frame</option>
                            <option value='5'>Stator</option>
                            <option value='6'>Rotor</option>
                            <option value='7'>Slip Ring</option>
                            <option value='8'>Shaft Washing</option>
                            <option value='9'>Coil</option>
                            <option value='10'>Bobbin</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="area">Área</label>
                        <select className="form-control" id="area" name="area" value={idArea} onChange={(e) => handleArea(e.target.value)} required>
                          <option value="">Seleccione una opción</option>
                          {areaList.map((area) => (
                              <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="linea">Línea</label>
                        <select className='form-control' value={idLine} onChange={(e) => setIdLine(e.target.value)} required>
                            <option value="">Seleccione una opción</option>
                            {lineList.map((line) => (
                                <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                            ))}
                        </select>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                  <Button variant="secondary" className="btn btn-danger" onClick={DeleteSubassy}><i className='fa fa-trash'></i> Eliminar</Button>
                </Grid>
                <Grid xs={4} md={2} mdOffset="auto">
                  <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>Cancelar</Button>
                </Grid>
                <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                  <Button variant="primary" type="submit" form="form-edit" onClick={handleSubmitEdit}>Guardar</Button>
                </Grid>
              </Grid>
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

export default SubassyPage