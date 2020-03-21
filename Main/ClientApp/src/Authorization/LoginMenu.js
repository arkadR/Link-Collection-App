import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return AnonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true }
      };
      return AuthenticatedView(userName, profilePath, logoutPath);
    }
  }
}

function AuthenticatedView(userName, profilePath, logoutPath) {
  return (
    <Fragment>
      <NavLink tag={Link} className="text-dark" to={profilePath}>
        Hello {userName}
      </NavLink>
      <NavLink tag={Link} className="text-dark" to={logoutPath}>
        Logout
      </NavLink>
    </Fragment>
  );
}

function AnonymousView(registerPath, loginPath) {
  return (
    <Fragment>
      <NavLink tag={Link} className="text-dark" to={registerPath}>
        Register
      </NavLink>
      <NavLink tag={Link} className="text-dark" to={loginPath}>
        Login
      </NavLink>
    </Fragment>
  );
}
