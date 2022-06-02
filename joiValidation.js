//VALIDATION
const Joi = require('joi');


const userValidation = {
    id : Joi.string().min(6).required(),
    email : Joi.email().required(),
}

const businessValidation = {
    businessId : Joi.string().min(6).required(),
    businessName : Joi.string().min(6).required(),
    niche: Joi.string(),
    idCount: Joi.number(),
    isDigital : Joi.bool().required(),

    totalRevenue:Joi.number(),
    revenuePerMonth:Joi.number(),
    expensesPerMonth:Joi.number(),

    goals: Joi.array().items(Joi.object(goalValidation).required()),
    projects: Joi.array().items(Joi.object(projectValidation).required()),

    revenueHistory: Joi.array().items(Joi.object(dateValueValidation).required()),
    revenuePerMonthHistory: Joi.array().items(Joi.object(dateValueValidation).required()),
    expensesPerMonthHistory: Joi.array().items(Joi.object(dateValueValidation).required()),
}




const goalValidation = {
    id : Joi.number().required(),
    name : Joi.string().min(6).required(),
    description : Joi.string(),
    dueDate : Joi.string(),
}


const projectValidation = {
    id : Joi.number().required(),
    name : Joi.string().min(6).required(),
    description : Joi.string(),
    dueDate : Joi.string(),
    checklist : Joi.array().items(Joi.bool().required()).required(),

}


const dateValueValidation = {
    date: Joi.string().required(),
    value: Joi.string().required(),
}

module.exports.userValidation = userValidation;
module.exports.businessValidation = businessValidation;
module.exports.goalValidation = goalValidation;
module.exports.projectValidation = projectValidation;
module.exports.dateValueValidation = dateValueValidation;