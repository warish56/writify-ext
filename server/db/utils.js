const sdk = require("node-appwrite");
const {Query} = sdk;


const getExistingCollection = async (db, databases, colelctionName) => {
    console.log("==DB==",{
        db_id: db?.$id,
        data_id: databases?.$id,
    })
    const list = await databases.listCollections(
        databases.$id,
        [
            Query.equal("name", [colelctionName])
        ],
    );
    return list.collections[0];
}

module.exports = {
    getExistingCollection
}