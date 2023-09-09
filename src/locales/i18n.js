import { createI18n } from 'vue-i18n'
// 引入vue-i18n组件
import ch from './zh-cn/zh-cn'
import en from './en/en'

const i18n = createI18n({
    // legacy（布尔值，默认为 false）：指定是否使用传统的 Vue 2.x 风格的编译器。当为 false 时，使用 Vue 3.x 的编译器。
    legacy: false,
    // locale（字符串，默认为 'en'）：设置默认的语言环境。在这个例子中，将语言环境设置为英文。
    locale: 'en',
    // fallbackLocale（字符串，默认为 'en'）：指定默认的回退语言环境。如果当前语言环境没有指定的翻译内容，会回退到指定的回退语言环境。在这个例子中，如果没有中文的翻译内容，会回退到英文环境。
    fallbackLocale: 'en',
    // globalInjection（布尔值，默认为 true）：指示是否将 $t 方法注入到全局，在任何地方都可以使用 $t 进行翻译。如果不设置为 true，则需要在每个组件中显式导入并使用 $t 方法，直接使用{{$t(`message.name`)}}这种使用会报错。
    globalInjection: true,
    // messages（对象）：配置语言环境和对应的翻译消息。每个语言环境都对应一个键值对，其中键是语言环境的标识符，值是包含翻译消息的对象。
    messages: {
        // 配置语言
        'zh-cn': ch,
        'en': en
    },

})

export default i18n


//使用方法
//1.下载vue-i18n插件
//2.在src目录下创建locales文件夹(将该文件导入)
//3.在mian.js里面注册 vue.use(i18n)
//4.页面上直接使用{{$t(`message.xxx`)}}
//5.切换按钮的方法，locale属性绑定的是语言，修改该属性达到切换的作用。
//@click="$i18n.locale = $i18n.locale === 'zh-cn'?'en':'zh-cn';"
