const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
    a_postID: Int,
    a_text: String,
    a_username: String,
    a_date: Date,
    a_likesDisklikes: []
});

module.exports = mongoose.model("PostModel", PostModelSchema);
//To call this User in another class use 
//const SomeModel = require("/...server/models/post");