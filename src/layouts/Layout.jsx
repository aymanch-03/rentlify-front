/* eslint-disable react/prop-types */
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
