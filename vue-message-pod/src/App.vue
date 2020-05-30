<template>
  <div id="vue-message-app">
    <p>Vue Micro frontend 1</p>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#vue-message-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 10px;
  background-color: #42b983;
  border: solid 1px #42b983;
  padding-bottom: 10px;
  border-radius: 8px;
}
</style>
