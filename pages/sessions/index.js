import { PageWrapper, ContentHero, HeroCTA } from "../../components/layout/Lib";

const index = () => {
  return (
    <>
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
      <PageWrapper></PageWrapper>
    </>
  );
};

export default index;
