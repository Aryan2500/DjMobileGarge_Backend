const mongoose = require('mongoose')
const dbURL = "mongodb://localhost:27017/djmobilegarage"
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
