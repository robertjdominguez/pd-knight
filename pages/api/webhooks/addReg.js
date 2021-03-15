import {
  fetcher,
  registrationMutation,
} from "../../../components/utilities/hasura";

// THIS IS MEAN TO ADD POST-DATED ATTENDEES AND WILL
// ACCEPT A REQUEST WITH AN ARRAY OF ATTENDEES FOR A SPECIFIC EVENT

export default async (req, res) => {
  console.log(req);
  // Add the registration in Hasura
  req.body.teachers.map((instance) => {
    const mutation = {
      query: registrationMutation,
      variables: {
        slug: req.body.slug,
        attendee: instance,
      },
    };
    async function Running() {
      const dbReg = await fetcher(mutation.query, mutation.variables);
      console.log(dbReg);
    }
    Running();
  });

  res.status(200).json({ message: `Great success! 🚀` });
};
