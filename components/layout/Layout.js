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
        <meta charset="UTF-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="PD Knight is an internal professional development service of The Altamont School in Birmingham Alabama. An externally facing blog and newsletter is to anyone who wants to learn from us!"
        />
        <meta
          name="keywords"
          content="Altamont, School, Remote Learning, Hybrid Learning, Birmingham, Birmingham, Alabama, Teacher Development, Professional Development"
        />
      </Head>
      <Nav />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
