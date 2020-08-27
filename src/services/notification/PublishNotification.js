import { SNS } from "./../../config/aws.config.js";

const PublishNotification = (notification) => {
    return new Promise((resolve, reject) => {
        // Build the notification 
        const notificationMessage = JSON.stringify({
            "GCM": {
                "notification": {
                    "title": notification.title, 
                    "body": notification.body
                }
            }
        });
        const params = {
            Message: notificationMessage, 
            TargetArn: notification.deviceDetails.endpointArn
        };
    
        const publishMessagePromise = SNS.publish(params).promise();
    
        publishMessagePromise
            .then(data => {
                console.log(`Message ${params.Message} published!`);
                resolve(data);
            })
            .catch(e => {
                console.error(e);
                reject(e);
            })
    });
}

export default PublishNotification;