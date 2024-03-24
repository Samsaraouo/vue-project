<template>
  <div id="app">
    <OpenLayersMap></OpenLayersMap>
  </div>
</template>
 
<script>
import OpenLayersMap from './components/OpenLayersMap.vue'
export default {
  components: { OpenLayersMap },
  name: 'App'
}
</script>
 
<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>