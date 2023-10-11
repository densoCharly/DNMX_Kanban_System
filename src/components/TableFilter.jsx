import React, { useState, useEffect } from 'react';
import Department from '../requests/Department';
import Area from '../requests/Area';
import Line from '../requests/Line';
import ProductionPlan from '../requests/ProductionPlan';
import Swal from 'sweetalert2';
import FormHelperText from '@mui/material/FormHelperText';
import LocalComponents from '../requests/LocalComponents';
import Train from '../requests/Train';
import Partial from '../requests/Partial';

const TableFilter = (props) => {
    const [idArea, setIdArea] = useState(0);
    const [idDepartment, setIdDepartment] = useState(0);
    const [areaList, setAreaList] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [listDpt, setListDpt] = React.useState([]);
    const [idLine, setIdLine] = useState(0);
    const [btnActivo, SetBtnActivo]= useState (true);

    const getDptList = async () => {
        const data = await Department.getAllDepartments();
        setListDpt(data);
    }
    useEffect(  () => {
        getDptList();
    }, []);
    const handleDept = (e) => {
        //console.log(e);
        if(e){
            setIdDepartment(e);
            setAreaList([]);
            const lines = Area.getAreaByDepartment(e);
            lines.then(res => {
            if(res.error){
                Swal.fire({
                    title: 'Error',
                    text: 'No hay Áreas en ese departamento',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                setIdDepartment('');
                setAreaList([]);
                SetBtnActivo(true);
                props.handleList([]);
            }else{
                setAreaList(res);
            }
            }).catch(err => {
            Swal.fire({
                title: 'Error',
                text: 'No hay Areas en ese Departamento',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            setIdDepartment('');
            setAreaList([]);
            props.handleList([]);
            });
        }else{
            setIdDepartment('');
            setAreaList([]);
            SetBtnActivo(true);
            props.handleList([]);
        }
    }
    const handleArea = (e) => {
        if(e){
            setIdArea(e);
            setLineList([]);
            const lines = Line.getLineByArea(e);
            lines.then(res => {
                if(res.error){
                    Swal.fire({
                        title: 'Error',
                        text: 'No hay Lineas en esa Area',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                    setIdArea('');
                    setLineList([]); 
                    SetBtnActivo(true);
                    props.handleList([]);
                }else{
                    setLineList(res);
                }
        
            }).catch(err => {
            Swal.fire({
                title: 'Error',
                text: 'No hay Lineas en esa Area',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            setIdArea('');
            setLineList([]);
            SetBtnActivo(true);
            props.handleList([]);
            });
        }else{
            setIdArea('');
            setLineList([]);
            SetBtnActivo(true);
            props.handleList([]);
        }
    }

    const buscarPlan = async (e) => {
    
        if(props.typeFilter===1){
            const resp = await ProductionPlan.plansFilter(idLine);
            if(resp.error){
                Swal.fire({
                    title: 'Error',
                    text: resp.error,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                props.handleList([]);
            }else{
                props.handleList(resp);
            }
            const resp2 = await ProductionPlan.planListToExcel(idLine);
            props.handleReport(resp2);
            props.setLine(idLine);
        }else if(props.typeFilter===2){
            props.setLine(e);
        }else if(props.typeFilter===3){
            const resp3 = await Partial.getPartialByLine(idLine);
            props.handleList(resp3);
        }else{
            const resp = await LocalComponents.getFilterList(idLine);
            props.handleList(resp);
        }            


    }

    const handleFather = (e) => {
        setIdLine(e);
        if(e){
            SetBtnActivo(false)
        }else{
            SetBtnActivo(true)
            props.handleList([]);
        }
        if(props.typeFilter===2){
            buscarPlan(e);
        }
    }
    
    return (
    <>
        <div>
            <div className="row">
                <div className="col-md-4">
                <div className="form-group">
                    <label className="control-label col-md-4">Departamento</label>
                    <div className="col-md-8">
                    <select className='form-control' onChange={(e) => handleDept(e.target.value)}>
                        <option value=''>Seleccione</option>
                        {listDpt.map((item) => (
                        <option key={item.id_department} value={item.id_department}>{item.name_dpt}</option>
                        ))}
                    </select>
                    <FormHelperText>Required</FormHelperText>
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                    <label className="control-label col-md-4">Area</label>
                    <div className="col-md-8">
                        <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                        <option value=''>Seleccione</option>
                        {areaList.map((area) => (
                            <option key={area.id_area} value={area.id_area}>{area.name_area}</option>
                        ))}
                        </select>                      
                    </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="form-group">
                    <label className="control-label col-md-4">Linea</label>
                    <div className="col-md-8">
                        <select className='form-control' value={idLine} onChange={(e) => handleFather(e.target.value)}>
                        <option value="">Seleccione una opción</option>
                        {lineList.map((line) => (
                        <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <center>
                    {props.typeFilter===2?
                    null
                    : <button type="button" onClick={buscarPlan} className="btn btn-sm btn-primary " disabled = {btnActivo}>Buscar</button>
                    }
                </center>
            </div>
        </div>
    </>  
    )
}

export default TableFilter