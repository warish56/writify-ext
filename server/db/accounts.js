const sdk = require("node-appwrite");
const {dbValues} = require('./init')
const { getExistingCollection } = require("./utils");
const { Plans } = require("../constants/plans");
const { ACCOUNT_STATUS } = require("../constants/accounts");

const {Query} =sdk

const COLLECTION_NAME = 'Accounts';
const  collectionData = {
    collection: undefined
};

const Attributes = {
    userId: 'user_id',
    paymentDate: 'payment_date',
    planId: 'plan_id',
    status: 'status'
}

/**
 * Schema
 *  user_id  payment_date   plan_id  status
 *  string   datetime       number   ACTIVE | SUSPENDED | DELETED
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
    const currentAttributes = [ Attributes.userId, Attributes.paymentDate, Attributes.planId ];
    const isEveryAttributeCreated = currentAttributes.every(attributeKey => collection.attributes.find(attribute => attribute.key === attributeKey ));

    if(isEveryAttributeCreated){
        return;
    }

    await databases.createStringAttribute(
        dbValues.db.$id,
        collection.$id,
        Attributes.userId,
        255,
        true
    );

    await databases.createDatetimeAttribute(
        dbValues.db.$id,
        collection.$id,
        Attributes.paymentDate,
        false, 
    );

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collection.$id,
        Attributes.planId,
        true, 
    );

}

const getAccountWithUserId = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.userId, userId)
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
            [Attributes.userId]: userId,
            [Attributes.paymentDate]: new Date().toISOString(),
            [Attributes.planId]: Plans.FREE.id,
            [Attributes.status]: ACCOUNT_STATUS.active
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
            [Attributes.paymentDate]: new Date().toISOString(),
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
            [Attributes.paymentDate]: new Date().toISOString(),
            [Attributes.planId]: planId
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

