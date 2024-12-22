const sdk = require("node-appwrite");
const {db, client} = require('./init')
const { getExistingCollection } = require("./utils");

const databases = new sdk.Databases(client);

const COLLECTION_NAME = 'Otp';
let collection;

/**
 * Schema
 *  email     otp  
 *  string    number 
 */

const prepareOtpCollection = async () => {

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

    await databases.createIntegerAttribute(
        db.$id,
        collection.$id,
        'otp',
        true, 
    );

}

const getOtpWithEmail = async (email) => {
    const result = await databases.listDocuments(db.$id, collection.$id, [
        Query.equal("email", email)
    ]);
    return result.documents[0];
}




const updateOtp = async (email, otp) => {
    const document = getOtpWithEmail(email);
    const updatedDocument = await databases.updateDocument(
        db.$id,
        collection.$id,
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

    const document = await databases.createDocument(
        db.$id,
        collection.$id,
        sdk.ID.unique(),
        {
            email,
            otp,
        }
    );
    return document;
}



module.exports = {
    collection,
    prepareOtpCollection,
    createOrUpdateOtp,
    getOtpWithEmail
}

