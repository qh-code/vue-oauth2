<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        oauth2-Nuxt
      </h1>

<!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/sample">Sample</router-link>
      <template v-if="isAuthenticated">
        | <router-link to="/logout">Logout {{ userName }}</router-link>
      </template>
      <template v-if="!isAuthenticated">
        | <a v-on:click="onLoginClick()" href="#">Login</a>
      </template>
    </div> -->

      <!-- <div class="links">
        <NuxtLink class="button--green" to="/">Home</NuxtLink>
        <NuxtLink class="button--green" to="/user-info" v-if="isLoggedIn">User info</NuxtLink>
        <a class="button--green" v-on:click="onLoginClick()" v-if="!isLoggedIn">Login</a>
        <a class="button--green" v-on:click="onLogoutClick()" v-if="isLoggedIn">Log out</a>
        
      </div> -->


      <NuxtChild  />
    </div>
  </div>
</template>

<script>
import { validateAccess, oauthLoginCallback, oauthLogout, getUserInfo,
  isAuthenticated,
  oauthLogin,
  subscribeToAuthStateChanged, } from "../assets/auth";
export default {
  // middleware: 'authenticated',
  data() {
    return { isLoggedIn: false}
  }
}
</script>

<style>
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
