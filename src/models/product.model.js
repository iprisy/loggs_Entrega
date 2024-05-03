const mongoose=require("mongoose");
const mongoosePaginate=require("mongoose-paginate-v2");
const collection = "products";
const productSchema= new mongoose.Schema({
    titulo:{
        type:String,
        required: true,
    },
    descripcion:{
        type:String,
        required: true,
    },
    precio:{
        type:Number,
        required: true,
    },
    codigo:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        required: true,
    },
    stock:{
        type:Number,
        required: true,
    },
    category:{
        type:String,
        required: true,
    },
    thumbails:{
        type:String[10],
        
    },

});
const productModel=mongoose.model(collection, productSchema);
module.exports=productModel