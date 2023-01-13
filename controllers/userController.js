const db = require('../models')
const bcrypt = require("bcrypt");
//create main model

const Users = db.users
//main work

//1 create product

const register = async (req, res)=>{
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

const login = async(req, res)=>{
        // Finding the user
        const users = await Users.findOne({ where: { email: req.body.email } });
        if (!users) return res.status(404).json("User not found");
        // Checking if the password is correct
        const isMatch = await bcrypt.compare(req.body.passwd, users.passwd);
        if (!isMatch) return res.status(401).json("Invalid credentials");
        else{
            return res.status(200).json("Valid");
            // console.log("USER IS VALID");
        }
        
}

module.exports = {
    register,
    login
}