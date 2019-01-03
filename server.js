const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const store = require('./data/store.js')
const routes = require('./routes/index.js')

let app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
/* custom Middlewear to store store inside req */
app.use((req, resp, next) => {
    req.store = store.store
    next()
})

/* Routes for Posts */
app.get('/posts', routes.Posts.getPosts)
app.post('/posts', routes.Posts.addPost)
app.put('/posts/:postId/', routes.Posts.updatePost)
app.delete('/posts/:postId/', routes.Posts.removePost)

/* Routes for Comments */
app.get('/posts/:postId/comments', routes.Comments.getComments)
app.post('/posts/:postId/comments', routes.Comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.Comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.Comments.removeComment)
app.listen(4000)
