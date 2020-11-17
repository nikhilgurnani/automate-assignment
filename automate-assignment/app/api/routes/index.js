module.exports = ( server ) => {

    server.use(require('./auth'));

    server.use(require('./folder'));

    server.use(require('./file'));

    server.use(require('./home'));

};