const express = require("express");
const {Router} = require("express")
const router =  Router();
const path = require("path");
const multer = require("multer")

const storage = multer.diskStorage({
    destination:  path.join (__dirname, "../public/uploads"),
    filename: (req, file,cb) => {
        cb(null, file.originalname)
    } 
})


//routes
router.get("/", (req, res) => {
    res.render("index")
   })

  
//middleware multer
const upload = multer({
    storage,
    dest: path.join (__dirname, "public/uploads"),
    limits: {fieldSize: 2000000},
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes. test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb (null, true);
        }
        cb("errror: archivo debe ser una imagen")
    }
}).single("image")

router.post("/upload", upload, (req, res) => {
       console.log(req.file);
       res.send("uploaded")
   })

   module.exports =  router