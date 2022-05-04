<template>
	<block>
		<image v-if="preview" class="oa-image" mode="mode" lazy-load="true" @tap.stop="previewImage(src)"
			@error="onImageError" :src="src || $mAssetsPath.errorImage"></image>
		<image v-else class="oa-image" mode="mode" lazy-load="true" @error="onImageError"
			:src="src || $mAssetsPath.errorImage"></image>
	</block>
</template>

<script>
	/**
	 * oa-empty 图片标签组件
	 * @description 图片标签的建议封装
	 */
	import $mAssetsPath from '@/config/assets.config';

	export default {
		name: 'oa-image',
		props: {
			src: {
				type: String,
				default: $mAssetsPath.errorImage
			},
			// 显示模式
			mode: {
				type: String,
				default: 'aspectFill'
			},
			// 是否预览
			preview: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			// 图片异常处理
			onImageError() {
				this.src = $mAssetsPath.errorImage;
			},
			// 图片预览
			previewImage(urls) {
				if (!this.preview) return;
				if (!urls) return;
				uni.previewImage({
					urls: urls.split('#$#')
				});
			}
		}
	};
</script>

<style lang="scss">
	.oa-image {
		width: 100%;
		height: 100%;
	}
</style>
