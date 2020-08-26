import { Router } from "express";
import { SNS } from "./../config/aws.config.js";

import subscriberRouter from "./subscribers/subscriber.router.js";

// Import services
import CreateNotification from "./../services/notification/CreateNotification.js";
import PublishNotification from "./../services/notification/PublishNotification.js";
import CreateEndpoint from "./../services/endpoints/CreateEndpoint.js";
import ApiError from "../utils/ApiError.js";

const router = Router();


router.use("/endpoint", async (req, res) => {
    try {
        const endpointInfo = {
            deviceToken: req.body.deviceToken, 
            customerID: req.body.customerID
        };

        const endpointData = await CreateEndpoint(endpointInfo);
        return res.status(201).json({ data: endpointData });
    } catch (e) {
        if (e instanceof ApiError) {
            e.display();
            return res.status(e.statusCode).json({ message: e.message });
        } else {
            console.error(e);
        }
    }
});
router.use("/subscribers", subscriberRouter);

router.post("/", async (req, res, next) => {
    const notificationType = req.body.type; 
    const notificationMessage = req.body.message; 
    const customerID = req.body.customerID;

    try {
        // Build the parameters for the notification 
        const notification = {
            type: notificationType, 
            message: notificationMessage,
            customerID: customerID
        };

        // Create a new notification 
        const notificationData = await CreateNotification(notification);
        
        // Publish the notification to a SNS topic.
        const publishedData = await PublishNotification(notificationData);
        console.log(publishedData);

        return res.status(201).json({ data: {...notificationData, id: publishedData.MessageId} });
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: e.message });
    }
});

export default router;