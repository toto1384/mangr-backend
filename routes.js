const router = require('express').Router();
const User = require('./model/User');
const Business = require('./model/Business');
const Joi = require('joi');
const {userValidation, businessValidation, goalValidation, projectValidation, dateValueValidation} = require('./joiValidation');


//business routes


//get
router.get('/businesses/:businessId',function(req,res){
    const business = Business.findOne({businessId : req.params.businessId});

    if(!business){
        return res.status(400).send('No business found');
    }else{
        return res.json(business);
    }
});

//add business
router.post('/businesses',function(req,res){

    const validation = Joi.validate(req.body.business,businessValidation);
    if(validation.error) return res.status(400).send(validation.error.toString());


    //CHECK IF BUSINESS WITH THIS ID ALREADY EXISTS
    const business = await Business.findOne({businessId : req.body.business.businessId});
    if(business){
        return res.send('business with this id already exists');
    }
    
       
    //THE CREATION OF TH USER
    const newBusiness = new Business({
        businessId: req.body.business.businessId,
        businessName : req.body.business.businessName,
        niche: req.body.business.niche,
        idCount: req.body.business.idCount,
        isDigital: req.body.business.isDigital,


        totalRevenue: req.body.business.totalRevenue,
        revenuePerMonth: req.body.business.revenuePerMonth,
        expensesPerMonth: req.body.business.expensesPerMonth,

        goals: req.body.business.goals,
        projects: req.body.business.projects,

        revenueHistory: req.body.business.revenueHistory,
        revenuePerMonthHistory: req.body.business.revenuePerMonthHistory,
        expensesPerMonthHistory: req.body.business.expensesPerMonthHistory,
    });
    //THE SAVING OF THE USER ALONG WITH THE CATCHING OF THE ERROR
    try{
        const savedBusiness = await newBusiness.save();
        res.send(savedBusiness);
    }catch(err){
        res.status(400).send(err);
    }




    //save it to the user

    const validation = Joi.validate(req.body.user,userValidation);
    if(validation.error) return res.status(400).send(validation.error.toString());

    const user = User.findOne({id: req.body.user.id, email : req.body.user.email});

    user.businesses.push({
        businessId: req.body.business.businessId,
        businessName: req.body.business.businessName,
    });

    User.update({id: req.body.user.id, email : req.body.user.email},user,function(err,doc){
        if (err) return res.send(500, {error: err});
    });
});


//






//user routes

router.post('/business-names',function(req,res){

    const validation = Joi.validate(req.body,userValidation);
    if(validation.error) return res.status(400).send(validation.error.toString());

    const user = User.findOne({id: req.body.id, email : req.body.email});

    if(!user){
        return res.status(400).send('No user found');
    }else{
        return res.json(user.businesses);
    }

});

router.post('/auth',function(req,res){

    const validation = Joi.validate(req.body,userValidation);
    if(validation.error) return res.status(400).send(validation.error.toString());


    //CHECK IF USER IS ALREADY REGISTERED
    const tokenExists = await User.findOne({token : req.body.token});
    if(tokenExists){
        return res.send('user already signed in');
    }
    
       
    //THE CREATION OF TH USER
    const user = new User({
        id: req.body.id,
        email : req.body.email,
    });


    //THE SAVING OF THE USER ALONG WITH THE CATCHING OF THE ERROR
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }




});



module.exports = router;