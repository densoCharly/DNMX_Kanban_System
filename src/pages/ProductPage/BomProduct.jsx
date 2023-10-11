import React, {useState, useEffect} from 'react'
import Product from '../../requests/Product';
import Components from '../../requests/Components';
import Swal from 'sweetalert2';
import Select from 'react-select';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLinkOperator,
  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const tableColumns = [
    { field: 'no_part', headerName: 'No Part', width:200 },
    { field: 'model', headerName: 'Familia', width:100 },
    { field: 'sku', headerName: 'Componente', width: 200 },
    { field: 'sku_desc', headerName: 'Comp. Desc.', width: 300 },
    { field: 'qty_pc', headerName: 'Cantidad P/U', width: 150 },
    { field: 'on_hand_qty', headerName: 'Almacen', width: 150 },
    { field: 'producible', headerName: 'Producibles', width: 150 },
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

const BomProduct = () => {

    const [idProductSearch, setIdProductSearch] = useState('');
    const [componentList, setComponentList] = useState([]);
    const [selectComp, setSelectComp] = useState([]);
    const [productList2, setProductList2] = useState([]);

    const getSelects = async () => {
        const resp = await Product.getSelectsPack();
        setProductList2(resp);
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
      setIdProductSearch('');
      setComponentList('');
      setProductList2('');
    }


      const handleSearchProd = (e) => {
        setIdProductSearch(e.value);
      }

      const searchBom = async () => {
        Swal.fire({
          title: 'Consultando...',
          position: 'center',
          allowEscapeKey:false,
          allowOutsideClick:false,
          didOpen: () => {
            Swal.showLoading();
            Product.getCompleteBom(idProductSearch).then((res) => {
              if(!res.error){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'BOM Consultado Correctamente',
                  showConfirmButton: true,
                });
                setComponentList(res);
              }else{
                setComponentList("");
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'No Existe BOM',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            }
            ).catch(err => {
              console.error(err);
              setComponentList("");
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No Existe BOM',
                showConfirmButton: false,
                timer: 1500
              });
            });
          }
        });
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
                <li><a href="/home">Home</a></li>
                <li><a href="/home">Page Options</a></li>
                <li className="active">Componentes</li>
                </ol>
                {/* <!-- end breadcrumb -->
                <!-- begin page-header --> */}
                
                <h1 className="page-title"><center>BOM No. Parte </center></h1>
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
                        <h4 className="panel-title">Buscar BOM</h4>
                      </div>
                      <div className="panel-body">
                        <form className='form-horizontal form-bordered'>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className="form-group">
                                <label className="control-label col-md-4">Número de Parte</label>
                                <div className="col-md-8">
                                  <Select
                                    options={productList2}
                                    defaultValue={idProductSearch}
                                    onChange={handleSearchProd}
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
                                      columns={tableColumns}
                                      //onRowClick={(params) => handleDelete(params)}
                                      getRowId={(row) => row.id_product_component}
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
              </div>
        </>
    )
}
}

export default BomProduct