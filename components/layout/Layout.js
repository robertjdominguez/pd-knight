import Head from "next/head";
import { useEffect } from "react";
import Nav from "./Nav";
// import Footer from "./Footer";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { initGA, logPageView } from "../../utils/analytics";

// TODO: When the time comes, add stripe promise here

export default function Layout({ children }) {
  //   useEffect(() => {
  //     if (!window.GA_INITIALIZED) {
  //       initGA();
  //       window.GA_INITIALIZED = true;
  //     }
  //     logPageView();
  //   }, []);

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;400;600;900&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/8b2181122f.js"
          crossOrigin="anonymous"></script>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Summer at Altamont is the best choice in Birmingham for summer enrichment. We offer remote classes and have everything from athletic camps to high school credit courses."
        />
        <meta
          name="keywords"
          content="Summer, Camp, Altamont, Summer School, Remote Learning, Hybrid Learning, Day Camp, School, Birmingham, Birmingham summer camp"
        />
      </Head>
      <Nav />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
