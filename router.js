import express from "express";
import db from './database/connection.js';
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Testing our server");
});
router.get("/rooms", (req, res,next) => {

  db.query(`SELECT * FROM rooms`)
  .then((result) => {
  res.send(result.rows);
})  
.catch(next);
  
});

router.post("/create-room",(req,res)=>{

})
router.post("/create-user",(req,res,next)=>{
  let username = req.body.username;
  console.log(username);
  db.query("INSERT INTO users(username) VALUES($1)", [req.body.username])
  .then(result =>{
    db.query("SELECT * from users")
    .then(res => console.log(res.rows));
  })
  .catch(next);

})

export default router;
