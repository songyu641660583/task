<template>
	<view class="header_top">
		<loading-plus v-if="isShow"></loading-plus>
		<public-head :title="i18n.title"></public-head>
		<view class="record-list">
			<block v-for="(item, index) in pageData.data" :key="index">
				<record-item :index="index">
					<template v-slot:item>
						<view style="display: flex; align-items: center;height: 100%;">
							<view class="left">
								<view class="title">{{ item.task.title }}</view>
								<view class="time">{{i18n.taskdate}} {{ formatTimestamp(item.created_at) }}</view>
							</view>
							<view class="right" style="margin-left: 40rpx;color: #f40;">{{ item.amount | formatPrice }}</view>
						</view>
					</template>
					<template v-slot:btn>
						<view class="item1" @click="openUrl(item.task.url)">
							<image src="/static/images/profile/task.png" mode="" style="width: 52rpx;height: 42rpx;margin-right: 15rpx;"></image>
							<text>{{i18n.tasklist[0]}}</text>
						</view>
						<view class="item1" @click="navTo('/pages/profile/submit-task?name=' + item.task.title + '&amount=' + item.amount + '&id=' + item.id)">
							<image src="/static/images/profile/icon_shangchuan.png " mode="" style="width: 52rpx;height: 42rpx;margin-right: 15rpx;"></image>
							<text>{{i18n.tasklist[1]}}</text>
						</view>
						<view class="item1" @click="taskCancel(item.id, index)">
							<image src="/static/images/profile/icon_del.png" mode="" style="width: 37rpx;height: 39rpx;margin-right: 15rpx;"></image>
							<text>{{i18n.tasklist[2]}}</text>
						</view>
					</template>
				</record-item>
			</block>
		</view>
		<uni-load-more :status="status" v-if="pageData.data.length > 10"></uni-load-more>
		<view class="empty" v-if="pageData.data.length == 0">{{i18n.info}}</view>
	</view>
</template>

<script>
import loadMore from '@/utils/mixin/loadMore.js';
export default {
	mixins: [loadMore],
	data() {
		return {
			isShow:true
		};
	},
	computed:{
		i18n(){
			return this.$t('protask');
		}
	},
	methods: {
		formatTimestamp(timestamp) {
			const date = new Date(timestamp * 1000) // 乘以 1000 转换为毫秒

			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始
			const day = String(date.getDate()).padStart(2, '0')
			const hours = String(date.getHours()).padStart(2, '0')
			const minutes = String(date.getMinutes()).padStart(2, '0')
			const seconds = String(date.getSeconds()).padStart(2, '0')

			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
		},

		navTo(url) {
			uni.navigateTo({ url });
		},
		async getData() {
			let res = await this.$http.userTaskList({
				type: 0,
				page: this.page
			});
			let data = []
      res.result.data.forEach((item) => {
        if (item.task) {
          data.push( item)
        }
      })
			if (this.page === 1) {
				this.pageData.data = data;
			} else {
				this.pageData.data.push(...data);
			}
			// console.log(res);
		},
		taskCancel(id, index) {
			uni.showModal({
				title: this.i18n.modalinfo,
				content: '',
				success: async res => {
					if (res.confirm) {
						await this.$http.taskCancel({ id });
						this.pageData.data.splice(index, 1);
					}
				}
			});
		},
		openUrl(url) {
			// #ifdef APP-PLUS
				plus.runtime.openWeb(url);
			// #endif
			// #ifdef H5
				window.open(url)
			// #endif
		}
	},
	onShow() {
		this.getData();
		setTimeout(()=>{
			this.isShow = false
		},1000)
	}
};
</script>

<style lang="less">
.bd {
	position: fixed;
	top: 80rpx;
	/* #ifdef APP-PLUS */
	top: 0;
	/* #endif */
	width: 100%;
	height: 160rpx;
	background-color: #080d5d;
}
.record-list {
	position: relative;
	top: 176rpx;
	z-index: 10;
	margin-top: -130rpx;
	margin-bottom: 200rpx;
	.title {
		width: 350rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #212121;
		font-size: 32rpx;
	}
	.time {
		color: #c0c0c0;
		font-size: 26rpx;
		margin-top: 22rpx;
	}
	.item1 {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #4a4a4a;
		font-size: 30rpx;
		text {
			font-size: 28rpx;
		}
	}
}
.empty {
	text-align: center;
	margin-top: 450rpx;
	color: rgb(119, 119, 119);
	font-size: 30rpx;
}
</style>
