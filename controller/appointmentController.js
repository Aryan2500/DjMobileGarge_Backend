const Appointment = require("../models/Appointment");


/**
 * Create Appointment 
 */
exports.CreateAppointment = (req, res) => {
  const appointment_number = "DJMOBILEGARAGE_" + Date.now().toString().slice(-9, -1);
  console.log(appointment_number);
  Appointment.create(
    {
      problem_Title: req.body.title,
      problem_Desciption: req.body.description,
      problem_Image: req.body.image,
      pickup_Date: req.body.pick_up_date,
      pickup_Time: req.body.pick_up_time,
      user_Address: req.body.address,
      user_Phone: req.body.phone,
      user_Id: res.locals.userData.userId,
      appointment_number: appointment_number,
    },
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    }
  );
  console.log(res.locals.userData.userId);
};

/**
 * All Appointment List
 */
exports.AppointmentList = (req, res) => {
    const user = res.locals.userData
    const role = parseInt(res.locals.userData.role)

  const options = {
    page: parseInt(req.query.page),
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  console.log(user.userId)
  if(role===3){
    Appointment.paginate(Appointment.find({user_Id:user.userId}), options, (err, data) => {
        return res.json(data);
      });
  }else if(role===1){
    Appointment.paginate(Appointment.find(), options, (err, data) => {
        res.json(data);
      });

  }
  
};

exports.UnSeenAppointmentList = (req, res)=>{
  const options = {
    page: parseInt(req.query.page),
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Appointment.paginate(Appointment.find({isSeen:false}), options, (err, data) => {
    res.json(data);
  });

}

/**
 * Approve Appointment
 */
exports.approveAppointment = (req, res) => {
  Appointment.findOneAndUpdate(
    { _id: req.params.id },
    { isApproved: true , isSeen:true},
    {new:true},
    (errObj, data) => {
      if (errObj) {
        res.json({ errors: errObj.errors });
      } else {
        res.json(data);
      }
    }
  );
};

/**
 * Reject Appointment
 */
exports.rejectAppointment = (req, res)=>{
    Appointment.findByIdAndUpdate(
        {_id:req.params.id},
        {isApproved:false , isSeen:true},
        {new:true},
        (errObj , data)=>{
            if(errObj){
                res.json({errors:errObj.errors})
            }else{
                res.json(data);
            }
        }
    )
}

/**
 * List All Approved Appointment 
 */
exports.ListApprovedAppointment = async(req, res) =>{
   await Appointment.find({isApproved:true},(err , data)=>{
        if(err){
            return res.json(err)
        }
        res.json(data)
    })
}

/**
 * List All Rejected Appointment
 */
exports.ListRejectedAppointment= (req , res)=>{
    Appointment.find({isApproved:false},(err, data)=>{
        if(err){
            return res.json(err)
        }
        console.log(data.length)
        if(data.length ===0){
            res.json({error:"Data not found"})
           
        }else{
            res.json(data)
           
        }
    })
}

/**
 * Repair Appointment 
 */
exports.repairAppointment = (req , res)=>{
    Appointment.findByIdAndUpdate(
        { _id : req.params.id },
        {isRepaired:true},
        {new:true},
        (errObj , data)=>{
            if(errObj){
                res.json({errors:errObj.errors})
            }else{
                res.json(data);
            }
        }
        )
}

/**
 * List Repaird Appointment
 */
exports.ListRepairedAppointment = (req , res)=>{
    Appointment.find({isRepaired:true},(err, data)=>{
        if(data.length ===0){
            res.json({error:"Data not found"})
           
        }else{
            res.json(data)
           
        }
    })
}