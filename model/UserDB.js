const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userx_name:{
        type:String,
        required:true
    },
    userx_id:{
        type:String,
        required:true
    },
    userx_community:{
        type:String,
        required:true
    },
    userx_mobile:{
        type:String,
        required:true
    },
    userx_password:{
        type:String,
        required:true,
        default:'Password@123'
    },
    userx_door_no:{
        type:String,
        required:true
    },
    userx_floor:{
        type:String,
        required:true
    }
    
});

const UserDB = mongoose.model('usersdb', UserSchema);

module.exports = UserDB;