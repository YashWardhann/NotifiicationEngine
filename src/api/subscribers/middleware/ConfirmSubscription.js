import confirmSubscription from "./../../../services/subscribe/ConfirmSubscription.js";

const ConfirmSubscription = async (req, res, next) => {
    if (req.headers["x-amz-sns-message-type"] == "SubscriptionConfirmation") {
        try {
            const confirmation = await confirmSubscription(req.body.Token, req.headers["x-amz-sns-topic-arn"]);
            return next();
        } catch (e) {
            return res.status(401).json({ message: "Could not confirm the subscription" });
        }
    } else {
        // If the subscription is already confirmed then continue
        return next();
    }
}

export default ConfirmSubscription;