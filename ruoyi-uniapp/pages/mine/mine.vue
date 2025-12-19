<template>
  <view class="container">
    <view class="profile-header">
      <view class="avatar-wrapper">
        <image class="avatar" :src="avatar" mode="aspectFill"></image>
      </view>
      <view class="user-info">
        <text class="nickname">{{ nickName }}</text>
        <text class="username">@{{ name }}</text>
      </view>
    </view>
    
    <view class="menu-list">
      <view class="menu-section">
        <view 
          class="menu-item" 
          v-for="(item, index) in menuItems" 
          :key="index"
          @click="handleMenuClick(item)"
        >
          <view class="menu-left">
            <text class="menu-icon">{{ item.icon }}</text>
            <text class="menu-label">{{ item.label }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>
      
      <view class="menu-section">
        <view class="menu-item" @click="handleLogout">
          <view class="menu-left">
            <text class="menu-icon">🚪</text>
            <text class="menu-label">退出登录</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>
    
    <view class="version-info">
      <text class="version-text">版本号：{{ version }}</text>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      version: '3.9.1',
      menuItems: [
        { label: '个人信息', icon: '👤', action: 'profile' },
        { label: '修改密码', icon: '🔐', action: 'password' },
        { label: '系统设置', icon: '⚙️', action: 'settings' },
        { label: '关于我们', icon: 'ℹ️', action: 'about' }
      ]
    }
  },
  
  computed: {
    ...mapGetters(['avatar', 'name', 'nickName'])
  },
  
  onShow() {
    if (!this.$store.getters.token) {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  
  methods: {
    handleMenuClick(item) {
      switch(item.action) {
        case 'profile':
          uni.navigateTo({
            url: '/pages/mine/profile'
          })
          break
        case 'password':
          uni.navigateTo({
            url: '/pages/mine/password'
          })
          break
        case 'settings':
          uni.navigateTo({
            url: '/pages/mine/settings'
          })
          break
        case 'about':
          uni.navigateTo({
            url: '/pages/mine/about'
          })
          break
      }
    },
    
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            this.$store.dispatch('LogOut').then(() => {
              uni.reLaunch({
                url: '/pages/login/login'
              })
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 30rpx;
  display: flex;
  align-items: center;
  
  .avatar-wrapper {
    margin-right: 30rpx;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      border: 4rpx solid rgba(255, 255, 255, 0.3);
    }
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
    
    .nickname {
      font-size: 36rpx;
      font-weight: bold;
      color: #fff;
      margin-bottom: 10rpx;
    }
    
    .username {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.menu-list {
  padding: 20rpx;
  
  .menu-section {
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    overflow: hidden;
    
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      border-bottom: 1rpx solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .menu-left {
        display: flex;
        align-items: center;
        
        .menu-icon {
          font-size: 40rpx;
          margin-right: 20rpx;
        }
        
        .menu-label {
          font-size: 30rpx;
          color: #333;
        }
      }
      
      .arrow {
        font-size: 50rpx;
        color: #ccc;
      }
    }
  }
}

.version-info {
  text-align: center;
  padding: 40rpx;
  
  .version-text {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
