import graphcms from "../../components/utilities/graphCMS";
import Moment from "react-moment";
import {
  PageWrapper,
  SessionHero,
  SessionDeets,
  SessionList,
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
            <SessionList>
              <div>
                <img src="/calendar2.svg" alt="Calendar icon" />
                <p style={{ fontSize: `18px` }}>
                  <Moment format="DD MMMM HH:MM a" date={pdSession.date} />
                </p>
              </div>
              <div>
                <img src="/user2.svg" alt="User icon" />
                <p>{pdSession.hours}</p>
              </div>
              <div>
                <img src="/user2.svg" alt="User icon" />
                <p>{pdSession.leader.name}</p>
              </div>
            </SessionList>
            <NavCTA style={{ fontSize: `12px` }}>REGISTER</NavCTA>
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
