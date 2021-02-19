import Navbar from "../components/Navbar";
import "../styles/globals.scss";
import "../styles/Home.scss";
import "../styles/Product.scss";
import "../styles/ItemDetail.scss";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
