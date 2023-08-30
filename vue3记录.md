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
//这个name,age实际上就是obj的name,age。指针指向是一样的。

const fn = ()=>{
      console.log('按钮触发');
      state.age++; 
      refs.value +=2;
      console.log(refs);
      name.value++
    //===可以判断指针是否一样的问题
    console.log(obj.name===name.value) 						console.log(obj.name===state.name)
    console.log(state.age===age.value)
    }
```

### computed、



# 不常用api

`markRaw` 辅助函数，被标记的对象不会具备响应式的效果

` getCurrentInstance()` 函数来获取当前组件实例的引用

在 `setup()` 函数中，通过调用 `getCurrentInstance()` 获取当前组件的实例对象，并将其赋值给 `instance` 变量，

在 `setup()` 函数中，通过调用 `getCurrentInstance()` 获取当前组件的实例对象，并将其赋值给 `instance` 变量在 `setup()` 函数中

```js
// 使用 instance.proxy 访问属性
// 使用 instance.ctx 访问上下文
```

`getCurrentInstance()` 函数只能在 `setup()` 函数中使用，无法在一些早期的生命周期钩子函数中使用（如 `created`、`mounted` 等）