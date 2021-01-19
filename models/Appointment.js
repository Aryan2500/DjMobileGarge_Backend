const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const AppointmentSchema = mongoose.Schema({
    problem_Title :{
        type:String,
        // required:true
    },
    problem_Desciption:{
        type:String,
        // required: true
    },
    problem_Image:{
        type:String,
    },

    pickup_Date:{
        type:String,
        // required:true
    },
    pickup_Time:{
        type:String,
        // required:true
    },
    user_Address :{
        type:String,
        // required:true
    },
    user_Phone:{
        type:String,
        // required:true
    },

    user_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    appointment_number:{
        type:String
    },
    isApproved :{
        type:Boolean
    },
    isRepaired:{
        type:Boolean,
        default:false
    },
    isSeen:{
        type:Boolean,
        default:false
    },
    created_on :{
        type:Date,
        default: Date.now()
    },
    repairing_cost:{
        type:String
    }

})
AppointmentSchema.plugin(mongoosePaginate)
const Appointment = mongoose.model("Appointment" , AppointmentSchema)
Appointment.paginate({},{},()=>{})
module.exports = Appointment

