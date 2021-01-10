const {body , validationResult} = require('express-validator')

exports.Validate_Appointment = [
    // console.log(body),
    body("title" , "title is required").notEmpty(),
    body("description" , "short description is required").notEmpty(),
    body("pick_up_date" , "Pick up date is required").notEmpty(),
    body("pick_up_time", "pick up time is required").notEmpty(),
    body("address" , "address is required").notEmpty(),
    body("phone" , "phone number is required").notEmpty(),
    body("phone" , "only 10 digit allowed").isLength(10),
    (req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({ errors:errors.array() })
        next()
    }
]