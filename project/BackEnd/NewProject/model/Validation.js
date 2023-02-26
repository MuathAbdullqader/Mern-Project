const joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const RegisterSchema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(5).required(),
    isAdmin : joi.boolean()


});
const LoginSchema = joi.object({
   
    email: joi.string().min(6).required().email(),
    password: joi.string().min(5).required()

});

const taskSchema = joi.object({
title : joi.string().min(6).required(),
owner_id : joi.string(),
due_to : joi.date().format(['DD-MM-YYYY' , 'YYYY-MM-DD']).greater(Date.now() + 48 * 60 * 60 * 1000).required(),
assigned_To_id : joi.string(),

});
      module.exports.RegisterSchema = RegisterSchema;
      module.exports.LoginSchema = LoginSchema;
      module.exports.taskSchema = taskSchema;

