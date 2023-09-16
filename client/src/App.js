import "./App.css";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  Router,
} from "react-router-dom";
import AddProductPage from "./views/AddProductPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Redirect exact from="/" to="/add" />
              <Route path="/add" component={AddProductPage} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
