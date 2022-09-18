const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumer: {
       type: Number,
       require:true,
    //    default:100,
    //    min: ,
    //    max:,
    },
    launchDate: {
        type: Date,
        require:true,
    },
    mission: {
        type: String,
        require:true,
    },
    rocket: {
        type: String,
        require:true,
    },
    target:{
        type: String,
        require:true,
    },
    // target:{
    //     type: mongoose.ObjectId,
    //     ref:'Planet',
    // }
    updcoming: {
        type: Boolean,
        require:true,
    },
    sucess: {
        type: Boolean,
        require:true,
        default:true,
    },
    customers:[String],
});