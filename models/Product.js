const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true , "product name is required"]
    },
    price:{
        type:String,
        required:[true, "product price is required"]
    },
    description:{
        type:String,
        required:[true, "description is required"]
    },
    image:{
        type:String,
        },
    date: {
        type:Date,
        default: Date.now()
    }

})
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product' , productSchema )
Product.paginate({}, {},()=>{})
module.exports = Product;