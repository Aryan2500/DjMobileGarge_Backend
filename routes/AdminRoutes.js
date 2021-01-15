const express = require("express");
const router = express.Router();
const checkTokenmiddleware = require("../middleware/auth/checkTokenmiddleware");
const appointmentController = require("../controller/appointmentController");
const CheckUserType = require("../middleware/auth/checUserMiddleware");
const emailValidator = require("../middleware/validator/emailValidator");
const authmiddleware = require("../middleware/auth/authmiddleware");
/**
 * List All the Appointments
 */
router.get(
  "/appointments",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.AppointmentList
);

// Admin Login
router.post("/login", emailValidator.emailValidator, authmiddleware.adminLogin);

//Appointment Details
router.get(
  "/appointment/:id",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.AppointmentDetails
);

/**
 * List All the Pending Appointment
 */
router.get(
  "/appointments/pending",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.ListPendingAppointments
);

/**
 * List all The rejected Appointment
 * */
router.get(
  "/appointments/rejected",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.ListRejectedAppointment
);

/**
 * List all Repaired Appointment
 */
router.get(
  "/appointments/repaired",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.ListRepairedAppointment
);

/**
 * List all Unseen Appointment List
 */
router.get(
  "/appointments/unseen",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.UnSeenAppointmentList
);

/**
 *  Appointment Approval By Admin
 */
router.patch(
  "/appointment/approve/:id",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.approveAppointment
);

/**
 *  Appointment Reject By Admin
 */
router.patch(
  "/appointment/reject/:id",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.rejectAppointment
);

/**
 * Repaired Appointment
 */
router.patch(
  "/appointment/repair/:id",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.repairAppointment
);

/**
 *  Search Appointments
 */
router.get(
  "/appointments/search/:text",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.SearchAppointment
);
module.exports = router;
