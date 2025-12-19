<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <text class="title">若依管理系统</text>
    </view>
    
    <view class="login-form">
      <view class="form-item">
        <view class="input-wrapper">
          <text class="icon">👤</text>
          <input 
            class="input" 
            v-model="loginForm.username" 
            placeholder="请输入用户名" 
            placeholder-style="color: #999"
          />
        </view>
      </view>
      
      <view class="form-item">
        <view class="input-wrapper">
          <text class="icon">🔒</text>
          <input 
            class="input" 
            v-model="loginForm.password" 
            password 
            placeholder="请输入密码"
            placeholder-style="color: #999"
          />
        </view>
      </view>
      
      <view class="form-item" v-if="captchaEnabled">
        <view class="input-wrapper captcha-wrapper">
          <text class="icon">🔐</text>
          <input 
            class="input captcha-input" 
            v-model="loginForm.code" 
            placeholder="请输入验证码"
            placeholder-style="color: #999"
          />
          <image 
            class="captcha-img" 
            :src="codeUrl" 
            @click="getCode"
            mode="aspectFit"
          ></image>
        </view>
      </view>
      
      <button class="login-btn" @click="handleLogin" :loading="loading">
        {{ loading ? '登录中...' : '登 录' }}
      </button>
    </view>
  </view>
</template>

<script>
import { getCodeImg } from '@/api/login'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      codeUrl: '',
      loading: false,
      captchaEnabled: true
    }
  },
  
  onLoad() {
    this.getCode()
  },
  
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
        if (this.captchaEnabled) {
          this.codeUrl = 'data:image/gif;base64,' + res.img
          this.loginForm.uuid = res.uuid
        }
      })
    },
    
    handleLogin() {
      if (!this.loginForm.username) {
        this.$toast('请输入用户名')
        return
      }
      if (!this.loginForm.password) {
        this.$toast('请输入密码')
        return
      }
      if (this.captchaEnabled && !this.loginForm.code) {
        this.$toast('请输入验证码')
        return
      }
      
      this.loading = true
      this.$store.dispatch('Login', this.loginForm).then(() => {
        this.$store.dispatch('GetInfo').then(() => {
          this.loading = false
          uni.switchTab({
            url: '/pages/index/index'
          })
        })
      }).catch(() => {
        this.loading = false
        if (this.captchaEnabled) {
          this.getCode()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 60rpx;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80rpx;
  
  .logo {
    width: 160rpx;
    height: 160rpx;
    margin-bottom: 30rpx;
  }
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #fff;
  }
}

.login-form {
  width: 100%;
  background: #fff;
  border-radius: 20rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
  
  .form-item {
    margin-bottom: 30rpx;
    
    .input-wrapper {
      display: flex;
      align-items: center;
      background: #f5f5f5;
      border-radius: 10rpx;
      padding: 20rpx;
      
      .icon {
        font-size: 40rpx;
        margin-right: 20rpx;
      }
      
      .input {
        flex: 1;
        font-size: 28rpx;
        height: 50rpx;
        line-height: 50rpx;
      }
    }
    
    .captcha-wrapper {
      .captcha-input {
        flex: 1;
      }
      
      .captcha-img {
        width: 200rpx;
        height: 70rpx;
        margin-left: 20rpx;
        border-radius: 5rpx;
      }
    }
  }
  
  .login-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 32rpx;
    font-weight: bold;
    border-radius: 10rpx;
    border: none;
    margin-top: 40rpx;
  }
}
</style>
