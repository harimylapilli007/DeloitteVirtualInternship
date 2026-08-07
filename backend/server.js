const express=require("express");

const mongoose=require("mongoose");

const productRoutes=require("./routes/productRoutes");

const taskRoutes=require("./routes/TaskRoutes");

require("dotenv").config();
const app=express();

app.use(express.json());


mongoose.connect(process.env.MongoDB_URI);

app.use("/api/products",productRoutes);

app.use("/api/tasks",taskRoutes);

app.listen(3000,()=>{

console.log("Server running");

});