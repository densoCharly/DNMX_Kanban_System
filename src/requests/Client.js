import config from './config';

let urlAPI = config.serviceURL();

export default {
    getAllClients: async () => {
        return fetch(urlAPI+'client/getList', {method:'GET'})
        .then(res => res.json());
    },

    addClient: async (client) => {
        return fetch(urlAPI+'client/insert', {
            method: 'POST',
            body: JSON.stringify({
                "nameClient":client.name_client,
                "createdBy":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateClient: async (client) => {
        return fetch(urlAPI+'client/update/'+client.idClient, {
            method: 'POST',
            body: JSON.stringify({
                "nameClient":client.nameClient,
                "updatedBy":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteClient: async (id) => {
        return fetch(urlAPI+'client/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}