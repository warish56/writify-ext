const sdk = require("node-appwrite");
const {dbValues} = require('./init');
const { getExistingCollection } = require("./utils");

const {Query} =sdk

const COLLECTION_NAME = 'User';
const  collectionData = {
    collection: undefined
};

const Attributes = {
    email: 'email',
}


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
    }else{
        collectionData.collection = await databases.createCollection(
            dbValues.db.$id,
            sdk.ID.unique(),
            COLLECTION_NAME
        );
    }

    const currentAttributes = [ Attributes.email ];
    const isEveryAttributeCreated = currentAttributes.every(attributeKey => collectionData.collection.attributes.find(attribute => attribute.key === attributeKey ));

    if(isEveryAttributeCreated){
        return;
    }
    
    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.email,
        255,
        true
    );
}


const getUserWithEmail = async (email) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.email, email)
    ]);
    return result.documents[0];
}

const getUserWithId = async (userId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.getDocument(dbValues.db.$id, collectionData.collection.$id, userId);
    return result;
}



const createUser = async (email) => {
    const userWithEmail = await getUserWithEmail(email);
    if(userWithEmail){
        throw {message: "User already exists", status: 400};
    }

    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            [Attributes.email]: email,
        }
    );
    return document;
}


module.exports = {
    collectionData,
    prepareUserCollection,
    createUser,
    getUserWithEmail,
    getUserWithId
}
