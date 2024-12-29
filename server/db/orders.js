const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { getExistingCollection } = require("./utils");
const { PAYMENT_STATUS } = require("../constants/orders");

const {Query} = sdk;

const COLLECTION_NAME = 'Orders';
const  collectionData = {
    collection: undefined
};


const Attributes = {
    userId: 'user_id',
    forPlanId: 'for_plan_id',
    razorpayPaymentId: 'razorpay_payment_id',
    razorpayPaymentType: 'razorpay_payment_type',
    razorpayContact: 'razorpay_contact',
    razorpayErrorCode: 'razorpay_error_code',
    razorpayErrorReason: 'razorpay_error_reason',
    paymentStatus: 'payment_status'
}


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

    const currentAttributes = [ 
        Attributes.userId, 
        Attributes.forPlanId, 
        Attributes.razorpayPaymentId, 
        Attributes.razorpayPaymentType, 
        Attributes.razorpayContact, 
        Attributes.razorpayErrorCode, 
        Attributes.razorpayErrorReason, 
        Attributes.paymentStatus, 
    ];
    const isEveryAttributeCreated = currentAttributes.every(attributeKey => collectionData.collection.attributes.find(attribute => attribute.key === attributeKey ));

    if(isEveryAttributeCreated){
        return;
    }


    if(collectionData.collection.attributes.length == 8){
        return;
    }
    
    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.userId,
        255,
        true
    );

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.forPlanId,
        true, 
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.razorpayPaymentId,
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.razorpayPaymentType,
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.razorpayContact,
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.razorpayErrorCode,
        255,
        false
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.razorpayErrorReason,
        255,
        false
    );

    await databases.createEnumAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.paymentStatus,
        [PAYMENT_STATUS.pending, PAYMENT_STATUS.completed, PAYMENT_STATUS.failed],
        true
    );
}


const getOrderWithId = async (orderId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, orderId);
    return result;
}

const getOrdersList = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId, userId)
    ]);
    return result;
}


const createOrder = async (userId, planId) => {
    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            [Attributes.userId]: userId,
            [Attributes.paymentStatus]: PAYMENT_STATUS.pending,
            [Attributes.forPlanId]: planId
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
            [Attributes.paymentStatus]: status,
            [Attributes.razorpayPaymentId]: razorPayPaymentId,
            [Attributes.razorpayPaymentType]: razorPayPaymentType,
            [Attributes.razorpayContact]: razorPayContact,
            [Attributes.razorpayErrorCode]: razorPayErrorCode,
            [Attributes.razorpayErrorReason]: razorPayErrorReason
        }
    );
    return document;
}


module.exports = {
    collectionData,
    prepareOrdersCollection,
    createOrder,
    updateOrderData,
    getOrderWithId,
    getOrdersList
}
