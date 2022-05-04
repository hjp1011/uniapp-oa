<template>
	<view class="userinfo">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--#ifdef H5-->
			<!--h5直接上传头像-->
			<view class="portrait-box" @tap="uploadImage">
				<image class="portrait" :src="profileInfo.head_portrait || headImg"></image>
			</view>
			<!-- #endif -->
			<!--#ifndef H5-->
			<!--非h5裁剪头像上传-->
			<view class="portrait-box">
				<avatar canRotate="false" selWidth="200px" selHeight="400upx" @upload="handleUploadFile"
					:avatarSrc="profileInfo.head_portrait || headImg"
					avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; border: 6upx solid #fff;">
				</avatar>
			</view>
			<!-- #endif -->
		</view>
		<view class="input-content">

			<view class="input-item">
				<text class="tit">手机号</text>
				<input type="number" v-model="profileInfo.mobile" disabled placeholder="请输入手机号码" />
			</view>
			<view class="input-item">
				<text class="tit">姓　名</text>
				<input type="text" v-model="profileInfo.realname" placeholder="请输入您的姓名" />
			</view>
			<view class="input-item">
				<text class="tit">性　别</text>
				<radio-group @change="handleGenderChange">
					<label class="gender-item" v-for="(item, index) in genders" :key="index">
						<radio class="gender-item-radio" :color="themeColor.color" :value="item.value"
							:checked="item.value === profileInfo.gender" />
						<text class="gender-item-text">{{ item.name }}</text>
					</label>
				</radio-group>
			</view>

			<view class="input-item">
				<text class="tit">生　日</text>
				<picker mode="date" v-model="date" @change="bindDateChange">
					<view class="date" style="background: none;">{{
						date || '请选择日期'
					}}</view>
				</picker>
			</view>
			<view class="input-item">
				<text class="tit">Q　Q</text>
				<input type="number" v-model="profileInfo.qq" placeholder="请输入您的QQ" />
			</view>
			<view class="input-item">
				<text class="tit">邮　箱</text>
				<input v-model="profileInfo.email" placeholder="请输入您的邮箱" />
			</view>
			<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading"
				@tap="toUpdateInfo">
				修改资料
			</button>
		</view>

		<!--加载动画-->
		<oa-loading isFullScreen :active="loading"></oa-loading>

		<!--进度条加载-->
		<oa-load-progress :height="CustomBar" :progress="loadProgress"></oa-load-progress>
	</view>
</template>

<script>
	/**
	 *@des 
	 *@author yiiframe 21931118@qq.com
	 *@blog http://www.yiiframe.com
	 *@date 2019/1/1 07:25:00
	 */
	import moment from '@/common/moment';
	export default {
		components: {
		},
		data() {
			return {

				loadProgress: 0,
				CustomBar: this.CustomBar,
				profileInfo: {
					'qq': '21931118',
					'mobile': '18986860001',
					'realname': '张三',
					'gender': '1',
					'email': '21931118@qq.com'
				},
				genders: [{
						value: '0',
						name: '未知'
					},
					{
						value: '1',
						name: '男'
					},
					{
						value: '2',
						name: '女'
					}
				],
				date: moment().format('YYYY-MM-DD'),
				loading: false,
				headImg: this.$mAssetsPath.headImg,
				userBg: this.$mAssetsPath.userBg,
				btnLoading: false
			};
		},
		onShow() {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: this.themeColor.color,
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},

		methods: {
			// 上传头像
			uploadImage() {
				// 从相册选择图片
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths);
					}
				});
			},
			// 上传头像
			handleUploadFile(data) {

			},
			// 监听日期更改
			bindDateChange(e) {
				this.date = e.target.value;
			},
			// 监听性别更改
			handleGenderChange(e) {},
			// 更新用户信息
			async toUpdateInfo() {
				this.$mHelper.toast('操作成功');
				setTimeout(() => {
					this.$mRouter.back();
				}, 1 * 1000);
			},

		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: $color-white;
	}

	.userinfo {
		.user-section {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 320upx;
			padding: 40upx 30upx 0;
			overflow: hidden;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				opacity: 0.84;
			}

			.portrait-box {
				clear: both;
				z-index: 2;
			}

			.portrait {
				position: relative;
				width: 200upx;
				height: 200upx;
				border-radius: 50%;
				border: 6upx solid #fff;
			}

			.yticon {
				position: absolute;
				line-height: 1;
				z-index: 5;
				font-size: 48upx;
				color: #fff;
				padding: 4upx 6upx;
				border-radius: 6upx;
				background: rgba(0, 0, 0, 0.4);
			}

			.pt-upload-btn {
				right: 0;
				bottom: 10upx;
			}

			.bg-upload-btn {
				right: 20upx;
				bottom: 16upx;
			}
		}

		.input-content {
			padding: 40upx 60upx;

			.input-item {
				display: flex;
				padding: 0 30upx;
				background: $page-color-light;
				height: 80upx;
				line-height: 80upx;
				border-radius: 4px;
				margin-bottom: 30upx;

				&:last-child {
					margin-bottom: 0;
				}

				.tit {
					width: 100upx;
					font-size: $font-sm + 2upx;
					color: $font-color-base;
				}

				input {
					width: calc(100% - 100upx);
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}

				.date {
					height: 80upx;
					line-height: 80upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
				}

				.gender-item {
					margin-right: 20upx;

					.gender-item-text {
						padding-left: 10upx;
					}

					radio .wx-radio-input.wx-radio-input-checked {
						background: $uni-color-primary;
						border-color: $uni-color-primary;
					}
				}
			}
		}
	}
</style>
