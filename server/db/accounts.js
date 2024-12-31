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
    status: 'status',
    creditsUsed: 'credits_used',
    creditsUsedAt: 'credits_used_at'
}

/**
 * Schema
 *  user_id  payment_date   plan_id  credits_used  credits_used_at   status
 *  string   datetime       number   number        Datetime          ACTIVE | SUSPENDED | DELETED
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
    const currentAttributes = [ Attributes.userId, Attributes.paymentDate, Attributes.planId, Attributes.creditsUsed, Attributes.creditsUsedAt ];
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

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collection.$id,
        Attributes.creditsUsed,
        true, 
    );

    await databases.createDatetimeAttribute(
        dbValues.db.$id,
        collection.$id,
        Attributes.creditsUsedAt,
        false,
        new Date().toISOString()
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
            [Attributes.status]: ACCOUNT_STATUS.active,
            [Attributes.creditsUsed]: 0,
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
            [Attributes.planId]: planId,
            [Attributes.creditsUsed]: 0, // resetting to 0 since new plan has been purchased
            [Attributes.creditsUsedAt]: new Date().toISOString(),
        }
    )
    return updatedDocument;
}

const updateAccountCredits = async (accountId, newCredits) => {
    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        accountId,
        { 
            [Attributes.creditsUsedAt]: new Date().toISOString(),
            [Attributes.creditsUsed]: newCredits
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
    getAccountWithUserId,
    updateAccountCredits
}

