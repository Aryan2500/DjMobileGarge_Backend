const Product = require("../models/Product");
const path = require("path");

//Create new Product
exports.createNewProduct = function (req, res) {
  Product.create(
    {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    },
    (errorObj, product) => {
      if (errorObj) {
        res.status(400).json({ errors: errorObj.errors });
      } else {
        res.json({ product: product });
      }
    }
  );
};

//List All Products with Pagination
exports.listAllProducts = (req, res) => {
    const options = {
        page: parseInt(req.query.page),
        limit: 5,
        collation: {
          locale: 'en',
        },
      };
    Product.paginate(Product.find() ,options ,(err, result)=>{
        res.json(result)
    })
};

//Uploads File
exports.uploadsFile = (req, res) => {
  if (req.files != undefined) {
    file = req.files.image;
    console.log(file);
    var time = Date.now();

    var extname = path.extname(file.name);
    var newbasename = path.basename(file.name, extname) + time;
    var newName = (newbasename + extname).toLowerCase();

    var extList = [".jpg", ".JPG", ".png", ".PNG"];
    if (!extList.includes(extname)) {
      return res.json({ error: "Only Jpg or Png file allowed" });
    }
    if (file.size > 200000) {
      return res.json({ error: "file should be less than 200KB" });
    }

    file.mv("./public/uploads/products/" + newName);
    res.json({ filename: newName });
  } else {
    res.json({ error: "No file provided" });
  }
};

//retrieve one Product and Update
exports.productUpdate = (req, res) => {
  product_id = req.params.id;
  console.log(product_id);
  Product.findOneAndUpdate(
    { _id: product_id },
    {
      name: req.body.name,
      image: req.body.image,
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
