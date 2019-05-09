const methods = ['GET','POST','PUT','DELETE']
class Layer{
    constructor(path,method,middleware){
        this.path = path;
        this.method = method;
        this.middleware = middleware;
    }
}
class Router{
    constructor(){
        //保存所有注册的路由
        this.stack = []
    }
    register(path,method,middleware){
        let layer = new Layer(path,method,middleware)
        this.stack.push(layer)
    }
    routes(){
        //这个router应该返回一个koa中间件，这个中间件中要调用匹配路由的middleware，或者直接返回匹配路由中的中间件
        let stack = this.stack;
        
        let fn = async (ctx,next) => {
            let route;
            //遍历所有已经注册的路由，找到匹配路由
            stack.some(layer=>{
                //如果匹配到path和method都一致
                if(
                    ctx.path === layer.path && ctx.method === layer.method
                ){
                    route = layer.middleware
                    return true;
                }
            })
            if(typeof route === 'function'){
                route(ctx,next)
            }else{
                ctx.body = '404 page'
            }
        }
        return fn;
    }
}
methods.forEach(function(method){
    Router.prototype[method.toLowerCase()] = Router.prototype[method] = function(path,middleware){
        this.register(path,method,middleware)
    }
})
module.exports = Router