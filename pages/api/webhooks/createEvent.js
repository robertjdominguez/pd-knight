import axios from "axios";
import qs from "querystring";
import { refreshToken } from "../../../utilities/refreshToken";

const url = process.env.MSAL_TOKEN_ACCESS;
const calUrl = `https://graph.microsoft.com/v1.0/me/events`;

export default async (req, res) => {
  // Refresh the token
  const token = await refreshToken();
  const result = await axios.post(
    calUrl,
    {
      subject: req.body.data.title,
      body: {
        contentType: "HTML",
        content: req.body.data.description,
      },
      start: {
        dateTime: req.body.data.date,
        timeZone: "Central Standard Time",
      },
      end: {
        dateTime: req.body.data.date,
        timeZone: "Central Standard Time",
      },
      location: {
        displayName: "Microsoft Teams Meeting",
      },
      allowNewTimeProposals: false,
      isOnlineMeeting: true,
      onlineMeetingProvider: "teamsForBusiness",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  console.log(result.status);
  result.status == 201
    ? res.status(200).json({ message: `Great success! 🚀` })
    : res.status(400).json({ message: `Something went to 💩` });
};
