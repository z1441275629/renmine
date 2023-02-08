module.export = {
    required: function (value, msg) {
        let nullArr = [null, undefined, "", NaN];
        if(nullArr.includes(value)){
            return Promise.reject(msg);
        }
        return Promise.resolve(true);
    },
    validator: function (value, fn, msg) {
        if(!fn(value)){
            return Promise.reject(msg);
        }
        return Promise.resolve(true);
    },
    delNullParam(obj){
        for(let key in obj){
            if([NaN, '', undefined, null].includes(obj[key])){
                delete obj[key];
            }
        }
        return obj;
    }
}