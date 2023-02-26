const jwt = require('jsonwebtoken');

const CheckAuth = (req, res, next) => {
const token  = req.cookies.auth;
if (!token) {
return res.status(401).json('No Token Found');
}

jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
if (err) {
    return res.status(401).json('Invalid Token');
} req.user = {
    id:userId
    
}
next();
})
}
module.exports = CheckAuth;