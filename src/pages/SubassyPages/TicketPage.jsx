import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Subassy from "../../requests/Subassy";
import Line from '../../requests/Line';
import Area from '../../requests/Area';
import Printer from '../../requests/Printer';
import Select from 'react-select';
import { Button, Modal } from 'react-bootstrap';
import Grid from '@mui/material/Unstable_Grid2';
import TicketSp from './TicketSp';
import TicketPartial from './TicketPartial';




const TicketPage = () => {

  const [noSubassy, setNoSubassy] = useState('');
  const [noSubassyId, setNoSubassyId] = useState('');
  const [checkman, setCheckman] = useState(localStorage.getItem('user'));
  const [pieces, setPieces] = useState('');
  const [idArea, setIdArea] = useState('');
  const [idLine, setIdLine] = useState('');
  const [NameLine, setNameLine] = useState('');
  const [areaName, setAreaName] = useState('');
  const [areaID, setAreaID] = useState('');
  const [kindStock, setKindStock] = useState('');
  const [saveStock, setSaveStock] = useState('');
  const [saveSubassy, setSaveSubassy] = useState('');
  const [saveSubassyId, setSaveSubassyId] = useState('');
  const [saveCheckman, setSaveCheckman] = useState('');
  const [savePieces, setSavePieces] = useState('');
  const [saveArea, setSaveArea] = useState('');  
  const [saveAreaId, setSaveAreaId] = useState(''); 
  const [saveLine, setSaveLine] = useState(''); 
  const [SaveLineId, setSaveLineId] = useState('');
  const [idSubassy, setIdSubassy] = useState('');  
  const [subassyList, setSubassyList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [lot, setLot] = useState('');
  const [turn, setTurn] = useState('');
  const [saveTurn, setSaveTurn] = useState('');
  


  const getSubassyList = async () => {
    const resp2 = await Subassy.getSelectsSub();
    setSubassyList(resp2);
    
  };

  const getAreaList = async () => {
    const resp2 = await Area.getAreaByLocalDepartment();
    setAreaList(resp2);
  }

  const setSavedData = () => {
    setSaveSubassy(localStorage.getItem('noSubassy'));
    setSaveSubassyId(localStorage.getItem('noSubassyId'));
    setSaveCheckman(localStorage.getItem('checkman'));
    setSavePieces(localStorage.getItem('pieces'));
    setSaveArea(localStorage.getItem('areaName'));
    setSaveAreaId(localStorage.getItem('areaID')); 
    setSaveLine(localStorage.getItem('NameLine')); 
    setSaveLineId(localStorage.getItem('idLine')); 
    setSaveTurn(localStorage.getItem('turn'));
  }

  useEffect(  () => {
    getSubassyList();
    getAreaList();
    setSavedData();
  }, []);
  

  const addSubassy = (e) => {
    e.preventDefault();
    if(noSubassy && checkman && idLine && pieces>0 && kindStock){
      getTurn();
      localStorage.setItem('noSubassy', noSubassy.label);
      localStorage.setItem('noSubassyId', noSubassy.value);
      localStorage.setItem('idLine', idLine);
      localStorage.setItem('NameLine', NameLine);
      localStorage.setItem('checkman', checkman);
      localStorage.setItem('areaName', areaName);
      localStorage.setItem('areaID', areaID);
      localStorage.setItem('pieces', pieces);
      localStorage.setItem('stock', kindStock);
      // console.log("Datos:");
      // console.log(noSubassy);
      // console.log("idLine:"+idLine);
      // console.log("NameLine:"+NameLine);
      // console.log("checkman:"+checkman);
      // console.log("areaName:"+areaName);
      // console.log("areaID:"+areaID);
      // console.log("pieces:"+pieces);
      // console.log("stock:"+kindStock);
      setSaveSubassy(noSubassy.label);
      setSaveSubassyId(noSubassy.value);
      setSaveCheckman(checkman);
      setSavePieces(pieces);
      setSaveArea(areaName);
      setSaveAreaId(areaID);
      setSaveLine(NameLine);
      setSaveLineId(idLine);
      setSaveStock(kindStock);
      Swal.fire({
        title: 'Guardado',
        text: 'Los Datos para impresion han sido capturados correctamente!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      cleanAll();
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Verifique que todos los campos esten llenos',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  };

  const printTicket = () => {
    let tmpLot = getTurn();
    let data = {
      'checkman': localStorage.getItem('checkman'),
      'subassy': localStorage.getItem('noSubassy'),
      'line': localStorage.getItem('NameLine'),
      'area': localStorage.getItem('areaName'),
      'pieces': localStorage.getItem('pieces'),
      'lot': tmpLot,
      'turn': localStorage.getItem('turn'),
      'kindStock': localStorage.getItem('stock'),
      'subassyId': localStorage.getItem('noSubassyId'),
      'lineId': localStorage.getItem('idLine'),
      'areaId': localStorage.getItem('areaID'),
    };
    Printer.getTicket(data).then( res => {

      if(res.message){
          Swal.fire(
          'Impreso!',
          'El Ticket ha sido Impreso.',
          'success'
          )
      }else{
          Swal.fire({
          title: 'Error',
          text: JSON.stringify(res.error),
          icon: 'error',
          confirmButtonText: 'OK'
          })
      }
    });
  }

  // T1 6am - 2pm
  // T2 2pm - 11pm
  // T3 11pm - 6am

  const getTurn = () => {
    let date = new Date();
    let tmp='';
    let month = date.getMonth()+1;
    if(date.getHours()>=6 && date.getHours()<14){
      tmp = 'T1';
    }else if (date.getHours()>=14 && date.getHours()<23) {
      tmp = 'T2';
    } else if (date.getHours()>=23 && date.getHours()<6) {
      tmp = 'T3';
    }
    let lot = '' + date.getFullYear() + '' + month + '' + date.getDate()+ '' + tmp + '' + date.getHours() + '' + date.getMinutes();
    localStorage.setItem('turn', tmp);
    setTurn(tmp);
    setSaveTurn(tmp);
    setLot(lot);
    return lot;
  }
  
  const handleLinea = (e) => {
    if(e){
      let auxAr = lineList.find( linea => linea.id_line == e );
      setIdLine(e);
      setNameLine(auxAr.name_ln);
    }else{
      setIdArea('');
      setLineList([]);
    }
  }

  const handleArea = (e) => {
    if(e){
      let auxAr = areaList.find( area => area.id_area == e );
      setIdArea(e);
      setAreaName(auxAr.name_area);
      setAreaID(auxAr.id_area);
      setLineList([]);

      const lines = Line.getLineByArea(e);
      lines.then(res => {
        if(res.error){
          Swal.fire({          
            title: 'Error',
            text: 'No hay Lineas en esa Area',
            icon: 'error '+ res.error,
            confirmButtonText: 'OK'
          })
          setIdArea('');
          setLineList([]);
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
      });
    }else{
      setIdArea('');
      setLineList([]);
    }
  }

  const cleanAll = () => {
    setNoSubassy(0);
    setNoSubassyId(0);
    setCheckman('');
    setIdArea('');
    setIdLine('');
    setIdSubassy('');
    setPieces('');
    setKindStock('');
  }

  const handleFamProd = (e) => {
    setNoSubassy(e);
  }

  const capturePieces = (e) => {
    if(e >= 0){
      setPieces(e);      
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No se permiten números negativos'
        });
    }
  };


  if(!localStorage.getItem('token')){
    window.location.href = '/kanban_system/login'
  }else{
    return (
      <>
        <div id="content" className="content">
          {/* <!-- begin breadcrumb --> */}
          <br></br>
          <br></br>
          <ol className="breadcrumb pull-right">;
            <li><a href="/home">Home</a></li>
            <li><a href="/home">Page Options</a></li>
            <li className="active">Subensamble</li>
          </ol>
          {/* <!-- end breadcrumb -->
          <!-- begin page-header --> */}
          
          <h1 className="page-title"><center>Ticket Subensambles</center></h1>
          {/* <!-- end page-header --> */}
          
          <div className="row">
              <div className="col-md-12">
                        <div className="panel panel-inverse">
                            <div className="panel-heading">
                                <div className="panel-heading-btn">
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-success" onClick={getSubassyList} data-click="panel-reload"><i className="fa fa-repeat"></i></a>
                                    <a href="##" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                                </div>
                                <h4 className="panel-title">Registrar</h4>
                            </div>
                            <div className="panel-body panel-form">
                            <form className='form-horizontal form-bordered'>
                                      <fieldset>
                                          <div className='row'>
                                              <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label className="control-label col-md-4">No. Subensamble</label>
                                                    <div className="col-md-8">
                                                      <Select
                                                        options={subassyList}
                                                        defaultValue={subassyList.value}
                                                        onChange={handleFamProd}
                                                        id="select_product"
                                                      />
                                                    </div>
                                                  </div>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Checkman</label>
                                                  <div className="col-md-8">
                                                      <input type="text" className="form-control" id="checkman" placeholder={localStorage.getItem('user')}  value={checkman} onChange={ (e) => setCheckman(e.target.value) } />
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Piezas por Caja</label>
                                                  <div className="col-md-8">
                                                      <input type="number" className="form-control" id="pieces" value={pieces} onChange={ (e) => capturePieces(e.target.value) } />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='col-md-6'>
                                              <div className="form-group">
                                                  <label className="control-label col-md-4">Área</label>
                                                  <div className="col-md-8">
                                                      <select className='form-control' onChange={(e) => handleArea(e.target.value)} value={idArea}>
                                                          <option value="">Seleccione una opción</option>
                                                          {areaList.map((area, index) => (
                                                              <option key={index} value={area.id_area}>{area.name_area}</option>
                                                          ))}
                                                      </select>
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Linea</label>
                                                  <div className="col-md-8">
                                                      <select className='form-control' onChange={(e) => handleLinea(e.target.value)} value={idLine}>
                                                          <option value="">Seleccione una opción</option>
                                                          {lineList.map((line) => (
                                                              <option key={line.id_line} value={line.id_line}>{line.name_ln}</option>
                                                          ))}
                                                      </select>
                                                  </div>
                                                </div>
                                                <div className="form-group">
                                                  <label className="control-label col-md-4">Tipo</label>
                                                  <div className="col-md-8">
                                                      <select className='form-control' value={kindStock} onChange={(e) => setKindStock(e.target.value)}>
                                                          <option value="">Seleccione una opción</option>
                                                          <option value='End of Line'>End of Line</option>
                                                          <option value='Safety'>Safety</option>
                                                      </select>
                                                  </div>
                                                </div>
                                              </div>
                                          </div>
                                          <br></br>
                                          <div className='form-group'>
                                            <center>
                                              <button type="submit" onClick={addSubassy} className="btn btn-sm btn-primary m-r-5" >Guardar</button>
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
              <div className="panel-body panel-form">
                <div style={{float:'right', paddingRight:'20px'}}>
                    <br/>
                    <TicketSp/>
                </div>
                <h3 >Datos de Ticket Actual</h3>
                <form onSubmit={addSubassy} className='form-horizontal form-bordered'>
                  <fieldset>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className="form-group">
                            <label className="control-label col-md-4">No. Subensamble</label>
                            <div className="col-md-8">
                            <input type="text" className="form-control" id="noSubassy" placeholder="..."  value={saveSubassy} disabled/>

                            <input type="hidden" className="form-control" id="noSubassyId"   placeholder="..."  value={saveSubassyId} disabled />
                            </div>
                          </div>
                        <div className="form-group">
                          <label className="control-label col-md-4">Checkman</label>
                          <div className="col-md-8">
                              <input type="text" className="form-control" id="checkman" placeholder="..."  value={saveCheckman} onChange={ (e) => setCheckman(e.target.value) } disabled/>
                          </div>
                          
                        </div>
                        <div className="form-group">
                          <label className="control-label col-md-4">Piezas por Caja</label>
                          <div className="col-md-8">
                              <input type="number" className="form-control" id="pieces" value={savePieces} disabled/>
                          </div>
                        </div>
                      </div>
                      <div className='col-md-6'>
                      <div className="form-group">
                          <label className="control-label col-md-4">Área</label>
                          <div className="col-md-8">
                              <input type="text" className="form-control" id="areaName" value={saveArea} disabled/>
                              <input type="hidden" className="form-control" id="areaID" value={saveAreaId} disabled/>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-md-4">Linea</label>
                          <div className="col-md-8">
                              <input type="text" className="form-control" id="lineName" value={saveLine} disabled/>
                              <input type="hidden" className="form-control" id="idLine" value={SaveLineId} disabled/>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label col-md-4">Turno</label>
                          <div className="col-md-8">
                              <input type="text" className="form-control" id="turn" value={saveTurn} disabled/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className='form-group'>
                      <center>
                        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                          <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                            <Button variant="secondary" className="btn btn-primary" onClick={printTicket}>Imprimir</Button>
                          </Grid>
                          <Grid xs={4} md={2} mdOffset="auto">
                          </Grid>
                          <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                            <TicketPartial />
                          </Grid>
                        </Grid>
                      </center>
                    </div>
                  </fieldset>
                </form>
                <br></br>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        </div>
        
      </>
    )
  }
}

export default TicketPage