<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/sample">Sample</router-link>
      <template v-if="isAuthenticated">
        | <router-link to="/logout">Logout {{ userName }}</router-link>
      </template>
      <template v-if="!isAuthenticated">
        | <a v-on:click="onLoginClick()" href="#">Login</a>
      </template>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getUserInfo,
  isAuthenticated,
  oauthLogin,
  subscribeToAuthStateChanged,
} from "./services/auth";

@Component({
  components: {},
})
export default class AppRoot extends Vue {
  public userName = "";
  public isAuthenticated = false;

  public mounted() {
    subscribeToAuthStateChanged((x) => this.authStateChanged());
  }

  public onLoginClick() {
    console.log("62");
    oauthLogin();
  }

  private authStateChanged() {
    isAuthenticated().then(
      (authenticated) => (this.isAuthenticated = authenticated)
    );
    getUserInfo()
      .then((userInfo) => (this.userName = userInfo.name ? userInfo.name : ""))
      .catch((x) => {});
  }
}
</script>
