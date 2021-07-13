<template>
  <div class="layput-container">
    <router-view></router-view>

    <!-- tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">我得</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped></style>
