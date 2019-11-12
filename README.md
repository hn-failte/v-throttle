# v-throttle

Vue节流指令

## 用法

我们在main.js中引入

```js
import Vue from 'vue';
import VThrottle from 'v-throttle';

Vue.use(VThrottle, {
    name: 'v-throttle',
    time: 3000
});
// name是可选的，默认为'v-throttle'
// time是可选的，默认为3000
```

然后在需要的地方引用该指令
```vue
<template>
    <!-- 默认会将click事件加入节流 -->
    <button v-throttle="handler">点击</button>

    <!-- 若带上touch参数可以将touch事件加入节流 -->
    <button v-throttle.touch="handler">点击</button>
</template>

<script>
export default {
    methods: {
        handler() {
            console.log('run')
        }
    }
}
</script>
```