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

export default router;
