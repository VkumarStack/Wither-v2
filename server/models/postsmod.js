#! /usr/bin/env node

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
    a_text: {type: String, required: true, maxLength: 100},
    a_username:{type: String, required: true},
    a_likes: {type: Number},
    a_dislikes: {type: Number}
});

PostModelSchema.virtual("url").get(function () {
    return `/catalog/post/${this._id}`; 
});

module.exports = mongoose.model("Post", PostModelSchema);
//To call this User in another class use 
//const SomeModel = require("/...server/models/post");