const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    servicex_user:{
        type: String,
        required :true
    },
    servicex_category:{
        type: String,
        required :true
    },
    servicex_subcategory:{
        type: String,
        required :true
    },
    servicex_desc:{
        type: String,
        required :true
    },
    servicex_comm:{
        type: String,
        required :true
    }
});

const Servicer = mongoose.model('servicerequest', serviceSchema);

module.exports = Servicer;