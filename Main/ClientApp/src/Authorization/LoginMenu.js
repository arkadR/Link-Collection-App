import React, { Component } from "react";
import authService from "./AuthorizeService";
import AuthenticatedView from "./AuthenticatedView";
import AnonymousView from "./AnonymousView";
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
      return (
        <AnonymousView registerPath={registerPath} loginPath={loginPath} />
      );
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true }
      };
      return (
        <AuthenticatedView
          userName={userName}
          profilePath={profilePath}
          logoutPath={logoutPath}
        />
      );
    }
  }
}
