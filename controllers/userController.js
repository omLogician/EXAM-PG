const db = require('../models')
const bcrypt = require("bcrypt");
const config = require("../config/dbConfig.js")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const dbConfig = require('../config/dbConfig.js');

//create main model

const Users = db.users
//main work

const resetPasswd = async(name, email, token)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            // service: 'gmail',
            auth:{
                user:"captainpandey101002@gmail.com",
                pass:"mhdvkuvqwtgzijfe"
            }
        });

        const mailOptions = {
            from:"captainpandey101002@gmail.com",
            to:email,
            subject: 'For resetting the password',
            html:'<p>Hii' + name + ', Please copy this link for completing the password reset request</p><a href="http://localhost:8080/api/user/resetPassword?token='+token+'">Reset Yout PassWord</a>'
        }
        transporter.sendMail(mailOptions, function(error, info){
            if(error)
            {
                console.log(error);
            }
            else
            {
                console.log("Mail has been sent :- ", info.response);
            }
        })
    }catch(error){
        // res.status(400).json({message:error.message});
    }
}



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


//just update password
const updatePassword = async(req, res)=>{
    const users = await Users.findOne({where: {email: req.body.email}});
    if(!users) return res.status(404).json("User Not Found");

    const hashnewPass = await bcrypt.hash(req.body.newPasswd, 10);
    await Users.update({passwd: hashnewPass}, {where: {email: req.body.email}});
    res.status(200).send({message: "Password Updated"});
}
//forget password using token and sending email link to the user
const forgetPassword = async(req, res)=>{
    try{
        const userData = Users.findOne({where: {email: req.body.email}});
        if(userData){
            const random = randomstring.generate();
            Users.update({token: random}, {where: {email: req.body.email}});
            resetPasswd(userData.fullname, req.body.email, random);
            res.status(200).send({message: "Email Sent check your inbox"});
        }
        else
        {
            res.status(200).send({msg: "This Email does not exists"});
        }
    }catch(error){
        res.status(400).send({msg: error.message});
    }
}

const resetPassword = async(req, res)=>{
    try{
        const token = req.query.token;
        const tokendata = await Users.findOne({where: {token: token}});
        if(tokendata){
            const hashnewPass = await bcrypt.hash(req.body.passwd, 10);
            await Users.update({passwd: hashnewPass}, {where: {token: token}});
            res.status(200).send({message: "Password Updated"});
        }else{
            res.status(200).send({msg: "This Email does not exists"});
        }
    }catch(error){
        res.status(400).send({msg: error.message});
    }
}

module.exports = {
    register,
    login,
    updatePassword,
    forgetPassword,
    resetPassword
}