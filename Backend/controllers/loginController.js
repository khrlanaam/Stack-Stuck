const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req,res)=>{

 try{

   const {email,password}=req.body;

   if(!email || !password){

      return res.status(400).json({
        error:"Email dan password wajib diisi"
      });

   }

   const user =
   await User.findByEmail(email);

   if(!user){

      return res.status(404).json({
        error:"User tidak ditemukan"
      });

   }

   const match =
   await bcrypt.compare(
      password,
      user.password
   );

   if(!match){

      return res.status(401).json({
        error:"Password salah"
      });

   }

   res.status(200).json({
      message:"Login berhasil",
      user:{
         id:user.id,
         name:user.name,
         email:user.email,
         role:user.role
      }
   });

 }catch(err){

   res.status(500).json({
      error:err.message
   });

 }

};