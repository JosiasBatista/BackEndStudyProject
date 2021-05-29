let express = require('express');
let PostController = require('./controllers/PostController');
let LikeController = require('./controllers/LikeController');
let uploadConfig = require('./config/upload');
let multer = require('multer');

let routes = new express.Router();
let upload = multer(uploadConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'),PostController.store);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;