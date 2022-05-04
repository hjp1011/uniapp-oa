<template>
	<text
		v-if="text"
		:class="'bg-'+themeColor.name"
		:style="badgeStyle"
		class="uni-badge uni-badge--small"
		@click="onClick()"
		>{{ text }}</text
	>
</template>

<script>
	/**
	 * Badge 数字角标
	 * @description 数字角标一般和其它控件（列表、9宫格等）配合使用，用于进行数量提示，默认为实心灰色背景
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=21
	 * @property {String} text 角标内容
	 * @property {String} size = [normal|small] 角标内容
	 * @property {String} type = [info|primary|success|warning|error] 颜色类型
	 * 	@value info 灰色
	 * 	@value primary 蓝色
	 * 	@value success 绿色
	 * 	@value warning 黄色
	 * 	@value error 红色
	 * @property {String} inverted = [true|false] 是否无需背景颜色
	 * @property {Number} maxNum 展示封顶的数字值，超过 99 显示 99+
	 * @property {String} absolute = [rightTop|rightBottom|leftBottom|leftTop] 开启绝对定位, 角标将定位到其包裹的标签的四角上		
	 * 	@value rightTop 右上
	 * 	@value rightBottom 右下
	 * 	@value leftTop 左上
	 * 	@value leftBottom 左下
	 * @property {Array[number]} offset	距定位角中心点的偏移量，只有存在 absolute 属性时有效，例如：[-10, -10] 表示向外偏移 10px，[10, 10] 表示向 absolute 指定的内偏移 10px
	 * @property {String} isDot = [true|false] 是否显示为一个小点
	 * @event {Function} click 点击 Badge 触发事件
	 * @example <uni-badge text="1"></uni-badge>
	 */
export default {
	name: 'oa-badge',
	props: {
		type: {
			type: String,
			default: 'default'
		},
		inverted: {
			type: Boolean,
			default: false
		},
		text: {
			type: [String, Number],
			default: ''
		},
		size: {
			type: String,
			default: 'normal'
		}
	},
	data() {
		return {
			badgeStyle: ''
		};
	},
	watch: {
		text() {
			this.setStyle();
		}
	},
	mounted() {
		this.setStyle();
	},
	methods: {
		setStyle() {
			this.badgeStyle = `width: ${String(this.text).length * 8 + 12}px`;
		},
		onClick() {
			this.$emit('click');
		}
	}
};
</script>

<style lang="scss" scoped>
$bage-size: 12px;
$bage-small: scale(0.8);
$bage-height: 20px;

.uni-badge {
	/* #ifndef APP-PLUS */
	display: flex;
	/* #endif */
	justify-content: center;
	flex-direction: row;
	height: $bage-height;
	line-height: $bage-height;
	border-radius: 100px;
	text-align: center;
	background-color: #f43530;
	color: $color-white;
	font-family: 'Helvetica Neue', Helvetica, sans-serif;
	font-size: $bage-size;
	padding: 0 6px;
	opacity: 0.95;
}
.uni-badge--small {
	transform: $bage-small;
	transform-origin: center center;
}
</style>
