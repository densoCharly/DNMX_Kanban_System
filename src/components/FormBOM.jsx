import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import Components from '../requests/Components';
import Select from 'react-select';

const FormBOM = (props) => {

    const [showEdit, setShowEdit] = useState(false);
    const [id_product_component, setId_product_component] = useState('');
    const [id_product, setId_product] = useState('');
    const [kind, setKind] = useState('');
    const [location, setLocation] = useState('');
    const [no_part, setNo_part] = useState('');
    const [process, setProcess] = useState('');
    const [qty_box, setQty_box] = useState('');
    const [qty_pc, setQty_pc] = useState('');
    const [sku, setSku] = useState('');
    const [sku_desc, setSku_desc] = useState('')
    const [locationList, setLocationList] = useState([]);
    
    // const handleCloseEdit = () => {
    //     setShowEdit(false);
    //     cleanAll();
    // };

    const getLocations = async () => {
        const resp = await Components.getComponentLocations(sku);
        resp.forEach(element => {
            locationList.push({value:element.LOC_ID, label:element.LOC_ID});
        });
    }

    if(props.showEdit) {
        setId_product_component(props.data.id_product_component);
        setId_product(props.data.id_product);
        setKind(props.data.kind);
        setLocation(props.data.location);
        setNo_part(props.data.no_part);
        setProcess(props.data.process);
        setQty_box(props.data.qty_box);
        setQty_pc(props.data.qty_pc);
        setSku(props.data.sku);
        setSku_desc(props.data.sku_desc);
        setShowEdit(true);
        getLocations()
    }

    const handleSubmitEdit = () => {

    }

  return (
    <>
        <Modal show={props.showEdit}
                onHide={props.close}
                size="auto"  
                style={{opacity:1}}  
                animation={false}
                aria-labelledby="contained-modal-title-vcenter" 
                centered 
                className='m-t-35'
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                Editar BOM de {no_part}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                <div className="col-md-12">
                    <form >
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="no_part">Componente</label>
                            <input type="text" className="form-control" id="slu" name="sku" value={sku} disabled/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sku_desc">Descripción</label>
                            <input type="text" className="form-control" id="sku_desc" name="sku_desc" value={sku_desc} disabled/>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-md-4">Tipo</label>
                            <select className="form-control" id="kind" value={kind} onChange={ (e) => setKind(e.target.value) }>
                                <option value="">Seleccione...</option>
                                <option value="Rectificador">Rectificador</option>
                                <option value="Frame">Frame</option>
                                <option value="Stator">Stator</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="qty_box">Cantidad por Caja</label>
                            <input type='number' className="form-control" id="qty_box" name="qty_box" value={qty_box} onChange={(e) => setQty_box(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="area">Cantidad requerida por Unidad</label>
                            <input type='number' className="form-control" id="qty_pc" name="qty_pc" value={qty_pc} onChange={(e) => setQty_pc(e.target.value)} required />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="linea">Proceso</label>
                            <select className='form-control' onChange={(e) => setProcess(e.target.value)} value={process}>
                                <option value="">Seleccione una opción</option>
                                <option value="1">Final Assy</option>
                                <option value="2">SubAssy</option>
                                <option value="3">Initial Process</option>
                                <option value="4">Sub-Initial Process</option>
                            </select>
                        </div>
                        <div className="form-group">
                        <label htmlFor="manpower">Ubicación</label>
                            { locationList?
                                <Select
                                options={locationList}
                                defaultValue={location}
                                onChange={e => setLocation(e.value)}
                                id="select_component"
                                />
                                :
                                <input type="text" className="form-control" id="location" placeholder="" value={location} onChange={(e) => setLocation(e.target.value)}/>
                            }
                        </div>
                    </fieldset>
                    </form>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="btn btn-danger" onClick={props.close}>Cancelar</Button>
                <Button variant="primary" type="submit" form="form-edit" onClick={handleSubmitEdit}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default FormBOM