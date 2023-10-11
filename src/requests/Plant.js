import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllPlants: async () => {
        return fetch(urlAPI+'plant/getList', {method:'GET'})
        .then(res => res.json())
    },
    getPlant: async (id) => {
        return fetch(urlAPI+'plant/buscar/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    savePlant: async (plant) => {
        // return axios.post(urlAPI+'plant/insert', {
        //      "name_plt":plant,
        //      "status_plt":1,
        //      "created_by":localStorage.getItem('id_user'),
        //      "updated_by":localStorage.getItem('id_user')
        // }).then(res => res.data).catch(err => console.error(err));

        return fetch(urlAPI+'plant/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_plt":plant,
                "status_plt":1,
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

    updatePlant: async (plant) => {
        // return axios.post(urlAPI+'plant/update/'+plant.id_plant, 
        //     {
        //         "name_plt":plant.name_plt,
        //         "status_plt":plant.status_plt,
        //         "created_by":plant.created_by,
        //         "updated_by":localStorage.getItem('id_user')
        //     }
        //     ).then(res => res.data).catch(err => console.error(err));

        return fetch(urlAPI+'plant/update/' + plant.id_plant, {
            method: 'POST',
            body: JSON.stringify({
                "name_plt":plant.name_plt,
                "status_plt":plant.status_plt,
                "created_by":plant.created_by,
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deletePlant: async (id) => {
        return fetch(urlAPI+'plant/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}