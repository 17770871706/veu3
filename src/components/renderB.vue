<template>
    <div>
        <div>ref、reactive、toRefs</div>
       <div>
        state.name:{{ state.name }},
        state.age:{{ state.age }},
        refs:{{ refs }},
        name:{{ name }}
       </div>
       <div>
          <button @click="fn">按钮</button>
        </div>
        <div>computed</div>
        <div>
            comput:{{ comput }}
            comput1:{{ comput1 }}
        </div>
        <div>
            <button @click="fn1">触发set方法的按钮</button>
            <button @click="fn2">watchEffect按钮</button>
        </div>
        <div class="ccc">绝对定位</div>
    </div>
</template>

<script setup>
import { reactive, ref ,toRefs,computed,watch,watchEffect,onMounted,nextTick,onUpdated,onUnmounted } from 'vue'; 
import { version } from 'vue'
console.log(version)
nextTick(() =>{
        console.log('这个是nexTick，执行时机在onMounted');
})
let obj = {
    name:'1',
    age:2
}
const state = reactive(obj)
console.log(state);

const refs = ref(1)

const {name,age} = toRefs(obj)
console.log(name,age);
const fn = ()=>{
      console.log('按钮触发');
      state.age++; 
      refs.value +=2;
    //   console.log(refs);
      name.value++
      console.log(obj.name===state.name,obj.name===name.value,state.age===age.value);
    }
    // computed 两种写法
   const comput = computed(()=>{
          return refs.value*2
    })
   const comput1 = computed({
        get(){
            console.log('进来的时候触发');
            return state.name*3
        },
        set(e){
             console.log('state.name被修改的时候触发',e);
             state.name*e
        }
    })
    const fn1 = ()=>{
        comput1.value=1;
        state.name++;
    }
    watch(comput1, (a, b) => {
      // a,b分别是更新前后的值
      console.log(a, b,'wacth');
    },{
        // 立即监听
        immediate: true,
        // 深度监听
        deep: true
    });

    watch([comput1,name],(a,b)=>{
        console.log(a,b);
    },{
        // 立即监听
        immediate: true,
        // 深度监听
        deep: true
    })

    let fn2a = ref(0);
    let fn2b = ref(1);
    // watch 在使用时候是需要手动指定要监听的数据，有时候太麻烦了
    // 可以使用watchEffect简化
    let fn2 = () => {
        fn2a.value += 1;
    };
    watchEffect(() => {
      console.log("触发123213",fn2a,fn2b);
      fn2b.value = fn2a.value * 2;
    });
    console.log(123);
    onMounted(()=>{
        console.log('这是mounted生命周期');
    })
    console.log(345);
    onUpdated(()=>{
        console.log('这个是onUpdataed');
    })
    onUnmounted(()=>{
        console.log('这个是onUnmounted');
    })
</script>
 
<style lang = "less" scoped>
.ccc{
 position: absolute;
 right: 0;
 background-color: #cfc;
 width: 100%;
 height: 100px;
}
</style>