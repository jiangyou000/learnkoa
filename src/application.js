const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');
class Application{
    constructor(){
        this.middleware = [];
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }
    use(fn){
        if(typeof fn !== 'function') throw new TypeError('中间件必须是一个函数!')
        this.middleware.push(fn)
        return this;
    }
    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
    callback(){
        const fn = this.compose(this.middleware);

        const handleRequest = (req,res) => {
            const ctx = this.createContext(req,res)
            const respond = ()=>{this.respond(ctx)}
            const onerror = (err)=>{this.onerror(err)}
            fn(ctx).then(respond).catch(onerror)
        }

        return handleRequest;
    }
    compose(middleware){
        return (ctx)=>{
            let dispatch = (i) =>{
                if(i === middleware.length){
                    return Promise.resolve();
                }
                let fn = middleware[i]
                try {
                    return Promise.resolve((fn(ctx,dispatch.bind(null,i+1))))
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            return dispatch(0)
        }
    }
    createContext(req,res){
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    onerror(err){
        console.log(err)
    }
    respond(ctx){
        let res = ctx.res;
        let body = ctx.body;
        if (typeof body === 'string') {
            res.end(body);
        }
        else if (typeof body === 'object') {
            res.end(JSON.stringify(body));
        }
    }
}
module.exports = Application