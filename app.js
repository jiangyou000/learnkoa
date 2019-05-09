// const Koa = require('koa')
// const Router = require('koa-router')
const Koa = require('./src/application')
const Router = require('./src/middleware/koa-router')
const app = new Koa()
const router = new Router()

let fn1 = function(){
    return new Promise(resolve=>{
        setTimeout(function(){
            resolve()
            console.log('异步fn1')
        },5000)
    })
}
let fn2 = function(){
    setTimeout(function(){
        console.log('异步fn2')
    },3000)
}
router.get('/index',async (ctx,next)=>{
    console.log('进入 /index')
    ctx.body = 'index page'
})
router.get('/page',async (ctx,next)=>{
    console.log('进入 /page')
    ctx.body = 'page page'
})
router.get('/news',async (ctx,next)=>{
    console.log('进入 /news')
    ctx.body = 'news page'
    await next()
})
app.use(router.routes())
app.use(async(ctx,next)=>{
    console.log('1')
    console.log(ctx.url)
    await next()
    console.log('2')
})
app.use(async(ctx,next)=>{
    console.log('3')
    await fn1()
    await next()
    console.log('4')
    ctx.body = 'hello'
})
app.listen(8080,()=>{
    console.log('启动...')
})