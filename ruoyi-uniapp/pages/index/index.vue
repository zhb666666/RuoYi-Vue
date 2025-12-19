<template>
  <view class="container">
    <view class="header">
      <view class="welcome">
        <text class="welcome-text">欢迎，{{ nickName }}</text>
        <text class="welcome-desc">若依管理系统</text>
      </view>
    </view>
    
    <view class="quick-menu">
      <view class="menu-title">快捷菜单</view>
      <view class="menu-grid">
        <view 
          class="menu-item" 
          v-for="(item, index) in menuList" 
          :key="index"
          @click="navigateTo(item.url)"
        >
          <text class="menu-icon">{{ item.icon }}</text>
          <text class="menu-name">{{ item.name }}</text>
        </view>
      </view>
    </view>
    
    <view class="stats-card">
      <view class="card-title">系统统计</view>
      <view class="stats-grid">
        <view class="stat-item">
          <text class="stat-value">{{ stats.userCount }}</text>
          <text class="stat-label">用户数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.roleCount }}</text>
          <text class="stat-label">角色数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.deptCount }}</text>
          <text class="stat-label">部门数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ stats.onlineCount }}</text>
          <text class="stat-label">在线用户</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      menuList: [
        { name: '用户管理', icon: '👥', url: '/pages/system/user/index' },
        { name: '角色管理', icon: '🎭', url: '/pages/system/role/index' },
        { name: '菜单管理', icon: '📋', url: '/pages/system/menu/index' },
        { name: '部门管理', icon: '🏢', url: '/pages/system/dept/index' },
        { name: '岗位管理', icon: '💼', url: '/pages/system/post/index' },
        { name: '字典管理', icon: '📚', url: '/pages/system/dict/index' },
        { name: '参数设置', icon: '⚙️', url: '/pages/system/config/index' },
        { name: '通知公告', icon: '📢', url: '/pages/system/notice/index' },
        { name: '在线用户', icon: '🌐', url: '/pages/monitor/online/index' },
        { name: '定时任务', icon: '⏰', url: '/pages/monitor/job/index' },
        { name: '登录日志', icon: '📝', url: '/pages/monitor/logininfor/index' },
        { name: '操作日志', icon: '📊', url: '/pages/monitor/operlog/index' }
      ],
      stats: {
        userCount: 0,
        roleCount: 0,
        deptCount: 0,
        onlineCount: 0
      }
    }
  },
  
  computed: {
    ...mapGetters(['nickName'])
  },
  
  onLoad() {
    this.loadStats()
  },
  
  onShow() {
    if (!this.$store.getters.token) {
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url: url
      })
    },
    
    loadStats() {
      // 这里应该调用实际的API获取统计数据
      this.stats = {
        userCount: 100,
        roleCount: 5,
        deptCount: 10,
        onlineCount: 8
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  color: #fff;
  
  .welcome {
    .welcome-text {
      display: block;
      font-size: 40rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }
    
    .welcome-desc {
      display: block;
      font-size: 28rpx;
      opacity: 0.9;
    }
  }
}

.quick-menu {
  background: #fff;
  margin: 20rpx;
  border-radius: 20rpx;
  padding: 30rpx;
  
  .menu-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
    color: #333;
  }
  
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30rpx;
    
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      
      .menu-icon {
        font-size: 60rpx;
        margin-bottom: 10rpx;
      }
      
      .menu-name {
        font-size: 24rpx;
        color: #666;
        text-align: center;
      }
    }
  }
}

.stats-card {
  background: #fff;
  margin: 20rpx;
  border-radius: 20rpx;
  padding: 30rpx;
  
  .card-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
    color: #333;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30rpx;
      background: linear-gradient(135deg, #667eea22 0%, #764ba222 100%);
      border-radius: 15rpx;
      
      .stat-value {
        font-size: 48rpx;
        font-weight: bold;
        color: #667eea;
        margin-bottom: 10rpx;
      }
      
      .stat-label {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}
</style>
