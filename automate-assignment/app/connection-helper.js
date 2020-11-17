const { Mongo } = require( './lib' );

exports.connect = async function connect( options ) {

    try {

        await Mongo.connect( options );

    } catch ( error ) {

        throw error;

    }

};


exports.disconnect = async function disconnect(  ) {

    try {

        await Mongo.disconnect( );

    } catch ( error ) {

        throw error;

    }

};
