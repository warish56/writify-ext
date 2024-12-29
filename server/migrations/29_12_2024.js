
const sdk = require("node-appwrite");
const {dbValues} = require('../db/init');
const { getExistingCollection, getCollectionDocuments } = require("../db/utils");
const { ACCOUNT_STATUS } = require("../constants/accounts");

const COLLECTION_NAME = 'Accounts';

const ATTRIBUTE_NAME = 'status';


const updateExisitingCollections = async () => {
    const databases = new sdk.Databases(dbValues.client);
    const collection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);
    const documents = await getCollectionDocuments(dbValues.db, databases, collection);
    for(const doc of documents){
        const updatedData = { 
            [ATTRIBUTE_NAME]: ACCOUNT_STATUS.active 
        };
        await databases.updateDocument(dbValues.db.$id, collection.$id, doc.$id, updatedData);
    }
}


const createStatusAttributeInAccount = async () => {
    console.log(" -- running migration --- 29-12-2024 ")

    const databases = new sdk.Databases(dbValues.client);
    const collection = await getExistingCollection(dbValues.db, databases, COLLECTION_NAME);
    const hasStatusKey = !!collection.attributes.find(attribute => attribute.key === ATTRIBUTE_NAME)
    if(hasStatusKey){
        return;
    }

    await databases.createEnumAttribute(
        dbValues.db.$id,
        collection.$id,
        ATTRIBUTE_NAME,
        [ACCOUNT_STATUS.active, ACCOUNT_STATUS.suspended, ACCOUNT_STATUS.deleted],
        false,
        ACCOUNT_STATUS.active
    );

    await updateExisitingCollections();

}

module.exports = {
    createStatusAttributeInAccount
}