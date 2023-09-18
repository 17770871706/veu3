<template>
    <div>
        <button @click="pauseVideo">暂停按钮</button>
        <button @click="playVideo">播放按钮</button>
        <button @click="closeVideoStream">关闭视频</button>
        <button @click="addVideo">打开视频</button>
        <button @click="coles">按下关闭录像</button>
        <video id="video" autoplay style="width: 300px;height: 300px;">
            
        </video>
    </div>
</template>

<script setup>
import {onMounted,ref} from 'vue'

//测试支不支持这个
if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    // ok, 浏览器支持它
    console.log('支持');
}
const video = ref(null)
const constraints = {
video: {
width: {
  min: 1280,
  ideal: 1920,
  max: 2560,
},
height: {
  min: 720,
  ideal: 1080,
  max: 1440,
  },
},
};
const pauseVideo = () => {
    video.value.pause();
};

const playVideo = () => {
    video.value.play();
};

const closeVideoStream = () => {
    video.value.srcObject = null;
};

const addVideo = async ()=>{
    video.value = document.querySelector("#video");
    try {
        const videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.value.srcObject = videoStream;
        } catch (error) {
        console.log("捕获视频流出错了", error);
    }
}

// const coles = async ()=>{
//     const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     const videoTrack = videoStream.getVideoTracks()[0];
//     videoTrack.stop();
//     const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     const tracks = mediaStream.getTracks();
//     tracks.forEach(track => track.stop());
// }

// navigator.mediaDevices.getUserMedia({ video: true });
 onMounted(async ()=>{
// 页面中有一个 <video autoplay id="video"></video> 标签
// autoplay是自动播放的属性
    addVideo()
})
</script>
 
<style lang = "less" scoped>
    
</style>