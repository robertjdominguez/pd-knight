import { getSession } from "next-auth/client";
import { PageWrapper } from "../../components/layout/Lib";
import Image from "next/image";
import Head from "next/head";

export default function Dashboard({ session }) {
  session && console.log(session);

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
          This is your dashboard. It isn't sexy, but it's functional. Below,
          you'll see all the sessions you've signed up for. If they've already
          happened - and you actually showed up - and JP/Rob have gotten it
          together and done their bureaucratic work, then you'll see a handy
          button to print your certificate on your next wild Saturday evening.
        </p>
        {/* Upcoming Sessions */}
        <h4 style={{ marginBottom: 0 }}>Upcoming Sessions</h4>
        <p className="subtle">Oh boy! Can't wait for these...</p>
        {/* Past Sessions */}
        <h4 style={{ marginBottom: 0 }}>Past Sessions</h4>
        <p className="subtle">
          Assuming we haven't been too lazy, you can come back here to view
          recordings of these sessions or print your certificates.
        </p>
      </PageWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  console.log(`Session from SSR`, session);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }
  return { props: { session: session } };
}
