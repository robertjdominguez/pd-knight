import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  PageWrapper,
  DynamicWrapper,
  AutoDiv,
  Hero,
  Paired,
  HeroCTA,
  SecBtn,
  TripVert,
} from "../components/layout/Lib";
import CardGallery from "../components/sessions/CardGallery";
import graphcms from "../components/utilities/graphCMS";

export default function Home({ sessions }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PageWrapper>
          {/* Hero */}
          <Hero min={`400px`}>
            <div
              style={{
                marginLeft: `auto`,
                marginRight: `auto`,
              }}>
              <h1>
                One-Stop-Shop for <span>Professional Development</span>
              </h1>
              <div>
                <HeroCTA href="/">Get Started!</HeroCTA>
                <SecBtn style={{ marginLeft: `20px` }} href="/">
                  I need help...
                </SecBtn>
              </div>
            </div>
            <img
              src="learning-cert.svg"
              width="100%"
              // height="auto"
              alt="Learning Certification"
            />
          </Hero>
          {/* Triplet of info */}
          <DynamicWrapper>
            <AutoDiv min={`170px`}>
              <div>
                <img
                  src="tix.svg"
                  // width="100%"
                  // height="auto"
                  alt="Ticket"
                />
                <h2>Register</h2>
                <p>
                  Browse our list of upcoming sessions and register with just a
                  few clicks.{" "}
                </p>
              </div>
              <div>
                <img
                  src="calendar.svg"
                  // width="100%"
                  // height="auto"
                  alt="Ticket"
                />
                <h2>Organize</h2>
                <p>
                  Once registered, you'll get an automatic calendar invite to
                  keep you sane.{" "}
                </p>
              </div>
              <div>
                <img
                  src="track.svg"
                  // width="100%"
                  // height="auto"
                  alt="Ticket"
                />
                <h2>Track</h2>
                <p>
                  A simple-to-use dashboard keeps track of all your hours and
                  certificates.{" "}
                </p>
              </div>
            </AutoDiv>
          </DynamicWrapper>
          {/* Pairing with vertical triplet */}
          <Paired min={`400px`}>
            <img
              src="bg.svg"
              width="100%"
              height="auto"
              alt="Learning Certification"
            />
            <div>
              <TripVert>
                <img src="like.svg" alt="Thumbs up" />
                <div>
                  <h4>In-Demand</h4>
                  <p>
                    All sessions are built around <strong>you</strong>! The
                    focus of these events is on keeping you abreast of the most
                    up-to-date technology, pedagogy, and ideas in education.
                  </p>
                </div>
              </TripVert>
              <TripVert>
                <img src="laptop.svg" alt="Thumbs up" />
                <div>
                  <h4>Technology-Integrated</h4>
                  <p>
                    A key component of these sessions is the implicit role that
                    technology plays in reaching our students. It doesn't
                    replace what we do, it makes it easier.
                  </p>
                </div>
              </TripVert>
              <TripVert>
                <img src="profile.svg" alt="Thumbs up" />
                <div>
                  <h4>Teacher-Focused</h4>
                  <p>
                    No meetings that could have been emails; no forced
                    standards; no unobtainable goals. Our sessions are designed
                    to give you something to walk away with and use each and
                    every time.
                  </p>
                </div>
              </TripVert>
            </div>
          </Paired>
          {/* Gallery */}
          <CardGallery sessions={sessions} />
        </PageWrapper>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const sessions = await graphcms.request(
    ` query CardImageQuery {
        pdSessions {
          id
          title
          slug
          date
          image {
            fileName
            url
          }
        }
      }    
      `
  );

  return {
    props: {
      sessions,
    },
  };
}
