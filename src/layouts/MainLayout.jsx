/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
  return (
    <>
      <div>This is the main layout</div>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
