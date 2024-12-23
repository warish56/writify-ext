const sdk = require("node-appwrite");
const {dbValues} = require('./init')
const { getExistingCollection } = require("./utils");
const { Plans } = require("../constants/plans");

const {Query} =sdk

const COLLECTION_NAME = 'Accounts';
const  collectionData = {
    collection: undefined
};

/**
 * Schema
 *  user_id  payment_date   plan_id
 *  string   datetime       number
 */

const prepareAccountsCollection = async () => {
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


    const collection = collectionData.collection;

    if(collection.attributes.length === 3){
        return;
    }

    await databases.createStringAttribute(
        dbValues.db.$id,
        collection.$id,
        'user_id',
        255,
        true
    );

    await databases.createDatetimeAttribute(
        dbValues.db.$id,
        collection.$id,
        'payment_date',
        false, 
    );

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collection.$id,
        'plan_id',
        true, 
    );

}

const getAccountWithUserId = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal("user_id", userId)
    ]);
    return result.documents[0];
}

const getAllAccounts = async () => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id);
    return result.documents;
}




const createAccount = async (userId) => {
    const account = await getAccountWithUserId(userId);
    if(account){
        throw {message: "account already exists", message: 400};
    }


    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            user_id: userId,
            payment_date: new Date().toISOString(),
            plan_id: Plans.FREE.id
        }
    );
    return document;
}

const updateAccountPayment = async (userId) => {

    const account = await getAccountWithUserId(userId);
    if(!account){
        throw new {message: "Invalid account", status: 404}
    }

    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        account.$id,
        { 
            payment_date: Date.now()
        }
    )
    return updatedDocument;
}

const updateAccountPlan = async (userId, planId) => {
   
    const account = await getAccountWithUserId(userId);
    if(!account){
        throw {message: "Invalid account", status: 404}
    }
    
    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        account.$id,
        { 
            payment_date: Date.now(),
            plan_id: planId
        }
    )
    return updatedDocument;
}



module.exports = {
    collectionData,
    prepareAccountsCollection,
    createAccount,
    updateAccountPlan,
    updateAccountPayment,
    getAllAccounts,
    getAccountWithUserId
}

