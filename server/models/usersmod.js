const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    a_username: String,
    a_password: String,
    a_bio: String,
    a_postID: [],
});

module.exports = mongoose.model("UserModel", UserModelSchema);
//To call this User in another class use 
//const SomeModel = require("/...server/models/user");