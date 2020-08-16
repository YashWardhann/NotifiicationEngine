import { Router } from "express";
import bodyParser from "body-parser";
import aws from "aws-sdk";
import ConfirmSubscription from "./middleware/ConfirmSubscription.js";
import { SNS } from "./../../config/aws.config.js";

const router = Router();

router.use((req, res, next) => {
    if (req.headers["x-amz-sns-message-type"]) {
        console.log("changed!");
        req.headers["content-type"]= "application/json";
    }
    return next();
});

router.post("/whatsapp", bodyParser.json(), ConfirmSubscription, (req, res) => {
    return res.send("HEY!");
});

router.post("/", (req, res) => {
    if (!req.body.endpoint) {
        return res.status(400).json({ message: "Endpoint not set" });
    }
    const params = {
        Protocol: "http",
        TopicArn: process.env.EVENT_TOPIC_ARN,
        Endpoint: `http://6c61a3e86208.ngrok.io/api/subscribers/${req.body.endpoint}`,
    };

    console.log(params);

    SNS.subscribe(params, async (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: err });
        }
        else return res.status(200).json({ data: data });
    });
});


export default router;