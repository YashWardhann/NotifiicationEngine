import aws from "aws-sdk";

// Set region
aws.config.update({region: 'ap-south-1'});

export const SNS = new aws.SNS();
