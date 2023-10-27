import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthenticationPage from "../pages/Login";
import Content from "../pages/cus-pag";
import TaskPage from "../pages/page";

function Routers() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthenticationPage/>}></Route>
          <Route exact path="customers" element={<TaskPage/>}></Route>
          <Route exact path="page-content" element={<Content/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default Routers;