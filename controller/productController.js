const Product = require("../models/Product");
const utility = require("../utility/uploadImage")


//Create new Product
exports.createNewProduct = function (req, res) {

  // console.log(req.files)
  console.log(req.body)
 
  utility.UploadImage(req , res , './public/uploads/products/')
  Product.create(
    {
      name: req.body.name,
      price: req.body.price,
      image: res.locals.imageName,
      description: req.body.description,
      isAvailable : req.body.isAvailable,
      category : req.body.category
    },
    (errorObj, product) => {
      if (errorObj) {
        res.status(400).json({ errors: errorObj.errors });
      } else {
        res.json({  product });
      }
    }
  );
};

//List All Products with Pagination
exports.listAllProducts = (req, res) => {
    const options = {
        page: parseInt(req.query.page),
        limit: 10,
        collation: {
          locale: 'en',
        },
      };
    Product.paginate(Product.find() ,options ,(err, result)=>{
       
       
        res.json(result)
    })
};

 

//retrieve one Product and Update
exports.productUpdate = (req, res) => {

  console.log(req.body.image)
  if(req.body.image===undefined){
    utility.UploadImage(req , res , './public/uploads/products/')
  }else{
    res.locals.imageName = req.body.image
  }
  
  product_id = req.params.id;
  console.log(product_id);
  Product.findOneAndUpdate(
    { _id: product_id },
    {
      isAvailable : req.body.isAvailable,
      category : req.body.category,
      name: req.body.name,
      image:  res.locals.imageName,
      price: req.body.price,
      description: req.body.description,
    },

    { runValidators: true, new: true },
    (errObj, doc) => {
      if (errObj) {
        res.json({ errors: errObj.errors });
      } else {
        res.json(doc);
      }
    }
  );
};

exports.getSingleProduct = (req, res)=>{
  id = req.params.id
  Product.findOne({_id: id} , (err , doc)=>{
    if(doc){
      res.json({doc})
    }
  })
}
//Delete Product
exports.productDelete = function (req, res) {
  productId = req.params.id;
  Product.findOne({ _id: productId }, (err, result) => {
    if (result) {
      console.log(result);
      Product.deleteOne({ _id: productId }, (err) => {
        if (err) {
          return res.json({ errs: err });
        }else{
            return res.json({succes:true})
        }
      });
    } else {
      res.status(404).json({ fail: "product does not exist" });
    }
  });
};
