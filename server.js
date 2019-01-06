const express = require('express');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./src/routes/index.js')

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());

/*
*  Connection String with "default port value :27017" and
*  /database "blog"
*/
const url = 'mongodb://localhost:27017/blog';
mongoose.connect(url, { useNewUrlParser: true });

/* Routes for Posts */
app.get('/posts', routes.Posts.getPosts)
app.post('/posts', routes.Posts.addPost)
app.put('/posts/:postId', routes.Posts.updatePost)
app.delete('/posts/:postId', routes.Posts.removePost)

/* Routes for Comments */
app.get('/posts/:postId/comments', routes.Comments.getComments)
app.post('/posts/:postId/comments', routes.Comments.addComment)

const port = 2019
app.listen(port, () => {
	console.log('Server started on port',port);
});
