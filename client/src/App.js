import "./App.css";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  Router,
} from "react-router-dom";
import AddProductPage from "./views/AddProductPage";
import ViewProductsPage from "./views/ViewProductsPage";
import AdminViewProductsPage from "./views/AdminViewProductsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="/products" />
              <Route path="/add" component={AddProductPage} />
              <Route path="/products" component={ViewProductsPage} />
              <Route path="/edit" component={AdminViewProductsPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
