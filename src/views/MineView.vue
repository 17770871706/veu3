<template>
 <div>
      <button @click="displayComponentA">渲染组件A</button>
      <button @click="displayComponentB">渲染组件B</button>
      <button @click="renderComponentC">渲染组件C</button>
      <button @click="renderComponentD">渲染组件D</button>
      <button @click="renderComponentE">渲染组件E</button>
      <button @click="renderComponentF">渲染组件E</button>
      <button @click="renderComponentG">渲染组件E</button>
      <transition name="el-zoom-in-top">
      <keep-alive >
            <component :is="currentComponent" ></component>
      </keep-alive>
    </transition>
 </div>
</template>
<script setup>   
import {ref,markRaw } from 'vue'
import renderA from '@/components/renderA.vue'
import renderB from '../components/renderB.vue'
import renderC from '../components/renderC.vue'
import renderD from '../components/renderD.vue'
import renderE from '../components/renderE.vue'
import renderF from '../components/renderF.vue'
import renderG from '../components/renderG.vue'
const currentComponent = ref(null)  
const displayComponentA = () => {
  currentComponent.value = markRaw(renderA)
};
const displayComponentB = () => {
  currentComponent.value = markRaw(renderB)
};
const renderComponentC = () => {
  currentComponent.value = markRaw(renderC)
};
const renderComponentD = () => {
  currentComponent.value = markRaw(renderD)
};
const renderComponentE = () => {
  currentComponent.value = markRaw(renderE)
};
const renderComponentF = () => {
  currentComponent.value = markRaw(renderF)
};
const renderComponentG = () => {
  currentComponent.value = markRaw(renderG)
};

</script>
 
<style lang = "less" scoped>
</style>