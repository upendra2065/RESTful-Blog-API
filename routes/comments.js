module.exports = {
    getComments(req, res) {
      res.status(200).send(req.store.posts[req.params.postId].comments)
    },
    addComment(req, res) {
      if(req.store.posts[req.params.postId].comments == undefined){
        req.store.posts[req.params.postId].comments = []
      }
      req.store.posts[req.params.postId].comments.push(req.body)
      let id = req.store.posts[req.params.postId].comments.length
      res.status(200).send({
        id: id
      })
    },
    updateComment(req, res) {
  
      req.store.posts[req.params.postId].comments.splice(req.params.commentsId,1, req.body)
      res.status(200).send(req.store.posts[req.params.postId].comments)
    },
    removeComment(req, res) {
      req.store.posts[req.params.postId].comments.splice(req.params.commentsId,1)
      res.status(200).send()
    }
}