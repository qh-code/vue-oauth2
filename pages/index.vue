<template>
  <div>
    <nuxt-link to="/learnMore" class="callToAction">Learn More</nuxt-link>
    <nuxt-link to="/user-info" class="callToAction" v-if="$auth.loggedIn" no-prefetch>User info</nuxt-link>
    <nuxt-link to="/sign-in" class="callToAction" v-if="!$auth.loggedIn" no-prefetch>Log in</nuxt-link>
    <a v-on:click="logout();" class="callToAction" v-if="$auth.loggedIn">Sign out {{ $auth.$state.user.username }}</a>
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
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
}
</script>
