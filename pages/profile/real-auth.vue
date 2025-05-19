<template>
	<view class="auth header_top">
		<public-head :title="i18n.title"></public-head>
		<loading-plus v-if="beforeReady"></loading-plus>
		<view class="acc_form">
			<form @submit="formSubmit">
				<view>
					<uni-section title="姓名" type="line" style="padding-bottom: 15rpx;">
						<view class="section-wrap">
							<input type="text" :placeholder="i18n.realName" placeholder-style="color:#b8b8b8;font-size:30rpx"
								v-model="realName" />
						</view>
					</uni-section>

					<uni-section title="身份证号码" type="line" style="padding-bottom: 15rpx;">
						<view class="section-wrap">
							<input type="text" :placeholder="i18n.idCard" placeholder-style="color:#b8b8b8;font-size:30rpx"
								v-model="idCard" />
						</view>
					</uni-section>
					<uni-section title="身份证人像面" type="line">
						<view class="section-wrap">
							<uni-file-picker :auto-upload="false" @select="(e) => onSelect(e, 'frontIdCard')" limit="1"
								fileMediatype="image" :image-styles="{
									width: '100%',
									height: 164
								}"></uni-file-picker>
						</view>
					</uni-section>
					<uni-section title="身份证国徽面" type="line" style="padding-bottom: 15rpx;">
						<view class="section-wrap">
							<uni-file-picker :auto-upload="false" @select="(e) => onSelect(e, 'backIdCard')" limit="1"
								fileMediatype="image" :image-styles="{
									width: '100%',
									height: 164
								}"></uni-file-picker>
						</view>
					</uni-section>

				</view>
				<button class="btn" form-type="submit">{{ i18n.formbtn }}</button>
			</form>
		</view>
	</view>
</template>

<script>
import loading from "@/utils/mixin/loading.js"
export default {
	mixins: [loading],
	data() {
		return {
			isclick: true,
			realName: '',
			idCard: '',
			frontIdCard: '',
			backIdCard: ''
		}
	},
	computed: {
		i18n() {
			return this.$t('auth')
		},
		i18n2(){
			return this.$t('submittask');
		},
	},
	methods: {

		onSelect(e, type) {

			const tempFilePaths = e.tempFiles
			this.uploadFile(tempFilePaths[0], type)
		},
		async uploadFile(file, type) {
			uni.showLoading({
				title: '上传中...'
			})
			const filesize = file.size / 1024 / 1024;
			if(filesize > 10){
				this.totat(this.i18n2.modelinfo);
				return false;
			}
			
			this.$http.uploadajax('upload',file.path,{},'image').then((res) => {
				this[type] = res.result.uri
				uni.hideLoading()

			}).catch(err => {
				uni.hideLoading()
			})

		},
		formSubmit(e) {
			if (this.isclick) {
				this.isclick = false
			} else {
				return this.isclick
			}
			if(!this.realName){
				this.totat(this.i18n.realName);
				return
			}
			if(!this.idCard){
				this.totat(this.i18n.idCard);
				return
			}
			if(!this.frontIdCard){
				this.totat(this.i18n.frontIdCard);
				return
			}

			if(!this.backIdCard){
				this.totat(this.i18n.backIdCard);
				return
			}
			uni.showLoading({
				title: '提交中...'
			})
			this.$http.requestajx('account/verify', 'put', {
				realname: this.realName,
				id_card: this.idCard,
				front_id_card: this.frontIdCard,
				back_id_card: this.backIdCard,
			}).then((res) => {
				this.totat(this.i18n.totatinfo)
				uni.hideLoading()
				setTimeout(() => {
					uni.hideToast()
					uni.navigateBack()
				}, 1000)
			})
			setTimeout(() => {
				this.isclick = true
			}, 3000)
		},


	},
	onLoad() {
	},
	onShow() {
		// this.getBankList()
	}
}
</script>

<style lang="less">
.auth {
	background-color: #f7f9fc;
	min-height: 100vh;

	.section-wrap {
		padding: 0 15rpx;
	}

}

.file-picker__box {
	width: 100% !important;
}

.acc_form {
	padding: 12px 0;
}

.form_item {
	position: relative;
	height: 45px;
	display: flex;
	align-items: center;
	font-size: 28rpx;
	background-color: #FFFFFF;
	margin-bottom: 1px;

	.form_title {
		position: absolute;
		left: 15px;
		color: #2d2933;
		max-width: 110px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

		text {
			color: #f62f3d;
		}
	}

	.form_input {
		width: 100%;
		padding-left: 120px;
		padding-right: 15px;
		color: #333;

		.place {
			color: #c5c5c5;
			font-size: 28rpx;
		}

		&.text-right {
			text-align: right;
		}

		input {
			padding-left: 10px;
		}
	}

	&.active {
		margin-bottom: 12px;
		margin-top: 12px;
		background-color: #F5F5F5;
		color: #848080;
	}
}

.form_info {
	font-size: 12px;
	color: #f62f3d;
	margin-top: 30px;
	padding: 0 15px;
	line-height: 17px;
}

.btn {
	// position: absolute;
	// left: 0;
	// right: 0;
	// bottom: 250rpx;
	margin: 40rpx auto;
}
</style>