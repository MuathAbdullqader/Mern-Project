const router = require('express').Router();
const Taskcontroller= require('../controllers/TaskControllers');
const CheckAuth = require('../middleware/CheckAuth');


router.post('/add',Taskcontroller.addTask);

router.get('/assigned/:id',Taskcontroller.assgid)


router.get('/owner/:id',Taskcontroller.ownerid)


// get all tasks for one user
router.get('/tasks',Taskcontroller.getall)


// update task status
router.put('/tasks/update/:id',Taskcontroller.updateid)

    // get all tasks
router.get('/get',Taskcontroller.getallTask)

//delete tasks 

router.delete('/tasks/delete/:id',Taskcontroller.deleteTasks)
    


module.exports = router;  






