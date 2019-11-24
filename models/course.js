const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const course = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('course', course);