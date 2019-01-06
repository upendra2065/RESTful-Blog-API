const mongoose = require('mongoose')
const PostSchema = require('../Schema/PostSchema.js')

module.exports = {
  getComments(req, res) {
    const query = { _id: mongoose.Types.ObjectId(req.params.postId) }
    PostSchema
      .findOne(query,(error, result) => {
        if(error){
          res.status(401).send(error);
        } else {
          res.status(200).send(result.comments);
        }
    });
  },
  addComment(req, res) {
    const query = { _id: mongoose.Types.ObjectId(req.params.postId) } 
    PostSchema
      .findOneAndUpdate(query,{$push : {comments: {
        "text":req.body.text,
        "url":req.body.url
      }}},{new: true},(error, result) => {
        if(error){
          res.status(401).send(error);
        } else {
          res.status(200).send(
            result.comments[result.comments.length-1]._id);
        }
    });
  }
}