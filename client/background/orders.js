import { API_URL, Routes } from "./constants.js";

export const fetchUserOrders = (userId) => {
    return fetch(`${API_URL}${Routes.ordersList}`,{
        method: 'POST',
        body: JSON.stringify({userId}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch user orders');
        }
    })
    .then(response => ([response.data, response.error || null]))
    .catch(error => {
        console.log(error)
       return ([null, error?.message || error]) 
    })
}