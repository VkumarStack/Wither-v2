#! /usr/bin/env node

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// To Do: Change likes and dislikes to be arrays of ObjectIds of 
// users and also add a date field (for the date when the post was 
// created)
const PostModelSchema = new Schema({
    a_text: {type: String, required: true, minLength: 1, maxLength: 280},
    a_username:{type: String, required: true},
    a_dateCreated: {type: String, required: true},
    a_likes: [{type: String}],
    a_dislikes: [{type: String}]
});

PostModelSchema.virtual("url").get(function () {
    return `/catalog/post/${this._id}`; 
});

module.exports = mongoose.model("Post", PostModelSchema);
//To call this Post in another class use 
//const SomeModel = require("/...server/models/post");