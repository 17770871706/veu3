import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import ElementPlus from 'element-plus'
import i18n from './locales/i18n'
import print from 'vue3-print-nb'
// import amapPromise from './locales/amapPromise'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(ElementPlus)
app.use(i18n)    //国际化
app.use(print)   //打印插件

// app.config.globalProperties.$amapPromise = amapPromise;

const that = app.mount('#app')

app.provide('$i18n', i18n);
app.provide('$that', that);


// // 2. 自定义指令
// directives: {
//     print   
// }
