<template>
  <div> 
    <div>
      <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'zh-cn'?'en':'zh-cn';">切换语言</el-button>  
    </div>
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
  </div>
</template>

<script  setup>
// import {ref} from 'vue'
// import { useI18n } from 'vue-i18n'
// const { t } = useI18n()
//这个是用来验证的， t是为了给报错的提示对应的文字
// const validateUsername = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error(t('message.login.userRequired')))
//   } else {
//     callback()
//   }
// }

  
</script>
 
<style lang = "less" scoped>
  
</style>