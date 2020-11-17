const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let UserSchema = new Schema(
    {
        name: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        displayPicture: {
            type: String,
            default: null
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

UserSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

module.exports = model('users', UserSchema);