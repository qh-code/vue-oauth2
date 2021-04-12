<template>
  <div>
    oauth callback
  </div>
</template>

<script>
export default {
    mounted: function(){
    if(!this.$auth.loggedIn){
      this.$auth.loginWith('cognito');
      debugger;
		// this.$auth.setToken(this.$route.query.code);
    //   this.$auth.loginWith('cognito').then(() => {
    //   })
    //   this.$auth.mounted();
      

    
    }
    else {
      console.log("in 3");
      this.$router.push('/');
    }
  }
}
</script>

<style>
</style>