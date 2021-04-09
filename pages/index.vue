<template>
  <div>
    <nuxt-link to="/learnMore" class="callToAction">Learn More</nuxt-link>
    <nuxt-link to="/progress" class="callToAction" no-prefetch>Follow Our Progress</nuxt-link>
    <h1 class="statement">The amazing new Widget is coming soon</h1>
    <p class="subtext">It's revolutionary it will change the world of <UserAgent />  widgets as we know it.</p>
    <p class="subtext">Be sure to sign-up to find out more about the next generation of widgets
    and follow our progress</p>
  </div>
</template>

<script>
import UserAgent from '../components/userAgent.vue'
export default {
  components: {
    UserAgent
  },
  mounted() {
    console.log(this.$auth);


    // busy: (...)
      // callOnError: ƒ callOnError(error, payload = {})
      // callOnRedirect: ƒ callOnRedirect(to, from)
      // check: ƒ check(...args)
    // constructor: class Auth
      // fetchUser: fetchUser(...args) { if (!this.getStrategy().fetchUser) { return Promise.resolve(); } return Promise.resolve(this.getStrategy().fetchUser(...args)).catch((error) => {…}
      // fetchUserOnce: ƒ fetchUserOnce(...args)
      // getState: ƒ getState(key)
      // getStrategy: ƒ getStrategy(throwException = true)
      // hasScope: ƒ hasScope(scope)
      // init: async init() { if (this.options.resetOnError) { this.onError((...args) => {…}
    // loggedIn: (...)
      // login: login(...args) { if (!this.getStrategy().login) { return Promise.resolve(); } return this.wrapLogin(this.getStrategy().login(...args)).catch((error) => {…}
      // loginWith: loginWith(name, ...args) { return this.setStrategy(name).then(() => {…}
      // logout: logout(...args) { if (!this.getStrategy().logout) { this.reset(); return Promise.resolve(); } return Promise.resolve(this.getStrategy().logout(...args)).catch((error) => {…}
      // mounted: mounted(...args) { if (!this.getStrategy().mounted) { return this.fetchUserOnce(); } return Promise.resolve(this.getStrategy().mounted(...args)).catch((error) => {…}
      // onError: ƒ onError(listener)
      // onRedirect: ƒ onRedirect(listener)
      // redirect: ƒ redirect(name, noRouter = false)
      // refreshTokens: refreshTokens() { if (!this.getStrategy().refreshController) { return Promise.resolve(); } return Promise.resolve(this.getStrategy().refreshController.handleRefresh()).catch((error) => {…}
      // registerStrategy: ƒ registerStrategy(name, strategy)
      // request: request(endpoint, defaults = {}) { const _endpoint = typeof defaults === "object" ? Object.assign({}, defaults, endpoint) : endpoint; if (!this.ctx.app.$axios) { console.error("[AUTH] add the @nuxtjs/axios module to nuxt.config file"); return; } return this.ctx.app.$axios.request(_endpoint).catch((error) => {…}
      // requestWith: ƒ requestWith(strategy, endpoint, defaults)
      // reset: ƒ reset(...args)
      // setStrategy: ƒ setStrategy(name)
      // setUser: ƒ setUser(user)
      // setUserToken: setUserToken(token, refreshToken) { if (!this.getStrategy().setUserToken) { this.getStrategy().token.set(token); return Promise.resolve(); } return Promise.resolve(this.getStrategy().setUserToken(token, refreshToken)).catch((error) => {…}
    // state: (...)
    // strategy: (...)
    // user: (...)
      // wrapLogin: wrapLogin(promise) { this.$storage.setState("busy", true); this.error = null; return Promise.resolve(promise).then((response) => {…}
      // get busy: ƒ busy()
      // get loggedIn: ƒ loggedIn()
      // get state: ƒ state()
      // get strategy: ƒ strategy()
      // get user: ƒ user()
    // __proto__: Object


  }
}
</script>

<style>
</style>