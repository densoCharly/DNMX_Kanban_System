import config from './config';

let urlAPI = config.serviceURL();

export default {
    getAllProviders: async () => {
        return fetch(urlAPI+'provider/getList', {method:'GET'})
        .then(res => res.json());
    },

    addProvider: async (provider) => {
        return fetch(urlAPI+'provider/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_provider":provider.name_provider,
                "created_by":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateProvider: async (provider) => {
        return fetch(urlAPI+'provider/update/'+provider.id_provider, {
            method: 'POST',
            body: JSON.stringify({
                "name_provider":provider.name_provider,
                "updated_by":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteProvider: async (id) => {
        return fetch(urlAPI+'provider/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}