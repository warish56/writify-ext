const { PAYMENT_STATUS } = require("../constants/orders");
const { createOrder, getOrderWithId, updateOrderStatus } =  require("../db/orders");
const { getUserWithId } = require("../db/user");



const createNewOrder = async(userId) => {
    const userDocument = await getUserWithId(userId);
    if(!userDocument){
        throw {message: "User does not exists", status: 404};
    }
    const order = await createOrder(userId);
    return order;
}


const markOrderCompleted = async (orderId) => {
    const orderDocument = await getOrderWithId(orderId);
    if(!orderDocument){
        throw {message: "Order does not exists", status: 404};
    }

    const order = await updateOrderStatus(orderId, PAYMENT_STATUS.completed);
    return order;

}

const markOrderFailed = async (orderId) => {
    const orderDocument = await getOrderWithId(orderId);
    if(!orderDocument){
        throw {message: "Order does not exists", status: 404};
    }
    const order = await updateOrderStatus(orderId, PAYMENT_STATUS.failed);
    return order;
}

const getOrderDetails = async (orderId) => {
    const orderDocument = await getOrderWithId(orderId);
    if(!orderDocument){
        throw {message: "Order does not exists", status: 404};
    }
   return orderDocument;
}

module.exports = {
    createNewOrder,
    markOrderCompleted,
    markOrderFailed,
    getOrderDetails
}