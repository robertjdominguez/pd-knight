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
          Psssst.....click on the Fresh Prince to sign up for something.
        </p>
        <img
          src="https://media.giphy.com/media/OSuaE6AknuRc7syZXp/giphy.gif"
          alt="The Fresh Prince in an empty Bel Air mansion"
          style={{
            width: `100%;`,
            height: `auto`,
            placeSelf: `center center`,
            borderRadius: `13px`,
            boxShadow: `var(--norm-shadow)`,
          }}
        />
        {/* Past Sessions */}
        <h4 style={{ marginBottom: 0 }}>Past Sessions</h4>
        <p className="subtle">
          Once you register for sessions and they've already happened, they'll
          move down here. Certs and recordings will be available within a few
          days of the session.
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
