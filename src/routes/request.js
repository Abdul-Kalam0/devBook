const express = require("express");
const { userAuth } = require("../middleware/Authentication");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// cehck the sender is present in DB or not
// this api status will be either interested or ignored only
// what if a send the connection to b and again a sent the connection to b so there will be duplicate data in the Collection OR a sent to b now b also want to send to a so this is not allowed
//when user want to send the request itself we will use pre() middleware just before the saving in schema just like the methods in schema we have written
requestRouter.post(
  "/request/send/:status/:touserId",
  userAuth,
  async (req, res) => {
    try {
      // this is comming form useAuth
      const fromUserId = req.user._id;
      // these are taken form API
      const toUserId = req.params.touserId;
      const status = req.params.status;

      const ALLOWED_STATUS = ["ignored", "interested"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }
      // check whether the user exist in our DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User does not exist");
      }

      // if there is an existing connectionRequest already exist or b also wnat to send to a
      // to write two condition we will use mongoose OR logic
      // $or:[{},{},{},........]
      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnection) {
        return res
          .status(400)
          .send({ message: "Connection request already exist" });
      }

      const connection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connection.save();
      res.json({
        message: "connection sent successfully",
        data,
      });
    } catch (err) {
      res.status(404).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
