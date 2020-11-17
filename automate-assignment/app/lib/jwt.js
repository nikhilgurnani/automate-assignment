const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const config = require('./../config');

const options = config.get('/security/jwt');
const secretOrPrivateKey = fs.readFileSync( path.join( __dirname, '../../keys/private.pem' ), 'utf-8' );
const secretOrPublicKey = fs.readFileSync( path.join( __dirname, '../../keys/public.pem' ), 'utf-8' );

exports.sign = async function sign( payload ) {

    try {

        const token = jwt.sign( payload, secretOrPrivateKey, options );

        return token;

    } catch ( error ) {

        throw error;

    }

}

exports.verify = async function verify( token ) {

    try {


        const payload = jwt.verify( token, secretOrPublicKey, options );

        return payload

    } catch ( error ) {

        throw error;

    }

}
