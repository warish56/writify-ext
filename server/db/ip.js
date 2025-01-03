const sdk = require("node-appwrite");
const {dbValues} = require('./init')
const { getExistingCollection } = require("./utils");

const {Query} =sdk


const COLLECTION_NAME = 'Ip';
const  collectionData = {
    collection: undefined
};

const Attributes = {
    remoteAddress: 'remote_address',
    randomId: 'random_id',
    usedCredits: 'used_credits',
    lastUsedAt: 'last_used_at'
}


/**
 * Creating this collection to track all the non-logged in users for their usage
 */


/**
 * Schema
 *  remote_address  random_id      usedCredits  last_used_at
 *  string          string        Number        Datetime
 */

const prepareIpCollection = async () => {

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

 
    const currentAttributes = [ Attributes.remoteAddress, Attributes.usedCredits, Attributes.lastUsedAt, Attributes.randomId ];
    const isEveryAttributeCreated = currentAttributes.every(attributeKey => collectionData.collection.attributes.find(attribute => attribute.key === attributeKey ));

    if(isEveryAttributeCreated){
        return;
    }

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.remoteAddress,
        255,
        true
    );

    await databases.createStringAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.randomId,
        255,
        true
    );


    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.usedCredits,
        true, 
        0,
        null,
    );



    await databases.createDatetimeAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        Attributes.lastUsedAt,
        false,
        new Date().toISOString()
    );
}

const getIpData = async (ipAddress) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.remoteAddress, ipAddress)
    ]);
    return result.documents[0];
}

const getRandomUserData = async (randomUserId) => {
    const databases = new sdk.Databases(dbValues.client);
    const result = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id, [
        Query.equal(Attributes.randomId, randomUserId)
    ]);
    return result.documents[0];
}


const createIpData = async (ipAddress, randomId, usedCredits) => {
    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        { 
            [Attributes.remoteAddress]: ipAddress,
            [Attributes.randomId]: randomId,
            [Attributes.usedCredits]: usedCredits
        }
    )

    return updatedDocument;
}




const updateIpCredits = async (documentId, newCredits, currentIpAddress) => {
    const databases = new sdk.Databases(dbValues.client);
    const updatedDocument = await databases.updateDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        documentId,
        { 
            [Attributes.usedCredits]:newCredits,
            [Attributes.lastUsedAt]: new Date().toISOString(),
            [Attributes.remoteAddress]: currentIpAddress,
        }
    )
    return updatedDocument;
}

module.exports = {
    collectionData,
    prepareIpCollection,
    getIpData,
    getRandomUserData,
    createIpData,
    updateIpCredits,
}

