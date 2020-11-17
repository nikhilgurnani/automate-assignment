const argon = require('argon2');

const Logger = require('./../../logger');

const { JWT } = require('./../../lib');

const { User } = require('./../models');

exports.login = async function login( request, response ) {

    try {

        const { email, password } = request.body;

        let _user = await User.findOne( { email } );

        if ( !_user ) {

            throw new Error ('Email or Password incorrect.');

        }

        const isVerified = await argon.verify( _user.password, password );

        if ( !isVerified ) {

            throw new Error ('Email or Password incorrect.');

        }

        const token = await JWT.sign( { user: _user._id.toString() } );

        return response.status( 200 ).json( {
            "authToken": token,
            ..._user.toJSON()
        } );


    } catch( error ) {

        Logger.error( 'Auth#login -> Error in login handler', error );

        return response.status(401).json( {
            "message": 'Invalid credentials',
            "error": error.toString()
        } );

    }

}

exports.signUp = async function signUp ( request, response ) {

    try {

        let { email, password, ...otherData } = request.body;

        password = await argon.hash( password );

        let _user = new User({ email, password, ...otherData });

        await _user.save();

        const token = await JWT.sign( { user: _user._id.toString() } );

        return response.status( 200 ).json( {
            "authToken": token,
            ..._user.toJSON()
        } );


    } catch ( error ) {

        Logger.error( 'Auth#signUp -> Error in signUp handler', error );

        return response.status(400).json( {
            "message": 'Could not sign up',
            "error": error.toString()
        } );

    }

}