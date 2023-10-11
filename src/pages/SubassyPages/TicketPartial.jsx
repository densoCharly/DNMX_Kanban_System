import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Grid from '@mui/material/Unstable_Grid2';
import Printer from '../../requests/Printer';
import Swal from 'sweetalert2';

const TicketPartial = () => {
    const [pieces, setPieces] = useState('');
    const [showPartial, setShowPartial] = useState(false);

    const handleClosePartial = () => {
        setShowPartial(false);
        cleanAll();
    };
    const handleShowPartial = (e) => {
        setShowPartial(true);
    };

    const printPartial = () => {
        let tmpLot = getTurn();
        let data = {
            'checkman': localStorage.getItem('checkman'),
            'subassy': localStorage.getItem('noSubassy'),
            'line': localStorage.getItem('lineName'),
            'area': localStorage.getItem('areaName'),
            'pieces': pieces,
            'lot': tmpLot,
            'turn': localStorage.getItem('turn'),
            'kindStock': 'Parcial',
            'subassyId': localStorage.getItem('noSubassyId'),
            'lineId': localStorage.getItem('idLine'),
            'areaId': localStorage.getItem('areaID'),
        };
    
        Printer.getTicket({...data}).then( res => {
            if(res.message){
                handleClosePartial();
                Swal.fire(
                'Impreso!',
                'El Ticket ha sido Impreso.',
                'success'
                );
                
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

    const cleanAll = () => {
        setPieces('');
    }

    const getTurn = () => {
        let date = new Date();
        let tmp='';
        let month = date.getMonth()+1;
        let lot = '' + date.getFullYear() + '' + month + '' + date.getDate()+ '' + tmp + '' + date.getHours() + '' + date.getMinutes();
        return lot;
    }

    return (
        <>
            <div>
                <Button variant="secondary" className='btn btn-warning' type="button" onClick={() => setShowPartial(true)} form="form-edit" >Parcial</Button>
            </div>
            <div>
                <Modal show={showPartial} 
                        onHide={handleClosePartial} 
                        size="auto"  
                        style={{opacity:1}}  
                        animation={false}
                        aria-labelledby="contained-modal-title-vcenter" 
                        centered 
                        className='m-t-35'
                >
                    <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ticket Parcial
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                        <form >
                            <fieldset>
                            <div className="form-group">
                                <label htmlFor="noSubassy">Cantidad de Piezas</label>
                                <input type="number" min={1} className="form-control" id="pieces" value={pieces} onChange={(e) => setPieces(e.target.value)} name="noSubassy" required/>
                            </div>
                            </fieldset>
                        </form>
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                        <Grid xs={6} xsOffset={3} md={2} mdOffset={0}>
                        <Button variant="secondary" className="btn btn-danger" onClick={handleClosePartial}>Cancelar</Button>
                        </Grid>
                        <Grid xs={4} md={2} mdOffset="auto">
                        </Grid>
                        <Grid xs={4} xsOffset={4} md={2} mdOffset={0}>
                        <Button variant="primary" type="submit" form="form-edit" onClick={printPartial} >Imprimir</Button>
                        </Grid>
                    </Grid>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default TicketPartial