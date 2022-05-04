<template>
	<view>
		<block>
			<view class="container">
				<!--顶部返回按钮-->
				<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
				<view class="right-top-sign"></view>
				<view class="wrapper">
					<view class="left-top-sign">{{ type == 1 ? 'UPDATE' : 'GET BACK' }}</view>
					<view class="welcome"> {{ type == 1 ? '修改密码' : '找回密码' }}！ </view>
					<view class="input-content">
						<view class="input-item">
							<text class="tit">手机号码</text>
							<input type="number" v-model="resetPasswordParams.mobile" placeholder="请输入手机号码"
								maxlength="11" />
						</view>
						<view class="input-item input-item-sms-code">
							<view class="input-wrapper">
								<view class="oa-input-wrapper">
									<view class="tit">验证码</view>
									<input type="number" v-model="resetPasswordParams.code" placeholder="请输入验证码"
										maxlength="4" data-key="mobile" />
								</view>
								<button class="sms-code-btn" :disabled="smsCodeBtnDisabled" @tap.stop="getSmsCode">
									<text v-if="!smsCodeBtnDisabled">获取验证码</text>
									<text v-else class="sms-code-resend">{{
										`重新发送 (${codeSeconds})`
										}}</text>
								</button>
							</view>
						</view>
						<view class="input-item">
							<text class="tit">密码</text>
							<input v-model="resetPasswordParams.password" type="password" placeholder="请输入密码"
								maxlength="18" />
						</view>
						<view class="input-item">
							<text class="tit">确认密码</text>
							<input type="password" v-model="resetPasswordParams.password_repetition"
								placeholder="请输入确认密码" />
						</view>
					</view>
					<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading"
						:loading="btnLoading" @tap="toUpdatePassword">
						{{ type == 1 ? '修改密码' : '找回密码' }}
					</button>
				</view>
				<view class="register-section" v-if="type != 1">
					又想起密码了?
					<text @tap="navTo('/pages/public/login')">马上登录</text>
					或者
					<text @tap="toHome">返回主页</text>
				</view>
				<view class="register-section" v-else>
					不想修改了密码？
					<text @tap="toHome">返回主页</text>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	/**
	 *@des 
	 *@author yiiframe 21931118@qq.com
	 *@blog http://www.yiiframe.com
	 *@date 2019/1/1 07:25:00
	 */
	export default {
		data() {
			return {
				resetPasswordParams: {
					mobile: '',
					password: '',
					password_repetition: '',
					code: ''
				},
				btnLoading: false,
				type: null,
				loginBg: this.$mAssetsPath.loginBg,
				loginPic: this.$mAssetsPath.loginPic,
				appName: this.$mSettingConfig.appName,
				styleLoginType: this.$mSettingConfig.styleLoginType,
				reqBody: {},
				smsCodeBtnDisabled: true,
				codeSeconds: 0 // 验证码发送时间间隔
			};
		},

		onLoad(options) {
			this.codeSeconds = this.$mConstDataConfig.sendCodeTime;
			this.smsCodeBtnDisabled = false;
			uni.removeStorageSync('pwdSmsCodeTime');
			this.type = options.type;
		},
		methods: {
			// 获取手机验证码
			async getSmsCode() {
				this.reqBody['mobile'] = this.resetPasswordParams['mobile'];
				
				if (!checkSendCode) {
					this.$mHelper.toast(this.$mGraceChecker.error);
					return;
				}
				this.$mHelper.toast(`验证码发送成功, 请在手机上查看`);
				this.smsCodeBtnDisabled = true;
				uni.setStorageSync('pwdSmsCodeTime', moment().valueOf() / 1000);
				this.handleSmsCodeTime(59);
			},
			handleSmsCodeTime(time) {
				let timer = setInterval(() => {
					if (time === 0) {
						clearInterval(timer);
						this.smsCodeBtnDisabled = false;
					} else {
						this.codeSeconds = time;
						this.smsCodeBtnDisabled = true;
						time--;
					}
				}, 1000);
			},
			navBack() {
				this.$mRouter.back();
			},
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
			toHome() {
				this.$mRouter.reLaunch({
					route: '/pages/index/index'
				});
			},
			// 更新密码
			async toUpdatePassword() {
				this.$mHelper.toast('密码重置成功');
				setTimeout(() => {
					this.$mRouter.back();
				}, 1 * 1000);
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: $color-white;
	}

	.container {
		padding-top: 60px;
		position: relative;
		width: 100vw;
		overflow: hidden;

		.wrapper {
			position: relative;
			width: 100vw;
			z-index: 90;
			background: #fff;
			padding-bottom: 40upx;

			.welcome {
				position: relative;
				left: 50upx;
				top: -90upx;
				font-size: 46upx;
				color: #555;
				text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
			}

			.input-content {
				padding: 0 60upx;
			}

			.input-item {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				padding: 0 30upx;
				background: $page-color-light;
				height: 120upx;
				border-radius: 4px;
				margin-bottom: 50upx;

				&:last-child {
					margin-bottom: 0;
				}

				.tit {
					height: 50upx;
					line-height: 56upx;
					font-size: $font-sm + 2upx;
					color: $font-color-base;
				}

				input {
					height: 60upx;
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					width: 100%;
				}
			}

			.input-item-sms-code {
				position: relative;

				.sms-code-btn {
					position: absolute;
					right: 20upx;
					color: #111;
					bottom: 20upx;
					font-size: 28upx;
				}

				.sms-code-resend {
					color: #999;
				}
			}

			.forget-section {
				font-size: $font-sm + 2upx;
				color: $font-color-spec;
				text-align: center;
				margin-top: 40upx;
			}
		}

		.back-btn {
			position: absolute;
			left: 40upx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40upx;
			font-size: 40upx;
			color: $font-color-dark;
		}

		.left-top-sign {
			font-size: 120upx;
			color: $page-color-base;
			position: relative;
			left: -16upx;
		}

		.right-top-sign {
			position: absolute;
			top: 80upx;
			right: -30upx;
			z-index: 95;

			&:before,
			&:after {
				display: block;
				content: '';
				width: 400upx;
				height: 80upx;
				background: #b4f3e2;
			}

			&:before {
				transform: rotate(50deg);
				border-radius: 0 50px 0 0;
			}

			&:after {
				position: absolute;
				right: -198upx;
				top: 0;
				transform: rotate(-50deg);
				border-radius: 50px 0 0 0;
				/* background: pink; */
			}
		}

		.register-section {
			margin: 50upx 0 50upx 0;
			width: 100%;
			font-size: $font-sm + 2upx;
			color: $font-color-base;
			text-align: center;

			text {
				color: $font-color-spec;
				margin-left: 10upx;
				margin-right: 10upx;
			}
		}
	}

	.password-type-2 {
		width: 100%;
		position: relative;

		.back-btn {
			position: absolute;
			left: 40upx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40upx;
			font-size: 48upx;
			color: $color-white;
		}

		.login-top {
			height: 460upx;
			position: relative;

			.desc {
				position: absolute;
				top: 200upx;
				left: 40upx;
				font-size: 48upx;

				.title {
					font-size: 48upx;
				}
			}

			.login-pic {
				position: absolute;
				width: 220upx;
				height: 270upx;
				right: 30upx;
				top: 100upx;
			}
		}

		.login-type-content {
			position: relative;
			top: -72upx;

			.login-bg {
				width: 94vw;
				height: 114vw;
				margin: 0 3vw;
			}

			.main {
				width: 94vw;
				position: absolute;
				top: 0;
				left: 3vw;

				.nav-bar {
					display: flex;
					height: 100upx;
					justify-content: center;
					align-items: center;
					position: relative;
					z-index: 10;

					.nav-bar-item {
						flex: 1;
						display: flex;
						height: 100%;
						line-height: 96upx;
						font-size: $font-lg;
						display: flex;
						margin: 0 120upx;
						justify-content: center;
					}

					.nav-bar-item-active {
						border-bottom: 5upx solid;
					}
				}

				.login-type-form {
					width: 80%;
					margin: 50upx auto;

					.input-item {
						position: relative;
						height: 90upx;
						line-height: 90upx;
						margin-bottom: $spacing-lg;

						.iconfont {
							font-size: 50upx;
							position: absolute;
							left: 0;
						}

						.login-type-input {
							height: 90upx;
							padding-left: 80upx;
							border-bottom: 1upx solid rgba(0, 0, 0, .1);
						}

						.sms-code-btn,
						sms-code-resend {
							width: 240upx;
							font-size: $font-base - 2upx;
						}
					}
				}

				.login-type-tips {
					padding: 0 50upx;
					display: flex;
					justify-content: space-between;
				}

				.confirm-btn {
					height: 80upx;
					line-height: 80upx;
				}
			}
		}

		.login-type-bottom {
			width: 100%;
			padding-bottom: 30upx;
			text-align: center;
			font-size: $font-lg;
		}
	}
</style>
