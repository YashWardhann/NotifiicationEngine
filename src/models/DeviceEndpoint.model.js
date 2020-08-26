import mongoose from "mongoose";

const Schema = mongoose.Schema; 

const deviceEndpointSchema = new Schema({
    deviceToken: { type: String, required: true },
    customerID: { type: String, required: true },
    endpointArn: { type: String, required: true }
});

const deviceEndpointModel = mongoose.model("device-endpoint", deviceEndpointSchema);

export default deviceEndpointModel;