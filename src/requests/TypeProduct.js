import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllTypeProducts: async () => {
        return fetch(urlAPI+'type_product/getList', {method:'GET'})
            .then(res => res.json());
    },
    getTypeProductsByPlant: async (id) => {
        return fetch(urlAPI+'type_product/getTypeProductsByPlant/' + id, {method:'GET'})
            .then(res => res.json());
    },
    addTypeProduct: async (type_product) => {
        return fetch(urlAPI+'type_product/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_product":type_product.name_product,
                "id_plant":type_product.plant_id,
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

    deleteTypeProduct: async (id) => {
        return fetch(urlAPI+'type_product/delete/' + id, { method: 'GET' })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateTypeProduct: async (type_product) => {
        return fetch(urlAPI+'type_product/update/' + type_product.id_type_product, {
            method: 'POST',
            body: JSON.stringify({
                "name_product":type_product.name_product,
                "updated_by":localStorage.getItem('id_user'),
                "id_plant":type_product.plant_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}