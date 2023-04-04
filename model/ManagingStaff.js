const mongoose = require('mongoose');

const manageSchema = new mongoose.Schema({
    managex_name:{
        type: String,
        required :true
    },
    managex_id:{
        type: String,
        required :true
    },
    managex_password:{
        type: String,
        required :true,
        default:'Password@123'
    },
    managex_designation:{
        type: String,
        required :true
    },
    managex_mobile:{
        type: String,
        required :true
    },
    managex_email:{
        type: String,
        required :true
    },
    managex_photo:{
        type: String,
        required :true
    },
    managex_comm:{
        type: String,
        required :true
    }

});

const ManagingStaff = mongoose.model('managing', manageSchema);

module.exports = ManagingStaff;