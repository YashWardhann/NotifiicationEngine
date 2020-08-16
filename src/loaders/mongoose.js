import mongoose from "mongoose";

export default async () => {
    mongoose.connect('mongodb://admin:admin1234@ds141238.mlab.com:41238/lc_hub', {
        useNewUrlParser: true,  
        useUnifiedTopology: true
    })
    .then(() => console.log('Connect to mongodb!'))
    .catch(e => console.log(e));
}