import axios from 'axios';

var instance = axios.create(
    {
        baseURL: 'http://49.232.157.63:8401',
        // baseURL: 'http://127.0.0.1:8401',
        timeout:30000
    }
);

let get = async function(url,params){
    let {data}=await instance.get(url,{params});
    return data;
}
let post = async function(url,params){
    let {data}= await instance.post(url,params);
    return data;
}

instance.interceptors.request.use(
    function(config) {
        //发送请求前
        return config;
    },
    function(error) {
        //请求错误时
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response) {
        //对相应数据做点什么
        return response;
    },
    function(error) {
        //响应错误错误时
        return Promise.reject(error);
    }
);

export {
    get,
    post
}
