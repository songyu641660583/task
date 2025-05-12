<template>
	<view class="taskList">
		<view class="status-list header_top">
			<view class="status-item" v-for="(item, index) in statusList" :key="index" @click="handleActive(index)">
				{{ item.name }}
				<view :style="{ opacity: index === active ? '1' : '0' }"></view>
			</view>

		</view>
		<view class="task-content">
			<view class="task-item" v-for="(item, index) in taskList" :key="index">
         <view class="task-item-icon"> 
					 <image :src="item.icon" mode=""></image>
				 </view>
				 <view class="task-level">
				  	<view>
							<image :src="`/static/images/index/vip-icon${item.task_type}.png`" mode=""></image>
					  <text class="text1">{{item.level_info.name}}</text>
						</view>
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
  const date = new Date(timestamp * 1000); // 乘以 1000 转换为毫秒
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
			statusList: [],
			taskList: [

			]
		}
	},
	created() {
		this.statusList = [
			{ name: this.i18n.statusList[0], id: 1 },
			{ name: this.i18n.statusList[1], id: 2 },
			{ name: this.i18n.statusList[2], id: 3 },
			{ name: this.i18n.statusList[3], id: 4 },
			{ name: this.i18n.statusList[4], id: 5 },
		]
		this.getTaskData()

	},
	methods: {
		getTaskData() {
			const res = [
				{
					id: 1,
					level: 2,
					category: {
						icon: "images/dbf003a9c93739a362253ebc4e622a70.png"
					},
					level_info: {
						name: "皇冠VIP"
					},
					task_type: 1,
					title: '8000',
					amount: '8000',

					created_at: "1663828503"
				},
				{
					id: 1,
					level: 2,
					category: {
						icon: "images/dbf003a9c93739a362253ebc4e622a70.png"
					},
					level_info: {
						name: "皇冠VIP"
					},
					task_type: 1,
					title: '8000',
					amount: '8000',

					created_at: "1663828503"
				},
			]
			this.taskList = res.map((item)=>{
				return {
					...item,
					icon: config.ossBaseUrl + item.category.icon,
					created_at: formatTimestamp(Number(item.created_at))
				}
			})

		},
		handleActive(index) {
			this.active = index
		}
	}
}
</script>

<style lang="less">
.taskList {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #F3F3F3;

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
		.task-item {
			margin-bottom: 20rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			background: #fff;
			&-icon {
				
				image{
					width: 80rpx;
					height: 80rpx;
				}
			}
			.task-level{
				display: inline-block;
				& > view{
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
					width:38rpx;
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
					color: #A3A3A3;
				}
				.amount {
					font-size: 40rpx;
					color: #F30D1C;
					font-weight: 500;
				}
			}

		}
	}
}
</style>
