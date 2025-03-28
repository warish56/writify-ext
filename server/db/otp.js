const sdk = require("node-appwrite");
const {dbValues} = require('./init')
const { getExistingCollection } = require("./utils");

const {Query} =sdk


const COLLECTION_NAME = 'Otp';
const  collectionData = {
    collection: undefined
};

const Attributes = {
    email: 'email',
    otp: 'otp',
}


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
    }else{
        collectionData.collection = await databases.createCollection(
            dbValues.db.$id,
            sdk.ID.unique(),
            COLLECTION_NAME
        );
    }

 
    const currentAttributes = [ Attributes.email, Attributes.otp ];
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

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.otp,
        true, 
    );

}

const getOtpWithEmail = async (email) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.email, email)
    ]);
    return result.documents[0];
}




const updateOtp = async (email, otp) => {
    const document = await getOtpWithEmail(email);
    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        document.$id,
        { 
            [Attributes.otp]:otp
        }
    )
    return updatedDocument;
}



const createOrUpdateOtp = async (email, otp) => {
    const otpWithEmail = await getOtpWithEmail(email);
    if(otpWithEmail){
        updateOtp(email, otp);
        return;
    }

    const databases = new sdk.Databases(dbValues.client);
    const document = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        {
            [Attributes.email]:email,
            [Attributes.otp]:otp,
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

