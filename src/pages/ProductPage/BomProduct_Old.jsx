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
    { field: 'PARENT_PART_NO', headerName: 'No Part', width:200 },
    { field: 'COMPONET_PART_NO', headerName: 'Componente', width: 200 },
    //{ field: 'EFFECTIVE_DATE_TO', headerName: 'Fecha Rara', width: 300 },
    { field: 'QTY_PER_PARENT', headerName: 'Cantidad P/U', width: 150 },
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

    const [id_product_search, setId_product_search] = useState('');
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
      setId_product_search('');
      setComponentList('');
      setProductList2('');
    }

    
     
      const handleSearchProd = (e) => {
        setId_product_search(e.label);
      }

      const searchBom = async () => {
        Product.getDomoBom(id_product_search).then( (resp1) => {
            setComponentList(resp1);
          }
        ).catch(err => {
          setComponentList("");
          Swal.fire("No Existe BOM de este Producto ");
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
                          {/* <a href="##" className="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i className="fa fa-times"></i></a> */}
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
                                    defaultValue={id_product_search}
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
                                      getRowId={(row) => row.id}
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