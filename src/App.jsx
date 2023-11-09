import UserDialog from "./components/Users/addUserDialog";
import UserProfile from "./components/Users/userProfile";
import { ThemeProvider } from "./components/theme-provider";
import UserPage from "./pages/Users";
import UsersPage from "./pages/Users";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <UserPage/> */}
      <UserProfile id={'654cb2f00fdfdbdffc30d6c2'}/>
    </ThemeProvider>
  );
}

export default App;
