<template>
	<view class="error">
		{{i18n.networktxt}}
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			i18n(){
				return this.$t('ajaxmess');
			}
		}
	}
</script>

<style>
	.error{ position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;font-size: 40rpx;color: #a3a3a3;}
</style>
