const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessId: {
        type : String,
        required: true,
    },

    businessName: {
        type : String,
        required: true,
    },

    niche: {
        type : String,
        default: '',
    },

    idCount: {
        type : Number,
        default : 0,
    },

    isDigital: {
        type : String,
        required: true,
    },

    totalRevenue : {
        type : Number,
        default: 0 
    },

    revenuePerMonth : {
        type : Number,
        default: 0 
    },

    expensesPerMonth : {
        type : Number,
        default: 0 
    },

    goals : {
        type : [
            {
                id:{
                    type : Number,
                    required: true,
                },

                name: {
                    type: String,
                    required :true,
                },

                description : {
                    type : String,
                    default : '',
                },

                dueDate : {
                    type: String,
                    default : '',
                }
            }
        ],
    },


    projects : {
        type : [
            {
                id:{
                    type : Number,
                    required: true,
                },

                name: {
                    type: String,
                    required :true,
                },

                description : {
                    type : String,
                    default : '',
                },

                dueDate : {
                    type: String,
                    default : '',
                },
                checklist : {
                    type: [
                        Boolean
                    ],
                    required: true,
                }
            }
        ]
    },


    revenueHistory: {
        type : [
            {
                value : {
                    type : String,
                    required : true
                },
                date : {
                    type : String,
                    required : true
                }
            }
        ]
    },

    revenuePerMonthHistory: {
        type : [
            {
                value : {
                    type : String,
                    required : true
                },
                date : {
                    type : String,
                    required : true
                }
            }
        ]
    },

    expensesPerMonthHistory: {
        type : [
            {
                value : {
                    type : String,
                    required : true
                },
                date : {
                    type : String,
                    required : true
                }
            }
        ]
    }

});

module.exports = mongoose.model('Business', businessSchema);