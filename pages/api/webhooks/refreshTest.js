import { sendMail } from "../../../utilities/sendEmail";

const mailUrl = `https://graph.microsoft.com/v1.0/me/sendMail`;

export default (req, res) => {
  // Do something with it
  sendMail();
  res.status(200).json({ message: `Hooray` });
};
