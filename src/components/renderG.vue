<template>
    <div>
       
        <button @click="dayin">打印</button>
        <button @click="btn">打印</button>
        <div id="printMe">
            GGG中指定的打印区域
            <br>
            <img src="https://printjs.crabbly.com/images/print-02.jpg" alt="">
        </div>

        <el-dialog :title="title" :visible.sync="pintDialog" fullscreen append-to-body>
      <el-form ref="form" :model="form" label-width="80px" id="printMe">
        <el-form-item label="客户" prop="custormId">
          <el-input v-model="form.custormId" placeholder="请输入客户" />
        </el-form-item>
        <el-form-item label="产品" prop="productId">
          <el-input v-model="form.productId" placeholder="请输入产品" />
        </el-form-item>
<!--        <el-form-item label="消费记录标识" prop="recordId">-->
<!--          <el-input v-model="form.recordId" placeholder="请输入消费记录标识" />-->
<!--        </el-form-item>-->
        <el-form-item label="开始时间" prop="beginTime">
          <el-date-picker clearable
            v-model="form.beginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="护理师" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入护理师" />
        </el-form-item>
        <!-- <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
      </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary"   v-print="printObj">指定区域打印</el-button>
       <el-button @click="pintDialog = false">关 闭</el-button>
     </div>
    </el-dialog>

   <!-- 触发事件 -->
     <div slot="footer" class="dialog-footer">
       <el-button type="primary"  v-print="printObj">指定区域打印</el-button>
       <el-button @click="pintDialog = false">关 闭</el-button>
     </div>

    </div>
</template>

<script setup>
import { onMounted, reactive ,ref} from 'vue';
        
function dayin (){
    window.print()
}
     
if ("getPrinter" in navigator) {
  navigator.getPrinter().then(function(printer) {
    console.log("打印机类型：" + printer.printerType);
  }).catch(function(error) {
    console.error("获取打印机信息失败：" + error);
  });
} else {
  console.error("浏览器不支持获取打印机信息");
}


if ("getDevices" in navigator) {
  navigator.getDevices().then(function(devices) {
    // 遍历所有设备
    devices.forEach(function(device) {
      if (device.kind === "printer") {
        console.log("打印机信息：");
        console.log("设备名称：" + device.label);
        console.log("设备 ID：" + device.deviceId);
        console.log("设备类型：" + device.kind);
        console.log("设备供应商 ID：" + device.vendorId);
        console.log("设备产品 ID：" + device.productId);
        console.log("------------------------");
      }
    });
  }).catch(function(error) {
    console.error("获取设备信息失败：" + error);
  });
} else {
  console.error("浏览器不支持获取设备信息");
}


// 获取打印机列表，假设已经获取到并存储在 printers 变量中

function setDefaultPrinter(printerName) {
  if ("getDevices" in navigator) {
    navigator.getDevices().then(function(devices) {
      // 遍历所有设备
      devices.forEach(function(device) {
        if (device.kind === "printer" && device.label === printerName) {
          navigator.setPrinter(device).then(function() {
            console.log("默认打印机已设置为：" + printerName);
          }).catch(function(error) {
            console.error("设置默认打印机失败：" + error);
          });
        }
      });
    }).catch(function(error) {
      console.error("获取设备信息失败：" + error);
    });
  } else {
    console.error("浏览器不支持获取设备信息");
  }
}

// 在按钮点击事件中调用 setDefaultPrinter 方法
function btn() {
  var printerName = "打印机名称"; // 替换为您需要设置为默认打印机的打印机名称
  setDefaultPrinter(printerName);
}


const pintDialog = ref(false)
const  printObj= reactive({
        id: "printMe", // 这里是要打印元素的ID
        popTitle: "&nbsp", // 打印的标题
        extraCss: "", // 打印可引入外部的一个 css 文件
        extraHead: "", // 打印头部文字
        preview: false, // 是否启动预览模式，默认是false
        previewTitle: '打印客户账单', // 打印预览的标题
        previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
        zIndex: 10002, // 预览窗口的z-index，默认是20002，最好比默认值更高
        previewBeforeOpenCallback () { console.log('正在加载预览窗口！'); }, // 预览窗口打开之前的callback
        previewOpenCallback () { console.log('已经加载完预览窗口，预览打开了！') }, // 预览窗口打开时的callback
        beforeOpenCallback () { console.log('开始打印之前！') }, // 开始打印之前的callback
        openCallback () { console.log('执行打印了！') }, // 调用打印时的callback
        closeCallback () { console.log('关闭了打印工具！') }, // 关闭打印的callback(无法区分确认or取消)
        clickMounted () { console.log('点击v-print绑定的按钮了！') },
})
// const loading = ref(true)
onMounted(()=>{
   
})
</script>
 
<style lang = "less" scoped>
#printMe {
//   width: 80%;
//   display: flex;
//   justify-content: center;
//   align-content: center;
border: 1px solid #000;
}

.borderForm {
  border: 1px solid #ccc;
  padding: 10px; /* 可选，用于增加表单与边框之间的间距 */
}
@page {
  size: auto;
  margin: 0mm;
}
</style>