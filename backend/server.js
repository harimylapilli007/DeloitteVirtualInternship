const express=require("express");

const mongoose=require("mongoose");

const productRoutes=require("./routes/productRoutes");

const taskRoutes=require("./routes/TaskRoutes");

const app=express();

app.use(express.json());


mongoose.connect("mongodb+srv://harimylapilli007_db_user:JmQmuoXxxWoOl1qk@cluster0.3d6nv5c.mongodb.net/");

app.use("/api/products",productRoutes);

app.use("/api/tasks",taskRoutes);

app.listen(3000,()=>{

console.log("Server running");

});