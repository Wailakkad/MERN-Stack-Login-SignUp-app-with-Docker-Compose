const mongoose = require("mongoose");
require("dotenv").config();


const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection to MongoDB seccuss");

    }catch(err){
        console.log(err.message);
    }
}

module.exports = connection;