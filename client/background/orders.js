import { Routes } from "./constants.js";
import { fetchData } from "./utils.js";

export const fetchUserOrders = (userId) => {
    return fetchData(Routes.ordersList, {
        method: 'POST',
        body: JSON.stringify({userId}) 
    })
}