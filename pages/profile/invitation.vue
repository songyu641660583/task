<template>
	<view class="invitation header_top">
		<public-head :title="i18n.title"></public-head>

		<view class="module">
			<view class="module-title">{{ i18n.qrText }}</view>

			<tki-qrcode
				class="code_img"
				cid="qrcode1"
				ref="qrcode"
				:val="val"
				:size="size"
				:unit="unit"
				:background="background"
				:pdground="pdground"
				:icon="icon"
				:iconSize="iconsize"
				:lv="lv"
				:onval="onval"
				:loadMake="loadMake"
				:usingComponents="true"
				@result="qrR"
			/>
			<!-- <image src="/static/images/profile/pic_erweima.png" mode="" ></image> -->
			<!-- <view class="click" @click="capture"></view> -->
			<!-- <view class="code_text">{{i18n.code}} {{info.id}}</view> -->
			<view class="module-title">{{ i18n.linkText }}</view>
			<view class="link-value">{{ val }}</view>
			<view class="module-tips">
				{{ i18n.tips }}
			</view>
			<view class="module-tips" style="margin-top:20rpx">
				{{ i18n.tips2 }} <text @click="kefu_btn">{{ i18n.tips3 }}</text>
			</view>
			<view class="load-btn" @click="onCopyResult">{{ i18n.codebtn }}</view>
		</view>
	</view>
</template>

<script>
import config from '@/service/config.js'
export default {
	data() {
		return {
			invishow: false,
			back_img: '/static/images/profile/haibao.png',
			val: '', // 要生成的二维码值
			size: 360, // 二维码大小
			unit: 'upx', // 单位
			background: '#fff', // 背景色
			pdground: '#000', // 角标色
			icon: '', // 二维码图标
			iconsize: 80, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: true, // val值变化时自动重新生成二维码
			loadMake: false, // 组件加载完成后自动生成二维码
			src: '',// 二维码生成后的图片地址或base64
			info: '',
			promotionCopyData: '',
			linkValue: 'https;:1111',
		}
	},
	methods: {
		async kefu_btn(){
      window.open('https://wa.me/34666139238', '_blank')
			// // #ifdef H5
			// 	let winhref = window.open('','_blank');
			// // #endif
			// 	let res = await this.$http.customerUrl();
			// // #ifdef APP-PLUS
			// 	plus.runtime.openURL(encodeURI(res.result))
			// // #endif
			// // #ifdef H5
			// 	winhref.location = res.result;
			// // #endif
		},
		onCopyResult() {
			uni.setClipboardData({
				data: this.val,
				showToast: false,
				success:() =>{
					uni.showToast({
						title: this.i18n.copysucc,
						icon: 'success'
					})
				}
			})
		},
		creatQrcode() {
			setTimeout(() => {
				this.$refs.qrcode._makeCode()
			}, 500)
		},
		// saveQrcode() {
		// 	this.$refs.qrcode._saveCode()
		// },
		qrR(res) {
			this.src = res
		},
		capture() {
			var pages = getCurrentPages()
			var page = pages[pages.length - 1]
			// console.log('当前页' + pages.length - 1);
			var bitmap = null, that = this
			var currentWebview = page.$getAppWebview()
			bitmap = new plus.nativeObj.Bitmap('amway_img')
			// 将webview内容绘制到Bitmap对象中
			currentWebview.draw(
				bitmap,
				function () {
					// console.log('截屏绘制图片成功');
					bitmap.save(
						'_doc/a.jpg',
						{},
						function (i) {
							console.log('保存图片成功：' + JSON.stringify(i))
							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function () {
									bitmap.clear() //销毁Bitmap图片
									uni.showToast({
										title: that.i18n.modalinfo,
										mask: false,
										duration: 1500
									})
								}
							})
						},
						function (e) {
							console.log('保存图片失败：' + JSON.stringify(e))
						}
					)
				},
				function (e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e))
				}
			)
			//currentWebview.append(amway_bit);
		}
	},


	computed: {
		i18n() {
			return this.$t('invitation')
		}
	},
	async onShow() {
		let res = await this.$http.promotionCopy()
		console.log(res);
		this.promotionCopyData = res.result.tg_url
		this.val = res.result.tg_url

	},
	onLoad(options) {
		//this.val = config.apiBaseUrl + 'view/register?invitation_code=' + options.id;
		// this.val = 'http://6v8ij.hrtxcp.cn/v1/view/register?invitation_code=' + options.id;
		let that = this
		this.info = options
		this.linkValue += options.id
		this.$http.requestajx('help/invitation_back_image', 'get', {}).then(function (res) {
			let data = res.result
			console.log(data)
			that.back_img = data
			that.invishow = true
		})
		this.$http.requestajx('team/app_download_url', 'get', {}).then(function (res) {
			that.promotionCopyData = res.result.tg_url
			that.val = res.result.tg_url
		})

		// #ifdef APP-PLUS
		this.creatQrcode()
		// #endif
	}
}
</script>

<style lang="scss">
.module {
	margin: 20rpx;
	padding: 25rpx;
	border-radius: 20rpx;
	box-shadow: 0 1px 2px rgba(150, 150, 150, 0.3);
	background-color: #fff;
	&-title {
		font-size: 32rpx;
		font-weight: 500;
	}
	&-tips {
		line-height: 36rpx;
		color: #666;
		text {
			color: #3C5BFF;
		}

	}
	.link-value {
	margin-top: 24rpx;
	background: #f8f9fa;
	border-radius: 8px;
	padding: 12px 16px;
	font-size: 14px;
	color: #555;
	border: 1px solid #e9ecef;
	word-break: break-all;
	margin-bottom: 16px;
	position: relative;
	line-height: 32rpx;
}
}

.invitation {
	width: 100%;
	background-color: #f7f9fc;
	height: 100vh;

	.code_img {
		margin: 40rpx 0;
		width: 100%;
		text-align: center;
	}

	.load-btn {
		margin: 20px 0;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #1C2663;
		border-radius: 20rpx;
		color: #fff;
	}

	.click {
		position: absolute;
		bottom: 280rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 300rpx;
		height: 80rpx;
	}

	.code_text {
		margin-top: 20px;
		color: #fff;
		text-align: center;
		font-weight: bold;
	}
}
</style>