const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers?.cookie)
    const token1 = req.headers?.cookie;
    if(!token1) return res.status(401).send('Access denied');
        const token = veriftyToken(token1);
        console.log("new token", token.auth)
    try {
        const verified = jwt.verify(token.auth, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
    res.status(400).send('Invalid token');
    }}

const veriftyToken =(token)=>{
    const list ={};
    token.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
        console.log("list",list[name])
    });
    return list;
}