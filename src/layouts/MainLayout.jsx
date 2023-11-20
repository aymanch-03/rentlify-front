import Footer from "../components/LandingPage/Footer";
import Navbar from "../components/LandingPage/Navbar";

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
