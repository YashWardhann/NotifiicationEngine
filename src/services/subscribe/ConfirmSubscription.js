import { SNS } from "./../../config/aws.config.js";

const ConfirmSubscription = (token, topic) => {
    return new Promise((resolve, reject) => {
        const params = {
            Token: token, 
            TopicArn: topic
        };
        const confirmSubscriptionPromise = SNS.confirmSubscription(params).promise();

        confirmSubscriptionPromise
            .then(data => {
                console.log(data);
                resolve(data);
            })
            .catch(e => {
                console.error(e);
                reject(e);
            })
    });
}

export default ConfirmSubscription;