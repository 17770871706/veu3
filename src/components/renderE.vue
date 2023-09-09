<template>
    <div>
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Tab 1">
                <div>
                  <a-button @click="tab1">tab1按钮</a-button>
                </div>
                <a-table :dataSource="dataSource" :columns="columns" />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>
                <a-button @click="tab2">tab2按钮</a-button>
                <a-table :dataSource="dataSource" :columns="columns" />
            </a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3"> 
                <a-button @click="tab3">tab3按钮</a-button>
                <a-table :dataSource="dataSource" :columns="columns" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import { ref ,reactive} from 'vue';
const activeKey = ref('1');
let Source = [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ]
const dataSource = reactive(Source)
const columns = reactive([
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ])
        let aaa = 1
const tab1 = ()=>{
    console.log(1111);
    // const 定义的可以改里面的东西，但是不能从新赋值
    columns[0] = 
          {
            title: '姓名' + aaa.toString(),
            dataIndex: 'name',
            key: 'name',
          }
}   
const tab2 = ()=>{

}
const tab3 = ()=>{

}
</script>
 
<style lang = "less" scoped>


</style>