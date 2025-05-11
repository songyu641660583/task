<template>
	<view class="task-list header_top">
		<!-- <loading-plus v-if="isShow"></loading-plus> -->
		<public-head :title="i18ntitle.title" headshow :backicon="false"></public-head>
		<!-- <view @click="navTo('/pages/imitate/mould')">sdfffffffffffffffff</view> -->
		<view class="task-status">
			<view class="task-item" :class="{'active':listindex==index}" v-for="(item,index) in i18n.listjson" :key="index">
				<text @click="muneclick(index)">{{item}}</text>
			</view>
		</view>
		<view class="">
			<trade-list v-if="listindex == 0"></trade-list>
			<task-two ref="tasktype" v-else></task-two>
		</view>
	</view>
</template>

<script>
import tradeList from '@/pages/task/component/task-one.vue'
import taskTwo from '@/pages/task/task-two.vue'
import loadMore from '@/utils/mixin/loadMore.js'
export default {
	mixins:[loadMore],
	components:{tradeList,taskTwo},
	data() {
		return {
			type:'',
			isShow:true,
			listindex:0
		};
	},
	computed:{
		i18n(){
			return this.$t('pagesprofile');
		},
		i18ntitle(){
			return this.$t('protask');
		}
	},
	methods: {
		navTo(url) {
			console.log(1111)
			uni.setStorageSync('webboon',true)
			// #ifdef APP-PLUS
				plus.runtime.openURL(encodeURI(res.result))
			// #endif
			// #ifdef H5
				setTimeout(function(){
					window.open('http://localhost:8080/#/pages/imitate/mould','_blank');
				},200)
			// #endif
			// uni.navigateTo({url:url})
		},
		muneclick(index){
			this.listindex = index
			if(index < 1) return
			this.$refs.tasktype.loadjson(index)
		}
	},
	onLoad() {
		
	}
};
</script>

<style lang="scss">
	
	
.task-status {
	display: flex;
	align-items: center;
	width: 100%;
	height: 90rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	border-bottom: 1px solid #f7f7f7;
	.task-item {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #333333;
		text{ position: relative;}
		&.active{ color: #1b2664;
			text::after{ content: '';position: absolute;bottom: -22rpx;width: 100%;left: 0;border-bottom: 2px solid #1b2664;}
		}
	}
}
</style>
