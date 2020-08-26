import DeviceEndpoint from "./../../models/DeviceEndpoint.model.js";
import ApiError from "../../utils/ApiError.js";

const CreateNotification =  ({type, message, customerID }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type || !message || !customerID) {
                throw new Error("Incomplete details");
            }

            // Get the device endpoint data 
            const endpointData = await DeviceEndpoint.findOne({ customerID: customerID });

            if (!endpointData) {
                throw new ApiError(404, `Customer not found. (ID: ${customerID})`);
            }
            return resolve({ type: type, message: message, timestamp: Date.now(), endpointData: endpointData });
        } catch (e) {
            return reject(e);
        }
    });
}

export default CreateNotification;