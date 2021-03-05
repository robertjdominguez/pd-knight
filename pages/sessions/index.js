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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
            dolorum voluptatem vitae! Ipsa fugit a quaerat quisquam?
            Repudiandae, at ducimus culpa tempore a consequatur repellat unde
            eum facilis blanditiis nihil!
          </p>
          <HeroCTA href="/">Browse Sessions</HeroCTA>
        </div>
      </ContentHero>
      <PageWrapper></PageWrapper>
    </>
  );
};

export default index;
