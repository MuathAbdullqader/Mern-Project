const router = require('express').Router();
const Uscontroller= require('../controllers/userController');





router.post('/register',Uscontroller.register,);
router.post('/login',Uscontroller.login );
router.get('/getall',Uscontroller.getallusers);
router.get ('/logout',Uscontroller.logout);



    
module.exports = router;