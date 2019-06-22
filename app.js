const path = require('path');
const Koa = require('koa');
//const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const static = require('koa-static');

const config = require('./config/config');
const routers = require('./routers/index');

const app = new Koa();

//const staticPath = './views';
const staticPath = './statics';

// http logger
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());


// 配置服务端模板渲染引擎中间件
/*app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));*/

//set up landing page of website
app.use(static(
    path.join( __dirname,  staticPath)
))

// initial router middleware
app.use(routers.routes()).use(routers.allowedMethods());

// listen port
app.listen( config.port );
console.log(`the server(Koa2) is start at port ${config.port}`);
