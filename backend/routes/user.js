const express = require('express');
const zod= require('zod');
const { User } = require('../db');
const {Account} = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const colors = require('colors');
signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});
router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: "Invalid body" });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const userId = user._id;
        const token = jwt.sign({ userId }, JWT_SECRET);

        const account=await Account.create({
            userId,
            balance: 1 + (Math.random() * 1000)
        });
        console.log(account);
        return res.json({
            message: "USER CREATED",
            token: token
        });
    } catch (err) {
        return res.status(500).json({ error: "Error while creating user", err });
    }
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});
router.post('/signin', async (req, res) => {
    const {success}=signinBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({error: "Invalid body"});
    }
    const user  = await User.findOne({username: req.body.username});
    if (!user){
        return res.status(400).json({error: "Invalid creds"});
    }
    if (user.password !== req.body.password){
        return res.status(400).json({error: "Invalid creds"});
    }
    if(!user){
        return res.status(400).json({error: "Invalid creds"});
    }
    else{
        const token= jwt.sign({userId:user._id},JWT_SECRET);
        res.json({
            token: token
        })
    }
});
const  { authMiddleware } = require("./auth");


// other auth routes

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})
module.exports = router;
// get user data
router.get("/", authMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    console.log(colors.green("200|OK|GET /api/v1/user/"));
    res.json(user);
})