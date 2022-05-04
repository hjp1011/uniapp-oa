export default {
	// app应用名称
	appName: 'UNI办公',
	// 消息在tab的位置
	// notifyIndex: 1,
	// 验证码发送间隔
	sendCodeTime: 60,
	// 审核状态导航
	worksNavList: [
		{ state: 0, text: '待处理' },
		{ state: 1, text: '已处理' },
	],
	// 审核状状态
	worksStatus: [
		{ key: 'apply', value: '已申请' },
		{ key: 'audit', value: '已审核' },
		{ key: 'approve', value: '已审批' },
		{ key: 'result', value: '已终审' },
		{ key: 'agree', value: '已通过' },
		{ key: 'refused', value: '已拒绝' },
	],
	// 设置-设置中心
	setList: [{
			title: '个人资料',
			url: '/pages/user/userinfo/userinfo',
			content: ''
		},
		{
			title: '修改密码',
			url: '/pages/public/password?type=1',
			content: ''
		},
		{
			title: '清除缓存',
			url: 'clearCache',
			content: ''
		},
		{
			title: '关于我们',
			url: '/pages/set/about/about',
			content: '',
			class: 'mT'
		},
		{
			title: '站点帮助',
			url: '/pages/application/HelpCenter/index',
			content: ''
		},
		/*  #ifdef APP-PLUS  */
		{
			title: '检查更新',
			url: 'versionUpgrade',
			content: ''
		},
		/*  #endif  */
		{
			title: '意见反馈',
			url: '/pages/application/Feedback/index',
			content: ''
		},

	],


	// 个人中心
	mycenterList: [{
			title: '我的日志',
			icon: 'iconguizhangzhidu',
			url: '/pages/mycenter/log/index',
			num: null
		},
		{
			title: '我的日程',
			icon: 'iconanquan',
			url: '/pages/mycenter/calendar/index',
			num: null
		},
		{
			title: '我的总结',
			icon: 'iconrizhi',
			url: '/pages/mycenter/summary/index',
			num: null
		}

	],

	// 消息类型 1:公告;2:提醒;3:私信
	notifyTypeList: [{
			type: 0,
			content: ''
		},
		{
			type: 1,
			content: '公告'
		},
		{
			type: 2,
			content: '提醒'
		},
		{
			type: 3,
			content: '私信'
		}
	],

	// 主题列表
	themeList: [{
			title: '官方',
			name: 'rf',
			color: '#fa436a',
			tabList: [
				'/static/tab-home-rf.png',
				'/static/tab-notify-rf.png',
				'/static/tab-cate-rf.png',
				'/static/tab-my-rf.png'
			]
		},
		{
			title: '嫣红',
			name: 'red',
			color: '#e54d42',
			tabList: [
				'/static/tab-home-red.png',
				'/static/tab-notify-red.png',
				'/static/tab-cate-red.png',
				'/static/tab-my-red.png'
			]
		},
		{
			title: '桔橙',
			name: 'orange',
			color: '#f37b1d',
			tabList: [
				'/static/tab-home-orange.png',
				'/static/tab-notify-orange.png',
				'/static/tab-cate-orange.png',
				'/static/tab-my-orange.png'
			]
		},
		{
			title: '明黄',
			name: 'yellow',
			color: '#fbbd08',
			tabList: [
				'/static/tab-home-yellow.png',
				'/static/tab-notify-yellow.png',
				'/static/tab-cate-yellow.png',
				'/static/tab-my-yellow.png'
			]
		},
		{
			title: '橄榄',
			name: 'olive',
			color: '#8dc63f',
			tabList: [
				'/static/tab-home-olive.png',
				'/static/tab-notify-olive.png',
				'/static/tab-cate-olive.png',
				'/static/tab-my-olive.png'
			]
		},
		{
			title: '森绿',
			name: 'green',
			color: '#39b54a',
			tabList: [
				'/static/tab-home-green.png',
				'/static/tab-notify-green.png',
				'/static/tab-cate-green.png',
				'/static/tab-my-green.png'
			]
		},
		{
			title: '天青',
			name: 'cyan',
			color: '#1cbbb4',
			tabList: [
				'/static/tab-home-cyan.png',
				'/static/tab-notify-cyan.png',
				'/static/tab-cate-cyan.png',
				'/static/tab-my-cyan.png'
			]
		},
		{
			title: '海蓝',
			name: 'blue',
			color: '#0081ff',
			tabList: [
				'/static/tab-home-blue.png',
				'/static/tab-notify-blue.png',
				'/static/tab-cate-blue.png',
				'/static/tab-my-blue.png'
			]
		},
		{
			title: '姹紫',
			name: 'purple',
			color: '#6739b6',
			tabList: [
				'/static/tab-home-purple.png',
				'/static/tab-notify-purple.png',
				'/static/tab-cate-purple.png',
				'/static/tab-my-purple.png'
			]
		},
		{
			title: '木槿',
			name: 'mauve',
			color: '#9c26b0',
			tabList: [
				'/static/tab-home-mauve.png',
				'/static/tab-notify-mauve.png',
				'/static/tab-cate-mauve.png',
				'/static/tab-my-mauve.png'
			]
		},
		{
			title: '桃粉',
			name: 'pink',
			color: '#e03997',
			tabList: [
				'/static/tab-home-pink.png',
				'/static/tab-notify-pink.png',
				'/static/tab-cate-pink.png',
				'/static/tab-my-pink.png'
			]
		},
		{
			title: '棕褐',
			name: 'brown',
			color: '#a5673f',
			tabList: [
				'/static/tab-home-brown.png',
				'/static/tab-notify-brown.png',
				'/static/tab-cate-brown.png',
				'/static/tab-my-brown.png'
			]
		},
		{
			title: '玄灰',
			name: 'grey',
			color: '#8799a3',
			tabList: [
				'/static/tab-home-grey.png',
				'/static/tab-notify-grey.png',
				'/static/tab-cate-grey.png',
				'/static/tab-my-grey.png'
			]
		},
		{
			title: '草灰',
			name: 'gray',
			color: '#aaaaaa',
			tabList: [
				'/static/tab-home-gray.png',
				'/static/tab-notify-gray.png',
				'/static/tab-cate-gray.png',
				'/static/tab-my-gray.png'
			]
		},
		{
			title: '墨黑',
			name: 'black',
			color: '#333333',
			tabList: [
				'/static/tab-home-black.png',
				'/static/tab-notify-black.png',
				'/static/tab-cate-black.png',
				'/static/tab-my-black.png'
			]
		}
	],
	// 表情列表
	emojiList: [{
			url: '0',
			alt: '[微笑]'
		},
		{
			url: '1',
			alt: '[撇嘴]'
		},
		{
			url: '2',
			alt: '[色]'
		},
		{
			url: '3',
			alt: '[发呆]'
		},
		{
			url: '4',
			alt: '[得意]'
		},
		{
			url: '5',
			alt: '[流泪]'
		},
		{
			url: '6',
			alt: '[害羞]'
		},
		{
			url: '7',
			alt: '[闭嘴]'
		},
		{
			url: '8',
			alt: '[睡]'
		},
		{
			url: '9',
			alt: '[大哭]'
		},
		{
			url: '10',
			alt: '[尴尬]'
		},
		{
			url: '11',
			alt: '[发怒]'
		},
		{
			url: '12',
			alt: '[调皮]'
		},
		{
			url: '13',
			alt: '[呲牙]'
		},
		{
			url: '14',
			alt: '[惊讶]'
		},
		{
			url: '15',
			alt: '[难过]'
		},
		{
			url: '16',
			alt: '[酷]'
		},
		{
			url: '17',
			alt: '[冷汗]'
		},
		{
			url: '18',
			alt: '[抓狂]'
		},
		{
			url: '19',
			alt: '[吐]'
		},
		{
			url: '20',
			alt: '[偷笑]'
		},
		{
			url: '21',
			alt: '[愉快]'
		},
		{
			url: '22',
			alt: '[白眼]'
		},
		{
			url: '23',
			alt: '[傲慢]'
		},
		{
			url: '24',
			alt: '[饥饿]'
		},
		{
			url: '25',
			alt: '[困]'
		},
		{
			url: '26',
			alt: '[惊恐]'
		},
		{
			url: '27',
			alt: '[流汗]'
		},
		{
			url: '28',
			alt: '[憨笑]'
		},
		{
			url: '29',
			alt: '[悠闲]'
		},
		{
			url: '30',
			alt: '[奋斗]'
		},
		{
			url: '31',
			alt: '[咒骂]'
		},
		{
			url: '32',
			alt: '[疑问]'
		},
		{
			url: '33',
			alt: '[嘘]'
		},
		{
			url: '34',
			alt: '[晕]'
		},
		{
			url: '35',
			alt: '[疯了]'
		},
		{
			url: '36',
			alt: '[衰]'
		},
		{
			url: '37',
			alt: '[骷髅]'
		},
		{
			url: '38',
			alt: '[敲打]'
		},
		{
			url: '39',
			alt: '[再见]'
		},
		{
			url: '40',
			alt: '[擦汗]'
		},
		{
			url: '41',
			alt: '[抠鼻]'
		},
		{
			url: '42',
			alt: '[鼓掌]'
		},
		{
			url: '43',
			alt: '[糗大了]'
		},
		{
			url: '44',
			alt: '[坏笔]'
		},
		{
			url: '45',
			alt: '[左哼哼]'
		},
		{
			url: '46',
			alt: '[右哼哼]'
		},
		{
			url: '47',
			alt: '[哈欠]'
		},
		{
			url: '48',
			alt: '[鄙视]'
		},
		{
			url: '49',
			alt: '[委屈]'
		},
		{
			url: '50',
			alt: '[快哭了]'
		},
		{
			url: '51',
			alt: '[阴险]'
		},
		{
			url: '52',
			alt: '[亲亲]'
		},
		{
			url: '53',
			alt: '[吓]'
		},
		{
			url: '54',
			alt: '[可怜]'
		},
		{
			url: '55',
			alt: '[菜刀]'
		},
		{
			url: '56',
			alt: '[西瓜]'
		},
		{
			url: '57',
			alt: '[啤酒]'
		},
		{
			url: '58',
			alt: '[篮球]'
		},
		{
			url: '59',
			alt: '[乒乓]'
		},
		{
			url: '60',
			alt: '[咖啡]'
		},
		{
			url: '61',
			alt: '[饭]'
		},
		{
			url: '62',
			alt: '[猪头]'
		},
		{
			url: '63',
			alt: '[玫瑰]'
		},
		{
			url: '64',
			alt: '[凋谢]'
		},
		{
			url: '65',
			alt: '[嘴唇]'
		},
		{
			url: '66',
			alt: '[爱心]'
		},
		{
			url: '67',
			alt: '[心碎]'
		},
		{
			url: '68',
			alt: '[蛋糕]'
		},
		{
			url: '69',
			alt: '[闪电]'
		},
		{
			url: '70',
			alt: '[炸弹]'
		},
		{
			url: '71',
			alt: '[刀]'
		},
		{
			url: '72',
			alt: '[足球]'
		},
		{
			url: '73',
			alt: '[瓢虫]'
		},
		{
			url: '74',
			alt: '[便便]'
		},
		{
			url: '75',
			alt: '[月亮]'
		},
		{
			url: '76',
			alt: '[太阳]'
		},
		{
			url: '77',
			alt: '[礼物]'
		},
		{
			url: '78',
			alt: '[拥抱]'
		},
		{
			url: '79',
			alt: '[强]'
		},
		{
			url: '80',
			alt: '[弱]'
		},
		{
			url: '81',
			alt: '[握手]'
		},
		{
			url: '82',
			alt: '[胜利]'
		},
		{
			url: '83',
			alt: '[抱拳]'
		},
		{
			url: '84',
			alt: '[勾引]'
		},
		{
			url: '85',
			alt: '[拳头]'
		},
		{
			url: '86',
			alt: '[差劲]'
		},
		{
			url: '87',
			alt: '[爱您]'
		},
		{
			url: '88',
			alt: '[NO]'
		},
		{
			url: '89',
			alt: '[OK]'
		},
		{
			url: '90',
			alt: '[爱情]'
		},
		{
			url: '91',
			alt: '[飞吻]'
		},
		{
			url: '92',
			alt: '[跳跳]'
		},
		{
			url: '93',
			alt: '[发抖]'
		},
		{
			url: '94',
			alt: '[怄火]'
		},
		{
			url: '95',
			alt: '[转圈]'
		},
		{
			url: '96',
			alt: '[磕头]'
		},
		{
			url: '97',
			alt: '[回头]'
		},
		{
			url: '98',
			alt: '[跳绳]'
		},
		{
			url: '99',
			alt: '[投降]'
		},
		{
			url: '100',
			alt: '[激动]'
		},
		{
			url: '101',
			alt: '[乱舞]'
		},
		{
			url: '102',
			alt: '[献吻]'
		},
		{
			url: '103',
			alt: '[左太极]'
		},
		{
			url: '104',
			alt: '[右太极]'
		}
	]
};
