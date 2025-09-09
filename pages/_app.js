import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";



export default function App({ Component, pageProps }) {



  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
