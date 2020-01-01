mvvm

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
  <input type="text" v-model="message">
  <button v-on:click="handleClick" v-show="true">{{ message }}</button>
</div>

<script type="module">

  import Mvue from './Mvue.js'

  const vm = new Mvue({
    el: '#app',
    data: {
      prosen: {
        name: 'apy',
        age: 18,
        fav: 'coding'
      },
      message: '实现MVVM原理',
      url: 'https://www.baidu.com',
      htmlContent: '<p>这是v-html指令</p>'
    },
    methods: {
      handleClick() {
        console.log(this);
      }
    }
  });

</script>
</body>
</html>

```
