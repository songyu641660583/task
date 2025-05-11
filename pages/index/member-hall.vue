<template>
	<view class="header_top">
		
		<loading-plus v-if="isShow"></loading-plus>
		<public-head headshow :title="i18n.title"></public-head>
		<!-- <fh-tab-control :tabItem="tabItem" @itemClick="itemClick" :tabIndex="tabIndex1" :isBorder="true" :sliderWidth="42" :bottom="0"></fh-tab-control> -->
		<view class="member_content">
			<view class="c-item" v-for="(item, index) in pageData.data" :key="index" @click="toDetail(item)">
				<view class="item-l">
					<view class="l-img"><image :src="item.category.icon" mode=""></image></view>
				</view>
				<view class="item-c">
					<view class="c-title">{{ item.title }}</view>
					<view class="c-tag">
						<image src="/static/images/index/icon_huangguan.png" mode=""></image>
						<text>{{ item.level_info.name }}</text>
					</view>
					<view class="c-number">{{i18n.numtxt}}： {{ item.remaining_quantity }}</view>
				</view>
				<view class="item-r">
					<view>
						<text>{{ item.amount | formatPrice }}</text>
						<image src="/static/images/index/icon_big_xiala.png" mode=""></image>
					</view>
					<block v-if="item.commission > 0">
						<view class="tasktype">{{i18n.bkge}}：{{item.commission | formatPrice}}</view>
						<view class="tasktype">{{i18n.money}}：{{item.task_price | formatPrice}}</view>
					</block>
					<view class="tasktype" v-else>{{ i18n.halltask[item.task_type] }}</view>
				</view>
			</view>
			<uni-load-more :status="status" v-if="pageData.data.length > 10"></uni-load-more>
			<view style="text-align: center;" v-if="pageData.data.length === 0">
				<image src="/static/images/index/pic_zanwu.png" style="width: 450rpx;height: 230rpx;margin-top: 400rpx;"></image>
				<view style="color: #615f60;font-size: 28rpx;margin-top: 50rpx;">{{i18n.listinfo}}</view>
			</view>
		</view>
	</view>
</template>

<script>
import config from '@/service/config.js'
import loadMore from '@/utils/mixin/loadMore.js'
export default {
	mixins:[loadMore],
	data() {
		return {
			list: [],
			level: '',
			tabIndex: '',
			isShow:true
		};
	},
	methods: {
		async getTaskCategory() {
			let res = await this.$http.taskCategory();
			// console.log(res);
			this.list = res.result;
		},
		async itemClick(index) {
			this.isShow = true;
			this.tabIndex = index;
			// console.log(this.tabIndex);
			this.page = 1;
			this.getData();
		},
		async getData() {
			let res = await this.$http.task({
				category_id: this.tabIndex,
				level: this.level,
				page: this.page
			});
			res.result.data.forEach((item)=>{
				item.category.icon = config.ossBaseUrl+item.category.icon
			})
			console.log(res, 1111111);
			if (this.page === 1) {
				this.pageData = res.result;
			} else {
				this.pageData.data.push(...res.result.data);
			}
			this.isShow = false;
		},
		toDetail(item) {
			if(item.tpl_id == 1){
				uni.navigateTo({
					url:"/pages/imitate/index?data="+JSON.stringify(item)
				})
			}else if(item.tpl_id == 3){
				uni.navigateTo({
					url:"/pages/imitate/mould_am?data="+JSON.stringify(item)
				})
			}else{
				uni.navigateTo({
					url:"/pages/index/task-detail?id="+item.id
				})
			}
			
		}
	},
	computed: {
		tabItem() {
			let arr = [];
			this.list.forEach(item => {
				arr.push(item.name);
			});
			return arr;
		},
		tabId() {
			let arr = [];
			this.list.forEach(item => {
				arr.push(item.id);
			});
			return arr;
		},
		i18n(){
			return this.$t('memberhall');
		}
	},
	onShow() {
		this.itemClick(this.levelindex);
		setTimeout(()=>{
			if(this.isShow){
				this.isShow = false;
			}
		},8000)
	},
	onLoad(options) {
		// console.log(options)
		this.level = options.level;
		this.levelindex = options.levelindex;
		this.itemClick(this.levelindex);
	}
};
</script>

<style lang="less">
.member_content{ padding-top: 20px;}
.c-item {
	display: flex;
	width: 680rpx;
	background-color: #ffffff;
	box-shadow: 0px 6rpx 32rpx 0px rgba(0, 35, 68, 0.14);
	border-radius: 34rpx;
	margin: 0 auto 32rpx;
	padding: 10px 0;
	.item-l {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 2;
		.l-img {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 105rpx;
			height: 105rpx;
			border-radius: 50%;
			background-color: #ebebf3;
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.item-c {
		padding-top: 10rpx;
		flex: 4;
		.c-title {
			color: #1a2564;
			line-height: 36rpx;
			font-size: 26rpx;

			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.c-tag {
			display: flex;
			align-items: flex-end;
			margin: 10rpx 0;
			image {
				width: 19rpx;
				height: 19rpx;
				margin-right: 12rpx;
			}
			text {
				color: #ffbd55;
				font-size: 18rpx;
			}
		}
		.c-number {
			color: #1a2564;
			font-size: 18rpx;
			margin-top: 20rpx;
		}
	}
	.item-r {
		flex: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text {
			color: #fb5081;
			font-size: 24rpx;
		}
		image {
			width: 8rpx;
			height: 16rpx;
			margin-left: 20rpx;
		}
		.tasktype{ margin-top: 10px;font-size: 14px;color: #f325f3;padding-right: 10px;}
	}
}
</style>
