import Layout from "./layouts/Layout";
import OrderPage from "./pages/Order";
import UsersPage from "./pages/Users";
import CustomerPage from "./pages/page";

function App() {
  return (
    <>
      <Layout>
        <OrderPage />
        <UsersPage />
        <CustomerPage />
      </Layout>
    </>
  );
}

export default App;
