<!-- <template>
    <div>
        <Renderc :aaa="dataa" :bbb="'12312sss'" @handLer="emit1"></Renderc>
    </div>
</template>

<script setup>
//语法糖版本
import Renderc from '@/components/components/renderc.vue'
import {ref,setup} from 'vue'
import { setup } from 'xe-utils/ctor'
setup(){
    return
}
const  dataa =  ref(1231231)

const emit1 = (e)=>{
    dataa.value+=e;
    console.log(456);
}

</script>
 
<style lang = "less" scoped>
    
</style> -->
<!-- <template>
    <div>
    父组件aaa:{{ dataa }}
<Renderc ref="renderc" :aaa="dataa" :bbb="'12312sss'" @handLer="emit1"></Renderc>
<div>
    <button @click="callChildMethod">
        调用子组件方法的按钮
    </button>
</div>
    </div>
</template>

<script>
import { ref,onMounted } from 'vue';
import Renderc from '@/components/components/renderc.vue'
export default {
    components:{
        Renderc
    },
    setup (props,constext) {
        const dataa = ref(0)
        const emit1 = (e)=>{
            console.log(e);
            dataa.value+=e
            console.log(dataa.value);
        }
        const renderc = ref(null);
        // 创建子组件的 expose11 方法的引用
        const callChildMethod = () => {
        // 调用子组件的 expose11 方法
        console.log('点击父组件');
        renderc.value.expose11()
        };
        onMounted(()=>{
            console.log('mounted');
        renderc.value.expose11()
        })

        return {dataa,emit1,renderc,callChildMethod}
    }
}
</script>

<style lang="scss" scoped>

</style> -->
<template>
    <div>
    父组件aaa:{{ dataa }}
<Renderc ref="renderc" :aaa="dataa" :bbb="'12312sss'" @handLer="emit1"></Renderc>
<div>
    <button @click="callChildMethod">
        调用子组件方法的按钮
    </button>
</div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import Renderc from '@/components/components/renderc.vue'
        const dataa = ref(0)
        const emit1 = (e)=>{
            console.log(e);
            dataa.value+=e
            console.log(dataa.value);
        }
        const renderc = ref(null);
        // 创建子组件的 expose11 方法的引用
        const callChildMethod = () => {
        // 调用子组件的 expose11 方法
        console.log('点击父组件');
        renderc.value.expose22()
        };
        onMounted(()=>{
            console.log('mounted');
        renderc.value.expose22()
        })

</script>

<style lang="scss" scoped>

</style>