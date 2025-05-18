<template>
  <view class="taskList">
    <view class="status-list header_top">
      <view
        class="status-item"
        v-for="(item, index) in statusList"
        :key="index"
        @click="handleActive(index)"
      >
        {{ item.name }}
        <view :style="{ opacity: index === active ? '1' : '0' }"></view>
      </view>
    </view>
    <view class="task-content">
      <view class="task-item" v-for="(item, index) in taskList" :key="index">
        <view class="task-item-icon">
          <!-- <image :src="item.icon" mode=""></image> -->
        </view>
        <view class="task-flex">
          <view class="task-level">
            <view>
              <image
                :src="`/static/images/index/vip-icon${item.task_type}.png`"
                mode=""
              ></image>
              <text class="text1">{{ item.amount }}</text>
            </view>
          </view>
          <view class="like"> 要求：<text>喜欢</text> </view>
        </view>

        <view class="task-bottom">
          <view class="time">{{ item.created_at }}</view>
          <view class="amount">${{ item.amount }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import config from '@/service/config.js'

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000) // 乘以 1000 转换为毫秒

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default {
  computed: {
    i18n() {
      return this.$t('tasklist')
    }
  },
  data() {
    return {
      active: 0,
      page: 1,
      statusList: [],
      taskList: []
    }
  },
  created() {
    this.statusList = [
      { name: this.i18n.statusList[0], id: 0 },
      { name: this.i18n.statusList[1], id: 1 },
      { name: this.i18n.statusList[2], id: 2 },
      { name: this.i18n.statusList[3], id: 4 },
      { name: this.i18n.statusList[4], id: 5 }
    ]
    this.getTaskData()
  },
  methods: {
    async getTaskData() {
      let res = await this.$http.userTaskList({
        type: 0,
        page: this.page
      })

      const data = res.result.data.map((item) => {
        return {
          ...item,
          // icon: config.ossBaseUrl + item.category.icon,
          created_at: formatTimestamp(Number(item.created_at))
        }
      })
      if (this.page === 1) {
        this.taskList = data
      } else {
        this.taskList.data.push(...data)
      }
    },
    handleActive(index) {
			this.page = 1
			 this.taskList= []
      this.active = index
			this.getTaskData()
    }
  }
}
</script>

<style lang="less">
.taskList {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f3f3f3;

  .status-list {
    flex: none;
    padding-left: 10rpx;
    padding-right: 10rpx;
    padding-bottom: 50rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    .status-item {
      position: relative;

      view {
        position: absolute;
        left: 0;
        right: 0;
        height: 6rpx;
        bottom: -26rpx;
        border-radius: 20px;
        background-color: #3d5cff;
      }
    }
  }

  .task-content {
    width: 100%;
    flex: auto;
    overflow-y: auto;
    padding: 20rpx 30rpx;

    .task-flex {
      display: flex;
      align-items: center;
      gap: 20rpx;
    }

    .like {
      padding: 12rpx 16rpx;
      border-radius: 120rpx;
      border: 1px solid #979797;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #666;

      text {
        color: #3d5cff;
      }
    }

    .task-item {
      margin-bottom: 20rpx;
      padding: 20rpx;
      border-radius: 20rpx;
      background: #fff;

      &-icon {
        image {
          width: 80rpx;
          height: 80rpx;
        }
      }

      .task-level {
        display: inline-block;

        & > view {
          padding: 8rpx 16rpx;
          display: flex;
          align-items: center;
          background: #3d5cff;
          border-radius: 50px;
          font-family: DIN;
          font-weight: 600;
          font-size: 26rpx;
          color: #fff;

          image {
            width: 38rpx;
            height: 38rpx;
          }
        }
      }

      .task-bottom {
        margin-top: 12rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .time {
          font-size: 24rpx;
          color: #a3a3a3;
        }

        .amount {
          font-size: 44rpx;
          color: #f30d1c;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
