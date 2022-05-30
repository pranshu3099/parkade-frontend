import Adminlogin from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "./components/Dashboard";
import Cardetails from "./components/Cardetails";
import Grid from "./components/Grid";
import AuthProvider from "./contexts/Provider";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Redirect } from "react-router-dom";
import History from "./components/History";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Adminlogin />
            </Route>
          </Switch>
          <div className="content">
            <Switch>
              <ProtectedRoute path="/dashboard" component={AdminDashboard} />
              <ProtectedRoute path="/cardetails" component={Cardetails} />
              <ProtectedRoute path="/parkingspace" component={Grid} />
              <ProtectedRoute path="/history/:id" component={History} />
              <Redirect from="/" to="/login" />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
