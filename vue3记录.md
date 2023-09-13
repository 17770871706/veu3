# 常用api

### ref、reactive、toRefs


ref 定义响应式的数据【数字，字符串，布尔值---修改时需要.value

reactive 定义响应式的【对象和数组】---修改的时候直接.  或者使用下标

toRefs方法解构出来的对象，是一个 ref 响应式变量，使用时直接.value可以拿到对象的值,例如：

```js
const refs = ref(1)

let obj = {
    name:'1',
    age:2
}
const state = reactive(obj)
console.log(state);


const {name,age} = toRefs(obj)
// 将 `props` 转为一个其中全是 ref 的对象，然后解构
const { title } = toRefs(props)
// `title` 是一个追踪着 `props.title` 的 ref
console.log(title.value)
// 或者，将 `props` 的单个属性转为一个 ref
const title = toRef(props, 'title')

//这个name,age实际上就是obj的name,age。指针指向是一样的。

const fn = ()=>{
      console.log('按钮触发');
      state.age++; 
      refs.value +=2;
      console.log(refs);
      name.value++
    //===可以判断指针是否一样的问题
    console.log(obj.name===name.value) 						
    console.log(obj.name===state.name)}

# 不常用api

`markRaw` 辅助函数，被标记的对象不会具备响应式的效果

` getCurrentInstance()` 函数来获取当前组件实例的引用

在 `setup()` 函数中，通过调用 `getCurrentInstance()` 获取当前组件的实例对象，并将其赋值给 `instance` 变量，

在 `setup()` 函数中，通过调用 `getCurrentInstance()` 获取当前组件的实例对象，并将其赋值给 `instance` 变量在 `setup()` 函数中

```js
// 使用 instance.proxy 访问属性
// 使用 instance.ctx 访问上下文
```

computed两种写法
```js
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
```
computed计算属性的修改方法set没搞清楚，单独使用和vue2一般，暂时没出来

watch三种写法
```js
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

    watch(
        () => state.count, // 要监听的变量
        (newValue, oldValue) => {
            console.log(newValue, oldValue, 'watch');      },
        {
            immediate: true,
        }
    );
    watchEffect(() => {
      console.log("触发123213");
      fn2b.value = fn2a.value * 2;
    });

```
watch是以方法的形式调用的，三个参数分别是监听的值，回调处理方法，和立即监听和深度监听
第一种：接收一个变量为参数，后面的回调函数是变量更新时触发的，再加上深度监听
第二种：接收一个数组，可以同时监听多个数据，第二个参数的回调（参数为前后新旧值组成的数组，）例：      console.log(a,b); a = [1,2]   b=[4,3] ，
旧值4=新值1   &&    旧值3=新值2   
第三种：实际要求的第一个参数要求是一个get方法，所以用返回值直接ruter出去,
--第四种：简化版wacth,它会立即执行传入的回调函数，并且在回调函数中进行数据访问的跟踪，在回调函数执行期间，Vue 会跟踪所有被访问的响应式数据，把它们与当前的 watchEffect 实例关联起来(监听的对象)

生命周期
```js
onMounted(()=>{
    //执行时机在setup后面
    console.log('这是mounted生命周期');
})

onUpdated(()=>{
    console.log('这个是onUpdataed');
})

onUnmounted(()=>{
    //这个可以清除一些定时器...
    console.log('这个是onUnmounted');
})

nextTick(() =>{
        console.log('这个是nexTick，执行时机在onMounted');
})
```

组件间的传值两种情况
使用了setup语法糖的
只有在

父传子   and  子传父
//使用vue自带的definProps语法糖 (不需要引入)
//使用vue自带的defineEmits语法糖
```js
// const props = defineProps(['aaa'])
   const props = defineProps({
        aaa:Number,
        bbb:String
    })
console.log(props.aaa,props.bbb);
--------------------------------------------\
let emigFun = defineEmits(["handLer"]);
 const emit1 = ()=>{
    console.log(123);
    emigFun('handLer',3)
 }
//父组件 添加自定义事件@handLer=""

```
没有使用setup语法糖
//使用props属性and在setup方法里面进行处理，setup不需要从vue中引入，可以直接使用
```js
//父组件
export default {
    components:{
        Renderc
    },
    setup () {
        const dataa = ref(0)
        const emit1 = (e)=>{
            console.log(e);
            dataa.value+=e
            console.log(dataa.value);
        }
        return {dataa,emit1}
    }
}
//子组件
<script>
import {ref} from 'vue'
export default {
    props: ["aaa",'bbb'],  //这样就传过来了
    setup (props,context) {
        console.log(props,context);
        console.log(props.aaa,props.bbb);
        const {attrs,emit} = context
        //这个emit的方法要从上下文中结构出来
        const emit11 = ()=>{
            emit('handLer',12)
        }
        return {emit11}
    }
}
</script>
```
子组件向上暴露方法给父组件调用
defineExpose 只能在子组件中使用，用于向上暴露方法或数据。在子组件之外无法使用（语法糖）

原生vue3调用子组件方法
1.使用上下文的expose将方法导出，不写默认所有方法导出
如果里面的expose([])为空数组，就代表什么都不让导出
2.在父组件里面使用ref声明一个变量，需要跟绑在组件身上的ref值一样，然后直接用声明的这个值.value来获取到组件的实例
3.然后要注意在mounted生命周期中来进行获取


 ```js
//子组件
//语法糖模式 一定要把方法暴露出去，否则的话就无法调用

   const  expose22 = ()=>{
            console.log('这个是暴露出去的事件expose22');
        }
  defineExpose({expose22})  

//父级的话还是用ref获取实例的方法

let refdezhi = ref()
refdezhi.value //可以访问到实例身上的暴露出来的expose22方法
 ```
`getCurrentInstance()` 函数只能在 `setup()` 函数中使用，无法在一些早期的生命周期钩子函数中使用（如 `created`、`mounted` 等）



<!-- 国际化的使用 -->
<!-- 
vue-i18n组件
下载插件，创建一个i18n的实例，然后配置参数，参数里面的文件都是一个单独的文件，再到mian.js里面进行一个注册，，
-->

<!-- 在组件内访问插件的实例 -->
<!-- 
访问插件的实例，然后使用依赖注入的方法来实现这个需求。
app.provide('$i18n', i18n);  全局依赖------
组件内部注入（inject） const i18n = inject('$i18n'); 
 -->

<!-- 在组件内访问当前vue文件的实例 -->
<!-- 组件内访问app，直接获取到app的真实DOM-->
<!-- 需要使用实例的可以写成普通格式setup()(){} -->
<!-- 
两个参数
第一个是：获取组件外部传递过来的值
第二个有几个参数（attrs,emit,expose,slot）
context的attrs是获取没有被props接收的值，
slot会在子组件里面出现
 -->


<!-- 注意：大家不要依赖 getCurrentInstance 方法去获取组件实例来完成一些主要功能，否则在项目打包后，一定会报错的。 -->

<!-- ...结构之后的数据不是响应式的了，要用toRefs() perhaps reative()  -->

1.暗黑模式 一般般： 通过改变html上面的类名来变化的

2.地图 难：
2-1：高德地图
高德地图开发者工具中导入，然后再创建实例在mounted里面调用
详细看renderD.vue文件


3.可视化：echarts地图：首先下载echarts，创建实例，然后再获取数据，再配置地图

4.调用摄像头
5.canavas 和 3D技术
6.上传文件，打印文件，七牛云
7.代理服务器怎么配（内网设置）
