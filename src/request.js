module.exports = {
    get method(){
        return this.req.method;
    },
    get url(){
        return this.req.url;
    }
}