<template>
  <!-- <div>1</div>
  <video id="video" autoplay></video> -->
  <div>
    <h1>摄像头截图上传示例</h1>

    <!-- 创建一个用于显示摄像头视频的video元素 -->
    <video ref="video" width="400" height="300" autoplay></video>

    <!-- 添加一个按钮来进行截图 -->
    <button @click="capture">截图</button>

    <!-- 用于显示截取的图像的canvas元素 -->
    <canvas ref="canvas" width="400" height="300"></canvas>

    <!-- 显示截取的图像 -->
    <img :src="capturedImage" v-if="capturedImage" alt="Captured Image" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

// import "video.js/dist/video-js.min.css";
// import videojs from "video.js";
// import "videojs-flvjs-es6";
// navigator.mediaDevices
//   .getUserMedia({ video: true })
//   .then(function (stream) {
//     let video = document.getElementById("video");
//     // video.srcObjet = stream;
//   })
//   .catch((err) => {
//     console.log("获取摄像头失败", err);
//   });
const video = ref(null);
const canvas = ref(null);

// 创建reactive响应式对象来存储截图后的图像数据
const capturedImage = ref(null);

// 打开摄像头，并显示摄像头视频
onMounted(() => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.value.srcObject = stream;
    })
    .catch((error) => {
      console.error("访问摄像头失败: ", error);
    });
});

// 执行截图操作
const capture = () => {
  // 在canvas上绘制摄像头视频的当前帧
  canvas.value
    .getContext("2d")
    .drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  // 将canvas图像转换为Base64编码的数据URL
  capturedImage.value = canvas.value.toDataURL("image/png");

  // 在此处可将图像上传到服务器处理
  // 以下代码只是简单地将图像显示在页面上
};
</script>
<style lang="less" scoped></style>
