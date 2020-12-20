exports.UserIsAdmin  = (req, res, next)=>{
    const role =parseInt( res.locals.userData.role)
    if(role===1){
        next()
    }else{
        return res.status(401).json({msg:"You are not authorized user!"})
    }
}

exports.UserIsConstumer = (req , res, next)=>{
    const role = parseInt(res.locals.userData.role)
    if(role===3){
        next()
    }else{
        return res.status(401).json({msg:"You are not authorized user"})
    }
}