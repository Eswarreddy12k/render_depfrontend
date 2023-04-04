const mongoose = require('mongoose');

const annSchema = new mongoose.Schema({
    ann_name:{
        type: String,
        required :true
    },
    ann_desc:{
        type: String,
        required :true
    },
    ann_community:{
        type: String,
        required :true
    }
});

const Announcements = mongoose.model('Announcements', annSchema);

module.exports = Announcements;