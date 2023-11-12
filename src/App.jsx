import UserForm from "./components/Users/UserForm";
import UserDialog from "./components/Users/addUserDialog";
import UserProfile from "./components/Users/userProfile";
import { ThemeProvider } from "./components/theme-provider";
import UserPage from "./pages/Users";
import UsersPage from "./pages/Users";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserPage/>
      <UserProfile id={'654e4a4b0cc5501d9e33e214'}/>
      {/* <UserForm/> */}
    </ThemeProvider>
  );
}

export default App;
