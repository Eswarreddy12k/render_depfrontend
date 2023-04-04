const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    visitor_name:{
        type:String,
        required:true
    },
    visitor_reason:{
        type:String,
        required:true
    },
    visitor_mobile:{
        type:String,
        required:true
    },
    visitor_date:{
        type:String,
        required:true
    },
    owner_id:{
        type:String,
        required:true,
        default:'1'
    }
});

const Visitorpass = mongoose.model('visitors', VisitorSchema);

module.exports = Visitorpass;