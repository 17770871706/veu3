<template>
  <div class="chicken" ref="chickenRef"></div>
</template>

<script setup>
import * as echarts from "echarts";
import china from "../../../public/map/china.json";
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";

let chickens = echarts.ECharts;
const chickenRef = ref(null);

const mapData = [
  { adcode: "620088", name: "甘肃省", value: 300 },
  { adcode: "440000", name: "广东省", value: 1000 },
  { adcode: "360000", name: "江西省", value: 500 },
];

const options = reactive({
  visualMap: {
    type: "piecewise",
    right: "right",
    bottom: "300px",
    pieces: [
      { gt: 2500, color: "#326cdb" },
      { gt: 1500, lte: 2000, color: "#4f90e3" },
      { gt: 1000, lte: 1500, color: "#7cb5ec" },
      { gt: 500, lte: 1000, color: "#afd9f5" },
      { gt: 0, lte: 500, color: "#e3feff" },
    ],
    text: ["高", "低"],
    calculable: true,
  },
  series: [
    {
      type: "map",
      // 这个map属性，要和你当初注册的名字要一样
      map: "china",
      data: mapData,
      label: {
        show: true,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
    },
  ],
});

watch(
  () => options,
  () => {
    chickens.setOption(options);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  if (!chickenRef.value) return;
  chickens = echarts.init(chickenRef.value);
  echarts.registerMap("china", china);
  chickens.setOption(options);

  /* 
  点击地图后
  1、找到e.data，e.data会有自己配置的（后端返回的）数据，这里的话是上面的mapData
  2、通过e.data里面的adcode找到对应地图的json文件，json文件放在public下面，这样可以使用axios请求去找
  3、找到对应的json文件后，注册地图，同时更改options.series[0].map（这里因为监听了options的变化，否则的话需要执行chickens.setOption(options)）           mapData变化了，就用监听
  */
  chickens.on("click", (e) => {
    const res = e.data;
    axios.get(`/map/${res.adcode}.json`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        echarts.registerMap(res.name, response.data);
        options.series[0].map = res.name;
      }
    });
  });
});
</script>
<style scoped>
.chicken {
  width: 600px;
  height: 600px;
}
</style>
