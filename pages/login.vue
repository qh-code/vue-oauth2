<template>
  <div>
    Redirecting you to Okta to login
  </div>
</template>

<script>
export default {
  mounted: function(){
    console.log("in 1");
    if(!this.$auth.loggedIn){
      console.log("in 2");
      this.$auth.loginWith('cognito').then(() => {
console.log("in 4");
      })
      // this.$auth.mounted();
      // console.log(this.$auth);
      // console.log(this.$auth.loggedIn);

    
    }
    else {
      console.log("in 3");
      this.$router.push('/')
      
    }
  }
}
</script>

<style>
</style>