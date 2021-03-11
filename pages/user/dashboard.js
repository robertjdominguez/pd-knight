import { getSession } from "next-auth/client";
import { PageWrapper } from "../../components/layout/Lib";
import {
  fetcher,
  myRegistrationQuery,
  registrationMutation,
} from "../../components/utilities/hasura";
import Image from "next/image";
import Head from "next/head";

export default function Dashboard({
  session,
  pastRegistrations,
  upcomingRegistrations,
}) {
  return (
    <>
      <Head>
        <title>My Dashboard</title>
      </Head>
      <PageWrapper>
        <h3 style={{ marginBottom: 0 }}>
          Hey there, {session.user.name.split(" ")[0]}!
        </h3>
        <p className="subtle">
          This is your dashboard. It isn't sexy, but it's functional (kind of
          like Rob in high school). Below, you'll see all the sessions you've
          signed up for. If they've already happened - and you actually showed
          up - and JP/Rob have gotten it together and done their bureaucratic
          work, then you'll see a handy button to print your certificate on your
          next wild Saturday evening.
        </p>
        {/* Upcoming Sessions */}
        <h4 style={{ marginBottom: 0 }}>Upcoming Sessions</h4>
        <p className="subtle">
          Any upcoming sessions for which you're registered will appear here.
        </p>
        <ul>
          {upcomingRegistrations.length > 0
            ? upcomingRegistrations.map((reg) => (
                <li key={reg.pdconnection[0].title}>
                  {reg.pdconnection[0].title}
                </li>
              ))
            : null}
        </ul>
        {/* Past Sessions */}
        <h4 style={{ marginBottom: 0 }}>Past Sessions</h4>
        <p className="subtle">
          Once you register for sessions and they've already happened, they'll
          move down here. Certs and recordings will be available within a few
          days of the session.
        </p>
        <ul>
          {pastRegistrations.length > 0
            ? pastRegistrations.map((reg) => (
                <li key={reg.pdconnection[0].title}>
                  {reg.pdconnection[0].title}
                </li>
              ))
            : null}
        </ul>
      </PageWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }

  // Now
  let now = new Date();
  // Get all of a user's registrations
  const registrations = await fetcher(myRegistrationQuery, {
    _myEmail: session.user.email,
  });

  let pastRegistrations = registrations.registrations.filter((reg) => {
    return Date.parse(reg.pdconnection[0].date) < now;
  });

  let upcomingRegistrations = registrations.registrations.filter((reg) => {
    return Date.parse(reg.pdconnection[0].date) > now;
  });

  return {
    props: {
      session: session,
      pastRegistrations: pastRegistrations,
      upcomingRegistrations: upcomingRegistrations,
    },
  };
}
