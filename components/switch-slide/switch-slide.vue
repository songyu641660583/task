<template>
	<view class="content" v-if="show">
		<view class="checkWrap" :style="'width:'+(barWidth)+'rpx'">
			<view class="checkBox">
				<view class="checkBar">
					<view class="slide" :class="{'active':isSuccess}">
						<view :class="'moveBac '+(isAnimation?'animation':'')+(isSuccess?' moveBacSuccess':'')" :style="'width:'+(blockLeft+86)+'rpx;background-color:'+swiperColor"></view>
						<view :class="(isSuccess?'swiperTipsSuccess':'swiperTips')">{{isSuccess? i18n.switchsucc : i18n.switchinfo}}</view>
						<view :class="'swiperBlock '+(isAnimation?'animation':'')+(isSuccess?' successBlock':'') "  :style="'left:'+blockLeft+'rpx'"  @touchstart="touchstartHandle"  @touchmove.stop.prevent="touchmoveHandle"  @touchend="touchendHandle"  ></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		swiperColor: {
			type: String,
			default: '#009cd0'
		},
		title: {
			type: String,
			default: '人机校验'
		},
		barWidth:{
			type:Number,
			default:540
		}
	},
	data() {
		return {
			startInfo:{},
			blockLeft:0,
			isAnimation:false,
			isSuccess:false
		};
	},
	computed: {
		i18n(){
			return this.$t('register');
		},
		trueMoveableW:function(){
			return this.barWidth - 86
		}
	},
	watch:{
		show:function(val){
			if(!val){
				this.blockLeft=0
				this.isSuccess=false
			}
		}
	},
	created() {},
	mounted() {},
	methods: {
		//手指按下
		touchstartHandle({changedTouches}){
			if(this.isSuccess){
				return
			}
			this.isAnimation=false
			this.startInfo=changedTouches[0]
		},
		// 手指移动
		touchmoveHandle({changedTouches}){
			if(this.isSuccess){
				return
			}
			let blockLeft=changedTouches[0].clientX-this.startInfo.clientX
			let blockLeftRpx = blockLeft/(uni.upx2px(100)/100)
			if(blockLeftRpx<0){
				this.blockLeft=0
			}else{
				this.blockLeft=blockLeftRpx<=this.trueMoveableW?blockLeftRpx:this.trueMoveableW
			}
		},
		// 手指离开
		touchendHandle(e){
			if(this.isSuccess){
				return
			}
			if(this.trueMoveableW===this.blockLeft){
				this.isSuccess=true
				this.$emit('checkResult',{
					detail:true
				})
			}else{
				this.isAnimation=true
				let timeid=setTimeout(()=>{
					clearTimeout(timeid)
					this.isAnimation=false
				},500)
				this.blockLeft=0
				this.$emit('checkResult',{
					detail:false
				})
			}
		},
		closeHumanCheckHandle(){
			this.$emit('close')
		}
	}
};
</script>

<style lang="scss">
/* .content {
	position: fixed;
	background-color:rgb(51,51,51,0.8);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1001;
} */
.checkWrap {
	width: 540rpx;
	border-radius: 8rpx;
	background-color: #ffffff;
	overflow: hidden;
}
.checkWrap .title {
	color: #808080;
	font-size: 30rpx;
	padding: 16rpx;
	display: flex;
	justify-content: space-between;
}

.checkWrap .checkBox {
	/* background-color: #f2f2f2; */
}
.checkBox .checkBar {
	width: 100%;
	/* padding: 16rpx; */
}
.checkBox{
	.slide {
		width: 100%;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 30px;
		background-color: #fafafa;
		position: relative;
		font-size: 26rpx;
		overflow: hidden;
		&.active{ background-color: #06a17e;}
	}
} 
.moveBac{
	background-color: #009cd0;
	width: 100%;
	height: 100%;
	border-radius: 30px;
}
.moveBacSuccess{
	background-color: #06a17e !important;
}
.swiperTips{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	color: #FFFFFF;
	text-align: center;
	background: -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
	animation: tipsBlinkan 3s infinite;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.swiperTipsSuccess{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	text-align: center;
	color: #FFFFFF;
}
.slide .swiperBlock {
	width: 86rpx;
	height: 100%;
	border-radius: 8rpx;
	background-color: #fff;
	/* box-shadow: 0 0 6px 1px #b3b3b3; */
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAJcklEQVR4Xu2dv2tVZxjHT3K5LnWwDi7i1rXS4RJNiKCTkKFC9i6dCy3ov9CtBf0T/Aukg5mcQvGSENzc24wXKUiXkJhYQqMEvTfP+z7nPcfzfp9P1/fHOd/P8/3khtDEpffv348a/oMABOYSWEIQmgGBxQQQhHZA4AICCEI9IIAgdAACPgJ8gvi4cSoIAQQJMmhi+gggiI8bp4IQQJAggyamjwCC+LhxKggBBAkyaGL6CCCIjxunghBAkCCDJqaPAIL4uHEqCAEECTJoYvoIIIiPG6eCEECQIIMmpo8Agvi4cSoIAQQJMmhi+gggiI8bp4IQQJAggyamjwCC+LhxKggBBAkyaGL6CCCIjxunghBAkCCDJqaPAIL4uHEqCAEECTJoYvoIIIiPG6eCEECQIIMmpo8Agvi4cSoIAQQJMmhi+gggiI8bp4IQQJAggyamjwCC+LhxKggBBAkyaGL6CCCIjxunghBAkCCDJqaPAIL4uHEqCAEECTJoYvoIIIiPG6eCEECQIIMmpo8Agvi4cSoIAQQJMmhi+gggiI8bp4IQQJAggyamj4CEIHfu3PluaWnpaHt7+7UPwzBOqeQYBs0yb1G1IKurqw+Ojo6eNk1z+QzH2/F4/MN0Ot0qg6efW1Ry9EOr36dUK8j6+vr9g4OD5/NwjUajhzs7O0/6Rel7mkoOX/rhn6pWkMlk8nfTNNcXIV5eXn60u7v7eOgjUMkxdM7e96tSkI2Njauz2WxmhR76J4lKDmsONa9XKcjm5uaV/f39NynghyyJSo6UOdS6p0pBTmFPJpNXTdPcTAE/5G+3VHKkzKHGPdUKsra2dvfw8PBFKvShfpKo5EidQ237qhXkFPStW7d+Pj4+/j0V+lAlUcmROoea9lUtCJLU8aPsmoT49F2rFwRJkKRLASUEQRIk6UoSGUGQBEm6kERKECRBktKSyAmCJEhSUhJJQZAESUpJIisIkiBJCUmkBUESJGkribwgSIIkbSQJIQiSIIlXkjCCIAmSeCQJJQiSIEmuJOEEQRIkyZEkpCBIgiSpkoQVBEmQJEWS0IIgCZJYkoQXBEmQ5CJJEOSMjsqvvarksL6y97WOIOdIq5RLJUdfEvAJkkFapVwqOTJG18lWPkHmYFUpl0qOTpqfeCmCLAClUi6VHIl9Lr4NQS5AqlIulRzF259wIYIYkFTKpZIjodNFtyBIAk6VcqnkSBhZsS0IkohSpVwqORLH1nobgmQgVCmXSo6M0bm3IkgmOpVyqeTIHF/2dgTJRsZflXcgq/YIgjhHp/IVWCWHc4zmMQQxES3eoFIulRwtRrnwKIK0pKpSLpUcLcf52XEEKUBUpVwqOQqM9OMVCFKIpkq5VHIUGmuDIKVI8m8mPimIcjBXIUjhUah8BVbJ0Xa8CNKW4JzzKuVSydFmxAjSht4FZ1XKpZLDO2YE8ZJLOKdSLpUcCSPjx7weSG3OqJRLJUfuLPkEySXm2K9SLpUcOSNEkBxaLfaqlEslR+ooESSVVIF9ueUaj8ffT6fTrQKPLnqFSo4UKAiSQqngnsxy/bW3t/dNwccXu0olhwUEQSxCHaznlOvatWvXtra2/ungNVpfqZLjIhAI0rom+Rfcvn37p3fv3v3aNM1X1ukbN258/ezZs3+tfV9iXSUHgnyJ9ix45srKyi8nJye/Jb7Sq729vZXEvb1uU8lhQeMTxCJUcD3nW5LTx166dOnuy5cv/yz4CkWuUsmRAgNBUigV2JNbqtFo9HBnZ3j/dodKjtSRIkgqqRb7VEqlkiNnlAiSQ8uxV6VUKjlyR4ggucQy9quUSiVHxug+bkUQD7WEMyqlUsmRMLK5WxDES+6CcyqlUsnRZsQI0obenLMqpVLJ0Xa8CNKW4LnzKqVSyVFitAhSgiJ/0UTyL5qcVgNBCgii8hVXJUeBkfJTrFIQVUqlkqPUXD/cwydIC6IqpVLJ0WKUC48iiJOqSqlUcjjHaB5DEBPR5xtUSqWSwzHC5CMIkozq/40qpVLJkTm+7O0IkoFMpVQqOTJG596KIInoVEqlkiNxbK23IUgCQpVSqeRIGFmxLQhioFQplUqOYs1PvAhBLgClUiqVHImdLroNQRbgVCmVSo6irc+4DEHmwFIplUqOjD4X34ognyBVKZVKjuKNz7wQQc4BUymVSo7MLneyHUHOsKqUSiVHJ213XIog/O8jsr/s5PDhsyPhBVH5iquSo0SpS94RWhCVUqnkKFnsUneFFUSlVCo5ShW69D0hBVEplUqO0qUueV84QVRKpZKjZJm7uCuUICqlUsnRRaFL3xlGEJVSqeQoXeSu7gshiEqpVHJ0VeYu7pUXRKVUKjm6KHGXd0oLolIqlRxdFrmru2UFUSmVSo6uCtz1vZKCqJRKJUfXJe7yfjlBVEqlkqPL8vZxt5QgKqVSydFHgbt+howgKqVSydF1cfu6X0IQlVKp5OirvH08p3pBVEqlkqOP0vb5jKoFUSmVSo4+i9vXs6oVZH19/f7BwcHzVFCj0ejhzs7O4H69VCVH6hxq21etIJPJ5O+maa6nAB+qHKfvrpIjZQ417qlSkI2Njauz2WyWAnzIcqjkSJlDrXuqFGRzc/PK/v7+Gwv6kOU4fXeVHNYcal6vUpCzb01eNU1zcxH85eXlR7u7u4+HPpzJZCKRY+icve9XrSBra2t3Dw8PX8wLPvRPjvPvrJLDW8Chn6tWkFOwq6urD46Ojp42TXP5DPTb8Xj843Q6/WPo4M+/n0qOmpinvmvVgnwIee/evW+Pj49Ptre3X6cGH+I+lRxDZOt9JwlBvOE5BwGLAIJYhFgPTQBBQo+f8BYBBLEIsR6aAIKEHj/hLQIIYhFiPTQBBAk9fsJbBBDEIsR6aAIIEnr8hLcIIIhFiPXQBBAk9PgJbxFAEIsQ66EJIEjo8RPeIoAgFiHWQxNAkNDjJ7xFAEEsQqyHJoAgocdPeIsAgliEWA9NAEFCj5/wFgEEsQixHpoAgoQeP+EtAghiEWI9NAEECT1+wlsEEMQixHpoAggSevyEtwggiEWI9dAEECT0+AlvEUAQixDroQkgSOjxE94igCAWIdZDE0CQ0OMnvEUAQSxCrIcmgCChx094iwCCWIRYD00AQUKPn/AWAQSxCLEemgCChB4/4S0CCGIRYj00AQQJPX7CWwQQxCLEemgCCBJ6/IS3CCCIRYj10AQQJPT4CW8RQBCLEOuhCSBI6PET3iLwH8dUH1DL6KW/AAAAAElFTkSuQmCC');
	background-repeat: no-repeat;
	background-size: 46rpx;
	background-position: center;
	position: absolute;
	left: 0px;
	top: 0;
	border: 1px solid #808080;
	border-radius: 30px;
}
.successBlock{
	background-image: url('data:image/png;base64,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') !important;
}
.animation{
	transition: all 0.5s;
}

@keyframes tipsBlinkan{
	0% {
	    background-position: -200rpx 0;
	}
	100% {
	    background-position: 200rpx 0;
	}
}
</style>
