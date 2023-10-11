import React, { useEffect, useState } from 'react'
import Product from '../../requests/Product';
import Components from '../../requests/Components';
import Subassy from '../../requests/Subassy';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Switch } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BiGhost } from "react-icons/bi"
import TableFilter from '../../components/TableFilter';
import Train from '../../requests/Train';
import LocalComponents from '../../requests/LocalComponents';

const ExtraComponentPage = () => {

    const [switchButton, setSwitchButton] = useState(false);
    const [subassyList, setSubassyList] = useState([]);
    const [selectComp, setSelectComp] = useState([]);
    const [skuDesc, setSkuDesc] = useState('');
    const [idComponent, setIdComponent] = useState('');
    const [boxes, setBoxes] = useState('');
    const [idLine, setIdLine] = useState('');
    const [trainList, setTrainList] = useState([]);
    const [idTrain, setIdTrain] = useState('');


    const showComponent = () => {
        if(switchButton){
            setSwitchButton(false);
        }else{
            setSwitchButton(true);
        }
    }

    const getSelects = async () => {
        const resp3 = await Subassy.getSelectsSub();
        setSubassyList(resp3);
        const resp2 = await Components.getSelectSKU();
        resp2.forEach(element => {
            selectComp.push({value:element.SKU, label:element.SKU+" -- "+element.SKU_DESC, sku_desc:element.SKU_DESC});
        });
    }

    const handleComp = async (e) => {
        setIdComponent(e.value);
        setSkuDesc(e.sku_desc);
    }

    const handleSubassy = (e) => {
        setIdComponent(e.label);
        setSkuDesc(e.type_name);
    }

    useEffect(  () => {
        getSelects();
    }, []);

    const cleanAll = () => {
        setTrainList([]);
    }
    const setLine = async (event) => {
        setIdLine(event);
        const resp = Train.asignedTrains(event);
        resp.then( res => {
            if(res){
                setTrainList(res);
            }else{
                Swal.fire({
                    title: 'Alerta!',
                    text: 'No hay Trens cargadas a la linea seleccionada',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        })
        .catch( () => {
            Swal.fire({
                title: 'Alerta!',
                text: 'No hay Shopping List activas en esta Linea',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            setTrainList([{"code":"Seleccione","id_train":""}]);
        });
    }
    const handleList = (event) => {
        setTrainList([]);
        if(event){
            setTrainList(event);
            console.log(event)
        }
    }

    const requestComponent = () => {
        // console.log(idTrain);
        // var data = {
        //     "component": idComponent,
        //     "id_shopping_list": idTrain.id_shopping_list,
        //     "lot": idTrain.lot,
        //     "boxes": boxes,
        // };
        var data = {
            "component": idComponent,
            "id_train": idTrain,
            "boxes": boxes,
        };
        if(idTrain && idComponent)
        {
            LocalComponents.addExtraComponent(data).then( (res) => {
                if(res.id_inserted){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Material Solicitado Correctamente',
                        showConfirmButton: true,
                    });
                    cleanAll();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Error al Solicitar el Material',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }).catch( err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al Solicitar el Material',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        }
    }

    const captureBoxes = (e) => {
        if(e >= 0){
            setBoxes(e);      
          }else{
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No se permiten números negativos'
              });
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
                <li className="active">Extra</li>
                </ol>
                {/* <!-- end breadcrumb -->
                <!-- begin page-header --> */}
                
                <h1 className="page-title"><center>Material Extra</center></h1>
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
                                    <h4 className="panel-title">Solicitar</h4>
                                </div>
                                <div className="panel-body panel-form">
                                <form className='form-horizontal form-bordered'>
                                    <fieldset>
                                        {/* <legend>Defecto</legend> */}
                                        <div className="row">
                                            <div className="col-md-4 m-l-20">
                                                <h4><strong>Elige un Material</strong></h4>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='form-group'>
                                                    <Switch onChange={showComponent}/>
                                                    <label className="control-label col-md-4">
                                                        {switchButton?"Subensamble":"Componente"}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className="form-group" hidden={switchButton===true}>
                                                    <label className="control-label col-md-4">SKU</label>
                                                    <div className="col-md-8">
                                                        <Select
                                                        options={selectComp}
                                                        defaultValue={idComponent}
                                                        onChange={handleComp}
                                                        id="select_component"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='form-group' hidden={switchButton===false}>
                                                    <label className="control-label col-md-4">Subassy</label>
                                                    <div className="col-md-8">
                                                        <Select
                                                        options={subassyList}
                                                        defaultValue={idComponent}
                                                        onChange={handleSubassy}
                                                        id="select_component"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">Cantidad Cajas</label>
                                                    <div className="col-md-8">
                                                    <input type="number" className="form-control" id="boxes" placeholder="0" value={boxes} onChange={(e) => captureBoxes(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-md-4 m-l-20">
                                                <h4><strong>Elige un Tren</strong></h4>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                            <TableFilter handleList={handleList} setLine={setLine} typeFilter={2}/>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label col-md-4">Tren</label>
                                                <div className="col-md-8">
                                                    <select className='form-control' value={idTrain} onChange={(e) => setIdTrain(e.target.value)}>
                                                        <option value=''>Seleccione</option>
                                                        {trainList.map((train) => (
                                                            <option key={train.id_train} value={train.id_train} >{train.code}</option>
                                                        ))}
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                        <div className='form-group'>
                                        <center>
                                            <button type="button" onClick={requestComponent} className="btn btn-sm btn-primary m-r-5" >Pedir</button>
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
            
                {/* <!-- begin scroll to top btn --> */}
                <a href="##" className="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i className="fa fa-angle-up"></i></a>
                {/* <!-- end scroll to top btn --> */}
            </div>
            
            </>
        )
    }
}

export default ExtraComponentPage