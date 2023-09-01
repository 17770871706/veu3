<!-- <template>
    <div>
       123 
       {{ props.aaa }}
    </div>
    <div>
        <button @click="emit1">
            按钮
        </button>
    </div>
</template>

<script setup>
//语法糖父传子and子传父
// const props = defineProps(['aaa'])

  const props = defineProps({
        aaa:Number,
        bbb:String
    })
console.log(props.aaa,props.bbb);

let emigFun = defineEmits(["handLer"]);
 const emit1 = ()=>{
    console.log(123);
    emigFun('handLer',3)
 }
</script>
 
<style lang = "less" scoped>
    
</style> -->
<!-- <template>
    <div>
子组件传入的aaa:{{ aaa }}
<button @click="emit11">子组件按钮</button>
    </div>
</template>

<script>
import {ref,defineExpose} from 'vue'
export default {
    props: ["aaa",'bbb'],  //这样就传过来了
    setup (props,context) {
        console.log(props,context);
        console.log(props.aaa,props.bbb);
        const {attrs,emit,expose } = context
        const  expose11 =  ()=>{
            console.log('这个是暴露出去的事件expose11');
        }

        // expose([])

    

        const emit11 = ()=>{
            emit('handLer',12)
        }
        const reffn=( )=>{
             console.log('从父组件使用ref触发了组件的方法');
        }
        return {emit11,reffn,expose11}
    }
}
</script>

<style lang="scss" scoped>

</style> -->
<template>
    <div>
子组件传入的aaa:{{ aaa }}
<button @click="emit11">子组件按钮</button>
    </div>
</template>

<script setup>
// const props = defineProps(['aaa'])

const props = defineProps({
        aaa:Number,
        bbb:String
    })
   
 console.log(props.aaa,props.bbb);

   const  expose22 = ()=>{
            console.log('这个是暴露出去的事件expose22');
        }
   defineExpose({expose22})
   
</script>

<style lang="scss" scoped>

</style>