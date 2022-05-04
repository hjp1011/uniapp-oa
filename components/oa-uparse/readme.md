## uParse 适用于 uni-app/mpvue 的富文本解析组件

> 支持 Html、Markdown 解析，Fork自: [mpvue-wxParse](https://github.com/F-loat/mpvue-wxParse)


## 属性

| 名称             | 类型          | 默认值        | 描述               |
| -----------------|--------------- | ------------- | ----------------  |
| loading          | Boolean        | false         | 数据加载状态       |
| className        | String         | —             | 自定义 class 名称  |
| content          | String         | —             | 渲染内容           |
| noData           | String         | 数据不能为空   | 空数据时的渲染展示  |
| startHandler     | Function       | 见源码         | 自定义 parser 函数 |
| endHandler       | Function       | null          | 自定义 parser 函数 |
| charsHandler     | Function       | null          | 自定义 parser 函数 |
| imageProp        | Object         | 见下文        | 图片相关参数        |

### 自定义 parser 函数具体介绍

* 传入的参数为当前节点 `node` 对象及解析结果 `results` 对象，例如 `startHandler(node, results)`
* 无需返回值，通过对传入的参数直接操作来完成需要的改动
* 自定义函数会在原解析函数处理之后执行

### imageProp 对象具体属性

| 名称              | 类型           | 默认值        | 描述                |
| -----------------|--------------- | ------------- | ------------------ |
| mode             | String         | 'aspectFit'   | 图片裁剪、缩放的模式 |
| padding          | Number         | 0             | 图片内边距          |
| lazyLoad         | Boolean        | false         | 图片懒加载          |
| domain           | String         | ''            | 图片服务域名        |

## 事件

| 名称             | 参数              | 描述              |
| -----------------|----------------- | ----------------  |
| preview          | 图片地址，原始事件 | 预览图片时触发     |
| navigate         | 链接地址，原始事件 | 点击链接时触发     |

## 基本使用方法


``` vue
<template>
  <div>
    <u-parse :content="article" @preview="preview" @navigate="navigate" />
  </div>
</template>

<script>
import uParse from '@/components/u-parse/u-parse.vue'

export default {
  components: {
    uParse
  },
  data () {
    return {
      article: '<div>我是HTML代码</div>'
    }
  },
  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    }
  }
}
</script>

<style>
@import url("@/components/u-parse/u-parse.css");
</style>
```


## 渲染 Markdown

> 先将 markdown 转换为 html 即可

```
npm install marked
```

``` js
import marked from 'marked'
import uParse from '@/components/u-parse/u-parse.vue'

export default {
  components: {
    uParse
  },
  data () {
    return {
      article: marked(`#hello, markdown!`)
    }
  }
}
```
