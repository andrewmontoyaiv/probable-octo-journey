<template lang="html">
  <div class="navbar">
    <nav class="nav-extended darken-2">
      <div class="nav-logo">
        <router-link :to="{ name: 'Index' }">
          <a href="#"></a>
          <img class="logo" src="@/assets/S-PLD_logo.png">
        </router-link>
      </div>
      <div class="nav-content valign-wrapper">
        <div class="center-block">
          <router-link :to="{ name: 'Index' }">
            Community Playlists
          </router-link>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{

    }
  }
}
</script>

<style lang="css">
.navbar nav{
  height: 100px;
  padding: 0 20px;
  background-color: #0F121D;
}

.navbar .nav-logo .logo{
  margin-top: 10px;
  width:200px; /* you can use % */
  height: auto;
}

.navbar .nav-content {
  font-family: 'Revalia', regular;
  margin-top: -20px;
}



</style>
