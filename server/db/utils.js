const sdk = require("node-appwrite");
const {Query} = sdk;


const getExistingCollection = async (db, databases, colelctionName) => {
    const list = await databases.listCollections(
        db.$id,
        [
            Query.equal("name", [colelctionName])
        ],
    );
    return list.collections[0];
}

const getCollectionDocuments = async (db, databases, collection) => {
    const list = await databases.listDocuments(
        db.$id,
        collection.$id
    );
    return list.documents;
}

module.exports = {
    getExistingCollection,
    getCollectionDocuments
}