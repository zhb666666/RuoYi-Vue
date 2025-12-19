<template>
  <view class="container">
    <view class="search-bar">
      <input 
        class="search-input" 
        v-model="queryParams.userName" 
        placeholder="请输入用户名称"
        @confirm="handleQuery"
      />
      <button class="search-btn" @click="handleQuery">搜索</button>
      <button class="reset-btn" @click="resetQuery">重置</button>
    </view>
    
    <view class="action-bar">
      <button class="add-btn" @click="handleAdd">新增用户</button>
    </view>
    
    <view class="user-list">
      <view 
        class="user-item" 
        v-for="user in userList" 
        :key="user.userId"
        @click="handleDetail(user)"
      >
        <view class="user-info">
          <image class="avatar" :src="user.avatar || '/static/images/profile.jpg'" mode="aspectFill"></image>
          <view class="info">
            <view class="name-row">
              <text class="nickname">{{ user.nickName }}</text>
              <text :class="['status', user.status === '0' ? 'active' : 'inactive']">
                {{ user.status === '0' ? '正常' : '停用' }}
              </text>
            </view>
            <text class="username">用户名：{{ user.userName }}</text>
            <text class="dept">部门：{{ user.dept ? user.dept.deptName : '-' }}</text>
          </view>
        </view>
        <view class="actions">
          <button class="action-btn edit" @click.stop="handleUpdate(user)">编辑</button>
          <button class="action-btn delete" @click.stop="handleDelete(user)">删除</button>
        </view>
      </view>
    </view>
    
    <view class="pagination">
      <button 
        class="page-btn" 
        :disabled="queryParams.pageNum === 1"
        @click="handlePrevPage"
      >上一页</button>
      <text class="page-info">{{ queryParams.pageNum }} / {{ totalPages }}</text>
      <button 
        class="page-btn" 
        :disabled="queryParams.pageNum >= totalPages"
        @click="handleNextPage"
      >下一页</button>
    </view>
    
    <view class="loading" v-if="loading">
      <text>加载中...</text>
    </view>
  </view>
</template>

<script>
import { listUser, delUser } from '@/api/system/user'

export default {
  data() {
    return {
      userList: [],
      loading: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined
      },
      total: 0
    }
  },
  
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.queryParams.pageSize)
    }
  },
  
  onLoad() {
    this.getList()
  },
  
  methods: {
    getList() {
      this.loading = true
      listUser(this.queryParams).then(response => {
        this.userList = response.rows
        this.total = response.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined
      }
      this.getList()
    },
    
    handleAdd() {
      uni.navigateTo({
        url: '/pages/system/user/edit?type=add'
      })
    },
    
    handleUpdate(row) {
      uni.navigateTo({
        url: '/pages/system/user/edit?type=edit&userId=' + row.userId
      })
    },
    
    handleDetail(row) {
      uni.navigateTo({
        url: '/pages/system/user/detail?userId=' + row.userId
      })
    },
    
    handleDelete(row) {
      uni.showModal({
        title: '提示',
        content: '确定要删除用户"' + row.userName + '"吗？',
        success: (res) => {
          if (res.confirm) {
            delUser(row.userId).then(() => {
              this.$success('删除成功')
              this.getList()
            })
          }
        }
      })
    },
    
    handlePrevPage() {
      if (this.queryParams.pageNum > 1) {
        this.queryParams.pageNum--
        this.getList()
      }
    },
    
    handleNextPage() {
      if (this.queryParams.pageNum < this.totalPages) {
        this.queryParams.pageNum++
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 20rpx;
}

.search-bar {
  background: #fff;
  padding: 20rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  
  .search-input {
    flex: 1;
    height: 60rpx;
    padding: 0 20rpx;
    border: 1rpx solid #ddd;
    border-radius: 10rpx;
    margin-right: 10rpx;
  }
  
  .search-btn, .reset-btn {
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
  }
  
  .search-btn {
    background: #409eff;
    color: #fff;
    margin-right: 10rpx;
  }
  
  .reset-btn {
    background: #f5f5f5;
    color: #666;
  }
}

.action-bar {
  padding: 0 20rpx 20rpx;
  
  .add-btn {
    background: #67c23a;
    color: #fff;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 10rpx;
    font-size: 28rpx;
  }
}

.user-list {
  padding: 0 20rpx;
  
  .user-item {
    background: #fff;
    border-radius: 15rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .user-info {
      display: flex;
      margin-bottom: 20rpx;
      
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        .name-row {
          display: flex;
          align-items: center;
          margin-bottom: 10rpx;
          
          .nickname {
            font-size: 32rpx;
            font-weight: bold;
            color: #333;
            margin-right: 20rpx;
          }
          
          .status {
            padding: 4rpx 16rpx;
            border-radius: 8rpx;
            font-size: 22rpx;
            
            &.active {
              background: #67c23a22;
              color: #67c23a;
            }
            
            &.inactive {
              background: #f56c6c22;
              color: #f56c6c;
            }
          }
        }
        
        .username, .dept {
          font-size: 26rpx;
          color: #666;
          margin-bottom: 5rpx;
        }
      }
    }
    
    .actions {
      display: flex;
      justify-content: flex-end;
      
      .action-btn {
        padding: 10rpx 30rpx;
        font-size: 26rpx;
        border-radius: 8rpx;
        margin-left: 10rpx;
        
        &.edit {
          background: #409eff22;
          color: #409eff;
        }
        
        &.delete {
          background: #f56c6c22;
          color: #f56c6c;
        }
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 20rpx;
  
  .page-btn {
    padding: 10rpx 30rpx;
    font-size: 26rpx;
    background: #409eff;
    color: #fff;
    border-radius: 8rpx;
    
    &[disabled] {
      background: #ccc;
    }
  }
  
  .page-info {
    margin: 0 40rpx;
    font-size: 28rpx;
    color: #666;
  }
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
}
</style>
