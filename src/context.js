module.exports = {
    get method(){
        return this.request.method;
    },
    get url(){
        return this.request.url;
    },
    get path(){
        return this.request.path;
    },
    get body(){
        return this.response.body;
    },
    set body(data){
        this.response.body = data;
    }
}