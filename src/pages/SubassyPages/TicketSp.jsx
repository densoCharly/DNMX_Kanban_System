import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Grid from '@mui/material/Unstable_Grid2';
import Swal from 'sweetalert2';
import Printer from '../../requests/Printer';
import Subassy from "../../requests/Subassy";

const TicketSp = (props) => {
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState('');
    const [scanInput, setScanInput] = useState('');
    const [noSubassy, setNoSubassy] = useState('');
    const [noSubassyId, setNoSubassyId] = useState('');
    const [idArea, setIdArea] = useState('');
    const [idLine, setIdLine] = useState('');
    const [checkman, setCheckman] = useState('');
    const [pieces, setPieces] = useState('');
    const [area, setArea] = useState('');
    const [line, setLine] = useState('');
    const [lot, setLot] = useState('');
    const [turn, setTurn] = useState('');
    const [time, setTime] = useState('');

    const [showEdit, setShowEdit] = useState(false);

    const cleanAll = () => {
        setNoSubassy('');
        setCheckman('');
        setArea('');
        setLine('');
        setTurn('');
        setPieces('');
        setLot('');
        setTime('');
    }
   
    const splitData = (scan) => {
        setTimeout(() => {
            const parts = scan.split(',');
            if(parts[0].trim()== localStorage.getItem('noSubassyId').trim()){
               
                Subassy.getDataById({'ID': parts[0],'dato': "noSubassy"}).then( res => {
                if(res.error=="NoEncontrado"){setNoSubassy("NoEncontrado");}else{setNoSubassy(res[0].no_subassy);}
            }).catch((error) => {
                         
                console.error("función enRechazo invocada: ", error);
                console.log(error);
              });
    
                setCheckman(parts[1]);
    
                Subassy.getDataById({'ID': parts[2],'dato': "area"}).then( res => {
                     if(res.error=="NoEncontrado"){setArea("NoEncontrado");}else{setArea(res[0].name_area);}
                    }).catch((error) => {
                        console.error("función enRechazo invocada: ", error);
                        console.log(error);
                      });
                Subassy.getDataById({'ID': parts[3],'dato': "linea"}).then( res => {
                    if(res.error=="NoEncontrado"){setLine("NoEncontrado");}else{setLine(res[0].name_ln);}}).catch((error) => {
                        console.error("función enRechazo invocada: ", error);
                        console.log(error);
                      });
                setTurn(parts[4]);
                setPieces(parts[5]);
                setLot(parts[6]);
                setTime(parts[8]);
                setNoSubassyId(parts[0]);
                setIdArea(parts[2]);
                setIdLine(parts[3]);
                setMessage("");
                
    
    
            }else{
                setMessage("");
                cleanAll();
                Swal.fire({
                    title: 'Error',
                    text: 'El No. de Parte del Parcial no Coincide con el Actual',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
    
          }, 100);


            }
    const getLot = () => {
        let date = new Date();
        let tmp='';
        let month = date.getMonth()+1;
        let lot = '' + date.getFullYear() + '' + month + '' + date.getDate()+ '' + tmp + '' + date.getHours() + '' + date.getMinutes();
        return lot;
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
      };
    
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          splitData(message)
        
        }
      };



    const printPartial = () => {
        let data = {
            'checkman': localStorage.getItem('checkman'),
            'subassy': localStorage.getItem('noSubassyId'),
            'line': localStorage.getItem('idLine'),
            'area': localStorage.getItem('areaID'),
            'pieces': localStorage.getItem('pieces'),
            'lot': getLot(),
            'turn': localStorage.getItem('turn'),
            'kindStock': localStorage.getItem('stock'),
        };
        let partial = {
            'subassy':noSubassyId,
            'checkman': checkman,
            'area': idArea,
            'line': idLine,
            'turn': turn,
            'pieces': pieces,
            'lot': lot,
            'time': time,
        }
        Printer.getMixedTicket(data, partial).then( res => {
            if(res.message){
                Swal.fire(
                'Impreso!',
                'El Ticket ha sido Impreso.',
                'success'
                )
                cleanAll();
                handleCloseEdit();
            }else{
                Swal.fire({
                title: 'Error',
                text: res.error,
                icon: 'error',
                confirmButtonText: 'OK'
                })
            }
        });
    }

    const handleCloseEdit = () => {
        setShowEdit(false);
        cleanAll();
    };

    return (
        <>
            <div>
                <Button onClick={() => setShowEdit(true)}>Ticket Especial</Button>
            </div>
            <div >
                <Modal show={showEdit} 
                        onHide={handleCloseEdit} 
                        size="auto"  
                        style={{opacity:1}}  
                        animation={false}
                        aria-labelledby="contained-modal-title-vcenter" 
                        centered 
                        className='m-t-35'
                >
                    <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ticket Combinado
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                        <form >
                            <fieldset>
                            <div className="form-group">
                                <label htmlFor="noSubassy">Escanee Ticket de Parcial</label>
                                <input type="text" className="form-control" id="ticket" value={message}  onChange={handleChange} onKeyDown={handleKeyDown} name="ticket" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='type'>No. de Parte</label>
                                <input type="text" className="form-control" id="noSubassy" value={noSubassy} name="noSubassy" disabled required/>
                                <input type="hidden" className="form-control" id="numeroSubassy" value={noSubassyId} name="numeroSubassy" disabled required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='type'>Checkman</label>
                                <input type="text" className="form-control" id="checkman" name="checkman" value={checkman} disabled required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='type'>Piezas</label>
                                <input type="text" className="form-control" id="pieces" name="pieces" value={pieces} disabled required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="area">Área</label>
                                <input type="text" className="form-control" id="area" name="area" value={area} disabled required/>

                                <input type="hidden" className="form-control" id="idArea" name="idArea" value={idArea} disabled required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="linea">Línea</label>
                                <input type="text" className="form-control" id="line" name="line" value={line} disabled required/>
                                <input type="hidden" className="form-control" id="idLine" name="idLine" value={idLine} disabled required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="linea">Lote</label>
                                <input type="text" className="form-control" id="lot" name="lot" value={lot} disabled required/>
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                        <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                        <Button variant="secondary" className="btn btn-danger" onClick={handleCloseEdit}>Cancelar</Button>
                        </Grid>
                        <Grid xs={4} md={2} mdOffset="auto">
                        </Grid>
                        <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                        <Button variant="primary" type="submit" onClick={printPartial} form="form-edit" >Imprimir</Button>
                        </Grid>
                    </Grid>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default TicketSp