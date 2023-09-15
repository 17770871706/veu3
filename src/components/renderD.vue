<template>
  <div>
    <div style="display: flex;">
        <div id="container" style="width: 700px;height: 400px;"></div>
        <div id="panel" style="height: 400px;overflow: auto;"></div>
    </div>
    <div>
        <el-button @click="functions.toggle">显示/不显示实时路况</el-button>
        <el-button @click="functions.addMarker">添加点标记</el-button>
        <el-button @click="functions.updateIcon">更新点标记</el-button>
        <el-button @click="functions.clearMarker">删除点标记</el-button>
        <el-button @click="unpdata([113.37749 , 22.98484])">更新点标记内容</el-button>
        <el-button @click="fn">位置偏移</el-button>
        <br>
        <label for="">输入经度：</label><el-input style="width: 200px;" v-model="gongsi[0]"></el-input><label for="">输入纬度：</label><el-input style="width: 200px;" v-model="gongsi[1]"></el-input>
        <el-button @click="unpdata(gongsi)">搜索</el-button>
        <br>
        <el-button @click="suiji">随机经纬度</el-button>
        <el-button @click="tingzhi">停止</el-button><br>
        <label for="">输入起点经纬度</label> <el-input style="width: 200px;" placeholder="格式132.88,67.33" v-model="qidian"></el-input>
        <label for="">输入终点经纬度</label> <el-input style="width: 200px;" placeholder="格式132.88,67.33" v-model="zhongdian"></el-input>
        <br>
        <a-button @click="huizhiluxian">输入经纬度绘制路线</a-button>
        <br>
        <el-input v-model="maptext" style="width: 200px;"></el-input>&nbsp;&nbsp;&nbsp;
        起点：<el-input v-model="qdianmaptext" style="width: 200px;"></el-input>
        终点：<el-input v-model="zdianmaptext" style="width: 200px;"></el-input>
        <br> 
        <el-button @click="textfn" style="width: 200px;">输入地名进行搜索</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="qdzdtextfn">输入起点和终点名进行规划路线</el-button>
        <el-button @click="functions.quitNavigation">清除导航路线</el-button>
      </div>
  </div>
</template>

<script setup>
import { onMounted,reactive,ref } from 'vue'
import { ElMessage } from 'element-plus'
// Mounted期间加载的方法
const functions = ref({
  toggle: null,
  addMarker: null,
  updateIcon:null,
  updateContent:null,
  setCenter:null,  //单独更新定位的方法
  clearMarker:null,
  huzhiqzd:null,    //这个是地图驾驶路线的获取
  quitNavigation:null, //清除导航方法
})

//获取当前位置
const navweizhi = null
navigator.geolocation.getCurrentPosition((e)=>{
    console.log(e,'当前的位置');
    navweizhi=[e.coords.longitude,e.coords.latitude]
})

// 测试数据...
const gongsi = reactive([113.37749 , 22.98484])
const fn = ()=>{
    gongsi[0]++
    gongsi[1]++
    functions.value.updateContent(gongsi)
}


//更新地理位置的方法
const unpdata = (e)=>{
  if (!e) {
    return
  }
  functions.value.updateContent(e)
}

// 随机经纬度功能（按钮）
let nuset = null
const suiji = ()=>{
  if (nuset) {
    return
  }
    nuset = setInterval(()=>{
      let aacc = generateRandomCoordinate()
      gongsi[0]=aacc[0]
      gongsi[1]=aacc[1]
    },100)
}
const tingzhi = ()=>{
   clearInterval(nuset)
   nuset=null
}
const generateRandomCoordinate = ()=>{
  const minLng = 73.66; // 中国最西端经度
  const maxLng = 135.05; // 中国最东端经度
  const minLat = 18.16; // 中国最南端纬度
  const maxLat = 53.56; // 中国最北端纬度

  const lng = Math.random() * (maxLng - minLng) + minLng;
  const lat = Math.random() * (maxLat - minLat) + minLat;

  return [lng, lat];
}

//根据经纬度绘制路线规划
const qidian = ref('112.87148,26.43347')
const zhongdian = ref('113.37666,22.97939 ')
const huizhiluxian = ()=>{
    let a =(qidian.value.split(",")).map(itme=>parseFloat(itme))
    let b = (zhongdian.value.split(",")).map(itme=>parseFloat(itme))
    console.log(a)
    console.log(b);
    functions.value.huzhiqzd(a,b)
}

//根据中文地址获取经纬度 
const maptext = ref('')
const textfn =async ()=>{
  if (!maptext.value) {
       return 
  }

  let aaa = await titleold(maptext.value)
  console.log('await调用了titleold方法aaa--',aaa);
  if (!aaa) {
    ElMessage.error('获取地理编码失败');
    return
  }
  functions.value.setCenter(aaa)
}

//根据中文起点终点来进行道路规划
const qdianmaptext = ref('广州市')
const zdianmaptext = ref('深圳市')
const qdzdtextfn= async ()=>{
    if (!qdianmaptext.value||!zdianmaptext.value) {
      alert('请输入起点和终点')
      return
    }
    let qdian =  await titleold(qdianmaptext.value)
    let zhong =  await titleold(zdianmaptext.value)
    console.log('await调用了titleold方法,qdian--zhong',qdian,zhong)
    if (!zhong||!qdian) {
    ElMessage.error('获取地理编码失败');
    return
  }
    functions.value.huzhiqzd(qdian, zhong);  
}

// 中文转换的方法（需要调用）
const titleold =  (address)=>{
// const address ="湖南省耒阳市大市乡三塘村10组"; // 输入的地名或地址
const key = "616520c0be57cfeafc472cf64442ae71"; // 需要替换为你自己的密钥
let lnglat = null
console.log('LngLat ------1');
return new Promise((resolve)=>{
  AMap.plugin('AMap.Geocoder', async function() {
  const geocoder = new AMap.Geocoder({
    key: key // 配置地理编码服务的密钥
  });
 await  geocoder.getLocation(address,function(status, result) {
    if (status === 'complete' && result.geocodes.length) {
      const location = result.geocodes[0].location;
      console.log("经度: " + location.lng);
      console.log("纬度: " + location.lat);
      // 并进行跳转
      console.log('LngLat --------2');
      console.log([location.lng,location.lat]);
      lnglat = [location.lng,location.lat]
      resolve(lnglat)
    } else {
      console.log("获取地理编码失败");
      resolve(null)
    }
  });
});
})
}

onMounted(()=>{
  const mapa = new AMap.Map('container', {
    //基本数据
        zoom:11,//级别
        center:navweizhi,//中心点坐标
        viewMode:'3D',//使用3D视图
        resizeEnable: true, //地图大小自适应
    //可初始化添加属性
        layers: [//使用多个图层
         // new AMap.TileLayer.Satellite(),//卫星地图图层
        //  new AMap.TileLayer.RoadNet()//道路图层，也称之为矢量地图图层。它显示道路、交通网络等基础地理信息。通常情况下，道路图层会覆盖在卫星地图图层之上
        ],
        //zooms: [4,18],//设置地图级别范围
        lang:'zh_cn',  //设置地图语言类型 zh_cn
    });

      // ----------------------------------实时路况图层-----------------------------

      // new AMap.TileLayer.Traffic() 是高德地图 JavaScript API 中用于创建实时交通图层的构造函数
      //zIndex：设置实时交通图层的叠加顺序（层级），默认值为 10。
      // autoRefresh：设置是否自动刷新实时交通数据，默认值为 false。如果设置为 true，实时交通图层将自动刷新实时数据。
      // interval：设置自动刷新的间隔时间（毫秒），默认值为 120000（2分钟）。仅在 autoRefresh 参数为 true 时生效。
      // showTrafficLegend：设置是否显示交通图例，默认值为 true。如果设置为 false，将隐藏地图上的交通图例信息。
      //实时路况图层
      let trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 10,
          autoRefresh: true,
          interval: 60000, // 1分钟刷新一次
          showTrafficLegend: false
        });
      let isVisible = true;
      functions.value.toggle= ()=>{
        console.log(isVisible);
            if (isVisible) {
              console.log('111隐藏false走这');
                trafficLayer.hide();
                isVisible = false;
            } else {
              console.log('222显示true走这');
                trafficLayer.show();
                isVisible = true;
            }
        }
      //mapa.add(trafficLayer);//添加图层到地图
      trafficLayer.setMap(mapa);//需要挂载的就要放在
  
  // ------------------------------------点标记 Marker、文本标记 Text、圆点标记 CircleMarker--------------------------------------------------------
    // // 将创建的点标记添加到已有的地图实例：
    // mapa.add(marker);

    // 移除已创建的 marker
    // mapa.remove(marker);
  let marker = null
  // 实例化点标记
  functions.value.addMarker=()=>{
    console.log(1111);  // 创建一个 Marker 实例：
    if (marker) {
      return
    }
     marker = new AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position: [116.39, 39.9],
        offset: new AMap.Pixel(-13, -30)
      });
    functions.value.setCenter([116.39, 39.9])
    // --------------------------
    // marker = new AMap.Text({
    // position: [116.39, 39.9],
    // text: '文本内容',
    // // 文本标记的其他配置参数...
    //   });
    // --------------------------
    // marker = new AMap.CircleMarker({
    // center: [116.39, 39.9],
    // // 圆点标记的其他配置参数...
    // });
      marker.setMap(mapa);
    }
  //更新点标记
  functions.value.updateIcon=()=>{
    console.log(2222);
      if (!marker) {
        return;
      }
      marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
    }
 //刷新更新点标记内容
 functions.value.updateContent=(e)=>{
  console.log(3333);
      if (!marker) {
        return;
      }
  // 自定义点标记内容
    var markerContent = document.createElement("div");

  // 点标记中的图标
    var markerImg = document.createElement("img");
    markerImg.className = "markerlnglat";
    markerImg.src = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
    markerContent.appendChild(markerImg);

  // 点标记中的文本
    var markerSpan = document.createElement("span");
    markerSpan.className = 'marker';
    markerSpan.innerHTML = "新的位置";
    markerContent.appendChild(markerSpan);

    marker.setContent(markerContent); //更新点标记内容
    marker.setPosition(e); //更新点标记位置
    //同步更新点标记的位置
    mapa.setCenter(e);
    }
  //更新定位的方法
  functions.value.setCenter=(e)=>{
    mapa.setCenter(e);
  }
  
  // 清除 marker
  functions.value.clearMarker=()=>{
    console.log(4444);
      if (marker) {
        marker.setMap(null);
        marker = null;
      }
    }

    //--------------------------绘制驾车路线-----------------------------------
          //构造路线导航类
    var driving = new AMap.Driving({
    map: mapa,
    panel:'panel'
    }); 
    // 根据起终点经纬度规划驾车导航路线
    // let qidian = [116.379028, 39.865042]
    // let zhongdian =[116.427281, 39.903719]
    functions.value.huzhiqzd=(a,c)=>{
      console.log(a,c); 
      driving.search(new AMap.LngLat(a[0],a[1]),new AMap.LngLat(c[0],c[1]), function(status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        console.log(status,result);
        if (status === 'complete') {
               alert('获取驾车数据成功')
        } else {
            alert('获取驾车数据失败：' + result)
        }
    });
    } 
    // functions.value.huzhiqzd(qidian,zhongdian)
    // 清除路线导航
    functions.value.quitNavigation = () => {
      driving.clear();
    }
}) 
</script>
 
<style lang = "less" scoped>
   
</style>