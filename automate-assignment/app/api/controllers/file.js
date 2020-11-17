const Logger = require('./../../logger');

const { File, Folder } = require('./../models');

exports.createFile = async function (request, response) {

    try {

        let { name, folder = null, content, contentType, extension  } = request.body;

        const userId = request.user['_id'];

        if ( folder ) {

            const _folder = await Folder.findOne( { _id: folder } );

            if ( !_folder ) {

                throw new Error ( "NotExist");

            }

            if ( String(_folder.owner) !== String(userId) ) {

                throw new Error( 'Forbidden' );

            }

            folder = _folder._id;

        }

        let _file = new File( { name, owner: userId, folder, content, contentType, extension } );

        await _file.save();

        return response.status(201).json( _file );

    } catch ( error ) {

        Logger.error( 'File#createFile -> Error in create file handler', error );

        if ( error.message === 'NotExist') {

            return response.status(404).json( {
                "message": 'File not found',
                "error": error.toString()
            } );

        } else if ( error.message = 'Forbidden' ) {

            return response.status(403).json( {
                "message": 'You\'re not the owner of this file',
                "error": error.toString()
            } );

        } else {

            return response.status(400).json( {
                "message": 'Invalid input',
                "error": error.toString()
            } );

        }


    }

}

exports.getFiles = async function (request, response) {

    try {
        let _query = {

            owner: request.user['_id']

        };

        if ( request.query.folder ) {

            _query['folder'] = request.query.folder;

        }
        let _files = await File.find( _query ).populate('folder');

        return response.status(200).json( _files );


    } catch ( error ) {

        Logger.error( 'File#getFiles -> Error in get files handler', error );

        return response.status(500).json( {
            "message": 'Something went wrong',
            "error": error.toString()
        } );

    }

}

exports.getFile = async function (request, response) {

    try {

        let _file = await File.findOne( { owner: request.user['_id'], _id: request.params.id } ).populate('folder');

        if ( !_file ) {

            throw new Error ('NotFound');

        }

        return response.status(200).json( { ..._file.toJSON() } );


    } catch ( error ) {

        Logger.error( 'File#getFile -> Error in get file handler', error );

        if ( error.message === 'NotFound' ) {

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

exports.moveFile = async function (request, response) {

    try {

        const { folder } = request.body;

        const { id } = request.params;

        let _folder = await Folder.findOne( { _id: folder } );

        if ( !_folder ) {

            throw new Error( 'NotFound' );

        }

        if ( String( _folder.owner ) !== String( request.user['_id'] ) ) {

            throw new Error ( 'Forbidden' );

        }

        let _file = await File.findOne( { _id: id, owner: request.user['_id'] } );

        if ( !_file ) {

            throw new Error( 'NotFound' );

        }

        _file.folder = _folder._id;

        await _file.save();

        return response.status( 200 ).json( _file );

    } catch ( error ) {

        Logger.error( 'File#moveFile -> Error in move file handler', error );

        if ( error.message === 'NotExist') {

            return response.status(404).json( {
                "message": 'File/Folder not found',
                "error": error.toString()
            } );

        } else if ( error.message = 'Forbidden' ) {

            return response.status(403).json( {
                "message": 'You\'re not the owner of this file or folder',
                "error": error.toString()
            } );

        } else {

            return response.status(400).json( {
                "message": 'Invalid input',
                "error": error.toString()
            } );

        }

    }

}