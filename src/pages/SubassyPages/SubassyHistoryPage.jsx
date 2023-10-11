import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Subassy from "../../requests/Subassy";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';


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

const tableColumns = [
    { field: 'id_subassy_history', headerName: '#' },
    { field: 'no_subassy', headerName: 'No. Subassy', width: 200 },
    { field: 'type_name', headerName: 'Tipo', width: 150 },
    { field: 'name_ln', headerName: 'Linea', width: 150 },
    { field: 'stock', headerName: 'Existencias', width: 150 },
    { field: 'created_at', headerName: 'Actualizado', width: 200 },
]

const SubassyHistory = () => {
    const [subassyList, setSubassyList] = React.useState([]);

    const getSubassyList = async () => {
        const resp2 = await Subassy.getHistory();
        setSubassyList(resp2);
      };
    
      useEffect(  () => {
        getSubassyList();
      }, []);
    
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
            
            <h1 className="page-title"><center>Historial de Subensambles</center></h1>
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
                    <Box sx={{ height: 900, width: 1 }}>
                        <DataGrid
                            rows={subassyList}
                            columns={tableColumns}
                            getRowId={(row) => row.id_subassy_history}
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
    );
}

export default SubassyHistory