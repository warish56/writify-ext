const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { getExistingCollection } = require("./utils");

const {Query} =sdk

const COLLECTION_NAME = 'User';
const  collectionData = {
    collection: undefined
};
/**
 * Schema
 *  id        email 
 *  string    string 
 */

const prepareUserCollection = async () => {

    const databases = new sdk.Databases(dbValues.client);
    const exisitingCollection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);


    if(exisitingCollection){
        collectionData.collection = exisitingCollection;
        return;
    }


    collectionData.collection = await databases.createCollection(
        dbValues.db.$id,
        sdk.ID.unique(),
        COLLECTION_NAME
    );


    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'email',
        255,
        true
    );
}


const getUserWithEmail = async (email) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal("email", email)
    ]);
    return result.documents[0];
}


const createUser = async (email) => {
    if(getUserWithEmail(email)){
        throw {message: "User already exists", status: 400};
    }

    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            id: sdk.ID.unique(),
            email: email,
        }
    );
    return document;
}


module.exports = {
    collectionData,
    prepareUserCollection,
    createUser,
    getUserWithEmail
}
