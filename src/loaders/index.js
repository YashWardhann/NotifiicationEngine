import jobsLoader from "./jobs.js";
import mongooseLoader from "./mongoose.js";

export default async ({ expressApp }) => {
    const mongooseConnection = await mongooseLoader();

    // Load the cron jobs 
    await jobsLoader();
    console.log("Jobs loaded!");
}