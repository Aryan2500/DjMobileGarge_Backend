const Category = require("../models/Category")

exports.AddCategory = (req, res)=>{
    cat_name = req.body.category
    console.log(cat_name)
    Category.create({ name:cat_name  } , (err, data)=>{
       
            if (err) {
              res.status(400).json({ errors: err });
            } else {
              res.json({ created:true});
            }
         
    })
}

exports.ListCategory = (req, res)=>{
    Category.find((err, data)=>{
        if(err){
            res.json({err})
        }else{
            
            res.json({data})
        }
        
    })
}

exports.EditCategory = (req, res)=>{
    id = req.body.id
    cat_name = req.body.category
    Category.findByIdAndUpdate({_id:id} , {name:cat_name} ,(err, data)=>{
        if(err){
            res.status(400).json({errors :err})
        }else{
            res.json({updated:true})
        }
    })
}

exports.DeleteCategory = (req, res)=>{
    id = req.params.id
    Category.deleteOne({_id:id} , (err , data)=>{
        console.log(data)
        res.json({data})
    } )
}