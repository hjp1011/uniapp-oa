<template>
	<!--进度条加载-->
	<view class="load-progress" :class="progress != 0 ? 'show' : 'hide'" :style="[{ top: height + 'px' }]">
		<view class="load-progress-bar bg-base-color" :style="[
				{ transform: 'translate3d(-' + (100 - progress) + '%, 0px, 0px)' }
			]"></view>
		<view class="load-progress-spinner text-base-color"></view>
	</view>
</template>

<script>
	/**
	 * @description 进度条加载
	 *
	 *@author yiiframe 21931118@qq.com
	 *@blog http://www.yiiframe.com
	 *@date 2019/1/1 07:25:00
	 */
	export default {
		name: 'oa-load-progress',
		props: {
			progress: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 0
			}
		}
	};
</script>

<style scoped></style>
