const pino = require( 'pino' );
const config = require( './config' );

const _pino = pino( config.get( '/logger/pino' ) );

module.exports = _pino;
