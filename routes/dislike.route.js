const express = require("express");
const router = new express.Router();
const asyncHandler = require("../utils/asyncHandler");
const UserModel = require("../models/user.model");
const protectRoute = require("../middlewares/protectRoute");

router.get("/:id", protectRoute, asyncHandler(async (req, res) => {
    const dislikedUser = await UserModel.findOne({discord: req.params.id});
    if (dislikedUser) {
        await UserModel.findOneAndUpdate({discord: req.user.id}, {
            $push: {
                disliked: dislikedUser.discord,
            }
        })
        return res.status(200).json({status: "ok"});
    } else {
        return res.status(404).json({status: "error", error: "liked user not found"});
    }
}));

module.exports = router;