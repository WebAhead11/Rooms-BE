import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Testing our server");
});

export default router;
