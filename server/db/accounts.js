const sdk = require("node-appwrite");
const {db, client} = require('./init')
const { getExistingCollection } = require("./utils");
const { Plans } = require("../constants/plans");

const databases = new sdk.Databases(client);

const COLLECTION_NAME = 'Accounts';
let collection;

/**
 * Schema
 *  user_id  payment_date   plan_id
 *  string   datetime       number
 */

const prepareAccountsCollection = async () => {

    const exisitingCollection = await getExistingCollection(db, databases, COLLECTION_NAME);


    if(exisitingCollection){
        collection = exisitingCollection;
        return;
    }

    collection = await databases.createCollection(
        db.$id,
        sdk.ID.unique(),
        COLLECTION_NAME
    );


    await databases.createStringAttribute(
        db.$id,
        collection.$id,
        'user_id',
        255,
        true
    );

    await databases.createDatetimeAttribute(
        db.$id,
        collection.$id,
        'payment_date',
        false, 
        '',
    );

    await databases.createIntegerAttribute(
        db.$id,
        collection.$id,
        'plan_id',
        true, 
    );

}

const getAccountWithUserId = async (userId) => {
    const result = await databases.listDocuments(db.$id, collection.$id, [
        Query.equal("user_id", userId)
    ]);
    return result.documents[0];
}




const createAccount = async (userId) => {
    if(getAccountWithUserId(userId)){
        throw {message: "account already exists", message: 400};
    }

    const document = await databases.createDocument(
        db.$id,
        collection.$id,
        sdk.ID.unique(),
        {
            user_id: sdk.ID.unique(),
            payment_date: Date.now(),
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

    const updatedDocument = await databases.updateDocument(
        db.$id,
        collection.$id,
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

    const updatedDocument = await databases.updateDocument(
        db.$id,
        collection.$id,
        account.$id,
        { 
            payment_date: Date.now(),
            plan_id: planId
        }
    )
    return updatedDocument;
}



module.exports = {
    collection,
    prepareAccountsCollection,
    createAccount,
    updateAccountPlan,
    updateAccountPayment,
    getAccountWithUserId
}

