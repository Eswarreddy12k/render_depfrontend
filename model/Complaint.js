const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintx_user:{
        type: String,
        required :true
    },
    complaintx_category:{
        type: String,
        required :true
    },
    complaintx_subcategory:{
        type: String,
        required :true
    },
    complaintx_desc:{
        type: String,
        required :true
    },
    complaintx_img:{
        type: String,
        required :true
    },
    complaintx_comm:{
        type: String,
        required :true
    }
});

const Complaint = mongoose.model('complaint', complaintSchema);

module.exports = Complaint;