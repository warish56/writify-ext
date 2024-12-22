const sdk = require("node-appwrite");

const {dbValues} = require('./init');
const { Plans } = require("../constants/plans");
const { getExistingCollection } = require("./utils");

const COLLECTION_NAME = 'Plan';
const  collectionData = {
    collection: undefined
};

/**
 * Schema
 *  id        credits  price
 *  number    number   number
 */
const preparePlanCollection = async () => {

    const databases = new sdk.Databases(dbValues.client);   
    const exisitingCollection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);


    if(exisitingCollection){
        collectionData.collection = exisitingCollection;
        return;
    }

    /**
     *  will only be executed if the collection was not created
     */

    collectionData.collection = await databases.createCollection(
        dbValues.db.$id,
        sdk.ID.unique(),
        COLLECTION_NAME
    );


    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'id',
        true, 
    );

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'credits',
        true,
    );

    await databases.createIntegerAttribute(
        dbValues.db.$id,
        collectionData.collection.$id,
        'price',
        true,
    );
}

const seedPlansCollection = async () => {

    const databases = new sdk.Databases(dbValues.client);
    const exisitingCollection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);
    if(exisitingCollection){
        return;
    }


    await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        Plans.FREE
    );

    await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        Plans.PRO
    );

    await databases.createDocument(
        dbValues.db.$id,
        collectionData.collection.$id,
        sdk.ID.unique(),
        Plans.ELITE
    );
   
}


const getAllPlans = async () => {
    const databases = new sdk.Databases(dbValues.client);
    const results = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id);
    return results.documents;
}


module.exports = {
    collectionData,
    preparePlanCollection,
    seedPlansCollection,
    getAllPlans
}
