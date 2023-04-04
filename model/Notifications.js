const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    notificationx_title:{
        type: String,
        required :true
    },
    notificationx_text:{
        type: String,
        required :true
    },
    notificationx_userid:{
        type: String,
        required :true
    }
});

const Notifications = mongoose.model('notifications', notifSchema);

module.exports = Notifications;