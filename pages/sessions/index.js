import Head from "next/head";
import CardGallery from "../../components/sessions/CardGallery";
import PastGallery from "../../components/sessions/PastGallery";
import graphcms from "../../components/utilities/graphCMS";
import { PageWrapper, ContentHero, HeroCTA } from "../../components/layout/Lib";

const index = ({ sessions }) => {
  console.log(sessions);
  return (
    <>
      <Head>
        <title>PD Knight - Sessions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentHero bg={"/sessionbg.png"}>
        <div />
        <div>
          <h1>
            PD for the <span>Twenty-First Century</span>
          </h1>
          <p>
            Our professional development sessions aim to support and amplify the
            great things already happening in Altamont classrooms. We're all
            preparing our students for the 21st-Century; our job is to help you
            prepare them.
          </p>
          <HeroCTA href="/">Browse Sessions</HeroCTA>
        </div>
      </ContentHero>
      <PageWrapper>
        {/* Gallery */}
        <CardGallery sessions={sessions} />
        <PastGallery id="past" sessions={sessions} />
      </PageWrapper>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const sessions = await graphcms.request(
    ` query CardImageQuery {
        pdSessions {
          id
          title
          date
          slug
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
