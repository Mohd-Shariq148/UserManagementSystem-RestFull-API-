const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users')
const connectDB = require('./models/connection');

const app = express();
const PORT = 3000;

//connecting to db
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/users',userRoutes)

//error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });

  });


app.listen(PORT,(req,res)=>{
    console.log(`Server is listening at ${PORT}`);
})