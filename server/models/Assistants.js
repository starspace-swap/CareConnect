const mongoose = require('mongoose'); // - Imports Mongoose
const UserSchema = new mongoose.Schema({ 
    name: String, 
    email: String, 
    age: Number,
    dateOfBirth:Date,
    password:String,
    language: String,
    isSignLanguageExpert: Boolean,
    isBankingInformed: Boolean,
    isLocalRoutesInformed: Boolean,
    isMedicalInformed: Boolean,
    gender: String,
    domicile: String,
    currentAddress: String,
    permanentAddress:String,
    aadharId: BigInt,
    phoneNumber: String,
});

const UserModel = mongoose.model("assistants", UserSchema); 

// - Creates a Mongoose model named "users" based on the UserSchema. "users" will be the collection name in MongoDB.

module.exports = UserModel; // - Exports the User Model