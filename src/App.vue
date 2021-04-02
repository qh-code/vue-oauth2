<template>
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
  <router-view/>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import {
  getUserInfo,
  isAuthenticated,
  oauthLogin,
  subscribeToAuthStateChanged,
} from "./services/auth";

export default class App extends Vue {
  public userName = "";
  public isAuthenticated = false;

  public mounted() {
    subscribeToAuthStateChanged((x) => this.authStateChanged());
  }

  public onLoginClick():void {
    oauthLogin();
  }

  private authStateChanged() {
    isAuthenticated().then(
      (authenticated) => (this.isAuthenticated = authenticated)
    );
    getUserInfo()
      .then((userInfo) => (this.userName = userInfo.name ? userInfo.name : ""))
      .catch((x) => {
        console.error(x);
      });
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
