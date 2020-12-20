const express = require("express");
const router = express.Router();
const checkTokenmiddleware = require("../middleware/auth/checkTokenmiddleware");
const appointmentController = require("../controller/appointmentController");
const CheckUserType = require("../middleware/auth/checUserMiddleware");

/**
 * List All the Appointments
 */
router.get(
  "/appointments",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.AppointmentList
);

/**
 * List All the Approved Appointment
 */
router.get(
  "/appointments/approved",
  checkTokenmiddleware,
  CheckUserType.UserIsAdmin,
  appointmentController.ListApprovedAppointment
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

module.exports = router;
