module.exports = {
    get method(){
        return this.request.method;
    },
    get url(){
        return this.request.url;
    }
}