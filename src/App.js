import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Main"} className="navbar-brand">
            Main Page
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Main"} className="nav-link">
                Main Page
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/AddClient"} className="nav-link">
                Add Client
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Main"]} component={Main} />
            <Route exact path="/AddClient" component={AddClient} />
            <Route path="/Clients/:id" component={Client} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
