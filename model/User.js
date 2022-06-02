const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    businesses: {
        type : [
            {
                name: {
                    type: String,
                    required: true,
                },
                id: {
                    type : String,
                    required: true,
                },
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);