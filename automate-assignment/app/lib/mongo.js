const Mongoose = require('mongoose');

const Logger = require( '../logger' );

let dbConnection = null;

exports.connect = async function connect( options ) {

    try {

        Logger.info( 'Connecting to MongoDB.' );

        const { uri, debug, ...configOptions } = options;

        dbConnection = await Mongoose.connect(uri, configOptions);

        dbConnection.set( 'debug', debug );

        exports.connection = dbConnection;

        Logger.info( 'Connected to MongoDB.' );

    } catch ( error ) {

        throw error;

    }

};

exports.connection = dbConnection;

exports.disconnect = async function disconnect() {

    try {

        Logger.trace( 'Disconnecting to MongoDB.' );

        await dbConnection.disconnect();

        exports.connection = undefined;

        dbConnection = undefined;

        Logger.trace( 'Disconnected from MongoDB.' );

    } catch ( error ) {

        throw error;

    }

};
