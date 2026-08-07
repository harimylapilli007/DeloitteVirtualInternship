const Product = require("../models/Product");


// GET /api/products
exports.getProducts = async(req,res)=>{

try{

    let query={};
    if(req.query.category){
        query.category=req.query.category;
    }

    let products=Product.find(query);


if(req.query.sort){

products=products.sort(req.query.sort);

}


if(req.query.limit){

products=products.limit(Number(req.query.limit));

}

products=await products;

res.json(products);

}catch(err){

res.status(500).json({

message:err.message

});

}

};




// GET BY ID

exports.getProduct=async(req,res)=>{

try{

const product=await Product.findById(req.params.id);

if(!product){

return res.status(404).json({

message:"Product not found"

});

}

res.json(product);

}catch(err){

res.status(500).json({

message:err.message

});

}

};


// CREATE

exports.createProduct=async(req,res)=>{

try{

const product=await Product.create(req.body);

res.status(201).json(product);

}catch(err){

res.status(400).json({

message:err.message

});

}

};


// UPDATE

exports.updateProduct=async(req,res)=>{

try{

const product=await Product.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true,

runValidators:true

}

);

if(!product){

return res.status(404).json({

message:"Not found"

});

}

res.json(product);

}catch(err){

res.status(400).json({

message:err.message

});

}

};


// DELETE

exports.deleteProduct=async(req,res)=>{

try{

const product=await Product.findByIdAndDelete(req.params.id);

if(!product){

return res.status(404).json({

message:"Not found"

});

}

res.json({

message:"Deleted successfully"

});

}catch(err){

res.status(500).json({

message:err.message

});

}

};