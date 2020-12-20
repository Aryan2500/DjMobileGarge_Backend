const express = require("express");
const router = express.Router();
const appointmentValidator = require("../middleware/validator/appointmentValidator");
const checkTokenmiddleware = require("../middleware/auth/checkTokenmiddleware");
const appointmentController = require("../controller/appointmentController");
const CheckUserType = require("../middleware/auth/checUserMiddleware");

/**
 * Creating Appointment
 */
router.post(
  "/",
  checkTokenmiddleware,
  CheckUserType.UserIsConstumer,
  appointmentValidator.Validate_Appointment,
  appointmentController.CreateAppointment
);

/**
 * List All the Appointments
 */
router.get(
  "/",
  checkTokenmiddleware,
  CheckUserType.UserIsConstumer,
  appointmentController.AppointmentList
);



module.exports = router;
