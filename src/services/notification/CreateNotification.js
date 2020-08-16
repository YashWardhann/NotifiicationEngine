const CreateNotification = ({ type, message }) => {
    return new Promise((resolve, reject) => {
        try {
            if (!type || !message) {
                throw new Error("Incomplete details");
            }

            return resolve({ type: type, message: message, timestamp: Date.now() });
        } catch (e) {
            console.log(e);
            return reject(e);
        }
    });
}

export default CreateNotification;