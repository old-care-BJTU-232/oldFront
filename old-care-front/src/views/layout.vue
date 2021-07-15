<template>
  <div class="base">
    <el-container class="container">
      <el-header>
        <div>
          <span class="favicon">OLD HOME</span>
          <span class="title">智慧养老后台管理系统</span>
        </div>
        <el-button type="info" @click="quitBtnHandle">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
                  router
                  default-active="1"
                  background-color="#333744"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  @open="handleOpen"
                  @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>视屏监控</span>
              </template>
              <el-menu-item index="/index/screen">房间监控</el-menu-item>
              <el-menu-item index="/index/screen2">走廊监控</el-menu-item>
<!--              <el-menu-item index="/index/screen3">大门监控</el-menu-item>-->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>信息维护</span>
              </template>
              <el-menu-item index="/index/oldpeople">老人信息维护</el-menu-item>
              <el-menu-item index="/index/worker">工作人员信息维护</el-menu-item>
              <el-menu-item index="/index/volunteer">义工信息维护</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>事件记录</span>
              </template>
              <el-menu-item index="/index/event/0">情感分析</el-menu-item>
              <el-menu-item index="/index/event/1">义工互动检测</el-menu-item>
              <el-menu-item index="/index/event/2">陌生人检测</el-menu-item>
              <el-menu-item index="/index/event/3">摔倒检测</el-menu-item>
              <el-menu-item index="/index/event/4">禁止区域进入检测</el-menu-item>


            </el-submenu>
<!--            <el-submenu index="4">-->
<!--              <template slot="title">-->
<!--                <i class="el-icon-location"></i>-->
<!--                <span>统计报表</span>-->
<!--              </template>-->
<!--&lt;!&ndash;              <el-menu-item-group>&ndash;&gt;-->
<!--&lt;!&ndash;                <template slot="title">分组一</template>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-menu-item index="1-1">选项1</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-menu-item index="1-2">选项2</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-menu-item-group>&ndash;&gt;-->
<!--              <el-menu-item index="1-1">统计报表</el-menu-item>-->
<!--            </el-submenu>-->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: '',
    methods: {
      quitBtnHandle () {
        window.sessionStorage.removeItem('username')
        this.$router.push('/')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      initWebSocket () {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage () {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage () {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage (event) {
        // 根据服务器推送的消息做自己的业务处理
        console.log('服务端返回：' + event.data)
        let type=event.data.substring(0,1)
        let data=event.data.substring(1,event.data.length)
        console.log(type)
        if(type==='0'||type === '1')
          this.$message.info('事件：'+data)
        else
          this.$message.error('紧急事件：'+data)
      },
      setOncloseMessage () {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload () {
        this.closeWebSocket()
      },
      closeWebSocket () {
        this.websocket.close()
      }
    },
    mounted () {
      // WebSocket
      if ('WebSocket' in window) {
        // this.websocket = new WebSocket('ws://127.0.0.1:8401/push/websocket')
        this.websocket = new WebSocket('ws://49.232.157.63:8401/push/websocket')
        // alert('连接浏览器')
        this.initWebSocket()
      } else {
        alert('当前浏览器 不支持')
      }
    },
    beforeDestroy () {
      this.onbeforeunload()
    },
  }
</script>

<style lang="less" scoped>
  .base {
    height: 710px;
  }
  .container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .favicon{
      font-weight: 700;
      font-size: 40px;
      color: #fff;
      text-shadow: 2px 5px 3px rgba(0, 0, 0, 0.06);
      padding: 3px;
    }
    .title {
      color: #ffffff;
      margin-left: 8px;
      font-size: 23px;
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    /*background-color: #eaedfe;*/
    background-color: #f1f2f4;
  }
</style>
