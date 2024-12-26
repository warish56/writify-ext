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
 *  id        user_id   payment_status
 *  string    string    pending | completed | failed
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

    if(collectionData.collection.attributes.length == 1){
        return;
    }
    
    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'user_id',
        255,
        true
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


const createOrder = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            user_id: userId,
            payment_status: PAYMENT_STATUS.pending
        }
    );
    return document;
}

const updateOrderStatus = async (orderId, status) => {  
    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        orderId,
        {
            payment_status: status
        }
    );
    return document;
}


module.exports = {
    collectionData,
    prepareOrdersCollection,
    createOrder,
    updateOrderStatus,
    getOrderWithId
}
