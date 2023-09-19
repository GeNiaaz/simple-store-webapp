import "./App.css";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  Router,
} from "react-router-dom";
import ViewProductsPage from "./views/ViewProductsPage";
import AdminViewProductsPage from "./views/AdminViewProductsPage";
import LoginPage from "./views/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="/products" />
              <Route path="/products" component={ViewProductsPage} />
              <PrivateRoute path="/edit" component={AdminViewProductsPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
