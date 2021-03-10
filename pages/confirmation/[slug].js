import Moment from "react-moment";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useState } from "react";
import Router from "next/router";
import graphcms from "../../components/utilities/graphCMS";
import { PageWrapper, NavCTA } from "../../components/layout/Lib";

const Confirmation = ({ pdSession }) => {
  const [session, loading] = useSession();
  session && console.log(session.user);

  //   State for the registration progress, init with false
  const [isRegistering, setIsRegistering] = useState(false);

  //   Checking for status of registration from api route
  async function register() {
    //   async call to api route
    const registration = await axios.post("/api/webhooks/addInvite", {
      id: pdSession.teamsLink,
      emailAddress: {
        email: session.user.email,
        name: session.user.name,
      },
    });
    console.log(registration.data.message);
  }

  //   If not authenticated, push them back to the index
  if (!loading && !session) {
    Router.push("/");
  }

  return (
    <>
      <PageWrapper>
        <h2>Confirming for {pdSession.title}</h2>
        <NavCTA
          style={{
            fontSize: `12px`,
            marginTop: `20px`,
            placeSelf: `start start`,
          }}
          onClick={register}>
          CONFIRM REGISTRATION
        </NavCTA>
      </PageWrapper>
    </>
  );
};

export default Confirmation;

export async function getStaticProps({ params }) {
  const { pdSession } = await graphcms.request(
    `
      query MyQuery($slug: String!) {
        pdSession(where: {slug: $slug}) {
          title
          description
          slug
          date
          hours
          leader {
            name
            email
          }
          teamsLink
          image {
            url
          }
          baseImage {
            url
          }
        }
      }
      
      `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      pdSession,
    },
  };
}

export async function getStaticPaths() {
  const { pdSessions } = await graphcms.request(`
        {
          pdSessions {
            slug
            title
          }
        }
      `);

  return {
    paths: pdSessions.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
