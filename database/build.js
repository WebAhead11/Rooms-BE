import { readFileSync } from "fs";
import path from "path";
import db from "./connection.js";

// get the contents of our init.sql file
const initPath = path.join(path.resolve("./database"), "init.sql");
const initSQL = readFileSync(initPath, "utf-8");

// run the init.sql file on our database
db.query(initSQL)
  .then(() => {
    console.log("Database built");
    db.end(); // close the connection as we're finished
  })
  .catch(console.log);
