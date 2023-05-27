const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require("multer");
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000

// Routes import
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/post');



app.use(cors());
//connect with server
dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL).then(console.log("connected to mongodb"))
.catch((error)=>console.log(error));



// multer package uses working

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
});

// user model routes
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);

//post model routes
app.use('/api/posts',postRoute);




// connect with port
app.listen(PORT, ()=>{
    console.log("app running on port 5000")
})