import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllProducts: async () => {
        return fetch(urlAPI+'product/getList', {method:'GET'})
        .then(res => res.json())
    },

    getProductsSlc: async () => {
        return fetch(urlAPI+'product/getSelects', {method:'GET'})
        .then(res => res.json())
    },

    getTableData: async () => {
        return fetch(urlAPI+'product/getTableData', {method:'GET'})
        .then(res => res.json())
    },

    getTableDataFiltered: async () => {
        return fetch(urlAPI+'product/getTableDataFiltered/'+localStorage.getItem('id_department'), {method:'GET'})
        .then(res => res.json())
    },

    getProduct: async (id) => {
        return fetch(urlAPI+'product/buscar/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    saveProduct: async (product) => {
        return fetch(urlAPI+'product/insert', {
            method: 'POST',
            body: JSON.stringify({
                "no_part":product.no_part,
                "model":product.model,
                "status":1,
                "id_line":product.line,
                "id_client":product.id_client,
                "manpower":product.manpower,
                "lot_size": product.lot_size,
                "id_type_product":product.id_type_product,
                "created_by":localStorage.getItem('id_user'),
                "updated_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    updateProduct: async (product, components) => {
        return fetch(urlAPI+'product/update/' + product.id_product, {
            method: 'POST',
            body: JSON.stringify({
                    "no_part":product.no_part,
                    "model":product.model,
                    "id_line":product.id_line,
                    "id_client":product.id_client,
                    "manpower":product.manpower,
                    "id_type_product":product.id_type_product,
                    "lot_size": product.lot_size,
                    "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteProduct: async (id) => {
        return fetch(urlAPI+'product/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    saveProductFull: async (product) => {
        return fetch(urlAPI+'product/addProductFull', {
            method: 'POST',
            body: JSON.stringify({
                "product": {
                    "no_part":product.no_part,
                    "model":product.model,
                    "status":1,
                    "id_client":product.id_client,
                    "manpower":product.manpower,
                    "id_type_product":product.id_type_product,
                    "created_by":localStorage.getItem('id_user'),
                    "updated_by":localStorage.getItem('id_user')
                },
                "components": "Not Now",
                "line": product.line
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getSelects: async () => {
        return fetch(urlAPI+'product/getSelects', { method: 'GET' })
            .then(res => res.json())
    },

    getSelectsPack: async () => {
        return fetch(urlAPI+'product/getSelectsPack', {method:'GET'})
        .then(res => res.json())
    },

    getSelectsClient: async () => {
        return fetch(urlAPI+'client/getList', {method:'GET'})
        .then(res => res.json())
    },

    getBomProduct: async (no_part) => {
        return fetch(urlAPI+'product_component/getList', {
            method:'POST',
            body: JSON.stringify({
                "no_part":no_part,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => console.error(err));
    },

    getBombyProduct: async (id) => {
        return fetch(urlAPI+'product_component/getComponentsByProduct/'+id, {method:'GET'})
            .then(res => res.json())
    },

    createBOM: async () => {
        return fetch(urlAPI+'product_component/createBOM/'+localStorage.getItem('id_user'), {method:'GET'})
            .then(res => res.json())
    },

    getDomoBom: async (no_part) => {
        return fetch(urlAPI+'product_component/getBom', {
            method: 'POST',
            body: JSON.stringify({
                "no_part":no_part,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getCompleteBom: async (id_product) => {
        return fetch(urlAPI+'product_component/getCompleteBom', {
            method: 'POST',
            body: JSON.stringify({
                "id_product":id_product,
                "id_user": localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    addProductComponent: async (data) => {
        return fetch(urlAPI+'product_component/insert', {
            method:'POST',
            body: JSON.stringify({
                "id_product": data.id_product,
                "sku": data.sku,
                "qty_pc": data.qty_pc,
                "sku_desc": data.sku_desc,
                "qty_box": data.qty_box,
                "location": data.location,
                "process": data.process,
                "model": data.model,
                "kind_asign": data.kind_asign,
                "created_by": localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    },

    updateProductComponent: async (data) => {
        return fetch(urlAPI+'product_component/update/'+data.id_product_component, {
            method:'POST',
            body: JSON.stringify({
                "id_product_component": data.id_product_component,
                "qty_pc": data.qty_pc,
                "qty_box": data.qty_box,
                "location": data.location,
                "process": data.process,
                "kind": data.kind,
                "updated_by": localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json());
    },

    updateProductComponentFoto: async (data) => {
        let formData = new FormData();
        formData.append("id_product_component", data.id_product_component);
        formData.append("qty_pc", data.qty_pc);
        formData.append("qty_box", data.qty_box);
        formData.append("location", data.location);
        formData.append("process", data.process);
        formData.append("kind", data.kind);
        formData.append("foto_component", data.foto_component);
        formData.append("updated_by", localStorage.getItem('id_user'));
        return fetch(urlAPI+'product_component/updatePhoto/'+data.id_product_component, {
            method:'POST',
            body: formData,
            headers: {
            }
        })
        .then(res => res.json());
    },
}