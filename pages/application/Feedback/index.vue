<template>
	<view class="feedback-list">
		<view class="oa-list" v-if="feedbackList.length > 0">
			<view class="oa-list-item" v-for="(item, index) in feedbackList" :key="index"
				@tap="navTo(`/pages/application/Feedback/detail?id=${item.id}`)">
				<view class="wrapper">
					<view class="address-box">
						<text class="tag" :class="'text-' + themeColor.name">{{ item.type | feedbackFilter }}</text>
						<text class="address in1line">{{ item.content }}</text>
					</view>
					<view class="u-box">
						<text class="name">{{ item.reply || '管理员未回复' }}</text>
						<text class="mobile">联系方式：{{ item.contact_way || '暂无' }}</text>
					</view>
				</view>
			</view>
			<oa-load-more v-if="feedbackList.length > 0 && !loading" :status="loadingType" />
		</view>
		<view class="add-btn-wrapper">
			<button class="add-btn" :class="'bg-' + themeColor.name"
				@tap="navTo(`/pages/application/Feedback/feedback`)">
				意见反馈
			</button>
		</view>
		<oa-empty :info="'您还没有反馈意见'" v-if="feedbackList.length === 0 && !loading"></oa-empty>
		<oa-loading isFullScreen :active="loading"></oa-loading>
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
				page: 1,
				feedbackList: [{
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "购买请联系21931118",
						"type": 3,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "购买请联系21931118",
						"type": 2,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "",
						"type": 1,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "",
						"type": 1,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "",
						"type": 1,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "",
						"type": 3,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "",
						"type": 2,
						"created_at": 1649663334,
					}, {
						"id": 1,
						"content": "这套系统做的非常好，购买需要多少钱",
						"contact_way": "18986860001",
						"reply": "",
						"type": 1,
						"created_at": 1649663334,
					}

				],
				loadingType: 'more',
				loading: true
			};
		},
		filters: {
			feedbackFilter(type) {
				const feedbackType = ['', '功能建议', 'BUG反馈', '业务咨询'];
				return feedbackType[parseInt(type, 10)];
			}
		},

		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.loading = false;
			uni.stopPullDownRefresh();
		},
		// 加载更多
		onReachBottom() {
			if (this.loadingType === 'nomore' || this.feedbackList.length === 0) return;
			this.page++;
		},
		onShow() {
			this.page = 1;
			this.loading = false;
			this.loadingType = this.feedbackList.length === 10 ? 'more' : 'nomore';
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

			navTo(route) {
				this.$mRouter.push({
					route
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $page-color-base;
	}

	.feedback-list {
		position: relative;

		.wrapper {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.address-box {
			display: flex;
			align-items: center;

			.tag {
				font-size: 24upx;
				margin-right: 10upx;
				border: 1px solid;
				border-radius: 4upx;
				padding: 4upx 10upx;
				line-height: 1;
			}

			.address {
				font-size: 30upx;
				color: $font-color-dark;
			}
		}

		.u-box {
			font-size: 28upx;
			color: $font-color-light;
			margin-top: 16upx;

			.name {
				margin-right: 30upx;
			}
		}
	}
</style>
