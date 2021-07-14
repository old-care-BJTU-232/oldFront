<template>
  <div>
    <div>
      <h4>走廊摄像头-摔倒检测</h4><div class="button" @click="screen1=!screen1">开关</div>
      <img v-if="screen1" controls="autoplay" class="screen" src="http://localhost:5000//video_viewer_fall" />
    </div>
    <div>
      <h4>走廊摄像头-禁止区域进入检测</h4><div class="button" @click="screen2=!screen2">开关</div>
      <img v-if="screen2" controls="autoplay" class="screen" src="http://localhost:5000//video_viewer_fence" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    data () {
      return {
        url1:'http://localhost:5000//video_feed',
        url2:'http://localhost:5000//video_feed',
        screen1:false,
        screen2:false,
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  h4{
    display: inline-block;
    margin: 20px;
  }
  .screen {
    display: block;
    width: 800px;
    height: 650px;
    margin: 10px 20px;
  }
  .button {
    display: inline-block;
    color: #409EFF;
    cursor:pointer;
  }
  .button :hover{
  }
</style>
