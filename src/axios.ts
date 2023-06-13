/**
 * axios.ts
 * created by 2023/6/13
 * @file 全局axios配置
 * @author  Yiero
 * @version beta1.0.0
 * */
import axios from 'axios';
import { Message } from 'element-ui'

/* 封装request模块请求axios */
// 1. 基础配置
const request = axios.create( {
	baseURL: 'http://127.0.0.1:8888/',		// 基础请求地址
	timeout: 10 * 1000,		                // 超时时间10s
} )


// 创建axios统一响应
request.interceptors.response.use(
	res => {
		const status = res.data.status || 200
		const msg = res.data.msg || "未知错误"
		
		if ( status !== 200 ) {
			Message.error( `Error: 错误码${ status }   ${ msg }` );
			console.log( res )
			return Promise.reject( new Error( msg ) )
		}
		
		return res
	},
	error => {
		Message.error( 'Error: Unknown' );
		return Promise.reject( new Error( error ) )
	}
);

export { request };
