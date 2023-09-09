<template>
    <div>  
        <el-button mb-2 @click="toggle">{{language}}</el-button>
        {{ locale }}
        <br />
        <el-config-provider :locale="locale">
         <el-table mb-1 :data="[]" />
         <el-pagination :total="100" />
         <el-autocomplete
         v-model="state1"
         :fetch-suggestions="querySearch"
         clearable
         class="inline-input "
         placeholder="八月"
         @select="handleSelect"
         />
         <a-select
            ref="select"
            v-model:value="value1"
            style="width: 120px"
            >
            <a-select-option v-for="itme in option" :value="itme" :key="itme">{{itme}}</a-select-option>
            <!-- <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
          </a-select>
        </el-config-provider>
    </div>
</template>

<script setup>
import { computed, ref , reactive,onMounted} from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
//国际化
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}
// 输入框自动搜索
const state1 = ref('')
const restaurants = ref([])
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}
const handleSelect = (item) => {
  console.log(item)
}
onMounted(() => {
  restaurants.value = loadAll()
})
//下拉框数据
const value1 = ref('disabled');
const option = reactive(["jack","lucy","disabled","Yiminghe"]);
</script>
 
<style lang = "less" scoped>
*{
    padding: 0;
    margin: 0;
    list-style: none;
}

</style>