const mongoose = require('mongoose');

const WorkaSchema = new mongoose.Schema({
    work_name:{
        type:String,
        required:true
    },
    work_mobile:{
        type:String,
        required:true
    },
    work_work:{
        type:String,
        required:true
    },
    work_prefered_area:{
        type:String,
        required:true,
        
    }
});

const Worka = mongoose.model('work', WorkaSchema);

module.exports = Worka;