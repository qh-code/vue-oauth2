import { isAuthenticated, oauthLoginCallback } from "./auth";

export default function ({ store, redirect, route }) {
    if (!isAuthenticated()) {
      return redirect('/');
    }

    if (route.name == "oauth-callback") {
      // console.log(route);
      // console.log(route.params);
      // console.log(route.query);
      console.log(route.query.code);
      console.log(route.query.state);
      console.log(route.query.session_state);

      if (route.query.code) {
        console.log("in");
        oauthLoginCallback();
      }
      
      // console.log(route.query);
    }
  }