<template>
  <div>
    <div>
      <h4>房间摄像头-情感检测+陌生人检测</h4><div class="button" @click="screen1=!screen1">开关</div>
      <img v-if="screen1" controls="autoplay" class="screen" src="http://localhost:5000//video_viewer_strangers" />
    </div>
    <div>
      <h4>房间摄像头-义工互动检测</h4><div class="button" @click="screen2=!screen2">开关</div>
      <img v-if="screen2" controls="autoplay" class="screen" src="http://localhost:5000//video_viewer_activity" />
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
    font-size: 12px;
    color: #FFF;
    background-color: #409EFF;
    border: 1px solid #409EFF;
    cursor:pointer;
    padding: 5px 12px;
    border-radius: 3px;
  }
  .button :hover{
  }
</style>
