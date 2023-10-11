import React, { useEffect } from 'react'
import Package from '../../requests/Package';
import Box from '@mui/material/Box';
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

const columns = [
    { field: 'package', headerName: 'Empaque', width: 160},
    { field: 'client', headerName: 'Cliente'},
    { field: 'lot_size', headerName: 'Lote'},
    { field: 'stock_plastic', headerName: 'Piso Plastico'},
    { field: 'stock_carton', headerName: 'Piso Carton'},
    { field: 'rent_plastic', headerName: 'Caja de Renta PL', width: 130},
    { field: 'rent_carton', headerName: 'Caja de Renta CR', width: 135},
    { field: 'total', headerName: 'Total'},
    { field: 'created_date', headerName: 'Fecha', width: 180},

]

const PackageHistory = () => {


    const [packList, setPackList] = React.useState([]);

    useEffect(() => {
    getLists();
    }, []);

    const getLists = async () => {
    const resp = await Package.getHistory();
    setPackList(resp);
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
                <li><a href="/kanban_system/home">Home</a></li>
                <li><a href="##">Page Options</a></li>
                <li className="active">Finish Good</li>
            </ol>
            {/* <!-- end breadcrumb -->
            <!-- begin page-header --> */}
            
            <h1 className="page-title"><center>Historial de Empaque</center></h1>
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
                                    rows={packList}
                                    columns={columns}
                                    getRowId={(row) => row.id_package_history}
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

export default PackageHistory