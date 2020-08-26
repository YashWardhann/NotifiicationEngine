import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import apiRouter from "./api/api.router.js";

const app = express(); 

const PORT = process.env.PORT || process.argv[2] || 8080; 

const server = app.listen(PORT, () => {
    console.log(`Listening to port ${server.address().port}`);
});

// Parse x-www-form-urlencoded requests 
app.use(bodyParser.urlencoded({ extended: false })); 
// Parse json requests 
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    console.log(req.body.payload.payment.entity.notes);
    next();
});

mongoose.connect("mongodb://admin:admin1234@ds141238.mlab.com:41238/lc_hub", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("Connected to mongodb!"))
.catch(e => console.error(e));

app.use("/api", apiRouter);

// Export the server for testing purposes 
module.exports = server;