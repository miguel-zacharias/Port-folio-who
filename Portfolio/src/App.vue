<script setup>
import Portfolio from './Portfolio.vue'
</script>

<template>
  <Portfolio />
</template>

<style>
/* Reset global para remover margens e paddings padrões */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
