import Head from "next/head";
import { PageWrapper, ContentHero, HeroCTA } from "../../components/layout/Lib";

const index = () => {
  return (
    <>
      <Head>
        <title>PD Knight - Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentHero bg={"/blogbg.png"}>
        <div />
        <div>
          <h1>
            Writing to <span>Support Teachers</span>
          </h1>
          <p>
            We believe education should be a transparent endeavor. In that vein,
            you can check out our blog to see the curtain pulled back and watch
            some of the best teachers in the area learn in public. Want to get
            updated on a regular basis? Sign up for our newsletter below!
          </p>
          <HeroCTA href="/">Browse Posts</HeroCTA>
        </div>
      </ContentHero>
      <PageWrapper></PageWrapper>
    </>
  );
};

export default index;
