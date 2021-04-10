import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"} component={Dashboard} exact />
        <Route path={"/users"} component={Users} />
        <Route path={"/register"} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
