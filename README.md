# v-throttle

Vue 节流指令

## 用法

1、引入

```js
import Vue from "vue";
import VThrottle from "v-throttle";

Vue.use(VThrottle, {
  // 指令名称，可选，默认为 `v-throttle`
  name: "v-throttle",
  // 全局延时，可选，默认为 1000
  time: 3000,
  // 是否展示调试相关的信息，默认为false，不展示。注意：报错信息不会被关闭
  dev: true,
});
```

2、指定单个事件

```vue
<template>
  <!-- 默认事件为 onclick，默认延时为全局延时 -->
  <button v-throttle="handler">点击</button>

  <!-- 指定事件 -->
  <button v-throttle.touch="handler">点击</button>

  <!-- 指定事件和时间 -->
  <button v-throttle.touch.300="handler">点击</button>

  <!-- 若绑定多个延时，则始终生效后面的延时 -->
  <button v-throttle.click.3000.2000="handler">点击</button>
</template>

<script>
export default {
  methods: {
    handler() {
      console.log("run");
    },
  },
};
</script>
```

3、指定多个事件

```vue
<template>
  <!-- 同时绑定使用全局延迟时间的点击事件和鼠标悬浮事件 -->
  <button v-throttle.click.mouseover="handler">点击</button>

  <!-- 同时绑定 1000ms 延迟的点击事件和使用全局延迟时间的鼠标悬浮事件 -->
  <button v-throttle.1000.mouseover="handler">点击</button>

  <!-- 同时绑定 3000ms 延迟的点击事件和 2000ms 延迟的鼠标悬浮事件 -->
  <button v-throttle.click.3000.mouseover.2000="handler">点击</button>

  <!-- 同一指令下绑定的不同事件之间的延时器默认是共用的，若需要独立延时，需配置 private 属性 -->
  <button v-throttle.click.3000.private.mouseover.2000="handler">点击</button>
</template>

<script>
export default {
  methods: {
    handler() {
      console.log("run");
    },
  },
};
</script>
```

## 支持事件

在使用移动端的 touch 事件时，若绑定事件为 touch，则会警告（可配置关闭），并转换成 touchend

元素所支持的事件都可以进行节流限制，若该元素无对应的事件，则会抛出错误

## 注意事项

由于指令的底层机制，需要对事件的处理方式进行传参时，需要使用另外一个函数进行包裹

```vue
<template>
  <!-- 若带上touch参数可以将touch事件加入节流 -->
  <button v-throttle.touch.300="() => handler(111)">点击</button>
</template>

<script>
export default {
  methods: {
    handler(params) {
      console.log("run", params);
    },
  },
};
</script>
```
