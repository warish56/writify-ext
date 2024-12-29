const { createOrder, getOrderWithId, updateOrderData, getOrdersList } =  require("../db/orders");
const { getPlanDetails } = require("../db/plan");
const { getUserWithId } = require("../db/user");
const { createRazorPayPaymentLink, getPaymentDetails } = require("../services/razorpay");
const { updateAccountPlan } = require("../db/accounts");
const {Currencies} = require('../constants/currency');
const { Plans } = require("../constants/plans");
const { PAYMENT_STATUS } = require("../constants/orders");



const createNewOrder = async(userId, planId) => {
    const userDocument = await getUserWithId(userId);
    if(!userDocument){
        throw {message: "User does not exists", status: 404};
    }

    const planDocument = await getPlanDetails(planId);

    if(!planDocument){
        throw {message: "Plan does not exists", status: 404};
    }

    const order = await createOrder(userId, planId);
    const planName = Object.keys(Plans).find(planName => Plans[planName].id === planDocument.id)
    const paymentDetails = await createRazorPayPaymentLink({
        orderId: order.$id, 
        price: planDocument.price * 100, // as per razorpay docs we have at multiply with 100 
        currency: Currencies.inr,
        description: `You are Purchasing ${planName} plan of AIMagicText`,
        userEmail: userDocument.email,
        callbackUrl: `${process.env.APP_URL}/orders/verify-payment?orderId=${order.$id}&planId=${planDocument.id}&userId=${userId}`,
    })

    return {
        orderId: order.$id,
        razorpayId: paymentDetails.id,
        payment_link: paymentDetails.short_url
    }
}

const verifyPayment = async ({
    razorPayPaymentId, 
    orderId,
    planId,
    userId 
}) => {
     // Fetch payment details from Razorpay API if needed
       // Validate payment status using Razorpay's Orders API
       const paymentData = await getPaymentDetails(razorPayPaymentId);      
       // TODO verify payment signature

       const result = {
        orderId: orderId, 
        razorPayPaymentId:paymentData.id,
        razorPayPaymentType:paymentData.method,
        razorPayContact:paymentData.contact,
        razorPayErrorCode: paymentData.error_code,
        razorPayErrorReason: `${paymentData.error_reason}, upi-Id -${paymentData.acquirer_data?.bank_transaction_id || paymentData.acquirer_data?.upi_transaction_id}`
       }
       
       if(paymentData.status === 'captured'){
           await markOrderCompleted(result);
       }else{
           await markOrderFailed(result);
       }

       await updateAccountPlan(userId, Number(planId))
       return paymentData.status === 'captured' ? 'success' : 'failed';
}


const markOrderCompleted = async ({
    orderId, 
    razorPayPaymentId,
    razorPayPaymentType,
    razorPayContact,
    razorPayErrorCode,
    razorPayErrorReason
}) => {
    const orderDocument = await getOrderWithId(orderId);
    if(!orderDocument){
        throw {message: "Order does not exists", status: 404};
    }

    const order = await updateOrderData({
        orderId, 
        status: PAYMENT_STATUS.completed,
        razorPayPaymentId,
        razorPayPaymentType,
        razorPayContact,
        razorPayErrorCode,
        razorPayErrorReason
    });
    return order;

}

const markOrderFailed = async ({
    orderId, 
    razorPayPaymentId,
    razorPayPaymentType,
    razorPayContact,
    razorPayErrorCode,
    razorPayErrorReason
}) => {
    const orderDocument = await getOrderWithId(orderId);
    if(!orderDocument){
        throw {message: "Order does not exists", status: 404};
    }
    const order = await updateOrderData({
        orderId, 
        status: PAYMENT_STATUS.failed,
        razorPayPaymentId,
        razorPayPaymentType,
        razorPayContact,
        razorPayErrorCode,
        razorPayErrorReason
    });
    return order;
}

const getOrderDetails = async (orderId) => {
    const orderDocument = await getOrderWithId(orderId);
    if(!orderDocument){
        throw {message: "Order does not exists", status: 404};
    }
   return orderDocument;
}

const getUserOrdersList = async (userId) => {
    const userDocument = await getUserWithId(userId);
    if(!userDocument){
        throw {message: "User does not exists", status: 404};
    }

    const result = await getOrdersList(userId);
    return result.documents.map(document => {
        const planDetails = Object.values(Plans).find(plan => plan.id === document.for_plan_id);
        const planName = Object.keys(Plans).find(planName => Plans[planName].id === document.for_plan_id)
        return {
            id: document.$id,
            status: document.payment_status,
            purchased_plan: {
                planName,
                ...planDetails
            },
            payment_type: document.razorpay_payment_type,
            error_reason: document.razorpay_error_reason,
            created_at: document.$createdAt,
            updated_at: document.$updatedAt
        }
    })
}

module.exports = {
    createNewOrder,
    markOrderCompleted,
    markOrderFailed,
    getOrderDetails,
    verifyPayment,
    getUserOrdersList
}