const Task = require('../model/Task');
const { taskSchema } = require('../model/Validation');
const verf = require('../routes/VerifyToken');
const admin = require('../routes/admin');
const CheckAuth = require('../middleware/CheckAuth');

module.exports.addTask = async (req, res) => {
    //validate the task schema
    const v = taskSchema.validate(req.body);
    if (v.error?.details) return res.status(400).send(v.error.details[0].message);
   
       const task = new Task({
           title: req.body.title,
           due_to: req.body.due_to,
           owner_id: req.body.owner_id,
           assigned_To_id: req.body.assigned_To_id,
       })
   try {
           const newTask= await task.save();
           res .send("Success");
   
       }catch(err){
           console.log(err);
    };
   };

   module.exports.assgid = async(req,res)=>{
    await Task.find({assigned_To_id:req.params.id})
    .then(tasks=> { console.log(tasks)
        res.json(tasks)})
    .catch(err => res.json({ message: "Something went wrong", error: err }))

    
};

module.exports.ownerid = async(req,res)=>{
    await Task.find({owner_id:req.params.id})
    .then(tasks=> { console.log(tasks)
        res.json(tasks)})
    .catch(err => res.json({ message: "Something went wrong", error: err }))

    
};

module.exports.getall =(req, res) =>{
    Task.find()
  .then(tasks => res.json({ tasks }))
  .catch(err => res.json({ message: "Something went wrong", error: err }))
};

module.exports.updateid =  (req,res)=>{
    console.log(req.body.status)
    Task.findByIdAndUpdate({_id: req.params.id},{ status: req.body.status},{ new: true,runValidators: true  } )
    .then(task => res.json({task}))
    .catch(err => res.json({ message: "Something went wrong", error: err }))
};

module.exports.getallTask = async (req,res)=>{
    await Task.find()
     .then(tasks => res.json({ tasks }))
     .catch(err => res.json({ message: "Something went wrong", error: err }))
 };

 module.exports.deleteTasks =async (req,res)=>{

    const deleteid= req.params.id;
    await Task.findByIdAndDelete(deleteid)
    .then(tasks => res.json({ massage: "Task deleted sucessfully!"}))

    .catch(err => res.json({ message: "Something went wrong", error: err }))
};