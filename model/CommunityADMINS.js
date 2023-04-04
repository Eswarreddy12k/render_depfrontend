const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    communityx_name:{
        type:String,
        required:true
    },
    communityx_id:{
        type:String,
        required:true
    },
    communityx_location:{
        type:String,
        required:true
    },
    communityx_admin_name:{
        type:String,
        required:true
    },
    
    communityx_admin_id:{
        type:String,
        required:true
    },
    communityx_admin_password:{
        type:String,
        required:true,
        default:'Password@123'
    },
    communityx_admin_mobile:{
        type:String,
        required:true
    }
    
});

const CommunityADMINS = mongoose.model('adminsdb', AdminSchema);

module.exports = CommunityADMINS;