import { SNS } from "./../../config/aws.config.js";

const PublishNotification = (notification) => {
    return new Promise((resolve, reject) => {
        const params = {
            Message: notification.message, 
            TopicArn: 'arn:aws:sns:us-east-1:716163158234:test'
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