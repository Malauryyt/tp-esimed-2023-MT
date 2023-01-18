const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const bcrypt = require("bcryptjs");
const  jwt= require("jsonwebtoken");

router.post("/login", async(req,res) =>{

    const  foundUser =  await userRepository.getUserByFirstName(req.body.firstName);
    //founduser est un objet de type user
    console.log("------------------------------------------------------", foundUser.password)
    if(!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)){
        res.status(400).send("Login ou mot de passe incorrect")
    }else{
        const token = jwt.sign({ id: foundUser.id, firstName: foundUser.firstName}, 'shhh');
        res.status(200).json({ token });
    }

});

exports.initializeRoutesAuth = () => router;