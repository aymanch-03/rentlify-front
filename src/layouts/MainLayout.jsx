import Navbar from "../components/LandingPage/Navbar";

/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <div className=" h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
