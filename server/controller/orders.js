const { PAYMENT_STATUS } = require("../constants/orders");
const { createOrder, getOrderWithId, updateOrderStatus } =  require("../db/orders");
const { getPlanDetails } = require("../db/plan");
const { getUserWithId } = require("../db/user");
const { createRazorPayPaymentLink } = require("../services/razorpay");



const createNewOrder = async(userId, planId) => {
    const userDocument = await getUserWithId(userId);
    if(!userDocument){
        throw {message: "User does not exists", status: 404};
    }

    const planDocument = getPlanDetails(planId);

    if(!planDocument){
        throw {message: "Plan does not exists", status: 404};
    }

    const order = await createOrder(userId, planId);
    const paymentDetails = await createRazorPayPaymentLink({
        orderId: order.$id, 
        price: planDocument.price, 
        currency: Currencies.dollar,
        description: `Purchasing plan - ${planDocument.id}`,
        userEmail: userDocument.email,
        callbackUrl,
    })

    return {
        orderId: order.$id,
        razorpayId: paymentDetails.id,
        payment_link: paymentDetails.short_url
    }
}


const verifyPayment = () => {

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