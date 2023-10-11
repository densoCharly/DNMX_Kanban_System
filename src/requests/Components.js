import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllComponents: async () => {
        return fetch(urlAPI+'component/getList', {method:'GET'})
            .then(res => res.json());
    },
    getComponentsWMS: async (id) => {
        //return fetch('http://10.72.116.12:8080/DNMX_Kanban_System_API/services/wms/getList/', {method: 'GET'})
        return fetch(urlAPI+'wms/getList/', {method: 'GET'})
            .then(res => res.json())
    },
    getThermalWMS: async () => {
        return fetch(urlAPI+'wms/getThermalList/', {metnpmhod: 'GET'})
            .then(res => res.json())
    },

    getSelectSKU: async () => {
        //return fetch('http://10.72.116.12:8080/DNMX_Kanban_System_API/services/wms/selectSKU', {method:'GET'})
        return fetch(urlAPI+'wms/selectSKU', {method:'GET'})
            .then(res=> res.json())
    },

    getComponentLocations: async (sku) => {
        return fetch(urlAPI+'wms/getComponentLocations', {
            method:'POST',
            body: JSON.stringify({
                "sku": sku,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    },

    addProductComponent: async (product_component) => {
        return fetch(urlAPI+'product_component/insert', {
            method: 'POST',
            body: JSON.stringify({
                id_product: product_component.id_product,
                id_component: product_component.id_component,
                sku_desc: product_component.sku_desc,
                pcs_total: product_component.pzs_comp
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    saveComponent: async (component) => {
        return fetch(urlAPI+'component/insert', {
            method: 'POST',
            body: JSON.stringify({
                "no_component":component.no_component,
                "name_component":component.name_component,
                "location":component.location,
                "pcs_box":component.pcs_box,
                "stock":component.stock,
                "status":1,
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
    updateComponent: async (component) => {
        return fetch(urlAPI+'component/update/' + component.id_component, {
            method: 'POST',
            body: JSON.stringify({
                "no_component":component.no_component,
                "name_component":component.name_component,
                "location":component.location,
                "pcs_box":component.pcs_box,
                "stock":component.stock,
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteComponent: async (id) => {
        return fetch(urlAPI+'product_component/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }
}