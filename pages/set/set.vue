<template>
	<view class="set">
		<view class="list-cell b-b" :class="{ 'm-t': item.class === 'mT' }" v-for="item in setList" :key="item.title"
			@tap="navTo(item.url)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{ item.title }}</text>
			<text class="cell-tip">{{ item.content }}</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="cu-list menu sm-border card-menu" v-if="styleUserIsOpen">
			<view class="cu-item">
				<view class="content flex align-center">
					<text class="cuIcon-colorlens" :class="'text-' + themeColor.name"></text>
					<view class="padding solid radius shadow-blur" :class="'bg-' + themeColor.name"></view>
					<view class="title">主题色：<text :class="'text-' + themeColor.name">{{
							themeColor.title
						}}</text></view>
				</view>
				<view class="action">
					<button class="cu-btn round shadow" @click="showColorModal" :class="'bg-' + themeColor.name">
						<text class="cuIcon-colorlens"></text> 选择主题
					</button>
				</view>
			</view>
		</view>
		<view class="list-cell log-out-btn" :class="'text-' + themeColor.name" @tap="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		<!-- modal -->
		<!-- 选择颜色模态框 -->
		<view class="cu-modal" :class="{ show: colorModal }">
			<view class="cu-dialog">
				<view class="cu-bar justify-end solid-bottom">
					<view class="content">选择颜色</view>
					<view class="action" @tap="colorModal = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid col-5 padding">
					<view class="padding-xs" v-for="(item, index) in themeList" :key="index" @tap="SetColor(item)"
						:data-color="item.name">
						<view class="padding-tb radius" :class="'bg-' + item.name">
							{{ item.title }}
						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
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
				loadProgress: 0,
				CustomBar: this.CustomBar,
				user: {},
				setList: this.$mConstDataConfig.setList,
				styleUserIsOpen: this.$mSettingConfig.styleUserIsOpen,
				notifyChecked: false,
				isNewVersion: false,
				colorModal: false,
				themeList: this.$mConstDataConfig.themeList
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
		onLoad() {
			this.initData();
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform === 'ios') {
				this.CustomBar = 0;
			}
			// #endif
		},
		methods: {
			handleTip(isNewVersion) {
				this.isNewVersion = isNewVersion;
			},
			handleVersionUpgradeShow() {
				this.isVersionUpgradeShow = false;
			},
			// 初始化数据
			initData() {
				this.user = uni.getStorageSync('user');
				// 缓存大小
				this.setList[2].content = `${uni.getStorageInfoSync().currentSize} kb`;
				// #ifdef APP-PLUS
				this.setList[5].content = `当前版本 ${plus.runtime.version}`;
				// #endif
			},
			// 通用跳转
			navTo(route) {
				if (!route) return;
				if (route === 'clearCache') {
					uni.showModal({
						content: '确定要清除缓存吗',
						success: e => {
							if (e.confirm) {
								uni.clearStorageSync();
								this.setList[2].content = '0 kb';
								this.$mStore.commit('login', this.user);
								this.$mHelper.toast('清除缓存成功');
							}
						}
					});
					return;
				} else if (route === 'versionUpgrade') {
					this.isVersionUpgradeShow = true;
					if (this.isNewVersion) {
						this.$mHelper.toast('已经是最新版本');
					}
					return;
				}
				this.$mRouter.push({
					route
				});
			},
			// 退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: e => {
						if (e.confirm) {
							uni.reLaunch({
								url: '/pages/public/login'
							});
						}
					}
				});
			},

			showColorModal() {
				this.colorModal = true;
			},
			SetColor(item) {
				this.colorModal = false;
				this.themeColor = item;
				this.$mStore.commit('setThemeColor', item);
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.themeColor.color,
					animation: {
						duration: 400,
						timingFunc: 'easeIn'
					}
				})
			}
		}
	};
</script>
<style lang="scss">
	page {
		background: $page-color-base;
	}

	.set {
		padding: $spacing-base 0;
	}

	.cu-list.card-menu {
		margin: $spacing-base 0;

		.title {
			margin-left: $spacing-base;
		}
	}
</style>
