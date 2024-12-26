const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { getExistingCollection } = require("./utils");
const { PAYMENT_STATUS } = require("../constants/orders");

const COLLECTION_NAME = 'Orders';
const  collectionData = {
    collection: undefined
};
/**
 * Schema
 *  id        user_id  for_plan_id  razorpay_payment_id  razorpay_payment_type    razorpay_contact  razorpay_error_code razorpay_error_reason   payment_status
 *  string    string   string       string               string                   string            string              string                  pending | completed | failed
 */

const prepareOrdersCollection = async () => {

    const databases = new sdk.Databases(dbValues.client);
    const exisitingCollection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);


    if(exisitingCollection){
        collectionData.collection = exisitingCollection;
    }else{
        collectionData.collection = await databases.createCollection(
            dbValues.db.$id,
            sdk.ID.unique(),
            COLLECTION_NAME
        );
    }

    if(collectionData.collection.attributes.length == 8){
        return;
    }
    
    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'user_id',
        255,
        true
    );

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'for_plan_id',
        true, 
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'razorpay_payment_id',
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'razorpay_payment_type',
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'razorpay_contact',
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'razorpay_error_code',
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'razorpay_error_reason',
        255,
        false
    );

    await databases.createEnumAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'payment_status',
        [PAYMENT_STATUS.pending, PAYMENT_STATUS.completed, PAYMENT_STATUS.failed],
        true
    );
}


const getOrderWithId = async (orderId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, orderId);
    return result;
}


const createOrder = async (userId, planId) => {
    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            user_id: userId,
            payment_status: PAYMENT_STATUS.pending,
            for_plan_id: planId
        }
    );
    return document;
}

const updateOrderData = async ({
    orderId, 
    status,
    razorPayPaymentId,
    razorPayPaymentType,
    razorPayContact,
    razorPayErrorCode,
    razorPayErrorReason
}) => {  
    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        orderId,
        {
            payment_status: status,
            razorpay_payment_id: razorPayPaymentId,
            razorpay_payment_type: razorPayPaymentType,
            razorpay_contact: razorPayContact,
            razorpay_error_code: razorPayErrorCode,
            razorpay_error_reason: razorPayErrorReason
        }
    );
    return document;
}


module.exports = {
    collectionData,
    prepareOrdersCollection,
    createOrder,
    updateOrderData,
    getOrderWithId
}
