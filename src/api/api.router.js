import { Router } from "express";
import { SNS } from "./../config/aws.config.js";

import subscriberRouter from "./subscribers/subscriber.router.js";

// Import services
import CreateNotification from "./../services/notification/CreateNotification.js";
import PublishNotification from "./../services/notification/PublishNotification.js";

const router = Router();

router.use("/subscribers", subscriberRouter);

router.get("/", async (req, res, next) => {
    const notificationType = req.query.type; 
    const notificationMessage = req.query.message; 

    try {
        // Build the parameters for the notification 
        const notification = {
            type: notificationType, 
            message: notificationMessage
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