const sdk = require("node-appwrite");
const {dbValues} = require('./init')
const { getExistingCollection } = require("./utils");

const COLLECTION_NAME = 'Otp';
const  collectionData = {
    collection: undefined
};
/**
 * Schema
 *  email     otp  
 *  string    number 
 */

const prepareOtpCollection = async () => {

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

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'otp',
        true, 
    );

}

const getOtpWithEmail = async (email) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal("email", email)
    ]);
    return result.documents[0];
}




const updateOtp = async (email, otp) => {
    const document = getOtpWithEmail(email);
    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        document.$id,
        { 
            otp
        }
    )
    return updatedDocument;
}



const createOrUpdateOtp = async (email, otp) => {

    if(getOtpWithEmail(email)){
        updateOtp(email, otp);
        return;
    }

    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            email,
            otp,
        }
    );
    return document;
}



module.exports = {
    collectionData,
    prepareOtpCollection,
    createOrUpdateOtp,
    getOtpWithEmail
}

