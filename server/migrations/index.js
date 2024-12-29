const { createStatusAttributeInAccount } = require("./29_12_2024");

const migrations = [
    createStatusAttributeInAccount
]

const runMigrations = async () => {
    for(let i=0; i<migrations.length; i++){
        await migrations[i]();
    }
}

module.exports = {
    runMigrations
}