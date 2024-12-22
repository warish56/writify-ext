const sdk = require("node-appwrite");

const {db, client} = require('./init');
const { Plans } = require("../constants/plans");
const { getExistingCollection } = require("./utils");

const databases = new sdk.Databases(client);

const COLLECTION_NAME = 'Plan';
let collection;


/**
 * Schema
 *  id        credits  price
 *  number    number   number
 */
const preparePlanCollection = async () => {

   
    const exisitingCollection = await getExistingCollection(db, databases, COLLECTION_NAME);


    if(exisitingCollection){
        collection = exisitingCollection;
        return;
    }

    /**
     *  will only be executed if the collection was not created
     */

    collection = await databases.createCollection(
        db.$id,
        sdk.ID.unique(),
        COLLECTION_NAME
    );


    await databases.createIntegerAttribute(
        db.$id,
        collection.$id,
        'id',
        true, 
    );

    await databases.createIntegerAttribute(
        db.$id,
        collection.$id,
        'credits',
        true,
    );

    await databases.createIntegerAttribute(
        db.$id,
        collection.$id,
        'price',
        true,
    );
}

const seedPlansCollection = async () => {

    const exisitingCollection = await getExistingCollection(db, databases, COLLECTION_NAME);
    if(exisitingCollection){
        return;
    }


    await databases.createDocument(
        db.$id,
        collection.$id,
        sdk.ID.unique(),
        Plans.FREE
    );

    await databases.createDocument(
        db.$id,
        collection.$id,
        sdk.ID.unique(),
        Plans.PRO
    );

    await databases.createDocument(
        db.$id,
        collection.$id,
        sdk.ID.unique(),
        Plans.ELITE
    );
   
}


const getAllPlans = async () => {
    const results = await databases.listDocuments(db.$id, collection.$id);
    return results.documents;
}


module.exports = {
    collection,
    preparePlanCollection,
    seedPlansCollection,
    getAllPlans
}
