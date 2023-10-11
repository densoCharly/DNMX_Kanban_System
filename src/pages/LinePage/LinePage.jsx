import React, { useState, useEffect } from 'react'
import Line from '../../requests/Line';
import Area from '../../requests/Area';
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


const tableColumns = [
  { field: 'id_line', headerName: '#', width:80 },
  { field: 'name_ln', headerName: 'Nombre', width: 250 },
  { field: 'name_area', headerName: 'Area', width: 250 },
  { field: 'code', headerName: 'Código', width: 150 },
];

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


const LinePage = () => {
  const [nameLn, setNameLn] = useState('');
  const [idLine, setIdLine] = useState('');
  const [idArea, setIdArea] = useState('');
  const [lineList, setLineList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [codeScan, setCodeScan] = useState('');


  const getLineList = async () => {
    const resp2 = await Line.getTableLines();
    setLineList(resp2);
    
  };

  const getAreaList = async () => {
    const resp = await Area.getAllAreas();
    setAreaList(resp);
    
  }

  useEffect(  () => {
    getLineList();
    getAreaList();
  }, []);

  
  const [showEdit, setShoEdit] = useState(false);

  const handleCloseEdit = () => {
      setShoEdit(false);
      cleanAll();
  }
  const handleShowEdit = (row) => {
    setNameLn(row.name_ln);
    setIdArea(row.id_area);
    setIdLine(row.id_line);
    setCodeScan(row.code);
    setShoEdit(true);
  }

  const AddLine = (e) => {
    e.preventDefault();
    if(nameLn && idArea && codeScan){
      const data = {
        'name_ln': nameLn,
        'id_area': idArea,
        'code_scan': codeScan
      };
      Line.saveLine(data).then((res) => {
        console.log(data)
        if(res.error){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: JSON.stringify(res.error),
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Linea agregada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          getLineList();
          cleanAll();
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al agregar Lina!',
        });
      });
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if(nameLn && idArea && codeScan){
      const data = {
        "name_ln":nameLn,
        "id_area":idArea,
        "id_line":idLine,
        "code": codeScan,
      }
      Line.updateLine(data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Linea actualizada correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        getLineList();
        handleCloseEdit();
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al modificar Linea!',
        });
      });
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  const cleanAll = () => {
    setNameLn('');
    setIdArea('');
    setIdLine('');
    setCodeScan('');
  }

  const DeleteLine = () => {
    Swal.fire({
      title: 'Esta seguro de Eliminar esta Linea?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        Line.deleteLine(idLine).then(() => {
          Swal.fire(
            'Eliminado!',
            'La Linea ha sido eliminada.',
            'success'
          );
          getLineList();
          handleCloseEdit();
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al eliminar Linea!',
          });
        });
      }
    })
  }

  const noCharacter = (e, option) => {
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
              setNameLn(e);
              break;
            case 2:
              setCodeScan(e);
              break;
          }
        
      }
    }
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
          <li><a href="/home">Home</a></li>
          <li><a href="/home">Page Options</a></li>
          <li className="active">Lineas</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Lineas </center></h1>
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
                          <form onSubmit={AddLine} className='form-horizontal form-bordered'>
                                    <fieldset>
                                        {/* <legend>Defecto</legend> */}
                                        <div className='row'>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Nombre</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="nameLn" placeholder="Name"  value={nameLn} onChange={ (e) => noCharacter(e.target.value, 1) } />
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Código de Escaneo</label>
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" id="codeScan" placeholder="Code"  value={codeScan} onChange={ (e) => noCharacter(e.target.value, 2) } />
                                                </div>
                                              </div>
                                            </div>
                                            <div className='col-md-6'>
                                              <div className="form-group">
                                                <label className="control-label col-md-4">Area</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' onChange={(e) => setIdArea(e.target.value)} value={idArea}>
                                                        <option value=''>Seleccione</option>
                                                        {areaList.map((area) => (
                                                            <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
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
                      rows={lineList}
                      columns={tableColumns}
                      onRowClick={(params) => handleShowEdit(params.row)}
                      getRowId={(row) => row.id_line}
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
            Editar Línea de Producción
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <form>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="nameLn">Nombre</label>
                    <input type="text" className="form-control" id="nameLn" name="nameLn" value={nameLn} onChange={(e) => noCharacter(e.target.value, 1)} required/>
                  </div>
                  <div className="form-group">
                    <label>Área</label>
                    <select className="form-control" name="idArea" value={idArea} onChange={(e) => setIdArea(e.target.value)} required>
                      <option value="">Seleccione una opción</option>
                      {areaList.map((area) => (
                          <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="nameLn">Código de Escaneo</label>
                    <input type="text" className="form-control" id="codeScan" name="codeScan" value={codeScan} onChange={(e) => noCharacter(e.target.value, 2)} required/>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                <Button variant="secondary" className="btn btn-danger" onClick={DeleteLine}><i className='fa fa-trash'></i> Eliminar</Button>
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
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
      
    </>
  )
}
}

export default LinePage