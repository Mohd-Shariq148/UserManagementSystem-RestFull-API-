const mongoose = require('mongoose');

const connectDB = async()=>{

try {
    await mongoose.connect('mongodb://localhost:27017/user-api',{useNewUrlParser : true, useUnifiedTopology: true});
    console.log('connected to mongodb');
} catch (error) {
    console.log('error in connecting the database'+ error);
    process.exit(1);
}
};

module.exports = connectDB;      