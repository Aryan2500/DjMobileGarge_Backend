const mongoose = require('mongoose')
const dbURL = "mongodb+srv://arunmaurya2500:20060288816@cluster0.e0n1k.mongodb.net/DJ_Mobile_Garage?retryWrites=true&w=majority"
mongoose.connect(dbURL ,{useNewUrlParser:true , useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log('DB connection OK')
    }
    else{
        console.log("DB connection FAILED")
    }
})
// var db = mongoose.connection;
// db.on('error',  console.error.bind(console , "MongoDB connection Error") )
// db.once('open' , ()=>{
//     console.log('Connected to MongoDB')
    
// })
