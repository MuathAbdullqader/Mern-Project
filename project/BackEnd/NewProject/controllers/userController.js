const User = require('../model/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {RegisterSchema,LoginSchema}= require('../model/Validation');
const admin = require('../routes/admin');



module.exports.register = async(req, res) => {
    // validate the user
     const R= RegisterSchema.validate(req.body);
    if(R.error?.details ) return res.status(400).send(R.error.details[0].message);  
    
    // lets validate the email 
    const EmailExist = await User.findOne({email: req.body.email});
    if(EmailExist) return res.status(400).send('Email Already Exist');
    
    //Hash the password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword, 
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
        
    } catch (err) {
    
        res.status(400).send(err);
    
    };
    
    }
module.exports.login = async(req, res) => {
    const L= LoginSchema.validate(req.body);
    if(L.error?.details ) return res.status(400).send(L.error.details[0].message); 
// lets validate the User Email 
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send('Email Or password is wrong');
 
//Check if the password is correct
const ValidPassword = await bycrypt.compare(req.body.password, user.password);
if(!ValidPassword) return res.status(400).send('Email Or password is wrong');
//const exp = Date.now() / 1000 + 60 * 60 * 24 * 30;
const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '1h'});
res.cookie("auth",token,{expires:new Date(Date.now()+1000 + 60 * 60 * 24 * 30),httpOnly:true,}).send(user);
res.end()

};
 
module.exports.getallusers = async(req,res)=>{
    User.find()
    .then(users=>{
        res.json(users)
    })
    .catch(err => res.json(err))
}; 

module.exports.logout = (req, res)=> {
    res.clearCookie('auth');
    res.status(200).json('logout successfuly');    
    };
 
