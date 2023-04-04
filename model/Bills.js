const mongoose = require('mongoose');

const BillsSchema = new mongoose.Schema({
    billsx_user:{
        type: String,
        required :true
    },
    billsx_rent:{
        type: Number,
        required :true
    },
    billsx_amenity:{
        type: Number,
        required :true
    },
    billsx_others:{
        type: Number,
        required :true
    },
    billsx_electricity:{
        type: Number,
        required :true
    },
    billsx_water:{
        type: Number,
        required :true
    },
    billsx_gas:{
        type: Number,
        required :true
    },
    billsx_othersothers:{
        type: Number,
        required :true
    }
});

const Bills = mongoose.model('bills', BillsSchema);

module.exports = Bills;