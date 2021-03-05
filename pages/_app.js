import "../components/layout/style.css";
import { Provider } from "next-auth/client";
import Layout from "../components/layout/Layout";
// config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
