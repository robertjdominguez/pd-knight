import Head from "next/head";
import Link from "next/link";
import Moment from "react-moment";
import { useSession, signIn } from "next-auth/client";
import SessionCard from "../../components/sessions/SessionCard";
import graphcms from "../../components/utilities/graphCMS";
import {
  PageWrapper,
  SessionHero,
  SessionDeets,
  SessionItem,
  NavCTA,
  Gallery,
} from "../../components/layout/Lib";

const Session = ({ pdSession, pdSessions }) => {
  const [session, loading] = useSession();
  // Check for past using now
  let now = new Date();

  return (
    <>
      <Head>
        <title>PD Knight - {pdSession.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={pdSession.description}
          data-react-helmet="true"
        />
        <meta
          name="twitter:site"
          content="@_RobDominguez"
          data-react-helmet="true"
        />
        <meta
          name="twitter:title"
          content={pdSession.title}
          data-react-helmet="true"
        />
        <meta
          name="twitter:image"
          content={pdSession.image.url}
          data-react-helmet="true"
        />
      </Head>
      <SessionHero bg={pdSession.baseImage.url}>
        <div>
          {pdSession.type == `techTh` ? (
            <img src={"/techTh.svg"} width="200px" height="auto" />
          ) : (
            <img src={"/springworkshop.svg"} width="300px" height="auto" />
          )}
          <h2>{pdSession.title}</h2>
          <p>{pdSession.description}</p>
          <SessionDeets>
            <ul>
              <SessionItem icon={"/calendar2.svg"} style={{ fontSize: `18px` }}>
                <Moment format="DD MMMM hh:mm a" date={pdSession.date} />
              </SessionItem>
              <SessionItem icon={"/watch.svg"} style={{ fontSize: `14px` }}>
                {pdSession.hours} hours
              </SessionItem>
              <SessionItem icon={"/user2.svg"} style={{ fontSize: `14px` }}>
                {pdSession.leader.name.split(" ")[0]}
              </SessionItem>
            </ul>
            {Date.parse(pdSession.date) >= now ? (
              session ? (
                <Link href={`/confirmation/${pdSession.slug}`} passHref>
                  <NavCTA
                    style={{
                      color: `var(--black)`,
                      fontSize: `12px`,
                      marginTop: `20px`,
                      placeSelf: `start start`,
                    }}>
                    REGISTER
                  </NavCTA>
                </Link>
              ) : (
                <NavCTA
                  style={{
                    color: `var(--black)`,
                    fontSize: `12px`,
                    marginTop: `20px`,
                    placeSelf: `start start`,
                  }}
                  onClick={signIn}>
                  REGISTER
                </NavCTA>
              )
            ) : (
              <NavCTA
                href={`${pdSession.videoLink}`}
                target="_blank"
                style={{
                  color: `var(--black)`,
                  fontSize: `12px`,
                  marginTop: `20px`,
                  placeSelf: `start start`,
                }}
                className={pdSession.videoLink == null ? `disabled` : null}>
                WATCH RECORDING
              </NavCTA>
            )}
          </SessionDeets>
        </div>
      </SessionHero>
      <PageWrapper>
        <h2 style={{ marginBottom: `0` }}>Similar sessions</h2>
        <p className="subtle">
          Here are some sessions similar to <strong>{pdSession.title}</strong>{" "}
          that may interest you:
        </p>
        <Gallery>
          {pdSessions &&
            pdSessions.map((pd) => <SessionCard key={pd.id} pd={pd} />)}
        </Gallery>
      </PageWrapper>
    </>
  );
};

export default Session;

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
          type
          videoLink
          leader {
            name
            email
          }
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

  const { pdSessions } = await graphcms.request(
    `
    query MyQuery($type: SessionType!) {
      pdSessions(where: {type: $type}) {
        title
        description
        slug
        date
        hours
        type
        videoLink
        leader {
          name
          email
        }
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
      type: pdSession.type,
    }
  );

  return {
    props: {
      pdSession,
      pdSessions,
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
