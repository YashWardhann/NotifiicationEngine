import { SNS } from "./../../config/aws.config.js";
import ApiError from "./../../utils/ApiError.js";
import CreateMobileSubscription from "./../subscribe/CreateMobileSubscription.js"
import DeviceEndpoint from "./../../models/DeviceEndpoint.model.js"

const CreateEndpoint = ({ deviceToken, customerID }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Build a new endpoint 
            const endpointParams = {
                PlatformApplicationArn: "arn:aws:sns:ap-south-1:716163158234:app/GCM/spiderg-dev",
                Token: deviceToken,
                CustomUserData: customerID
            };

            console.log("Creating endpoint");

            SNS.createPlatformEndpoint(endpointParams, async (err, data) => {
                if (err) throw new ApiError(500, err);
                
                console.log(`Created new endpoint for user: ${customerID} (Device Token: ${deviceToken})`);
                
                // Save the endpoint to mongodb 
                const endpointData = await DeviceEndpoint.create({
                    deviceToken: deviceToken,
                    customerID: customerID,
                    endpointArn: data.EndpointArn
                });

                // Subscribe to the topic in SNS 
                await CreateMobileSubscription(endpointData.endpointArn);
                
                return resolve(data);
            })
        } catch (e) {
            if (e instanceof ApiError) {
                e.display();
                return reject();
            } else {
                console.error(e);
                return reject(new ApiError(500, e.message));
            }
        }
    });
}

export default CreateEndpoint;