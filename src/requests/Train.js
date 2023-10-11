import config from "./config";

let urlAPI = config.serviceURL();

export default {
    addCart: async (cart) => {
        return fetch(urlAPI+'train/insertCart', {
            method: 'POST',
            body: JSON.stringify({
                "no_cart":cart.no_cart,
                "type":cart.type,
                "created_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateCart: async (cart) => {
        return fetch(urlAPI+'train/updateCart/' + cart.id_cart, {
            method: 'POST',
            body: JSON.stringify({
                "no_cart":cart.no_cart,
                "type":cart.type,
                "updated_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteCart: async (id) => {
        return fetch(urlAPI+'train/deleteCart/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteTrain: async (id) => {
        return fetch(urlAPI+'train/deleteTrain/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getModalTrain: async (id) => {
        return fetch(urlAPI+'train/getModalTrain/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    selectedCarts: async (id) => {
        return fetch(urlAPI+'train/selectedCarts/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getCarts: async () => {
        return fetch(urlAPI+'train/getCarts', {method:'GET'})
            .then(res => res.json());
    },

    getTrains: async () => {
        return fetch(urlAPI+'train/getTrains', {method:'GET'})
            .then(res => res.json());
    },

    followTrains: async () => {
        return fetch(urlAPI+'train/followTrains', {method:'GET'})
            .then(res => res.json());
    },

    getDisponibleCarts: async () => {
        return fetch(urlAPI+'train/getDisponibleCarts', {method:'GET'})
            .then(res => res.json());
    },

    addTrain: async (data) => {
        return fetch(urlAPI + 'train/addTrain', {
            method: 'POST',
            body: JSON.stringify({
                'code': data.code,
                'id_line': data.id_line,
                'carts': data.carts,
                'id_user': localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateTrain: async (data) => {
        return fetch(urlAPI + 'train/updateTrain/' + data.id_train, {
            method: 'POST',
            body: JSON.stringify({
                'code': data.code,
                'id_line': data.id_line,
                'carts': data.carts,
                'updated_by': localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    asignTrain: async (data) => {
        console.log(data);
        return fetch(urlAPI + 'train/asignTrain', {
            method: 'POST',
            body: JSON.stringify({
                'id_shopping_list': data.id_shopping_list,
                'trainCode': data.trainCode,
                'lot': data.lot,
                'id_user': localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    
    getComponentsByTrain: async (data) => {
        return fetch(urlAPI + 'train/getComponentsByTrain', {
            method: 'POST',
            body: JSON.stringify({
                'code_train': data,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    releaseTrain: async (data) => {
        return fetch(urlAPI + 'train/releaseTrain', {
            method: 'POST',
            body: JSON.stringify({
                'code_train': data,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    setTransitTrain: async (data) => {
        return fetch(urlAPI + 'train/transitTrain', {
            method: 'POST',
            body: JSON.stringify({
                'code_train': data,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    getTrainStatus: async () => {
        return fetch(urlAPI+'train_status/getList', {method:'GET'})
            .then(res => res.json());
    },

    abortTrip: async (data) => {
        return fetch(urlAPI + 'train/abortTrip', {
            method: 'POST',
            body: JSON.stringify({
                'id_shopping_list': data.id_shopping_list,
                'id_train_list': data.id_train_list,
                'lot': data.lot,
                'id_user': localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    asignedTrains: async (idLine) => {
        return fetch(urlAPI+'train/asignedTrains/'+ idLine, {method:'GET'})
            .then(res => res.json())
            .catch(err => console.error(err));
    },
}