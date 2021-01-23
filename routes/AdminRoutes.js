const express = require("express");
const router = express.Router();
const checkTokenmiddleware = require("../middleware/auth/checkTokenmiddleware");
const appointmentController = require("../controller/appointmentController");
const CheckUserType = require("../middleware/auth/checUserMiddleware");
const emailValidator = require("../middleware/validator/emailValidator");
const authmiddleware = require("../middleware/auth/authmiddleware");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const cat_controller = require('../controller/categoryController')
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

// =========================================================================================================================
/**
 *  Number of Tatal appointments
 */
router.get(
  "/total-appointments",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  (req, res) => {
    Appointment.find({}, (err, data) => {
      return res.json({ total_appointments: data.length });
    });
  }
);

/**
 *  Number of New Appointments
 */

router.get(
  "/new-appointments",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  (req, res) => {
    Appointment.find({ isSeen: false }, (err, data) => {
      return res.json({ new_appointments: data.length });
    });
  }
);

/**
 * Number of Pending Appointments
 */
router.get(
  "/pending-appointments",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  (req, res) => {
    Appointment.find({ isApproved: true, isRepaired: false }, (err, data) => {
      return res.json({ pending_appointments: data.length });
    });
  }
);
// =====================================================Apppointment Routes Ends==============================================

//========================================================User Count Routes===================================================

/**
 *  Number of Verified Users
 */
router.get(
  "/verified-users",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  (req, res) => {
    User.find({ role: 3, isEmailVerified: true }, (err, data) => {
      return res.json({ verified_users: data.length });
    });
  }
);

/**
 *  Number of Total Users
 */
router.get(
  "/total-users",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  (req, res) => {
    User.find({ role: 3 }, (err, data) => {
      return res.json({ all_users: data.length });
    });
  }
);


/**
 * Category route
 */

router.post('/category', cat_controller.AddCategory )


/**
 * Category List
 */
router.get('/category' , cat_controller.ListCategory)

/**
 * Category Update
 */
router.put('/category' , cat_controller.EditCategory)
/**
 * Category Delete
 */
router.delete('/category/:id' , cat_controller.DeleteCategory)
module.exports = router;
