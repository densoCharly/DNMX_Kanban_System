import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getAllProductionPlans: async () => {
        return fetch(urlAPI+'production_plan/getList', {method:'GET'})
        .then(res => res.json())
    },

    getTableData: async () => {
        return fetch(urlAPI+'production_plan/table', {method:'GET'})
        .then(res => res.json())
    },
    getTableDataL2: async () => {
        return fetch(urlAPI+'production_plan/tableL2', {method:'GET'})
        .then(res => res.json())
    },

    getTableReport: async () => {
        return fetch(urlAPI+'production_plan/tableReport', {method:'GET'})
        .then(res => res.json())
    },

    getProductionPlan: async (id) => {
        return fetch(urlAPI+'production_plan/buscar/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    saveProductionPlan: async (productionPlan) => {
        return fetch(urlAPI+'production_plan/insert', {
            method: 'POST',
            body: JSON.stringify({
                "planP":productionPlan.plan,
                "status":2,
                "id_product":productionPlan.id_product,
                "id_line":productionPlan.id_line,
                "destiny":productionPlan.destiny,
                "package":productionPlan.packing,
                "instructions": productionPlan.instructions,
                "created_by": localStorage.getItem('id_user'),
                "updated_by": localStorage.getItem('id_user'),
                "token": localStorage.getItem('token')
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer : omla' 
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    updateProductionPlanTL: async (productionPlan) => {
        return fetch(urlAPI+'production_plan/actualizarTL/' + parseInt(productionPlan.id_production_plan), {
            method: 'POST',
            body: JSON.stringify({
                "real":productionPlan.real,
                "status":productionPlan.status,
                "review":productionPlan.review,
                "planP":productionPlan.planP,
                "produced":productionPlan.produced,
                "updated_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(res => res.json())
            .catch(err => console.error(err));
    },
//10.72.116.167
    updateProductionPlan: async (productionPlan) => {
        return fetch(urlAPI+'production_plan/actualizarPC/' + productionPlan.id, {
            method: 'POST',
            body: JSON.stringify({
                "id":productionPlan.id,
                "planP":productionPlan.plan,
                "status":2,
                "id_product":productionPlan.id_product,
                "id_line":productionPlan.id_line,
                "destiny":productionPlan.destiny,
                "package":productionPlan.packing,
                "no_part": productionPlan.no_part,
                "created_by":localStorage.getItem('id_user'),
                "updated_by":localStorage.getItem('id_user'),
                "token": localStorage.getItem('token'),
                "review":"",
                "instructions":productionPlan.instructions,
                "planOld": productionPlan.planOld,
                "packageOld": productionPlan.packingOld,
                "destinyOld": productionPlan.destinyOld,
                "instructionsOld": productionPlan.instructionsOld,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deleteProductionPlan: async (id) => {
        return fetch(urlAPI+'production_plan/delete/' + id, { method: 'GET' })
            .then(res => res.json())
    },

    changePriorityDown: async (productionPlan) => {
        return fetch(urlAPI+'production_plan/moveDown', {
            method: 'POST',
            body: JSON.stringify({
                "id_production_plan":productionPlan.id_production_plan,
                "priority":productionPlan.priority,
                "id_line": productionPlan.id_line,
                "updated_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    changePriorityUp: async (productionPlan) => {
        return fetch(urlAPI+'production_plan/moveUp', {
            method: 'POST',
            body: JSON.stringify({
                "id_production_plan":productionPlan.id_production_plan,
                "priority":productionPlan.priority,
                "id_line": productionPlan.id_line,
                "updated_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    reactivatePlan: async (id) => {
        return fetch(urlAPI+'production_plan/reactivatePlan', {
            method: 'POST',
            body: JSON.stringify({
                "id_production_plan":id,
                "status":2,
                "updated_by":localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
    plansFilter: async (id) => {
        return fetch(urlAPI+'production_plan/tableFilter/' + id, {method:'GET'})
        .then(res => res.json())
    },

    getTableExcel: async () => {
        return fetch(urlAPI+'production_plan/reportToExcel', {method:'GET'})
        .then(res => res.json())
    },

    planListToExcel: async (id) => {
        return fetch(urlAPI+'production_plan/planListToExcel/' + id, {method:'GET'})
        .then(res => res.json())
    },
}