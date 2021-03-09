import axios from "axios";
import { refreshToken } from "../../../utilities/refreshToken";

const mailUrl = `https://graph.microsoft.com/v1.0/me/sendMail`;

export default async (req, res) => {
  // Refresh the token
  const token = await refreshToken();
  const result = await axios.post(
    mailUrl,
    {
      message: {
        subject: "API Testing",
        body: {
          contentType: "Text",
          content: "Hello world",
        },
        toRecipients: [
          {
            emailAddress: {
              address: "rdominguez@altamontschool.org",
            },
          },
        ],
      },
      saveToSentItems: "true",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  result.status == 202
    ? res.status(200).json({ message: `Great success! 🚀` })
    : res.status(400).json({ message: `Something went to 💩` });
};
