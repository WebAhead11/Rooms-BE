import express from "express";
import db from './database/connection.js';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = "shhhhhh";

const router = express.Router();
router.use(cookieParser());

router.get("/", (req, res) => {
  
});
router.get("/rooms", (req, res,next) => {

  db.query(`SELECT * FROM rooms`)
  .then((result) => {
  res.send(result.rows);
})  
.catch(next);
  
});

router.post("/create-room",(req,res,next)=>{
  console.log("in /create-room ")
  let data = req.body;
  db.query("INSERT INTO rooms(username,name,description,max_users) VALUES($1,$2,$3,$4)", [req.body.user,req.body.roomName,req.body.description,req.body.people])
  .then(result =>{
    /** log all users in DB */
    db.query("SELECT * from rooms")
    .then(response => console.log(response.rows));
    res.send({status:"ok"});
  })
  .catch(next);
  console.log(data);
})
router.post("/create-user",(req,res,next)=>{
  let username = req.body.username;
  db.query("INSERT INTO users(username) VALUES($1)", [req.body.username])
  .then(result =>{
    /** log all users in DB */
    db.query("SELECT * from users")
    .then(response => console.log(response.rows));
    res.send({username});
  })
  .catch(next);

  
  
 

})

export default router;
