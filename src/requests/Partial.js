import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllPartials: async () => {
        return fetch(urlAPI+'partial/getList', {method:'GET'})
            .then(res => res.json());
    },
    getTableData: async () => {
        return fetch(urlAPI+'partial/table', {method:'GET'})
            .then(res => res.json());
    },

    getArea: async (id) => {
        return fetch(urlAPI+'partial/buscar/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    addPartial: async (partial) => {
        return fetch(urlAPI+'partial/insert', {
            method: 'POST',
            body: JSON.stringify({
                "component":partial.component,
                "stock": partial.stock,
                "id_line":partial.id_line,
                "created_by":localStorage.getItem('id_user'),
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updatePartial: async (partial) => {
        return fetch(urlAPI+'partial/update/' + partial.id, {
            method: 'POST',
            body: JSON.stringify({
                "component":partial.component,
                "id_line":partial.id_line,
                "stock": partial.stock,
                "updated_by":localStorage.getItem('id_user')
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deletePartial: async (id) => {
        return fetch(urlAPI+'partial/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getPartialByLine: async (id) => {
        return fetch(urlAPI+'partial/getPartialByLine/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
}