import React, { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import Components from '../../requests/Components';
import Product from '../../requests/Product';


const columns22 = [
  { field: 'SKU', headerName: 'SKU', width:300 },
  { field: 'SKU_DESC', headerName: 'Descripción', width: 400 },
  { field: 'ONHAND_QTY', headerName: 'Stock', width: 150 },
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


const ComponentPage = () => {
  const [idProduct, setIdProduct] = useState('');
  const [idComponent, setIdComponent] = React.useState('');
  const [pzsComp, setPzsComp] = React.useState('');
  const [componentList, setComponentList] = React.useState([]);
  const [selectComp, setSelectComp] = React.useState([]);
  const [productList2, setProductList2] = useState([]);
  const [kind, setKind] = useState('');


  const getComponentList = async () => {
    const resp2 = await Components.getComponentsWMS();
    setComponentList(resp2);
  }
  const getThermalComponents = async () => {
    const resp2 = await Components.getThermalWMS();
    setComponentList(resp2);
  }

  useEffect(  () => {
    
  }, [componentList]);

  const searchComponents = () => {
    switch(Number(kind)){
      case 1:
        getComponentList();
        break;
      case 2:
        getThermalComponents();
        break;
    }
  };
  
  const cleanAll = () => {
    setIdProduct('');
    setPzsComp('');
    setIdComponent('');
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
          <li className="active">Componentes</li>
        </ol>
        {/* <!-- end breadcrumb -->
        <!-- begin page-header --> */}
        
        <h1 className="page-title"><center>Componentes </center></h1>
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
                <h4 className="panel-title">Actuales</h4>
              </div>
              <div className="panel-body">
                <div className='row form-horizontal form-bordered'>
                  <div className='col-md-6'>
                    <div className="form-group">
                      <label className="control-label col-md-4">Seleccione División</label>
                      <div className="col-md-8">
                          <select className='form-control' onChange={(e) => setKind(e.target.value)} value={kind}>
                              <option value="">Seleccione una opción</option>
                              <option value={1}>Electrical</option>
                              <option value={2}>Thermal</option>
                          </select>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <button className='btn btn-primary m-t-15' onClick={searchComponents}>Buscar</button>
                    </div>
                  </div>
                </div>

                <hr/>
                <br/>
                      <Box sx={{ height: 900, width: 1 }}>
                          <DataGrid
                              rows={componentList}
                              columns={columns22}
                              getRowId={(row) => row.SKU}
                              sx={{ height: '100%', width: '100%', fontSize: '15px' }}
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
        {/* <!-- begin scroll to top btn --> */}
        <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
        {/* <!-- end scroll to top btn --> */}
      </div>
      
    </>
  )
}
}

export default ComponentPage