const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, min : 6 , required: true },
    email: { type: String, min : 6, required: true },
    password: { type: String, min : 6, required: true },
    date: { type: Date, default: Date.now },
    isAdmin:{type: Boolean , default : false} 
    
});
module.exports = mongoose.model('User', UserSchema);

