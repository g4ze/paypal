const express = require('express');
const router = express.Router();
const { authMiddleware } = require("./auth");
const { Account } = require("../db");
const { User } = require("../db");
const mongoose = require('mongoose');
const color = require('colors');
router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    if (!account) {
        console.log(color.red("400|ACC NOT FOUND|GET /api/v1/account/balance"))
        return res.status(400).json({
            message: "Account not found"
        });
    }
    console.log(color.green("200|OK|GET /api/v1/account/balance"))
    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toUser = await User.findOne({ username: to }).session(session);
    const toAccount = await Account.findOne({ userId: toUser._id.valueOf() }).session(session);
    
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: toUser._id.valueOf() }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
module.exports = router;
