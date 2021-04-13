<template>
  <div>
    <h1 class="statement">Register account</h1>
    <p></p>
    <form @submit="register">
      <input type="text" v-model="username" placeholder="Enter username">
      <input type="email" v-model="email" placeholder="Enter email">
      <input type="password" v-model="password" placeholder="Enter password">
      <p> {{ status }} </p>
      <button class="callToAction" type="submit">Register</button>
      <nuxt-link to="/" class="callToAction">Go back</nuxt-link>
    </form>
    
    
  </div>
</template>

<script>
const axios = require('axios');
require('cross-fetch/polyfill');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

export default {
  data() {
    return {
      password: "",
      username: "",
      email: "",
      status: ""
    }
  },
  mounted() {
    
  },
  methods: {
    register(event) {
      event.preventDefault();
      debugger;
      var poolData = {
        UserPoolId: 'us-east-2_CEDW1OT68', // Your user pool id here
        ClientId: '6lt9cqgtupflbjc868d0i61ucv', // Your client id here
      };
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      var attributeList = [];

      var dataEmail = {
        Name: 'email',
        Value: this.email,
      };

      // var dataPhoneNumber = {
      //   Name: 'phone_number',
      //   Value: '+48...',
      // };
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
      // var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
      //   dataPhoneNumber
      // );

      attributeList.push(attributeEmail);
      // attributeList.push(attributePhoneNumber);

      userPool.signUp(this.username, this.password, attributeList, null, (
        err,
        result
      ) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        this.status = 'user name is ' + cognitoUser.getUsername();
      });
    }
  }
}
</script>

<style scoped>
input {
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
}
button {
  line-height: 0;
    margin: 0;
    padding: 0;
    height: 28px;
    margin-right: 10px;
}
</style>