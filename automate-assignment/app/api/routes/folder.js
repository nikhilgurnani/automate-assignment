const Router = require('express').Router();

const { FolderController } = require('./../controllers');

const { AuthMiddleware } = require('./../middlewares');

Router.post('/folder', AuthMiddleware, FolderController.createFolder);

Router.get('/folder/:id', AuthMiddleware, FolderController.getFolder);

Router.get('/folder', AuthMiddleware, FolderController.getFolders);

module.exports = Router;