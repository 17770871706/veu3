<template>
  <div>
      <RouterLink to="/home" >about按钮</RouterLink>
          <button @click="fn">{{ count }}</button>
          <div>{{ rea.age }}</div>
          <div>{{ plusOne }}</div>
  </div>
</template>


<script setup>
import { RouterLink } from 'vue-router'
import {ref,reactive,computed,onMounted,onUpdated,onUnmounted} from 'vue'
console.log('这个就是在setup里面,页面一进来就最快执行');
const count = ref(null)   //这个是响应式的

count.value = 123    //这个里类似于给初始值

const rea = reactive({
   name:123,
   age:13
})

function fn(){
 console.log(123);
 rea.age++;
 console.log(rea);
}

const plusOne = computed(() => count.value + 1)



onMounted(()=>{
  console.log('这个是onMounted生命周期函数');
})

onUpdated(()=>{
   console.log('响应式数据更新之后就会触发');
})

onUnmounted(()=>{
  console.log('路由切换，组件被销毁的时候触发');
})
</script>

<style scoped>

</style>
