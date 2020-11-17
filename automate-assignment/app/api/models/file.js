const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let FileSchema = new Schema(
    {
        name: {
            type: String,
            default: null
        },
        owner: {
            type: Schema.Types.ObjectId,
            index: true,
            ref: 'users'
        },
        folder: {
            type: Schema.Types.ObjectId,
            index: true,
            ref: 'folders'
        },
        content: {
            type: Schema.Types.Mixed,
            default: null
        },
        contentType: {
            type: String,
            require: true
        },
        extension: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

FileSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        return ret;
    }
};

module.exports = model('files', FileSchema);