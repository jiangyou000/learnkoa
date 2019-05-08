const Koa = require('./src/application')

const app = new Koa()


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