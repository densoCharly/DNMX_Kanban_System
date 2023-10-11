/* eslint-disable import/no-anonymous-default-export */
import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllLines: async () => {
        return fetch(urlAPI+'line/getList', {method:'GET'})
            .then(res => res.json())
    },
    getLine: async (id) => {
        return fetch(urlAPI+'line/buscar/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    getTableLines: async () => {
        return fetch(urlAPI+'line/getTableLines', {method:'GET'})
            .then(res => res.json())
    },

    getLineByArea: async (id) => {
        return await fetch(urlAPI+'line/lineByArea/' + id, {method:'GET'})
            .then(res => res.json())
    },

    saveLine: async (line) => {
        console.log(line);
        return fetch(urlAPI+'line/insert', {method:'POST',     
                body: JSON.stringify({
                    "name_ln":line.name_ln,
                    "status":1,
                    "id_area":line.id_area,
                    "code_scan": line.code_scan,
                    "created_by":localStorage.getItem('id_user'),
                    "updated_by":localStorage.getItem('id_user')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
              .catch(err => console.error(err));
        // return fetch('http://10.72.116.167:8080/DNMX_Kanban_System_API/services/line/insert', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         "name_ln":line.name_ln,
        //         "status":1,
        //         "id_area":line.id_area,
        //         "code_scan": line.codeScan,
        //         "created_by":localStorage.getItem('id_user'),
        //         "updated_by":localStorage.getItem('id_user')
        //         }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(res => res.json())
        //     .catch(err => console.error(err));
    },

    updateLine: async (line) => {
        return fetch(urlAPI+'line/update/' + line.id_line, {
            method: 'POST',
            body: JSON.stringify({
                "name_ln":line.name_ln,
                "id_area":line.id_area,
                "code": line.code,
                "updated_by":localStorage.getItem('id_user')
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteLine: async (id) => {
        return fetch(urlAPI+'line/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getLineProd: async (id) => {
        return fetch(urlAPI+'line/getLineName/'+id, {method:'GET'})
        .then( res => res.json())
    }
}