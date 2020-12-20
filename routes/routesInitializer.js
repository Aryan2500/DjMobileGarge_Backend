const getRoutes = {
    indexRouter : require('./index'),
    productRouter : require('./productRoutes') ,
    userRouter : require('./userRoutes'),
    appointmentRouter : require('./AppointmentRoutes'),
    adminRouter : require('./AdminRoutes')
}
module.exports = getRoutes