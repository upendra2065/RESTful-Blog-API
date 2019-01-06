const mongoose = require('mongoose');

/*
*  Add, Remove fields accordingly.
*  Also use {required: true} accordingly.
*/
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    url: String,
    text: {type: String, required: true},
    comments: [{text: {type: String, required: true},
        url:String }
    ]    
});

module.exports = mongoose.model('posts', postSchema);