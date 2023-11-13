import { ThemeProvider } from "./components/theme-provider";
import UserPage from "./pages/Users";
import UserProfile from "./components/Users/userProfile"
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UserPage/>
      {/* <UserProfile id={'654cb2f00fdfdbdffc30d6c2'}/> */}
      {/* <UserForm/> */}
    </ThemeProvider>
  );
}

export default App;
