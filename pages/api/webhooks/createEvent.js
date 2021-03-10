import axios from "axios";
import qs from "querystring";
import graphcms from "../../../components/utilities/graphCMS";
import { refreshToken } from "../../../utilities/refreshToken";

// MSFT vars
const url = process.env.MSAL_TOKEN_ACCESS;
const calUrl = `https://graph.microsoft.com/v1.0/me/events`;

// GraphCMS mutation IFF needed
const mutation = `
mutation UpdatePDSession($id: ID!, $teamsLink: String!) {
  updatePdSession(data: {teamsLink: $teamsLink}, where: {id: $id}) {
    id
    title
  }
}
`;

export default async (req, res) => {
  // Check to see if event has an id yet
  if (req.body.data.teamsLink != null) {
    res.status(200).json({ message: `💩 is already in the system!` });
  } else {
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
    // Add new id to pdSession in GraphCMS => data.id
    const cmsUpdate = await graphcms.request(mutation, {
      id: result.data.id,
    });

    console.log(cmsUpdate);

    console.log(result.status);
    result.status == 201
      ? res.status(200).json({ message: `Great success! 🚀` })
      : res.status(400).json({ message: `Something went to 💩` });
  }
};
