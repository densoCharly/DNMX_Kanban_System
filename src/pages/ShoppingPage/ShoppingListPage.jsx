import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import LocalComponents from '../../requests/LocalComponents';
import Train from '../../requests/Train';
import ComponentsList from './ComponentsList';

const ShoppingListPage = () => {
    const [idShoppingList, setIdShoppingList] = useState(0);
    const [tableList, setTableList] = useState(false);
    const [componentsList, setComponentsList] = useState([]);
    const [viewList, setViewList] = useState(true);
    const [idCloseList, setIdCloseList] = useState([]);
    const [codeTrain, setCodeTrain] = useState('');

    useEffect(() => {
        
    }, [componentsList]);

    const getComponents = async (id) => {
        setCodeTrain(id);
        if(id!=""){
              await Train.getComponentsByTrain(id).then((res) => {
                    
                    if(res.length > 0){
                        res.sort((x, y) => x.kind.localeCompare(y.kind))
                        setComponentsList(res);
                        setIdShoppingList(res[0].id_shopping_list);
                        setTableList(true);
                        setViewList(false);
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: res.error,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }).catch(err => {
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error, Favor de reportar el siguiente error: '+ err.message,
                    });
                });
        
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


    const cleanState = () => {
        setComponentsList('');
        setIdCloseList('');
        setCodeTrain('');
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
            <li><a href="/kanban_system/lineRoute">Línea</a></li>
            <li><a href="/kanban_system/shoppingRoute">Ruta</a></li>
            <li className="active">Materialista Logistica</li>
            </ol>
            {/* <!-- end breadcrumb -->
            <!-- begin page-header --> */}
            <h1 className="page-title m-l-30"><center>Shopping Lists</center></h1>
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
                                <h4 className="panel-title">Actual</h4>
                            </div>
                            <div className="panel-body">
                            
                            <hr/>
                            <div hidden={tableList}>
                                <form className='form-horizontal form-bordered'>
                                    <fieldset>
                                        <h4>Buscar Shopping List</h4>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">Código de Tren</label>
                                                    <div className="col-md-8">
                                                        <input type="text" className="form-control" id="code" autoFocus value={codeTrain} onChange={(e) => getComponents(e.target.value)}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <br></br>
                                        {/* <div className='form-group'>
                                        <center>
                                            <button type="button" className="btn btn-sm btn-primary m-r-5" onClick={getComponents}>Buscar</button>
                                            <button  className="btn btn-sm btn-danger" data-click="panel-collapse"  >Cancelar</button>
                                        </center>
                                        </div> */}
                                    </fieldset>
                                </form>
                                <hr/>
                                
                            </div>
                            <div hidden={viewList}>
                                <center><h3 ><strong>Componentes a Surtir</strong></h3></center>
                                <hr/>
                                <ComponentsList componentsList={componentsList} partialClose={partialClose} viewList={viewList}/>
                                <hr/>
                                <center><button className='btn btn-bg btn-primary' onClick={closeList}>Terminar</button></center>
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
}

export default ShoppingListPage