import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllAreas: async () => {
        return fetch(urlAPI+'area/getList', {method:'GET'})
            .then(res => res.json());
    },
    getTableData: async () => {
        return fetch(urlAPI+'area/table', {method:'GET'})
            .then(res => res.json());
    },

    getAreaByDepartment: async (id) => {
        return fetch(urlAPI+'area/areaByDept/'+id, {method:'GET'})
            .then(res => res.json())
    },

    getAreaByLocalDepartment: async () => {
        return fetch(urlAPI+'area/areaByDept/'+localStorage.getItem('id_department'), {method:'GET'})
            .then(res => res.json())
    },

    getArea: async (id) => {
        return fetch(urlAPI+'area/buscar/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    getMail: async () => {
        return fetch(urlAPI+'send/mail', { method: 'GET' })
            .then(res => res.json())
    },

    testTime: async () => {
        return fetch(urlAPI+'provider/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_provider":"ola",
                "status":1,
                "planP":600
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    saveArea: async (area) => {
        return fetch(urlAPI+'area/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_area":area.name_area,
                "status":1,
                "id_department":area.id_department,
                "created_by":localStorage.getItem('id_user'),
                "updated_by":localStorage.getItem('id_user')
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
//10.72.116.167
    updateArea: async (area) => {
        return fetch(urlAPI+'area/update/' + area.id_area, {
            method: 'POST',
            body: JSON.stringify({
                "name_area":area.name_area,
                "id_department":area.id_department,
                "updated_by":localStorage.getItem('id_user')
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteArea: async (id) => {
        return fetch(urlAPI+'area/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}