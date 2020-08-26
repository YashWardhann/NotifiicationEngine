import { SNS } from "./../../config/aws.config.js";
import ApiError from "./../../utils/ApiError.js";

const CreateMobileSubscription = (deviceEndpoint) => {
    return new Promise(async (resolve, reject) => {
        const params = {
            Protocol: "application",
            TopicArn: process.env.EVENT_TOPIC_ARN,
            Endpoint: deviceEndpoint,
        };
    
        SNS.subscribe(params, async (err, data) => {
            if (err) {
                console.log(err);
                return reject(new ApiError(500, err));
            }

            return resolve(data);
        });
    });
}

export default CreateMobileSubscription;