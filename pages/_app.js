import Layout from "@/components/layout/Layout";
import "../styles/globals.css";

// Component contains whatever is displayed on screen, so we can wrap it with other components like Layout
// if we want to display them on every screen

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
