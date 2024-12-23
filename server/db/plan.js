const sdk = require("node-appwrite");

const {dbValues} = require('./init');
const { Plans } = require("../constants/plans");
const { getExistingCollection } = require("./utils");

const {Query} = sdk
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
    }else{
        collectionData.collection = await databases.createCollection(
            dbValues.db.$id,
            sdk.ID.unique(),
            COLLECTION_NAME
        );
    }

    if(collectionData.collection.attributes.length === 3){
        return;
    }

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

    const allPlans = await getAllPlans();
    if(allPlans.length === Object.keys(Plans).length){
        return;
    }

    const databases = new sdk.Databases(dbValues.client);


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

const getPlanDetails = async (planId) => {
    const databases = new sdk.Databases(dbValues.client);
    const results = await databases.listDocuments(dbValues.db.$id, collectionData.collection.$id,[
        Query.equal("id", planId)
    ]);
    return results.documents[0];
}


module.exports = {
    collectionData,
    preparePlanCollection,
    seedPlansCollection,
    getAllPlans,
    getPlanDetails
}
