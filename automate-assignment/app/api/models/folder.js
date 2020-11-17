const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let FolderSchema = new Schema(
    {
        name: {
            type: String,
            default: null
        },
        owner: {
            type: Schema.Types.ObjectId,
            index: true,
            ref: 'users'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

FolderSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        return ret;
    }
};

module.exports = model('folders', FolderSchema);