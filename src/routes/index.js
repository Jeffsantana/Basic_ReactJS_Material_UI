import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Developing,
  User,
  ListAllUsers,
  ListPendingUsers,
  ListVerifiedUsers
} from "../pages";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Developing} />
      <Route path="/user" component={User} />
      <Route path="/all-users" component={ListAllUsers} />
      <Route path="/pending-users" component={ListPendingUsers} />
      <Route path="/verified-users" component={ListVerifiedUsers} />

      <Route component={Developing} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
