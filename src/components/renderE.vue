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
        <table class="ys-table">
          <thead>
            <tr>
              <th colspan="7">The table header</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td colspan="2">1出院诊断</td>
              <!-- <td>2</td> -->
              <td rowspan="2">3疾病编码</td>
              <td colspan="4">4入院病情</td>
              <!-- <td>5</td> -->
              <!-- <td>6</td> -->
              <!-- <td>7</td> -->
            </tr>
            <tr >
              <td>1类型</td>
              <td>2诊断名称</td>
              <!-- <td>3</td> -->
              <td>4有</td>
              <td>5临床未确定</td>
              <td>6情况不明</td>
              <td>7无</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7" rowspan="7">页脚行1</td>
              <!-- <td>页脚行1</td> -->
            </tr>
          </tfoot>
      </table>
    </div>
</template>

<script setup>
import { ref ,reactive} from 'vue';
// a-table的数据
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
//原生table

</script>
 
<style lang = "less" scoped>
.ys-table{
  border-collapse: collapse; /*合并边框*/
  td {
  border: 1px solid #333;
  height: 30px;
  text-align: center;
  padding: 5px 10px;
  }

  thead,
  tfoot {
  background-color: #333;
  color: #fff;
  }
}
</style>