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

export default function Home() {
  const [session, loading] = useSession();

  session && console.log(session);

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
            <div>
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
              // width="100%"
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                  enim id consectetur nullam dolor, dignissim morbi.{" "}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                  enim id consectetur nullam dolor, dignissim morbi.{" "}
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                  enim id consectetur nullam dolor, dignissim morbi.{" "}
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi repellat laboriosam consequuntur assumenda
                    perspiciatis nihil cumque, autem animi fugit quidem.
                  </p>
                </div>
              </TripVert>
              <TripVert>
                <img src="laptop.svg" alt="Thumbs up" />
                <div>
                  <h4>Technology-Integrated</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi repellat laboriosam consequuntur assumenda
                    perspiciatis nihil cumque, autem animi fugit quidem.
                  </p>
                </div>
              </TripVert>
              <TripVert>
                <img src="profile.svg" alt="Thumbs up" />
                <div>
                  <h4>Teacher-Focused</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi repellat laboriosam consequuntur assumenda
                    perspiciatis nihil cumque, autem animi fugit quidem.
                  </p>
                </div>
              </TripVert>
            </div>
          </Paired>
          {/* Gallery */}
        </PageWrapper>
      </main>
    </div>
  );
}
