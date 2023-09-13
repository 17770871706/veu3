<template>
  <button id="qhms" @click="btn">切换背景模式</button><button @click="reload">刷新页面</button>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
  const html = document.querySelector('html')
  const btn = () => {
  const className = html.className
  console.log(className);
  html.className = className == "dark" ? '' : 'dark'
  }
const reload = ()=>{
  console.log(123);
  location.reload()
}

</script>

<style scoped>
button{
  padding: 5px 10px;
}
</style>
