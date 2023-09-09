import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import ElementPlus from 'element-plus'
import i18n from './locales/i18n'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(ElementPlus)
app.use(i18n)
const that = app.mount('#app')

app.provide('$i18n', i18n);
app.provide('$that', that);