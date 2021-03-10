import axios from "axios";
import { refreshToken } from "../../../utilities/refreshToken";

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

  result.status == 200
    ? res.status(200).json({ message: `Great success! 🚀` })
    : res
        .status(400)
        .json({ message: `Something went to 💩...CODE ${result.status}` });
};
