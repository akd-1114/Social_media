import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { Provider } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar";
import home from "./containers/home";
import login from "./containers/login";
import signup from "./containers/signup";
import themeFile from "./utils/theme";
import store from "./redux/stores";
import AuthRoute from "./utils/AuthRoute";
import user from "./containers/user";

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/users/login" component={login} />
              <AuthRoute exact path="/users/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
