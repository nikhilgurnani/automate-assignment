const Router = require('express').Router();

const { AuthController } = require('./../controllers');

Router.post('/auth/login', AuthController.login);

Router.post('/auth/signup', AuthController.signUp);

module.exports = Router;