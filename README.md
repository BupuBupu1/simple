下载zip文件夹

创建名为koa的mysql数据库并在back/model/global.js文件里修改相应的数据

如果要部署到服务器上，需要把所有的127.0.0.1替换成公网ip

分别在back和front目录中运行pnpm i

在back目录中运行node app.js和node staticApp.js

在front目录中运行npm run build得到dist文件夹

在nginx中部署dist文件夹