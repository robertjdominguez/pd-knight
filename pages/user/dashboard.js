import { getSession } from "next-auth/client";
import { PageWrapper, DashTable } from "../../components/layout/Lib";
import DashCard from "../../components/sessions/DashCard";
import PastCard from "../../components/sessions/PastCard";
import {
  fetcher,
  myRegistrationQuery,
  registrationMutation,
} from "../../components/utilities/hasura";
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
          signed up for. If they've already happened, then you'll see a handy
          button to print your certificate on your next wild Saturday evening.
        </p>
        {/* Upcoming Sessions */}
        <h4 style={{ marginBottom: 0 }}>Upcoming Sessions</h4>
        <p className="subtle" style={{ marginBottom: `5vh` }}>
          Any upcoming sessions for which you're registered will appear here.
        </p>
        <DashTable>
          <thead>
            <th>Title</th>
            <th>Date</th>
            <th>Leader</th>
          </thead>
          <tbody>
            {upcomingRegistrations.map((reg) => (
              <DashCard
                key={reg.pdconnection[0].title}
                session={reg.pdconnection[0]}
              />
            ))}
          </tbody>
        </DashTable>
        {/* Past Sessions */}
        <h4 style={{ marginBottom: 0, marginTop: `10vh` }}>Past Sessions</h4>
        <p className="subtle" style={{ marginBottom: `5vh` }}>
          Once you register for sessions and they've already happened, they'll
          move down here. Certs and recordings will be available within a few
          days of the session.
        </p>
        <DashTable>
          <thead>
            <th>Title</th>
            <th>Recording</th>
            <th>Certificate</th>
          </thead>
          <tbody>
            {pastRegistrations.map((reg) => (
              <PastCard key={reg.pdconnection[0].title} session={reg} />
            ))}
          </tbody>
        </DashTable>
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

  pastRegistrations.sort(function (a, b) {
    return new Date(b.pdconnection[0].date) - new Date(a.pdconnection[0].date);
  });

  let upcomingRegistrations = registrations.registrations.filter((reg) => {
    return Date.parse(reg.pdconnection[0].date) > now;
  });

  upcomingRegistrations.sort(function (a, b) {
    return new Date(a.pdconnection[0].date) - new Date(b.pdconnection[0].date);
  });

  return {
    props: {
      session: session,
      pastRegistrations: pastRegistrations,
      upcomingRegistrations: upcomingRegistrations,
    },
  };
}
