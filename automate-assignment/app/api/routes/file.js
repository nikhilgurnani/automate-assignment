const Router = require('express').Router();

const { FileController } = require('./../controllers');

const { AuthMiddleware } = require('./../middlewares');

Router.post('/file', AuthMiddleware, FileController.createFile);

Router.get('/file/:id', AuthMiddleware, FileController.getFile);

Router.get('/file', AuthMiddleware, FileController.getFiles);

Router.patch('/file/:id', AuthMiddleware, FileController.moveFile);

module.exports = Router;