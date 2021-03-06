mvvm

## 简单 demo
[https://qiqingfu.github.io/mvvm/src/index](https://qiqingfu.github.io/mvvm/src/index)

## 实现简单指令:

- v-text
- v-html
- v-if
- v-show
- v-bind
- v-on 
- v-model 

## 插值解析
{{  }}

## demo 代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mvue</title>
</head>
<body>
<div id="app">
  <h2>{{ prosen.name }} -- {{ prosen.age }}</h2>
  <h3>{{ prosen.fav }}</h3>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
  <p>{{ message }}</p>
  <p v-text="message"></p>
  <p v-html="htmlContent"></p>
  <p v-if="true">我是 v-if指令</p>
  <p>
    <a v-bind:href="url">我是一个a标签</a>
  </p>
  <div>
    这是 prosen的名字
    <input type="text" v-model="prosen.name">
  </div>
  <button v-on:click="handleClick" v-show="showBtn">修改prosen.name的值</button>
</div>

<!--<script src="Mvue.js"></script>-->
<script type="module">

  import Mvue from './Mvue.js'

  window.vm = new Mvue({
    el: '#app',
    data: {
      prosen: {
        name: 'apy',
        age: 18,
        fav: 'coding'
      },
      message: '实现MVVM原理',
      url: 'https://www.baidu.com',
      htmlContent: '<p>这是v-html指令</p>',
      showBtn: true,
    },
    methods: {
      handleClick() {
        this.prosen.name = this.prosen.name.split('').reverse().join('');
      }
    }
  });

</script>
</body>
</html>
```
