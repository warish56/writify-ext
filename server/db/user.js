const sdk = require("node-appwrite");
const {db, client} = require('./init');
const { getExistingCollection } = require("./utils");


const databases = new sdk.Databases(client);

const {Query} =sdk

const COLLECTION_NAME = 'User';
let collection;

/**
 * Schema
 *  id        email 
 *  string    string 
 */

const prepareUserCollection = async () => {


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
        'email',
        255,
        true
    );
}


const getUserWithEmail = async (email) => {
    const result = await databases.listDocuments(db.$id, collection.$id, [
        Query.equal("email", email)
    ]);
    return result.documents[0];
}


const createUser = async (email) => {
    if(getUserWithEmail(email)){
        throw {message: "User already exists", status: 400};
    }

    const document = await databases.createDocument(
        db.$id,
        collection.$id,
        sdk.ID.unique(),
        {
            id: sdk.ID.unique(),
            email: email,
        }
    );
    return document;
}


module.exports = {
    collection,
    prepareUserCollection,
    createUser,
    getUserWithEmail
}
