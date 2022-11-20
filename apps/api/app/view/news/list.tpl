<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Demo</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    ul,
    li {
      list-style: none;
    }
  </style>
</head>

<body>
  <ul class="news-view view">
    {% for item in list %}
    <li class="item">
      <a href="{{ item.url }}">{{ item.title }}</a>
    </li>
    {% endfor %}
  </ul>
  <script src="https://cdn.bootcss.com/socket.io/2.1.0/socket.io.js"></script>
  <script src="https://cdn.bootcss.com/lodash.js/4.17.10/lodash.min.js"></script>
  <script>
    window.onload = function () {
      // init
      const socket = io('/', {
        transports: ['websocket']
      });
      socket.on('connect', function () {
        console.log('链接成功')
      });

      socket.on('res', msg => {
        console.log('我是客户端1:' + msg);
      });

      setTimeout(function () {
        socket.emit('chat', '我是客户端的数据2');
      }, 3000)

      setTimeout(function () {
        socket.emit('chat', '我是客户端的数据3');
      }, 6000)
      window.socket = socket;
    };
  </script>
</body>

</html>
