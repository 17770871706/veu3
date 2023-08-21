<template>
  <div>
    <div>这个是home页面...主要操作按钮</div>
     <RouterLink to="/about">跳转</RouterLink>
     <div>
        <a-button size="small" type="primary">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button size="large" type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button block  :disabled="true" type="link">Link Button</a-button>
     </div>
      <div :style="{ background: 'rgb(190, 200, 200)', padding: '26px 16px 16px' }">
        <a-button type="primary" ghost shape="circle">
          <template #icon><SearchOutlined /></template>     
          按钮文字在这个区域
        </a-button>
        <a-button href="/about" ghost>跳转about</a-button>
       <a-button  type="dashed" ghost>Dashed</a-button>
        <a-button type="primary" danger ghost>Danger</a-button>
      </div>
      <!-- 这个下面是图标,要安装icon的依赖包 ,这个是下载的icon-->
      <div>   
        <!--这个spacewo 控制组件间的默契 -->
        <a-space>       
          <star-outlined />
          <star-filled />
          <star-two-tone two-tone-color="#eb2f96" />
          <home-outlined />
          <setting-filled />
          <copy-two-tone />
          </a-space>
      </div>
      <!-- 下面是分割线 -->
      <div>
        这个是分割线上面
        <a-divider orientation="right">Right Text</a-divider>
        这个是分割先左边
        <a-divider type="vertical" />
        <a href="#">我是右边</a>
      </div>
      <!-- 栅格布局 -->
      <div style="border: 1px solid #000;">
        <a-row>
          <a-col :span="12">栅格12</a-col>
          <a-col :span="6">栅格4</a-col>
          <a-col :span="6">栅格8</a-col>
        </a-row>
      </div>
       <!-- 抽屉 -->
      <div>
        <a-button type="primary" @click="showDrawer">点击查看图片</a-button>
        <a-drawer
          v-model:visible="visible"
          class="custom-class"
          style="color: red"
          title="Basic Drawer"
          placement="bottom"
          @after-open-change="onafterOpenChange"
        >
              <!-- <a-image
          :width="200"
          src=""
          /> -->
          <a-image
          :width="200"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </a-drawer>
      </div>
      <!-- 用户登录密码的验证 -->
      <div style="display: flex;">
        <a-input v-model:value="userName" placeholder="请输入账号"  prefix="￥" suffix="RMB" /> 
        <a-input-password v-model:value="passwordvalue" placeholder="请输入密码" />
      </div>
      <div>
        <a-radio-group v-model:value="selectedOption" @change="fn">
          <a-radio v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </a-radio>
        </a-radio-group>
      </div>
  </div>
</template>

<script setup>
import {  ref } from 'vue';
import { RouterLink} from 'vue-router'
import { StarOutlined, StarFilled, StarTwoTone, HomeOutlined, SettingFilled ,CopyTwoTone,SearchOutlined} from '@ant-design/icons-vue';

const visible = ref(false);
const onafterOpenChange = bool => {
      console.log('visible', bool);
    };
const showDrawer = () => {
      visible.value = true;
    };
//账号密码
const userName = ref('');    
const passwordvalue = ref('');    
//单选框 
const selectedOption = ref(0); 
const options = [
      { label: '选项1', value: 0 },
      { label: '选项2', value: 1 },
      { label: '选项3', value: 2 },
    ];
function fn(params) {
    console.log(params);
    console.log(123,123);
}


</script>

<style lang="scss" scoped>

</style>