import Moment from "react-moment";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useState } from "react";
import Router from "next/router";
import graphcms from "../../components/utilities/graphCMS";
import {
  PageWrapper,
  NavCTA,
  SessionDeets,
  SessionItem,
} from "../../components/layout/Lib";

const Confirmation = ({ pdSession }) => {
  const [session, loading] = useSession();
  session && console.log(session && session.user);

  //   State for the registration progress, init with false
  const [isRegistering, setIsRegistering] = useState(`pre`);

  //   Checking for status of registration from api route
  async function register() {
    // Set the loader...
    setIsRegistering(`loading`);
    //   async call to api route
    const registration = await axios.post("/api/webhooks/addInvite", {
      id: pdSession.teamsLink,
      emailAddress: {
        email: session && session.user.email,
        name: session && session.user.name,
      },
    });
    // Bring up the confirmation message
    registration.status == 200
      ? setIsRegistering(`complete`)
      : setIsRegistering(`error`);
  }

  //   If not authenticated, push them back to the index
  if (!loading && !session) {
    Router.push("/");
  }

  return (
    <>
      <PageWrapper style={{ placeItems: `center center` }}>
        <SessionDeets style={{ background: `var(--eggshell)` }}>
          <div
            style={{
              display: isRegistering == `pre` ? `grid` : `none`,
            }}>
            <h3 style={{ marginTop: `0`, marginBottom: `3vh` }}>
              Confirm your registration for {pdSession.title}
            </h3>
            <ul>
              <SessionItem
                icon={"/calendar2.svg"}
                style={{ fontSize: `18px`, color: `var(--black)` }}>
                <Moment format="DD MMMM HH:MM a" date={pdSession.date} />
              </SessionItem>
              <SessionItem
                icon={"/watch.svg"}
                style={{ fontSize: `14px`, color: `var(--black)` }}>
                {pdSession.hours} hours
              </SessionItem>
              <SessionItem
                icon={"/user2.svg"}
                style={{ fontSize: `14px`, color: `var(--black)` }}>
                {pdSession.leader.name.split(" ")[0]}
              </SessionItem>
            </ul>
            <NavCTA
              style={{
                fontSize: `12px`,
                marginTop: `3vh`,
                placeSelf: `start start`,
              }}
              onClick={register}>
              CONFIRM REGISTRATION
            </NavCTA>
          </div>
          <div
            style={{
              placeItems: `center center`,
              display: isRegistering == `loading` ? `grid` : `none`,
            }}>
            <img
              src="/math.gif"
              style={{ borderRadius: `13px` }}
              width="100%"
              height="auto"
              alt="Math scene from The Hangover"
            />
            <h4>
              Taking care of the difficult part,{" "}
              {session && session.user.name.split(" ")[0]}...give us a minute.
            </h4>
          </div>
          <div
            style={{
              placeItems: `center center`,
              display: isRegistering == `complete` ? `grid` : `none`,
            }}>
            <img
              src="/benwyatt.gif"
              style={{ borderRadius: `13px` }}
              width="200px"
              height="auto"
              alt="Math scene from The Hangover"
            />
            <h4 style={{ fontWeight: `600` }}>
              Okay...you're good to go,{" "}
              {session && session.user.name.split(" ")[0]}! Check your calendar
              for an invite. <br />
              <br /> See you on{" "}
              <Moment format="dddd MMMM Do" date={pdSession.date} />!
            </h4>
          </div>
          <div
            style={{
              placeItems: `center center`,
              display: isRegistering == `error` ? `grid` : `none`,
            }}>
            <img
              src="/dr.gif"
              style={{ borderRadius: `13px` }}
              width="100%"
              height="auto"
              alt="Math scene from The Hangover"
            />
            <h4 style={{ fontWeight: `600` }}>
              This is...embarrassing. A mistake has been made. Rest assured,
              we're on it.
            </h4>
          </div>
        </SessionDeets>
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
