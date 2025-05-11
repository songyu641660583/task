<template>
	<view class="header_top">
		<public-head headshow :title="i18n.listtitle"></public-head>
		<view class="tasklist_content">
			<view class="task_list">
				<view class="task_item" v-for="(item,index) in tasklist" :key="index">
					<navigator class="task_li" :url="'/pages/index/member-hall?level='+level+'&levelindex='+item.id">
						<image :src="$configurl.ossBaseUrl+item.icon"></image>{{item.name}}
					</navigator>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				level:0,
				tasklist:[]
			}
		},
		computed:{
			i18n () {
			  return this.$t('index');  
			}
		},
		methods:{
			
		},
		onLoad(option) {console.log(option.level)
			this.level = option.level;
			let that = this;
			this.$http.requestajx('index','get',{}).then((res) => {
				that.tasklist = res.result.task_category;
				console.log(that.tasklist);
			}).catch((error) => {
				console.log('错误重启');
			});
		}
	}
</script>

<style lang="scss">
	.tasklist_content{ padding: 20px;}
	.task_item{ padding: 8px;width: 100%;
		.task_li{box-shadow: 0 3px 17px 0 rgba(0, 35, 68, 0.14);border-radius: 5px;padding: 40rpx 0 40rpx 50rpx;align-items: center;display: flex;}
		image{ width: 40px;height: 40px;margin-right: 18px;}
	}
</style>
