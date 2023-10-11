import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllDepartments: async () => {
        return fetch(urlAPI+'department/getList/' + localStorage.getItem('id_plant'), {method:'GET'})
            .then(res => res.json());
    },
    getDepartmentsByPlant: async (id) => {
        return fetch(urlAPI+'department/getDepartmentsByPlant/' + id, {method:'GET'})
            .then(res => res.json());
    },
    addDepartment: async (department) => {
        return fetch(urlAPI+'department/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_dpt":department.name,
                "no_department":department.no_department,
                "status":1,
                "id_plant":department.plant_id,
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

    deleteDepartment: async (id) => {
        return fetch(urlAPI+'department/delete/' + id, { method: 'GET' })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateDepartment: async (department) => {
        return fetch(urlAPI+'department/update/' + department.id_department, {
            method: 'POST',
            body: JSON.stringify({
                "name_dpt":department.name_dpt,
                "no_department":department.no_department,
                "updated_by":localStorage.getItem('id_user'),
                "id_plant":department.plant_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}