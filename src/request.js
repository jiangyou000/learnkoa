const url = require('url')
module.exports = {
    get method(){
        return this.req.method;
    },
    get url(){
        return this.req.url;
    },
    get path(){
        return url.parse(this.req.url).path
    }
}