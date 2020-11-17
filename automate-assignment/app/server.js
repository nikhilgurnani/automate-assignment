const Express = require( 'express' );

const FORMAT = require( 'string-format' );
FORMAT.extend( String.prototype );

const Logger = require( './logger' );
const config = require( './config' );
const ConnectionHelper = require( './connection-helper' );
const Router = require( './api/routes' );

let server = Express();

exports.initServer = async function initServer() {

    Logger.trace( 'Attaching server plugins and utility middlewares')

    Logger.debug( 'Enabling body parser' );

    server.use( Express.json() );

    Logger.debug( 'Body parser enabled!' );

    await ConnectionHelper.connect( config.get( '/persistence/mongo' ) );



};

exports.startServer = async () => {

    try {

        Logger.trace( `Starting the server at port ${config.get('/app/port') }! `);

        await server.listen(config.get('/app/port'));

        Logger.debug( 'Boostrapping router' );

        await Router( server );

        Logger.debug( 'Routes attached' );


    } catch ( error ) {

        throw error;

    }

};

exports.stopServer = async () => {

    try {

        await ConnectionHelper.disconnect();

        server = null;

    } catch ( error ) {

        throw error;

    }

};
