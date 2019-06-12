const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
//const MysqlStore = require('koa-mysql-session')

const config = require('./config/config');
const routers = require('./routers/index');

const app = new Koa();

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// initial router middleware
app.use(routers.routes()).use(routers.allowedMethods());

// listen port
app.listen( config.port );
console.log(`the server(Koa2) is start at port ${config.port}`);
