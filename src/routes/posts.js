const mongoose = require('mongoose')
const PostSchema = require('../Schema/PostSchema.js')

module.exports = {
    getPosts(req, res) {
        PostSchema
          .find({})
          .exec((error, result) => {
              if(error){
                  res.status(401).send(error);
              } else {
                res.status(200).send(result);
            }
        });
    },
    addPost(req, res) {
        const post = new PostSchema(req.body);
        post.save((error, result) => {
            if(error){
                res.status(401).send(error);
            }else {
                res.status(200).send({
                    id: result._id
                });
            }
        })
    },
    updatePost(req, res) {
        const query = { _id: mongoose.Types.ObjectId(req.params.postId) };
        const update = req.body;
    
        PostSchema.findOneAndUpdate(query, update, {new: true},(error, result) => {
            if(error){
                res.status(401).send(error);
            } else {
                res.status(200).send({
                    result
                });
            }
        });
    },
    removePost(req, res) {
        PostSchema.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.postId) }, (error, result) => {
            if(error){
                res.status(401).send(error);
            } else {
                res.status(200).send();
            }
        })
    }  
}