<template>
  <div> 
    <div>
      <a-select
      ref="select"
      v-model:value="value1"
      style="width: 120px"
      @change="handleChange"
      > 
        <a-select-option value="en">{{$t(`message.login.yiy`) }}</a-select-option>
        <a-select-option value="zh-cn">{{$t(`message.login.zhen`)}}</a-select-option>
        <a-select-option value="ja">{{$t(`message.login.ri`)}}</a-select-option>
      </a-select>
    </div>
    <transition name="el-fade-in-linear">
    <div>
      {{$t(`message.account`) }}
      <br>
      {{$t(`message.login.passRequired`) }}
      <br>
      {{$t(`message.login.userRequired`) }}
      <br>
      {{$t(`message.login.tips`) }}
      <br>
      {{$t(`message.login.btn`) }}
    </div>
    </transition>
    <div>
      <a-button type="primary"        @click="showModal">{{$t(`message.login.model`)}}</a-button>
    </div>
    <a-modal 
    v-model:open="open" 
    :title="$t(`message.login.model`)" 
    :cancelText="$t(`message.login.qx`)"
    :okText="$t(`message.login.qr`)"
    @ok="handleOk">
      <p>{{$t(`message.login.btn`) }}</p>
    </a-modal>
  </div>
</template>

<script>
import {ref,inject,onMounted} from 'vue'
export default {
setup(props,columns){
// app.provide('$i18n', i18n); // 提供 $i18n 对象
//  const i18n = inject('$i18n'); // 使用 inject 获取 $i18n 对象
//国际化数据方法
const value1 = ref('en')  
const i18n = inject('$i18n');
const handleChange=(e)=>{
  console.log(e)
  i18n.global.locale.value = e
  sessionStorage.setItem('locale',i18n.global.locale.value)
}
onMounted(()=>{
  let locale = sessionStorage.getItem('locale')
  console.log(locale,'111111locale');
  if (locale) {
    value1.value=locale
    i18n.global.locale.value = locale
  }
})
//模态框数据
const open = ref(false);
const showModal = () => {
  open.value = true;
};
const handleOk = (e) => {
  console.log(e);
  open.value = false;
};
return {handleChange,value1,open,showModal,handleOk}
}
}
</script>
 
<style lang = "less" scoped>
  
</style>