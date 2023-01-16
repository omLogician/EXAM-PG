const db = require('../models')
const bcrypt = require("bcrypt");
const config = require("../config/dbConfig.js")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const dbConfig = require('../config/dbConfig.js');

// const resetPaswdemail = async(name, email, token)=>{
//     try{
//         const transporter = nodemailer.createTransport({
//             host:'smtp@gmail.com',
//             port:587,
//             secure:false,
//             requireTLS:true,
//             auth:{
//                 user:dbConfig.emailUser,
//                 pass:dbConfig.emailPasswd
//             }
//         });
//         const mailOptions = {
//             from:dbConfig.emailUser,
//             to:email,
//             subject:"For Resetting Password",
//             html:'<p>Hii '+name+',</p><p>Click on the link to reset your password</p><a href="http://localhost:8080/resetPasswd?token='+token+'">Reset Your Password</a><p>Thank You</p>'
//         }
//         transporter.sendMail(mailOptions, (error, info)=>{
//             if(error)
//             {
//                 console.log(error);
//             }
//             else
//             {
//                 console.log("Email Sent: "+info.response);
//             }
//         });
//     }catch(error){
//         res.status(400).send({msg: error.message});
//     }
// }
//create main model

const Users = db.users
//main work

//Registration

const register = async (req, res)=>{
    const existingUser = await Users.findOne({where: {email:req.body.email}});
    if(existingUser)
    {
        res.status(409).json({alert: "The User Already Exists!!"});
    }
    else
    {
        const hashPass = await bcrypt.hash(req.body.passwd, 10);
        let info = {
        fullname: req.body.fullname,
        email: req.body.email,
        passwd: hashPass,
        published: req.body.published ? req.body.published : false
    }

    const users = await Users.create(info)
    res.status(200).send(users)
    console.log(users)
    }
    
}
//Login

const login = async(req, res)=>{
        // Finding the user
            const users = await Users.findOne({ where: { email: req.body.email } });
        if (!users) return res.status(404).json("User not found");
        // Checking if the password is correct
        const isMatch = await bcrypt.compare(req.body.passwd, users.passwd);
        // req.session.Users = users;
        // res.json(users);
        if (!isMatch) return res.status(401).json("Invalid password");
        else
        return res.status(200).json("LOGGED IN!");
}

const updatePassword = async(req, res)=>{
    const users = await Users.findOne({where: {email: req.body.email}});
    if(!users) return res.status(404).json("User Not Found");

    const hashnewPass = await bcrypt.hash(req.body.newPasswd, 10);
    await Users.update({passwd: hashnewPass}, {where: {email: req.body.email}});
    res.status(200).send({message: "Password Updated"});
}

// const forgetPassword = async(req, res)=>{
//     try{
//         const userData = Users.findOne({where: {email: req.body.email}});
//         if(userData){
//             const random = randomstring.generate();
//             Users.update({where:{email: req.body.email}}, {$set: {token: random}});
//             resetPaswdemail(userData.fullname, userData.email, random);
//             res.status(200).send({message: "Email Sent check your inbox"});
//         }
//         else
//         {
//             res.status(200).send({msg: "This Email does not exists"});
//         }
//     }catch(error){
//         res.status(400).send({msg: error.message});
//     }
// }

module.exports = {
    register,
    login,
    updatePassword
    // forgetPassword
}