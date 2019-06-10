const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    //ctx.body = 'hello Andrew!'
    let url = ctx.request.url
    ctx.body = url
})

app.listen(3000)
console.log('the server is starting at port 3000')
