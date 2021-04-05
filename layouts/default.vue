<template>
  <div>
    <nav class="main-menu-nav">
      <ul style="list-style-type: none;">
        <li>
          <NuxtLink class="button--green" to="/">Home</NuxtLink>
          <!-- <NuxtLink class="button--green" to="/oauth-callback">Oauth callback</NuxtLink> -->
          <NuxtLink class="button--green" to="/user-info" v-if="isAuthenticated">User info</NuxtLink>
          <a class="button--green" v-on:click="onLoginClick()" v-if="!isAuthenticated">Login</a>
          <a class="button--green" v-on:click="onLogoutClick()" v-if="isAuthenticated">Log out {{ userName }}</a>
        </li>
      </ul>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
import { validateAccess, oauthLoginCallback, oauthLogout, getUserInfo,
  isAuthenticated,
  oauthLogin,
  subscribeToAuthStateChanged, } from "../assets/auth";

export default {
  data() {
    return { 
      userName: "",
      isAuthenticated: false
    }
  },
  methods: {
    onLoginClick: () => {
      oauthLogin();
    },
    onLogoutClick: () => {
      oauthLogout();
    },
    authStateChanged() {
      isAuthenticated().then(
        (authenticated) => (this.isAuthenticated = authenticated)
      );
      
      getUserInfo()
        .then((userInfo) => (this.userName = userInfo.name ? userInfo.name : ""))
        .catch((x) => {
          console.error(x);
        });
    }
  },
  mounted() {
    isAuthenticated().then((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    }) 
    subscribeToAuthStateChanged((x) => this.authStateChanged());
  }
}
</script>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.main-menu-nav {
  padding: 30px 10px;
}

/* todo: move to module */

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
