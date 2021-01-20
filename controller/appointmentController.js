const Appointment = require("../models/Appointment");
const uploadImg = require('../utility/uploadImage')

/**
 * Create Appointment 
 */
exports.CreateAppointment = (req, res) => {
  const appointment_number = "DJMOBILEGARAGE_" + Date.now().toString().slice(-9, -1);
  console.log(appointment_number);

  // console.log(req.body)
  // console.log(req.files)
  
  uploadImg.UploadImage(req , res , './public/uploads/appointments/')
  console.log(res.locals.imageName)
  Appointment.create(
    {
      problem_Title: req.body.title,
      problem_Desciption: req.body.description,
      problem_Image: res.locals.imageName,
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
        console.log(data)
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
    Appointment.paginate(Appointment.find({user_Id:user.userId}, null , {sort:{created_on:-1}}), options, (err, data) => {
        console.log(err)

        if(data['docs'].length ==0){
          data['docs'] = null
        }
        console.log(data)
        // return
        return res.json(data);
      });
  }else if(role===1){
    Appointment.paginate(Appointment.find({}, null , {sort:{created_on:-1}}), options, (err, data) => {
      
        if(data['docs'].length ==0){
          data['docs'] = null
        }
        console.log(data)
        // return
        return res.json(data);
      });

  }
  
};

//List all Unseen appointment
exports.UnSeenAppointmentList = (req, res)=>{
  const options = {
    page: parseInt(req.query.page),
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Appointment.paginate(Appointment.find({isSeen:false}, null , {sort:{created_on:-1}}), options, (err, data) => {
    res.json(data);
  });

}

/**
 * Approve Appointment
 */
exports.approveAppointment = (req, res) => {
  console.log(req.body.repairing_cost)
  // return
  Appointment.findOneAndUpdate(
    { _id: req.params.id },
    { isApproved: true , isSeen:true , repairing_cost:req.body.repairing_cost},
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
 *  Reject Appointment
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
 * List All Pending Appointment 
 */
exports.ListPendingAppointments =(req, res) =>{
  const options = {
    page: parseInt(req.query.page),
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Appointment.paginate(Appointment.find({isRepaired:false , isApproved:true}, null , {sort:{created_on:-1}}), options, (err, data) => {
      if(err){
        res.status(404).json({msg:"data not found"})
      }else{
        if(data["docs"].length>0){
          res.json(data)
        }else{
          res.status(404).json({msg:"data not found"})
        }
        
      }
  });
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
  const options = {
    page: parseInt(req.query.page),
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  Appointment.paginate(Appointment.find({isRepaired:true}, null , {sort:{created_on:-1}}), options, (err, data) => {
      if(err){
        res.status(404).json({msg:"data not found"})
      }else{
        if(data["docs"].length>0){
          res.json(data)
        }else{
          res.status(404).json({msg:"data not found"})
        }
        
      }
  });
    
}


/**
 * Give a single Appointment Details
 */
exports.AppointmentDetails = (req, res)=>{
  Appointment.find({_id:req.params.id} , (err , data)=>{
    if(err){
      res.status(404).json({error:"Data not found"})
    }else{
      
     res.status(200).json(data)
    }
  })
}

/**
 * Search Appointment
 */
exports.SearchAppointment = (req, res)=>{
  const options = {
    page: parseInt(req.query.page),
    limit: 10,
    collation: {
      locale: "en",
    },
  };
  text = req.params.text
  // console.log(text)    
  Appointment.paginate(Appointment.find({appointment_number: new RegExp(text , 'i') }) , options ,(err , data)=>{
    if(err){
      res.status(404).json({msg:err})
    }else{
      if(data["docs"].length>0){
        console.log(data['docs'])
        res.json(data)
      }else{
        res.status(404).json({msg:"data not found"})
      }
    }
  } )
}