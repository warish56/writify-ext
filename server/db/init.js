const sdk = require("node-appwrite");
const {DB_NAME}  = require('../constants/db')


let db;
let client;

const initAppWriteSdk = () => {
    client = new sdk.Client();
    client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(process.env.APP_WRITE_PROJECT_ID)
        .setKey(process.env.APP_WRITE_API_KEY);
}



const prepareDatabase = async () => {
    const databases = new sdk.Databases(client);
    const databasesList = await databases.list();
    const existingDatabase = databasesList.databases.find(db => db.name === DB_NAME);

    console.log("==exisitin database ===",{
        existingDatabase
    })

    if(!existingDatabase){
        db = await databases.create(
            sdk.ID.unique(),
            DB_NAME
        );
    }else{
        db = existingDatabase;
    }

}

module.exports = {
    db,
    client,
    initAppWriteSdk,
    prepareDatabase
}