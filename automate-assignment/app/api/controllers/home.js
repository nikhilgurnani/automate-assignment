const { Folder, File } = require('./../models');

const Logger = require('../../logger');

exports.getHome = async function getHome( request, response ) {

    try {

        let _folders = await Folder.find( { owner: request.user['_id'] } );

        let _files = await File.find( {

            owner: request.user['_id'],

            $or: [

                {

                    folder: {

                        $exists: false

                    }

                },
                {

                    folder: null

                }

            ]

        } );

        return response.status( 200 ).json( { folders: _folders, files: _files } );

    } catch ( error ) {

        Logger.error( 'Home#getHome -> Error in get home handler', error );

        return response.status(500).json( {
            "message": 'Something went wrong',
            "error": error.toString()
        } );

    }

}