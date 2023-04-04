const mongoose = require('mongoose');

const emerSchema = new mongoose.Schema({
    emergencyx_name:{
        type: String,
        required :true
    },
    emergencyx_designation:{
        type: String,
        required :true
    },
    emergencyx_mobile:{
        type: String,
        required :true
    },
    emergencyx_alt_mobile:{
        type: String,
        required :true
    },
    emergencyx_comm:{
        type: String,
        required :true
    }
});

const Emergencyc = mongoose.model('emergencyc', emerSchema);

module.exports = Emergencyc;