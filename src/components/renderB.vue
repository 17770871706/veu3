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

    </div>
</template>

<script setup>
import { reactive, ref ,toRefs,computed } from 'vue'; 
console.log(this);
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
      console.log(refs);
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
             console.log('修改的时候触发',e);
        }
 })

</script>
 
<style lang = "less" scoped>
</style>