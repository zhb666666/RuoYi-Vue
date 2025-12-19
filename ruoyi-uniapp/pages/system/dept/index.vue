<template>
  <view class="container">
    <view class="placeholder">
      <text class="placeholder-icon">📋</text>
      <text class="placeholder-text">菜单管理</text>
      <text class="placeholder-desc">功能开发中...</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .placeholder-icon {
    font-size: 120rpx;
    margin-bottom: 30rpx;
  }
  
  .placeholder-text {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .placeholder-desc {
    font-size: 28rpx;
    color: #999;
  }
}
</style>
