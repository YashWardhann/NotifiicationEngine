import DeviceEndpoint from "./../../models/DeviceEndpoint.model.js";
import ApiError from "../../utils/ApiError.js";

const CreateNotification =  ({type, message, customerID }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type || !message || !customerID) {
                throw new Error("Incomplete details");
            }

            // Get the device endpoint data 
            const deviceDetails = await DeviceEndpoint.findOne({ customerID: customerID });

            if (!deviceDetails) {
                throw new ApiError(404, `Customer not found. (ID: ${customerID})`);
            }

            const notificationData = {
                type: type, 
                title: message.title,
                body: message.body, 
                timestamp: Date.now(), 
                deviceDetails: deviceDetails 
            }; 

            return resolve(notificationData);
        } catch (e) {
            return reject(e);
        }
    });
}

export default CreateNotification;