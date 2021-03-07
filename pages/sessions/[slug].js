import graphcms from "../../components/utilities/graphCMS";
import Moment from "react-moment";
import {
  PageWrapper,
  SessionHero,
  SessionDeets,
  SessionItem,
  NavCTA,
} from "../../components/layout/Lib";

const Session = ({ pdSession }) => {
  return (
    <>
      <SessionHero bg={pdSession.baseImage.url}>
        <div>
          <img src={"/springworkshop.svg"} width="300px" height="auto" />
          <h2>{pdSession.title}</h2>
          <p>{pdSession.description}</p>
          <SessionDeets>
            <ul>
              <SessionItem icon={"/calendar2.svg"} style={{ fontSize: `18px` }}>
                <Moment format="DD MMMM HH:MM a" date={pdSession.date} />
              </SessionItem>
              <SessionItem icon={"/watch.svg"} style={{ fontSize: `14px` }}>
                {pdSession.hours} hours
              </SessionItem>
              <SessionItem icon={"/user2.svg"} style={{ fontSize: `14px` }}>
                {pdSession.leader.name.split(" ")[0]}
              </SessionItem>
            </ul>
            <NavCTA
              style={{
                fontSize: `12px`,
                marginTop: `20px`,
                placeSelf: `start start`,
              }}>
              REGISTER
            </NavCTA>
          </SessionDeets>
        </div>
      </SessionHero>
      <PageWrapper>
        <h2>Similar sessions...</h2>
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
