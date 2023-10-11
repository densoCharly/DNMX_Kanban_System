import config from "./config";

let urlAPI = config.serviceURL();

export default{
    getInventory : async () => {
        return fetch(urlAPI+'finish_good/getList/', {method:'GET'})
            .then(res => res.json())
    },

    getHistory : async () => {
        return fetch(urlAPI+'finish_good/historial', {method:'GET'})
            .then(res => res.json())
    },

    updateInventory: async (data) => {
        let formData = new FormData();
        formData.append('created_by', localStorage.getItem('id_user'));
        formData.append('id_department', localStorage.getItem('id_department'));
        formData.append('inventory', data);
        return fetch(urlAPI+'finish_good/updateFile', {
            method: 'POST',
            body: formData,
            headers: {
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteFG : async (id) => {
        return fetch(urlAPI+'finish_good/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
}