import config from './config';

let urlAPI = config.serviceURL();

export default {
    getAllTypes: async () => {
        return fetch(urlAPI+'type_subassy/getList', {method:'GET'})
        .then(res => res.json());
    },

    addTypeSA: async (typeSA) => {
        return fetch(urlAPI+'type_subassy/insert', {
            method: 'POST',
            body: JSON.stringify({
                "type_name":typeSA.name_type,
                "created_by":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateTypeSA: async (typeSA) => {
        return fetch(urlAPI+'type_subassy/update/'+typeSA.id_type_subassy, {
            method: 'POST',
            body: JSON.stringify({
                "type_name":typeSA.type_name,
                "updated_by":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteTypeSA: async (id) => {
        return fetch(urlAPI+'type_subassy/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}