## 简介

cwg api

## 开发

```bash
$ npm i
$ npm run db
$ npm run dev
$ open http://localhost:7001/
```

## 发布

### 初始化数据库

```bash
npx sequelize db:migrate --env production or yarn db-prod
```

### ts 编译成 js，不然会报错

```bash
yarn ci
```

### 启动

```bash
yarn start
```

### 关闭

```bash
yarn stop
```

### 密码 md5 加密规则

```bash
md5(md5(密码)+user_salt)
```
