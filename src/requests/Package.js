import config from "./config";

let urlAPI = config.serviceURL();

export default{
    getAllPackages: async () => {
        return fetch(urlAPI+'package/getList', {method:'GET'})
            .then(res => res.json())
    },

    getInventory: async () => {
        return fetch(urlAPI+'package/inventory', {method:'GET'})
            .then(res => res.json())
    },

    getHistory: async () => {
        return fetch(urlAPI+'package/history', {method:'GET'})
            .then(res => res.json())
    },

    getTableData: async () => {
        return fetch(urlAPI+'package/getTableData', {method:'GET'})
            .then(res => res.json())
    },

    getModalPackage: async (id) => {
        return fetch(urlAPI+'package/getModalPackage/' + id, {method:'GET'})
        .then(res => res.json())
    },

    getPackageByProduct: async (id) => {
        return fetch(urlAPI+'package/getPackageByProduct/' + id, {method:'GET'})
        .then(res => res.json())
    },

    addPackage: async (pack) => {
        return fetch(urlAPI+'package/insert', {
            method: 'POST',
            body: JSON.stringify({
                "name_package":pack.name,
                "lot":pack.lot,
                "status":1,
                "products":pack.products,
                "created_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    deletePackage: async (id) => {
        return fetch(urlAPI+'package/delete/' + id, {
            method: 'GET'
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteInventory: async (id) => {
        return fetch(urlAPI+'package/eliminarInv/' + id, {
            method: 'GET'
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    updatePackage: async (pack) => {
        return fetch(urlAPI+'package/update/' + pack.id_package, {
            method: 'POST',
            body: JSON.stringify({
                "name_package":pack.name,
                "lot":pack.lot,
                "products":pack.products,
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    getProviders: async () => {
        return fetch(urlAPI+'provider/getList', {method:'GET'})
        .then(res => res.json())
    },

    addStock: async (stock) => {
        return fetch(urlAPI+'package/addStock', {
            method: 'POST',
            body: JSON.stringify({
                "id_package":stock.id_pack,
                "id_provider":stock.id_provider,
                "real":stock.real,
                "no_manifest":stock.no_manifest,
                "type":stock.type,
                "type_stock":stock.material,
                "manifest":stock.manifest,
                "no_box":stock.no_box,
                "difference":stock.diff,
                "status":1,
                "created_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    getReceiptTable: async () => {
        return fetch(urlAPI+'package/receiptTable', {method:'GET'})
        .then(res => res.json())
    },

    modCartonLog: async (data) => {
        var stock_carton;
        var rent_carton;
        if(data.stock_carton){
            stock_carton=data.stock_carton;
        }else{
            stock_carton=0
        }
        if(data.rent_carton){
            rent_carton=data.rent_carton;
        }else{
            rent_carton=0
        }
        return fetch(urlAPI+'package/modCarton', {
            method: 'POST',
            body: JSON.stringify({
                "id_package":data.id_package,
                "stock_carton":stock_carton,
                "rent_carton":rent_carton,
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    modStock: async (data) => {
        var stock_carton;
        var stock_plastic;
        var stock_harmed;
        var stock_rent;
        var rent_plastic;
        var rent_carton;

        data.stock_carton ? stock_carton=data.stock_carton : stock_carton=0;
        data.rent_carton ? rent_carton=data.rent_carton : rent_carton=0;
        data.stock_plastic ? stock_plastic=data.stock_plastic : stock_plastic=0;
        data.stock_harmed ? stock_harmed=data.stock_harmed : stock_harmed=0;
        data.stock_rent ? stock_rent=data.stock_rent : stock_rent=0;
        data.rent_plastic ? rent_plastic=data.rent_plastic : rent_plastic=0;
        
        return fetch(urlAPI+'package/modStock', {
            method: 'POST',
            body: JSON.stringify({
                "id_package":data.id_package,
                "stock_carton":stock_carton,
                "stock_plastic":stock_plastic,
                "stock_harmed":stock_harmed,
                "stock_rent":stock_rent,
                "rent_plastic":rent_plastic,
                "rent_carton":rent_carton,
                "updated_by":localStorage.getItem('id_user')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => console.error(err));
    },

    updateInventory: async (data) => {
        let formData = new FormData();
        formData.append('created_by', localStorage.getItem('id_user'));
        formData.append('id_department', localStorage.getItem('id_department'));
        formData.append('inventory', data);
        //debugger;
        return fetch(urlAPI+'package/updateFile', {
            method: 'POST',
            body: formData,
            headers: {
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

}