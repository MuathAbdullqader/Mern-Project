const mongoose = require('mongoose');

var enu ={
    values:["Done", "Proccesing" , "Not Started"],
    message:' The task  : "Done" , "Proccesing" , "Not Started"',
    required : false
}   

const TaskSchema = new mongoose.Schema({
    title: { type: String, min : 6 , required: true },
    owner_id: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
    due_to:{
        type: Date,
        default: Date.now
    },
    assigned_To_id: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User" 
    },
    status:{
        type: String,
        enum : enu,
        default : "Not Started"
    }
},{ timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);