const db = require("./config/database");
const bcrypt = require("bcrypt");

async function seedUser(){

 try{

   const hash =
   await bcrypt.hash(
     "123456",
     10
   );

   await db.query(
   `
   INSERT INTO users
   (name,email,password,role)
   VALUES (?,?,?,?)
   `,
   [
    "budi",
    "budi@mail.com",
    hash,
    "user"
   ]
   );

   console.log(
    "User seeded"
   );

   process.exit();

 }catch(err){

   console.log(err);

   process.exit();

 }

}

seedUser();