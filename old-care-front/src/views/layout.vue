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
        window.sessionStorage.removeItem('sid')
        this.$router.push('/station/login')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
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
