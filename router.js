import express from "express";
import db from './database/connection.js';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = "shhhhhh";

const router = express.Router();
router.use(cookieParser());

router.post("/logout", (req, res,next) => {
  let user_to_logout = req.body.user;
  // first delete (logout) user from rooms
   db.query(`DELETE FROM user_room WHERE username='${user_to_logout}'`)
  .then(result1 =>{
    console.log("deleted",user_to_logout,"from his rooms")
    // delete rooms that this user has created 
    db.query(`DELETE FROM rooms WHERE creator='${user_to_logout}'`)
    .then(result2=>{
      console.log("deleted rooms",result2.rows, "created by",user_to_logout)
       /** get all room in DB in order to send them back to client */
    db.query("SELECT * from rooms")
    .then(response => {
      console.log(response.rows)
      res.send(response.rows)
    });
      
    })
  })
  .catch(next);
});
router.get("/rooms", (req, res,next) => {

  db.query(`SELECT * FROM rooms`)
  .then((result) => {
  res.send(result.rows);
})  
.catch(next);
  
});

router.post("/create-room",(req,res,next)=>{
  let data = req.body;
   db.query("INSERT INTO rooms(creator,name,description,max_users) VALUES($1,$2,$3,$4) RETURNING *", [req.body.user,req.body.roomName,req.body.description,req.body.people])
  .then(result =>{
    /** log all users in DB */
    db.query("SELECT * from rooms")
    .then(response => res.send(response.rows));
  })
  .catch(next);
})
router.post("/delete-room",(req,res,next)=>{
  let room_id_to_delete = req.body.room_id;

  // first delete users from room
   db.query(`DELETE FROM user_room WHERE room_id=$1`,[room_id_to_delete])
  .then(result1 =>{
    // delete room itself
    db.query(`DELETE FROM rooms WHERE id=$1`,[room_id_to_delete])
    .then(result2=>{
       /** get all room in DB in order to send them back to client */
    db.query("SELECT * from rooms")
    .then(response => res.send(response.rows));
      
    })
  })
  .catch(next);
})
router.post("/join-room",(req,res,next)=>{
 const {room_id,user} = req.body;
  db.query(("INSERT INTO user_room(username,room_id) VALUES($1,$2)"), [user,room_id,])
  .then(result =>{
    /** log user_room table in DB */
    // db.query("SELECT * from user_room")
    // .then(response => console.log(response.rows));
    res.send({room_id,user});
  })
  .catch(next);
})
router.post("/create-user",(req,res,next)=>{
  let username = req.body.username;
  db.query("INSERT INTO users(username) VALUES($1)", [req.body.username])
  .then(result =>{
    /** log all users in DB */
    // db.query("SELECT * from users")
    // .then(response => console.log(response.rows));
    res.send({username});
  })
  .catch(next);
})

router.post("/users-from-room",(req,res,next)=>{
  const room_id =  req.body.room_id;
  let username = req.body.username;
  db.query(`SELECT id, username FROM user_room WHERE room_id=${room_id}`)
  .then(result =>{
    res.send(result.rows);
  })
  .catch(next);
})

router.post("/remove-user-from-room",(req,res,next)=>{
  const room_id =  req.body.room_id;
  let username = req.body.user;

  const query = `DELETE FROM user_room WHERE room_id=${room_id} AND username='${username}' `;
  db.query(query)
  .then(result =>{
    res.send(result.rows);
  })
  .catch(next);
})

export default router;
