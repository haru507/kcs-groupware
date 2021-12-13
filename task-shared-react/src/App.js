import React from 'react';
import { Switch, Route } from 'react-router';
import { PassForget } from "./signs/PassForget";
import SideTabs from './components/SideTabs';
import Auth from './Auth';
import { SignIn } from './signs/SignIn';
import { SignUp } from './signs/SignUp';
import Loading from './components/Loading';

export function App() {
  return (
    <div>
      <Loading>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/passforget" component={PassForget} />
          <Auth>
            <Route path="(/)?" component={SideTabs} />
          </Auth>
        </Switch>
      </Loading>
      
    </div>
  );
}