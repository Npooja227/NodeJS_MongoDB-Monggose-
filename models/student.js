const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const student = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    courseCount: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('student', student);