import axios from "axios";
import { refreshToken } from "../../../utilities/refreshToken";
import {
  fetcher,
  registrationMutation,
} from "../../../components/utilities/hasura";

export default async (req, res) => {
  console.log(req);
  // MSFT vars
  const calUrl = `https://graph.microsoft.com/v1.0/me/events/${req.body.id}`;
  // Refresh the token
  const token = await refreshToken();

  // Get the attendees for the event
  const oldData = await axios.get(calUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  // List of the old attendees
  const oldAttendees = oldData.data.attendees;

  // Add the new invitee
  oldAttendees.push({
    emailAddress: {
      address: req.body.emailAddress.email,
      name: req.body.emailAddress.name,
    },
    type: "required",
  });

  // Update the event
  const result = await axios.patch(
    calUrl,
    {
      attendees: oldAttendees,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );

  // Add the registration in Hasura
  const mutation = {
    query: registrationMutation,
    variables: {
      slug: req.body.slug,
      attendee: req.body.userId,
    },
  };
  const dbReg = await fetcher(mutation.query, mutation.variables);

  console.log(dbReg);

  result.status == 200
    ? res.status(200).json({ message: `Great success! 🚀` })
    : res
        .status(400)
        .json({ message: `Something went to 💩...CODE ${result.status}` });
};
