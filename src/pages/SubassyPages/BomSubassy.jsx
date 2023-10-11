import React, {useState, useEffect} from 'react'
import Subassy from '../../requests/Subassy';
import Components from '../../requests/Components';
import Swal from 'sweetalert2';
import Select from 'react-select';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLinkOperator,
  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const columns22 = [
    { field: 'no_subassy', headerName: 'No Subassy', width:200 },
    { field: 'id_component', headerName: 'Componente', width: 200 },
    { field: 'sku_desc', headerName: 'Comp. Desc.', width: 300 },
    { field: 'pcs_total', headerName: 'Cantidad P/U', width: 150 },
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

const BomSubassy = () => {

    const [idSubassy, setIdSubassy] = useState('');
    const [idSubassySearch, setIdSubassySearch] = useState('');
    const [idComponent, setIdComponent] = useState('');
    const [pzsComp, setPzsComp] = useState('');
    const [skuDesc, setSkuDesc] = useState('');
    const [componentList, setComponentList] = useState([]);
    const [selectComp, setSelectComp] = useState([]);
    const [subassyList, setSubassyList] = useState([]);

    const getComponentList = async () => {
        const resp1 = await Subassy.getSubComponent();
        setComponentList(resp1);
    }
    const getSelects = async () => {
        const resp = await Subassy.getSelectsSub();
        setSubassyList(resp);
        const resp2 = await Components.getSelectSKU();
        resp2.forEach(element => {
          selectComp.push({value:element.SKU, label:element.SKU+" -- "+element.SKU_DESC, sku_desc:element.SKU_DESC});
        });
        //setSelectComp(resp2);
    }
    
    useEffect(  () => {
        //getComponentList();
        getSelects();
    }, []);

    const cleanAll = () => {
        setIdSubassy('');
        setPzsComp('');
        setIdComponent('');
    }

    const AddSubComponent = (e) => {
        e.preventDefault();
        if (idSubassy && idComponent && pzsComp) {
          const data = {
            "id_component": idComponent,
            "id_subassy": idSubassy,
            "pcs_total": pzsComp,
            "sku_desc": skuDesc
          }
          Subassy.addSubComponent(data).then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Componente agregado a Producto correctamente',
              showConfirmButton: false,
              timer: 1500
            })
            //getComponentList();
            cleanAll();
          }).catch(err => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error al agregar el componente',
              showConfirmButton: false,
              timer: 1500
            });
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Verifique que todos los campos esten llenos',
            showConfirmButton: false,
            timer: 1500
          });
        }
    };
    
    const handleFamProd = (e) => {
        setIdSubassy(e.value);
    }
    const handleSubSearch = (e) => {
      setIdSubassySearch(e.value);
    }
    const handleComp = (e) => {
        setIdComponent(e.value);
        setSkuDesc(e.sku_desc);
    }

    const searchBom = async () => {
      Subassy.getBomSubassy(idSubassySearch).then( (resp1) => {
          setComponentList(resp1);
        }
      ).catch(err => {
        setComponentList("");
        Swal.fire("No Existe BOM de este Subassy");
      });
    }

    const handleDelete = (param) =>{
      Swal.fire({
        title: '<strong>Eliminar</strong>',
        icon: 'warning',
        html:
          '¿Quieres eliminar el componente <b>'+ param.row.id_component +'</b>, ' +
          'del Subensamble <b>' + param.row.no_subassy +
          '</b>?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i className="fa fa-trash"></i> Si, Eliminar!',
        confirmButtonAriaLabel: 'Eliminar!',
        confirmButtonColor:'#3085d6',
        cancelButtonText:
          'Cerrar',
        cancelButtonAriaLabel: 'Cerrar'
      }).then((result) => {
        if(result.value){
          Subassy.deleteSubComponent(param.row.id_subassy_component)
          .then(res => {
            if(res.id_deleted){
              Swal.fire({
                icon: 'success',
                title: 'Componente Eliminado!',
                showConfirmButton: false,
                timer: 1500
              })
              searchBom();
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
        }
      })
    }

    const pruebaURL = () =>{
      Subassy.pruebaURL();
    }
  
    if(!localStorage.getItem('token')){
        window.location.href = '/kanban_system/login'
    }else{
        return (
          <>
            <div id="content" className="content">
              <br></br>
              <br></br>
              <ol className="breadcrumb pull-right">
                <li>
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/home">Page Options</a>
                </li>
                <li className="active">Componentes</li>
              </ol>
              {/* <!-- end breadcrumb -->
                <!-- begin page-header --> */}

              <h1 className="page-title">
                <center>BOM Subassy </center>
              </h1>
              {/* <!-- end page-header --> */}

              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-inverse">
                    <div className="panel-heading">
                      <div className="panel-heading-btn">
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand">
                          <i className="fa fa-expand"></i>
                        </a>
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload">
                          <i className="fa fa-repeat"></i>
                        </a>
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse">
                          <i className="fa fa-minus"></i>
                        </a>
                      </div>
                      <h4 className="panel-title">Registrar</h4>
                    </div>
                    <div className="panel-body panel-form">
                      <form onSubmit={AddSubComponent} className="form-horizontal form-bordered">
                        <fieldset>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-4">No. Subassy</label>
                                <div className="col-md-8">
                                  <Select
                                    options={subassyList}
                                    defaultValue={idSubassy}
                                    onChange={handleFamProd}
                                    id="select_product"
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-md-4">SKU Componente</label>
                                <div className="col-md-8">
                                  <Select
                                    options={selectComp}
                                    defaultValue={idComponent}
                                    onChange={handleComp}
                                    id="select_component"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-4">Cantidad</label>
                                <div className="col-md-8">
                                  <input type="number" className="form-control" id="pzsComp" placeholder="0" value={pzsComp} onChange={(e) => setPzsComp(e.target.value)} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <center>
                              <button type="submit" className="btn btn-sm btn-primary m-r-5">Agregar</button>
                              <button type="reset" onClick={cleanAll} className="btn btn-sm btn-default m-r-5">Limpiar</button>
                              <button className="btn btn-sm btn-danger" data-click="panel-collapse">Cancelar</button>
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
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand">
                          <i className="fa fa-expand"></i>
                        </a>
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload">
                          <i className="fa fa-repeat"></i>
                        </a>
                        <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse">
                          <i className="fa fa-minus"></i>
                        </a>
                      </div>
                      <h4 className="panel-title">Actuales</h4>
                    </div>
                    <div className="panel-body">
                      <form className='form-horizontal form-bordered'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className="form-group">
                            <label className="control-label col-md-4">No. Subassy</label>
                                <div className="col-md-8">
                                  <Select
                                    options={subassyList}
                                    defaultValue={idSubassySearch}
                                    onChange={handleSubSearch}
                                    id="select_product"
                                  />
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className="form-group">
                              <div className="col-md-8">
                                <button type="button" onClick={searchBom} className="btn btn-sm btn-primary m-r-5" >Buscar</button>
                              </div>
                            </div>                                  
                          </div>
                        </div>
                      </form>
                      <br></br>
                      <Box sx={{ height: 900, width: 1 }}>
                        <DataGrid
                          rows={componentList}
                          columns={columns22}
                          onRowClick={(params) => handleDelete(params)}
                          getRowId={(row) => row.id_subassy_component}
                          sx={{
                            height: "100%",
                            width: "100%",
                            fontSize: "15px",
                          }}
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
          </>
        );
    }
}

export default BomSubassy