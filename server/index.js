require("dotenv").config();

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose")
const path = require("path")
const corsOptions = require("./app/config/cors")
const connectDB = require("./app/config/database")
const credentials = require("./app/middleware/credentials")
const errorHandlerMiddleware = require('./app/middleware/error_handler')
const authentication = require('./app/middleware/authentication');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = require('path');
        cb(null, path.join(__dirname, '/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
//const upload = multer({dest:'uploads/'})
const upload = multer({storage})


const app = express();
const PORT = process.env.PORT || 3000

connectDB()

//allow credentials
app.use(credentials);

//
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
//application/json response
app.use(express.json())
//middleware 
app.use(cookieParser())

//static file
app.use('/static',express.static(path.join(__dirname,'public')))
// default error handler
app.use(errorHandlerMiddleware);
app.use(authentication);


app.post('/api/upload',upload.single('file'),(req,res)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
})
  
// routes
app.use('/api/auth',require("./app/routes/api/auth"))
app.use('/api/nxb',require("./app/routes/api/nxb"))
app.use('/api/reader',require("./app/routes/api/reader"))
app.use('/api/book',require("./app/routes/api/book"))
app.use('/api/followbook',require("./app/routes/api/followBook"))
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('json')){
        res.json({"error":"404 NOT FOUND"})
    }
    else {
        res.type('text').send("404 Not Found")
    }
})

mongoose.connection.once('open',async()=>{
    try{
        //await MongoDB.connect(process.env.MongoDB)
        console.log("DB connected ")
        app.listen(PORT,() => {console.log(`listening on port ${PORT}`)});
    }
    catch(e){
        console.log("mongoose error ",e);
    }
})

module.exports = app;