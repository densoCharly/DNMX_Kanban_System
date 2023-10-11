import config from "./config";

let urlAPI = config.serviceURL();

export default {
    getPrinters: async () => {
        return fetch(urlAPI+'printer/getList', {method:'GET'})
            .then(res => res.json())
    },

    getTablePrinters: async () => {
        return fetch(urlAPI+'printer/getTablePrinters', {method:'GET'})
            .then(res => res.json())
    },

    addPrinter: async (printer) => {
        return fetch(urlAPI+'printer/insert', {method:'POST',     
                body: JSON.stringify({
                    "ip_address":printer.ip_address,
                    "printer_name":printer.printer_name,
                    "id_line":printer.id_line,
                    "created_by":localStorage.getItem('id_user'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
              .catch(err => console.error(err));
    },

    getTicket: async ({ checkman, subassy, line, area, pieces, lot, turn, kindStock,subassyId,lineId,areaId}) => {
        return fetch(urlAPI+'printer/printTicket', {method:'POST',     
                body: JSON.stringify({
                    "checkman":checkman,
                    "subassy":subassy,
                    "line":line,
                    "area":area,
                    "pieces":pieces,
                    "lot":lot,
                    "turn":turn,
                    "kindStock": kindStock,
                    "created_by":localStorage.getItem('id_user'),
                    "subassyId":subassyId,
                    "lineId":lineId,
                    "areaId":areaId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
                }).then(res => res.json())
                .catch(err => console.error(err));
    },

    getMixedTicket: async (data, partial) => {
        return fetch(urlAPI+'printer/printMixed', {method:'POST',     
                body: JSON.stringify({
                    "checkman":data.checkman,
                    "subassy":data.subassy,
                    "line":data.line,
                    "area":data.area,
                    "pieces":data.pieces,
                    "lot":data.lot,
                    "turn":data.turn,
                    "kindStock": data.kindStock,
                    "partialCheckman":partial.checkman,
                    "partialSubassy":partial.subassy,
                    "partialLine":partial.line,
                    "partialArea":partial.area,
                    "partialPieces":partial.pieces,
                    "partialLot":partial.lot,
                    "partialTurn":partial.turn,
                    "partialTime":partial.time,
                    "created_by":localStorage.getItem('id_user'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(err => console.error(err));
    },

    updatePrinter: async (printer) => {
        return fetch(urlAPI+'printer/update/' + printer.id_printer, {
            method: 'POST',
            body: JSON.stringify({
                "ip_address":printer.ip_address,
                "printer_name":printer.printer_name,
                "id_line":printer.id_line,
                "updated_by":localStorage.getItem('id_user')
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },

    deletePrinter: async (id) => {
        return fetch(urlAPI+'printer/delete/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
}