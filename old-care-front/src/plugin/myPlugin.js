import { get,post } from "../util/request"

export default {
    install:function(Vue){
        Vue.mixin({
            methods:{
                $get(url,params){
                    return get(url,params)
                },
                $post(url,params){
                    return post(url,params)
                }
            }

        })
    }
}