import axios from 'axios'
import { Message, Loading } from 'element-ui'
// import { getToken, removeToken } from '@/utils/auth'
import router from '../router'

let LoadingInstance = null;
// 创建axios实例
const service = axios.create({
	timeout: 5000,
})
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.get("serverconfig.json").then(({ data }) => {
// 	service.defaults.baseURL = data.ApiUrl
// 	localStorage.setItem('ApiUrl',result.data.ApiUrl)
// 	localStorage.setItem('ip',result.data.ip)
// 	// 这个设计可以挂在vue原型上
// }).catch(e => {
// 	service.defaults.baseURL = 'http://shop.jc-dev.cn'
// 	service.defaults.baseURL = 'http://10.10.10.152:8888' // 姚凯
// 	console.log(e);
// })
service.defaults.baseURL = 'http://localhost:8888'
// request拦截器
service.interceptors.request.use(
	config => {
		if(!config.reserveNullField){ // 正常情况下清理空字段，不需要清理的加一个 reserveNullField: true
			// 删除空的参数 "",undefined,null,NaN
			if(config.method.toLowerCase() == "get"){
				config.params && Object.keys(config.params).forEach(key => {
					if(["",undefined,null,NaN].includes(config.params[key])){
						delete config.params[key];
					}
				});
			}else{
				config.data && Object.keys(config.data).forEach(key => {
					if(["",undefined,null,NaN].includes(config.data[key])){
						delete config.data[key];
					}
				});
			}
		}
		// console.log(config.params || config.data);
		delete config.reserveNullField; // 将自己添加的区分是否清空空字符串的字变量删除
		
		// 显示loading
		if(config.showLoading){
			LoadingInstance = Loading.service({ 
				fullscreen: true,
				lock: true,
				text: '加载中……',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
		}
		return config
	},
	error => {
		console.log(error)
		Promise.reject(error)
	}
)


// response 拦截器
service.interceptors.response.use(
	response => {
		// 关闭loading
		if(LoadingInstance){
			LoadingInstance.close();
			LoadingInstance = null;
		}

		const res = response.data
		if (res.code != "0000") {
			
            Message({
                message: res.msg,
                type: 'error',
                duration: 1.5 * 1000
            })
            return Promise.reject(res)

		} else {
			return response.data
		}
	},
	error => {
		// 关闭loading
		if(LoadingInstance){
			LoadingInstance.close();
			LoadingInstance = null;
		}
		console.log('%O', error);
		let status = error.request && error.request.status;
		let msg;
		switch(status){
			case 500: msg = "服务器错误"; break;
			case 404: msg = "请求地址找不到"; break;
			case 405: msg = "请求方法错误"; break;
			default: msg = "请求出错了"; break;
		}
		Message({
			message: msg,
			type: 'error',
			duration: 1.5 * 1000
		})
		return Promise.reject(error)
	}
)
export default service
