import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import LocalComponents from '../../requests/LocalComponents';
import Train from '../../requests/Train';
import AsignPage from '../TrainPage/AsignPage';


const ShoppingRoute = () => {
    const [idShoppingList, setIdShoppingList] = useState(0);
    const [tableList, setTableList] = useState(false);
    const [componentsList, setComponentsList] = useState([]);
    const [viewList, setViewList] = useState(true);
    const [idCloseList, setIdCloseList] = useState([]);
    const [codeTrain, setCodeTrain] = useState('');
    const [freeCode, setFreeCode] = useState('');
    const [transitCode, setTransit_code] = useState('');

    useEffect(() => {
        
    }, [componentsList]);

    const getComponents = async () => {
        const data = await Train.getComponentsByTrain(codeTrain).catch((err) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err,
                showConfirmButton: false,
                timer: 2500
            });
        });
        if(data.error){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: data.error,
                showConfirmButton: false,
                timer: 2500
            });
        }else{
            data.sort((x, y) => x.kind.localeCompare(y.kind))
            setComponentsList(data);
            setIdShoppingList(data[0].id_shopping_list);
            setTableList(true);
            setViewList(false);
        }
    }

    const closeList = () => {
        LocalComponents.closeList(idShoppingList, idCloseList).then((res) => {
            if(res.message){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 2500
                })
                setTableList(false);
                setViewList(true);
                cleanState();
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Terminar Lista',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al Terminar Lista',
                showConfirmButton: false,
                timer: 2500
            });
        });
    }

    const partialClose = (event) => {
        setIdCloseList(event);
    }

    const freeTrain = (e) => {
        setFreeCode(e);
        if(e){
            Train.releaseTrain(e).then((res) => {
                if(res.id_updated)
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Tren '+e+' Liberado Correctamente',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    cleanState();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al Liberar Tren '+e,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    cleanState();
                }
            }).catch((err) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Liberar Tren '+e,
                    showConfirmButton: false,
                    timer: 2500
                });
                cleanState();
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Escanee un Código de Tren',
                showConfirmButton: false,
                timer: 2500
            });
        }
    }

    const setTransitTrain = (e) => {
        setTransit_code(e);
        if(e){
            Train.setTransitTrain(e).then((res) => {
                if(res.id_updated)
                {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Tren '+e+' Puesto en Transito',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    cleanState();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al poner en Transito el Tren '+e,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    cleanState();
                }
            }).catch((err) => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al poner en Transito el Tren '+e,
                    showConfirmButton: false,
                    timer: 2500
                });
                cleanState();
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Escanee un Código de Tren',
                showConfirmButton: false,
                timer: 2500
            });
        }
    }


    const cleanState = () => {
        setComponentsList('');
        setIdCloseList('');
        setCodeTrain('');
        setTransit_code('');
        setFreeCode('');
    }

    return (
        <>
            <div id="content" className="content">
                {/* <!-- begin breadcrumb --> */}
                <br></br>
                <br></br>
                <br></br>
                <ol className="breadcrumb pull-right">
                <li><a href="/kanban_system/lineRoute">Línea</a></li>
                <li><a href="/kanban_system/shoppingLists">Logistica</a></li>
                <li className="active">Materialista Ruta</li>
                </ol>
                {/* <!-- end breadcrumb -->
                <!-- begin page-header --> */}
                <h1 className="page-title"><center>Shopping Lists</center></h1>
                {/* <!-- end page-header --> */}
                <div>
                    <AsignPage />
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
                                    <h4 className="panel-title">Transito</h4>
                                </div>
                                <div className="panel-body">
                                
                                <br/>
                                <div>
                                    <form className='form-horizontal form-bordered'>
                                        <fieldset>
                                            <h4>Tren en Transito</h4>
                                            <hr/>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Código de Tren</label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" id="transitCode" value={transitCode} onChange={(e) => setTransitTrain(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </fieldset>
                                    </form>
                                </div>
                                
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
                                    <h4 className="panel-title">Liberar</h4>
                                </div>
                                <div className="panel-body">
                                
                                <br/>
                                <div>
                                    <form className='form-horizontal form-bordered'>
                                        <fieldset>
                                            <h4>Liberar Tren de Shopping</h4>
                                            <hr/>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-4">Código de Tren</label>
                                                        <div className="col-md-8">
                                                            <input type="text" className="form-control" id="freeCode" value={freeCode} onChange={(e) => freeTrain(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </fieldset>
                                    </form>
                                </div>
                                
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

export default ShoppingRoute