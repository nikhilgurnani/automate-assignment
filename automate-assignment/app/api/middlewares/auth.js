const Logger = require('./../../logger');
const { JWT } = require('./../../lib');
const { User } = require('./../models');

module.exports = async (request, response, next) => {

    try {

        const authToken = request.headers['authorization'];

        if ( !authToken || authToken === '' ) {

            throw new Error ( 'Token is required' );

        }

        const payload = await JWT.verify( authToken );

        const _user = await User.findOne( { _id: payload.user } );

        if ( !_user ) {

            throw new Error( 'Invalid User' );

        }

        request['user'] = _user.toJSON();

        next();


    } catch ( error ) {

        Logger.error( 'Middlewares#Auth -> Error in Auth Middleware', error );

        return response.status(401).json( {
            "message": 'Invalid token',
            "error": error.toString()
        } );

    }


}