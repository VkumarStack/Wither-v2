#! /usr/bin/env node

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// To Do: Add an array of ObjectId of other Users for 
// the users that they are following
const UserModelSchema = new Schema({
    a_username: {type: String, required: true},
    a_password: {type: String, required: true},
    a_bio: {type: String},
    a_posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
    a_followers: [{type: String}]
});

UserModelSchema.virtual("url").get(function () {
    return `/catalog/user/${this._id}`; 
});

module.exports = mongoose.model("User", UserModelSchema);
//To call this User in another class use 
//const SomeModel = require("/...server/models/user");

