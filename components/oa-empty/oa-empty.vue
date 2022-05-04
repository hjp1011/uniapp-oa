<template>
	<view class="empty">
		<view class="empty-content">
			<text class="iconfont iconnodata-search" :class="'text-'+themeColor.name"></text>
			<text class="empty-content-info">{{ info }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * oa-empty 空组件
	 * @description 自定义内容为空的组件
	 */
	export default {
		name: 'oa-empty',
		components: {},
		props: {
			src: {
				type: String,
				default: 'empty'
			},
			isRecommendShow: {
				type: Boolean,
				default: true
			},
			info: {
				type: String,
				default: ''
			},
			bottom: {
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {};
		},
		computed: {}
	};
</script>

<style lang="scss">
	.empty {
		background-color: $color-white;

		.empty-content {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 20upx 0 80upx;

			.empty-content-info {
				font-size: $font-base - 2upx;
			}

			.iconfont {
				font-size: 240upx;
			}

			&-image {
				width: 200upx;
				height: 200upx;
			}
		}

		.emptyOnly {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
