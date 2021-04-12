<template>
  <div>
    <h1 class="statement">User data</h1>
    <p></p>
    <p class="bodytext">
      {{ testResponse }}
      
    </p>
    <nuxt-link to="/" class="callToAction">Go back</nuxt-link>
  </div>
</template>

<script>
const axios = require('axios'); 
const TEST_ENDPOINT = "http://localhost:8000/access-token-payload-test";

export default {
  middleware: 'auth',
  data() {
    return {
        testResponse: {}
      }
  },
  // asyncData ({ params }) {
  //   return axios.get('http://localhost:3000/status.json')
  //   .then((res) => {
  //     return {
  //       statusUpdate: res.data.statusUpdate,
  //       statusDate: res.data.statusDate
  //     }
  //   })
  // },
  mounted() {
    const token = this.$auth.strategy.token.get();
    this.getFromTestEndpointAsString(token).then((data) => {
      this.testResponse = data;
    });
  },
  methods: {
    getFromTestEndpointAsString(token) {
      const options = {
        headers: {'Authorization': this.$auth.strategy.token.get()}
      }

      return this.$axios.get('http://localhost:8000/access-token-payload-test', options);
    }
  }
}
</script>

<style>
</style>