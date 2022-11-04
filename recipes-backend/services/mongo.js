const mongoose = require("mongoose")

const MONGO_URI = process.env.MONGO_URI

function mongoConnect( mongo_url = null, mongo_db = null ) {

    mongoose.connect(MONGO_URI)
    .then(()=>console.log('connected to MongoDB Atlas'))
    .catch((error)=>console.log(error));

    return mongoose.connection
}

function mongoDisconnect() {
    console.log(`Closing connection`)
    return mongoose.disconnect();
}

async function create(schemaObject) {
    try {
        let response = await schemaObject.save()
        return response
    } catch (error) {
        throw error
    }
}

async function get(schemaObject, id) {
    try {
        let response = await schemaObject.findOne({ _id: id })
        return response
    } catch (error) {
        throw error
    }
}


async function list(schemaObject) {
    try {
        let response = await schemaObject.find()
        return response
    } catch (error) {
        throw error
    }
}

async function drop(schemaObject, id) {
    try {
        let response = await schemaObject.deleteOne({ _id: id }).setHeader('Access-Control-Allow-Origin', '*')
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,
    get,
    list,
    drop,
    mongoConnect,
    mongoDisconnect
}