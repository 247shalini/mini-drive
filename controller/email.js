import { Email, AVAILABLE_TEMPLATES } from "../utils/Email.js";

export const sendEmail = async (req, res) => {
    const { emails } = req.body
    const emailClient = new Email();
    emailClient.setTemplate(AVAILABLE_TEMPLATES.REQUEST);
    emailClient.setBody();
    emailClient.send(emails);
    return res.redirect("/");
}