<template>
    <div class="chicken" ref="chickenRef"></div>
  </template>
  
  <script setup>
  import * as echarts from "echarts";
  import china from "./json/china.json";
  import { onMounted, reactive, ref, watch } from "vue";
  import axios from "axios";
  
  let chickens = echarts.ECharts;
  const chickenRef = ref(null);
  
  //选中的显示的数据
  const mapData = [
    { adcode: "620088", name: "甘肃省", value: 300 },
    { adcode: "440000", name: "广东省", value: 1000 },
    { adcode: "360000", name: "江西省", value: 500 },
    { adcode: "540000", name: "西藏自治区", value: 3000 },
    { adcode: "120000", name: "天津市", value: 2000 },
    { adcode: "430000", name: "湖南省", value: 5100 },
  ];
  //配置文件数据
  const options = reactive({
    //标题配置
    title: {
    text: '地图', // 设置主标题文本内容
    subtext: '中国地图', // 设置副标题文本内容
    left: 'center', // 设置主副标题水平对齐方式为居中
    top: 'top' // 设置主副标题垂直对齐方式为顶部对齐
    },
    //鼠标悬停时显示的提示框的属性
    tooltip: {
    trigger: 'item', // 当鼠标悬停在图形元素上时显示提示框
    formatter: function(params) { // 自定义提示框内容
        let value = params.value.toString()
        if (value=='NaN') {
            value = '0' 
        }
      return params.name + '--' + value;
    },
    backgroundColor: '#cfc', // 提示框背景颜色
    borderColor: '#000', // 提示框边框颜色
    borderWidth: 1, // 提示框边框宽度
    padding: 10, // 提示框内容内边距
    textStyle: { // 提示框文本样式
      color: '#000',
      fontSize: 10
    }
    },
    //这个属性是配置值的区间的 //可视化映射
    visualMap: {
      //piecewise分段型映射
      type: "piecewise",// 连续型映射continuous
      right: "right", //映射组件的位置
      bottom: "300px",//映射组件的底部距离
      //分段型映射组件的范围
      pieces: [
        { gt: 5000, color: "#dd001b" },
        { gt: 2500, lte: 5000,color: "#2a63f6" },
        { gt: 1500, lte: 2000, color: "#4f90e3" },
        { gt: 1000, lte: 1500, color: "#7cb5ec" },
        { gt: 500, lte: 1000, color: "#afd9f5" },
        { gt: 0, lte: 500, color: "#e3feff" },
      ],
      text: ["高", "低"], //最近最大值和最小值文字
      calculable: true,//是否允许拖拽手柄来选择数据范围
      inRange: {
      color: ['#e0ffff', '#006edd'], // 渐变色范围
      },
      min: 0, // 数据的最小值
      max: 100, // 数据的最大值
      itemWidth: 20, // 色块的宽度
      itemHeight: 20, // 色块的高度
      inverse: false // 颜色渲染不反向
    },
    series: [
      {
        type: "map", //指定类型 'line' 'bar' 'scatter'
        // 这个map属性，要和你当初注册的名字要一样
        map: "china", // 地图类型world
        data: mapData, //地图上每个区域的值
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        roam:true
        // map：指定要绘制的地图类型，如 'china'、'world' 等。可以使用 ECharts 内置的地图，也可以自定义地图数据。
        // data：系列的数据，是一个数组，包含地图上每个区域的数据值。
        // nameMap：用于将地图区域名称映射到具体数据项的名称，可以用于地图区域的别名。
        // itemStyle：地图区域的样式，可以设置颜色、边框等样式。
        // label：地图区域的标签样式，设置显示区域名称或其他信息的样式。
        // emphasis：设置鼠标悬停时地图区域的高亮样式。
        // roam：是否开启地图漫游（缩放和平移）操作。
        // zoom：地图的缩放级别，可以设置初始的缩放级别。
        // center：地图的中心位置，默认为地图的中心点。
        // aspectScale：地图的长宽比，可以根据需要设置。
      },
    ],
    // 配置地理坐标系组件的属性
    // geo:{ 
        // map: "china",
        // roam: true, //不开启缩放和平移
        // zoom: 1.23, //视角缩放比例
        // map：指定要绘制的地图类型，如 'china'、'world' 等。可以使用 ECharts 内置的地图，也可以自定义地图数据。
        // roam：是否开启鼠标缩放和漫游操作，设置为 true 可以对地图进行交互操作。
        // center：地图的中心位置，默认为地图的中心点。可以使用经纬度坐标表示，如 [经度, 纬度]，或者直接使用城市名进行定位。
        // aspectScale：地图的长宽比，可以根据实际需求进行调整，影响地图的显示形状。
        // itemStyle：地图区域的样式，可以设置颜色、边框等样式。
        // label：地图区域的标签样式，设置显示区域名称或其他信息的样式。
        // emphasis：设置鼠标悬停时地图区域的高亮样式。
        // zoom：地图的缩放级别，可以设置初始的缩放级别。
        // regions：可通过此属性设置针对特定区域的样式、标签显示等配置。
    // },
    // 配置工具栏组件的属性，提供一些交互功能，如保存图表、切换视图、数据视图、放大缩小等。
    toolbox:{
        //配置按钮
        feature: {
      zoom: {
        show: true
      },
      dataView: {
        show: true
      },
      map: {
        show: true
      },
      restore: {
        show: true
      }
    }
    }

  });
  
  watch(
    () => options,
    () => {
    //   chickens.setOption(options);
    },
    {
      deep: true,
    }
  );
  
  onMounted(() => {
    if (!chickenRef.value) return;
    //初始化一个实例,将地图挂载在容器上面
    chickens = echarts.init(chickenRef.value);
    //注册一个地图，取名为china, 后面的china是数据，也就是地图的json文件
    echarts.registerMap("china", china);
    // 地图配置的方法
    chickens.setOption(options);
  
    /* 
    点击地图后
    1、找到e.data，e.data会有自己配置的（后端返回的）数据，这里的话是上面的mapData
    2、通过e.data里面的adcode找到对应地图的json文件，json文件放在public下面，这样可以使用axios请求去找
    3、找到对应的json文件后，注册地图，同时更改options.series[0].map（这里因为监听了options的变化，否则的话需要执行chickens.setOption(options)）           mapData变化了，就用监听
    */
    // chickens.on("click", (e) => {
    //   const res = e.data;
    //   console.log(e,res,'----------------');
    //   axios.get(`/map/${res.adcode}.json`).then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       echarts.registerMap(res.name, response.data);
    //       options.series[0].map = res.name;
    //     }
    //   });
    // });
  });
  </script>
  <style scoped>
  .chicken {
    width: 600px;
    height: 600px;
  }
  </style>
  