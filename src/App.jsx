import UserDialog from "./components/Users/addUserDialog";
import UserProfile from "./components/Users/userProfile";
import { ThemeProvider } from "./components/theme-provider";

import UsersPage from "./pages/Users";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserProfile id={'6544b833bd878d4ed4bdebda'}/>
    </ThemeProvider>
  );
}

export default App;
