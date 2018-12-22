<template>
  <div id="app">
    <Navbar id="header" />
    <router-view id="main" />
    <Footer id="footer" />
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}

</script>

<style>
  html, body {
   margin:0;
   padding:0;
   height:100%;
  }

  #app{
    min-height: 100%;
    position: relative;
  }

  #footer{
    height: 30px;
    left: 0;
    right: 0;
    margin-bottom: 50px;
    position: absolute;
    bottom: 15px;
  }

  #main {
    height: 90%;
    padding-bottom: 100px;
  }

   a.router-link-exact-active {
    text-decoration: underline;
    color: #2BE760;
  }

  .DEBUG{
    border-style: dashed;
    border-color: red;
  }


</style>
