import cron from "node-cron";
import mongoose from "mongoose";
import VideoResponses from "./../models/VideoResponse.model.js";

export default () => {
    const videoClean = cron.schedule('5 * * * *', () => {
        console.log("Starting video response cleaning.");
        const currTime = Date.now();
        const fortnightAgo = new Date();
        fortnightAgo.setDate(fortnightAgo.getDate()-1);
        console.log(fortnightAgo);
        VideoResponses
            .where("timestamp").lte(fortnightAgo)
            .then((docs) => {
                // Get the AWS keys for the video requests
                const videoKeys = docs.map(x => x.video_params.filename);
                console.log(videoKeys);
            });
    });
}