const mongoose = require('mongoose');

const dlSchema = new mongoose.Schema({
    id:{
        type: String,
        required :true
    },
    p:{
        type: String,
        required :true
    }
});

const Dummylogin = mongoose.model('Dummylogins', dlSchema);

module.exports = Dummylogin;