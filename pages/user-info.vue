<template>
  <div class="container">
    <div>
      <div>My name is: {{ userName }}</div>
      <div>
        Test response from <em>{{ testEndpoint }}</em> is (see below):
      </div>
      <div align="left">
        <pre>{{ testResponse }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
const TEST_ENDPOINT = "http://localhost:8000/access-token-payload-test";
import { validateAccess, oauthLoginCallback, oauthLogout, getUserInfo, getAccessToken,
  isAuthenticated,
  oauthLogin,
  subscribeToAuthStateChanged, } from "../assets/auth";

export default {
  data() {
    return {
      userName: "",
      testResponse: "",
      testEndpoint: TEST_ENDPOINT
    }
  },
  methods: {
  getFromTestEndpointAsString(token) {
      return fetch(TEST_ENDPOINT, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.text())
        .catch((err) => err);
    }
  },
  mounted() {
    getUserInfo()
      .then((userInfo) => (this.userName = userInfo.name ? userInfo.name : ""))
      .catch(() => {
        this.$router.go(-1);
      });

    getAccessToken()
      .then((token) => this.getFromTestEndpointAsString(token))
      .then((testResponse) => (this.testResponse = testResponse))
      .catch(console.error);
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
