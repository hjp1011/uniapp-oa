<template>
	<view
		:class="{
			'uni-collapse-cell--disabled': disabled,
			'uni-collapse-cell--notdisabled': !disabled,
			'uni-collapse-cell--open': isOpen,
			'uni-collapse-cell--hide': !isOpen
		}"
		class="uni-collapse-cell"
	>
		<view class="uni-collapse-cell__title" @click="onClick">
			<text class="iconfont" :class="[thumb, 'text-' + themeColor.name]" ></text>
			<text class="uni-collapse-cell__title-text">{{ title }}</text>
			<!-- #ifdef MP-ALIPAY -->
			<view
				:class="{
					'uni-collapse-cell__title-arrow-active': isOpen,
					'uni-collapse-cell--animation': showAnimation === true,
				}"
				class="uni-collapse-cell__title-arrow"
			>
				<text class="iconfont iconxia" :class="'text-' + themeColor.name"></text>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-ALIPAY -->
			<text
				:class="{
					'uni-collapse-cell__title-arrow-active': isOpen,
					'uni-collapse-cell--animation': showAnimation === true
				}"
				class="iconfont iconxia"
			></text>
			<!-- #endif -->
		</view>
		<view
			:class="{ 'uni-collapse-cell__content--hide': !isOpen }"
			class="uni-collapse-cell__content"
		>
			<view
				:class="{ 'uni-collapse-cell--animation': showAnimation === true }"
				class="uni-collapse-cell__wrapper"
				:style="{
					transform: isOpen ? 'translateY(0)' : 'translateY(-50%)',
					'-webkit-transform': isOpen ? 'translateY(0)' : 'translateY(-50%)'
				}"
			>
				<slot />
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
	name: 'UniCollapseItem',
	props: {
		title: {
			// 列表标题
			type: String,
			default: ''
		},
		name: {
			// 唯一标识符
			type: [Number, String],
			default: 0
		},
		disabled: {
			// 是否禁用
			type: Boolean,
			default: false
		},
		showAnimation: {
			// 是否显示动画
			type: Boolean,
			default: false
		},
		open: {
			// 是否展开
			type: Boolean,
			default: false
		},
		thumb: {
			// 缩略图
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isOpen: false
		};
	},
	watch: {
		open(val) {
			this.isOpen = val;
		}
	},
	inject: ['collapse'],
	created() {
		this.isOpen = this.open;
		this.nameSync = this.name ? this.name : this.collapse.childrens.length;
		this.collapse.childrens.push(this);
		if (String(this.collapse.accordion) === 'true') {
			if (this.isOpen) {
				let lastEl = this.collapse.childrens[
					this.collapse.childrens.length - 2
				];
				if (lastEl) {
					this.collapse.childrens[
						this.collapse.childrens.length - 2
					].isOpen = false;
				}
			}
		}
	},
	methods: {
		onClick() {
			if (this.disabled) {
				return;
			}
			if (String(this.collapse.accordion) === 'true') {
				this.collapse.childrens.forEach(vm => {
					if (vm === this) {
						return;
					}
					vm.isOpen = false;
				});
			}
			this.isOpen = !this.isOpen;
			this.collapse.onChange && this.collapse.onChange();
			this.$forceUpdate();
		}
	}
};
</script>

<style lang="scss" scoped>
.uni-collapse-cell {
	flex-direction: column;
	border-radius: 12upx;
	box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.05);
}

.uni-collapse-cell--hover {
	background-color: $uni-bg-color-hover;
}

.uni-collapse-cell--open {
	background-color: $color-white;
}

.uni-collapse-cell--disabled {
	background-color: $uni-bg-color-hover;
	// opacity: 0.3;
}

.uni-collapse-cell--hide {
	height: 48px;
}

.uni-collapse-cell--animation {
	// transition: transform 0.3s ease;
	transition-property: transform;
	transition-duration: 0.3s;
	transition-timing-function: ease;
}

.uni-collapse-cell__title {
	padding: 12px 12px;
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	width: 100%;
	box-sizing: border-box;
	/* #endif */
	height: 48px;
	line-height: 24px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
	.iconfont {
		margin-right: 6upx;
	}
}

.uni-collapse-cell__title:active {
	background-color: $uni-bg-color-hover;
}

.uni-collapse-cell__title-img {
	height: $uni-img-size-base;
	width: $uni-img-size-base;
	margin-right: 10px;
}

.uni-collapse-cell__title-arrow {
	width: 20px;
	height: 20px;
	transform: rotate(0deg);
	transform-origin: center center;
}

.uni-collapse-cell__title-arrow-active {
	transform: rotate(180deg);
}

.uni-collapse-cell__title-text {
	flex: 1;
	font-size: $uni-font-size-base;
	/* #ifndef APP-NVUE */
	white-space: nowrap;
	color: inherit;
	/* #endif */
	/* #ifdef APP-NVUE */
	lines: 1;
	/* #endif */
	overflow: hidden;
	text-overflow: ellipsis;
}

.uni-collapse-cell__content {
	overflow: hidden;
}

.uni-collapse-cell__wrapper {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
}

.uni-collapse-cell__content--hide {
	height: 0px;
	line-height: 0px;
}
</style>
