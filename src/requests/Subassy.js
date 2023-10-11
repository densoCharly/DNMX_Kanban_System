import config from "./config";

let urlAPI = config.serviceURL();

export default {

    getDataById: async (data) => {
       
        return fetch(urlAPI+'subassy/getqrbyid', {method:'POST',     
                body: JSON.stringify({
                    "ID":data.ID,
                    "dato":data.dato,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(err => console.error(err));
    },

    getAllSubassys : async () => {
        return fetch(urlAPI+'subassy/getList', {method:'GET'})
            .then(res => res.json())
    },
    getSelectsSub : async () => {
        return fetch(urlAPI+'subassy/getSelectsSub', {method:'GET'})
            .then(res => res.json())
    },

    getInventory : async () => {
        return fetch(urlAPI+'subassy/getInventory/'+localStorage.getItem('id_area'), {method:'GET'})
            .then(res => res.json())
    },
    getHistory : async () => {
        return fetch(urlAPI+'subassy/getHistory', {method:'GET'})
            .then(res => res.json())
    },

    saveSubassy : async (subassy) => {
        return fetch(urlAPI+'subassy/insert', {
            method: 'POST',
            body: JSON.stringify({
                "no_subassy":subassy.no_subassy,
                "type":subassy.type,
                "status_sub":1,
                "id_line":subassy.id_line,                
                "created_by":localStorage.getItem('id_user'),
                "updated_by":localStorage.getItem('id_user'),
                "token": localStorage.getItem('token')
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateSubassy : async (subassy) => {
        return fetch(urlAPI+'subassy/update/' + subassy.id_subassy, {
            method: 'POST',
            body: JSON.stringify({
                "no_subassy":subassy.no_subassy,
                "type":subassy.type,
                "id_line":subassy.id_line,                
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteSubassy : async (id) => {
        return fetch(urlAPI+'subassy/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteSubComponent : async (id) => {
        return fetch(urlAPI+'subassy_component/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateStock : async (subassy) => {
        return fetch(urlAPI+'subassy/updateStock/', {
            method: 'POST',
            body: JSON.stringify({
                "id_subassy":subassy.id_subassy,
                "stock":subassy.stock,
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    addSubComponent : async (subcomp) => {
        return fetch(urlAPI+'subassy_component/insert', {
            method: 'POST',
            body: JSON.stringify({
                "id_subassy": subcomp.id_subassy,
                "id_component": subcomp.id_component,
                "sku_desc": subcomp.sku_desc,
                "pcs_total": subcomp.pcs_total
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getSubComponent : async () => {
        return fetch(urlAPI+'subassy_component/getList', {method:'GET'})
            .then(res => res.json())
    },
    getBomSubassy : async (id) => {
        return fetch(urlAPI+'subassy_component/bomSubassy/'+id, {method:'GET'})
            .then(res => res.json())
    },

    pruebaURL: () => {
        alert(config.serviceURL());
    },


}