const Logger = require('./../../logger');

const { Folder, File } = require('./../models');

exports.createFolder = async function (request, response) {

    try {

        const { name } = request.body;

        const userId = request.user['_id'];

        let _folder = new Folder( { name, owner: userId } );

        await _folder.save();

        return response.status(201).json( _folder );

    } catch ( error ) {

        Logger.error( 'Folder#createFolder -> Error in create folder handler', error );

        return response.status(400).json( {
            "message": 'Invalid input',
            "error": error.toString()
        } );

    }

}

exports.getFolders = async function (request, response) {

    try {

        let _folders = await Folder.find( { owner: request.user['_id'] } );

        return response.status(200).json( _folders );


    } catch ( error ) {

        Logger.error( 'Folder#getFolders -> Error in get folders handler', error );

        return response.status(500).json( {
            "message": 'Something went wrong',
            "error": error.toString()
        } );

    }

}

exports.getFolder = async function (request, response) {

    try {

        let _folder = await Folder.findOne( { owner: request.user['_id'], _id: request.params.id } );

        if ( !_folder ) {

            throw new Error ('NotFound');

        }

        let _files = await File.find( { folder: _folder._id } );

        return response.status(200).json( { ..._folder.toJSON(), files: _files } );


    } catch ( error ) {

        Logger.error( 'Folder#getFolder -> Error in get folder handler', error );

        if ( error === 'NotFound' ) {

            return response.status(404).json( {
                "message": 'Not found',
                "error": error.toString()
            } );

        }

        return response.status(500).json( {
            "message": 'Something went wrong',
            "error": error.toString()
        } );

    }

}