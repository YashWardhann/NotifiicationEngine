import aws from "aws-sdk";

// Set region
aws.config.update({region: 'us-east-1'});

export const SNS = new aws.SNS();
