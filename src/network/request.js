import axios from 'axios'

export function request(config) {
	//1.创建axios实例
	const instance = axios.create({
		baseURL: 'https://www.fastmock.site/mock/d7e559f10b30ae923a2031d2b396184f/vuetest01',
		timeout: 5000
	})

	//2.axios的请求拦截
	instance.interceptors.request.use(config =>{
		config.headers.Authorization = window.sessionStorage.getItem('token')
		return config
	}, err => {
	})

	//3.axios的响应拦截
	instance.interceptors.response.use(res => {
		return res.data
	}, err => {
	})

	//发送真正的网络请求
	return instance(config)
}