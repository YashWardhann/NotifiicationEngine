import { Router } from "express";
import bodyParser from "body-parser";
import aws from "aws-sdk";
import ConfirmSubscription from "./middleware/ConfirmSubscription.js";
import { SNS } from "./../../config/aws.config.js";
import ApiError from "./../../utils/ApiError";

const router = Router();

router.use((req, res, next) => {
    if (req.headers["x-amz-sns-message-type"]) {
        req.headers["content-type"]= "application/json";
    }
    return next();
});

router.post("/whatsapp", bodyParser.json(), ConfirmSubscription, (req, res) => {
    try {
        if (!req.headers || req.headers["x-amz-sns-message-type"] != "Notification") {
            throw new ApiError(403, "This service can handle SNS notifications only");
        }

        const message = req.body.Message; 
        console.log("Message: ", message);
        
        return res.status(200).json({ message: "Notification served!" });
    } catch (e) {
        if (e instanceof ApiError) {
            e.display(); 
            return res.status(e.statusCode).json({ message: e.message });
        }
    }   
});

router.post("/", (req, res) => {
    if (!req.body.endpoint) {
        return res.status(400).json({ message: "Endpoint not set" });
    }

    console.log(process.env.EVENT_TOPIC_ARN);
    
});


export default router;