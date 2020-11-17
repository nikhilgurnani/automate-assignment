const Router = require('express').Router();

const { HomeController } = require('./../controllers');

const { AuthMiddleware } = require('./../middlewares');

Router.get('/', AuthMiddleware, HomeController.getHome);

module.exports = Router;