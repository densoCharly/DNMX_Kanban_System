import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getComponents: async () => {
        return fetch(urlAPI+'shopping_list/getComponents', {method:'GET'})
            .then(res => res.json());
    },
    
    getLists: async () => {
        return fetch(urlAPI+'shopping_list/getLists', {method:'GET'})
            .then(res => res.json());
    },

    getFilterList: async (id) => {
        return fetch(urlAPI+'shopping_list/getFilterList/'+id, {method:'GET'})
            .then(res => res.json());
    },

    importComponents: async () => {
        return fetch(urlAPI+'shopping_list/importComps', {method:'GET'})
            .then(res => res.json());
    },

    getComponentsList: async (data) => {
        return fetch(urlAPI+'shopping_list/createShoppingList', {
                method:'POST',
                body: JSON.stringify({
                    "id_shopping_list": data.id_shopping_list,
                    "id_user": localStorage.getItem('id_user')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json());
    },

    closeList: async (id_shopping_list, idCloseList) => {
        return fetch(urlAPI+'shopping_list/closeList', {
                method:'POST',
                body: JSON.stringify({
                    "id_shopping_list": id_shopping_list,
                    "close_list": idCloseList,
                    "id_user": localStorage.getItem('id_user')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json());
    },
    
    downList: async (id_shopping_list, idCloseList) => {
        return fetch(urlAPI+'shopping_list/downList', {
                method:'POST',
                body: JSON.stringify({
                    "id_shopping_list": id_shopping_list,
                    "close_list": idCloseList,
                    "id_user": localStorage.getItem('id_user')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json());
    },
    
    addComponent: async (data) => {
        return fetch(urlAPI+'shopping_list/insert', {
            method: 'POST',
            body: JSON.stringify({
                "sku": data.sku,
                "sku_desc": data.sku_desc,
                "kind": data.kind,
                "qty_box": data.qty_box,
                "location": data.location,
                "id_user":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    configureComponent: async (data) => {
        return fetch(urlAPI+'shopping_list/configureComponent', {
            method: 'POST',
            body: JSON.stringify({
                "sku": data.sku,
                "sku_desc": data.sku_desc,
                "kind": data.kind,
                "qty_box": data.qty_box,
                "location": data.location,
                "id_component": data.id_component,
                "id_user":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    addExtraComponent: async (data) => {
        return fetch(urlAPI+'shopping_list/injectComponent', {
            method: 'POST',
            body: JSON.stringify({
                "component": data.component,
                "id_train": data.id_train,
                "boxes": data.boxes,
                "created_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
}