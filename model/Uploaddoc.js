const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
    documentx_user:{
        type: String,
        required :true
    },
    documentx_name:{
        type: String,
        required :true
    },
    documentx_desc:{
        type: String,
        required :true
    },
    documentx_pdf:{
        type: String,
        required :true
    }
});

const Uploaddoc = mongoose.model('documents', docSchema);

module.exports = Uploaddoc;