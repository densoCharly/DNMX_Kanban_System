import config from "./config";

let urlAPI = config.serviceURL();

export default {
    DiscountInventory: async (Data) => {
        return fetch(urlAPI+'train/DiscountInventory', {
            method: 'POST',
            body: JSON.stringify({
                "sku":Data.sku,
                "id_shopping_list":Data.id_shopping_list,
                "current_lot":Data.current_lot,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    },
}