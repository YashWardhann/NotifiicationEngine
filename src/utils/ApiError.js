class ApiError extends Error {
    constructor(statusCode, message) {
        super(); 
        this.statusCode = statusCode; 
        this.message = message;     
    }

    // Displays the error on the console 
    display() {
        console.error(`[API ERROR] ${this.message} (Status Code: ${this.statusCode})`);
    }
}

export default ApiError;