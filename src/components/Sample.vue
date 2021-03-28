<template>
  <div>
    <div>My name is: {{ userName }}</div>
    <div>
      Test response from <em>{{ testEndpoint }}</em> is (see below):
    </div>
    <div align="left">
      <pre>{{ testResponse }}</pre>
    </div>
  </div>
</template>


<script lang="ts">
import { getAccessToken, getUserInfo, UserInfo } from "@/services/auth";
import { Component, Vue } from "vue-property-decorator";

//const TEST_ENDPOINT = "http://localhost:8000/age-units";
const TEST_ENDPOINT = "http://localhost:8000/access-token-payload-test";

@Component({
  components: {},
})
export default class Home extends Vue {
  public userName: string = "";
  public testResponse: string = "";
  public testEndpoint = TEST_ENDPOINT;

  public mounted() {
    getUserInfo()
      .then((userInfo) => (this.userName = userInfo.name ? userInfo.name : ""))
      .catch(console.error);

    getAccessToken()
      .then((token) => this.getFromTestEndpointAsString(token))
      .then((testResponse) => (this.testResponse = testResponse))
      .catch(console.error);
  }

  private async getFromTestEndpointAsString(token: string): Promise<string> {
    return fetch(TEST_ENDPOINT, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((response) => JSON.stringify(response, null, 4))
      .catch((err) => err);
  }
}
</script>


