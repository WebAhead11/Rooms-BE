import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString });

// const username = "omar";
// db.query(`SELECT room_id FROM users WHERE username='${username}'`)
// .then((result) => {
// console.log("from connections.js");
//   console.log(result.rows);
// })
// .catch(e=>{
//     console.log("error here")
//     console.log(e)
// });

export default db;
