/**
 * user.ts
 * created by 2023/6/13
 * @file
 * @author  Yiero
 * @version beta1.0.0
 * */

import { request } from '@/api/request';

export {
	api_login,
	api_register,
}

/** 登录接口 */
const api_login = ( params: { username: string, password: string } ) => {
	return request( {
		url: '/login',
		method: 'post',
		data: {
			...params
		}
	} )
}

/** 注册接口 */
const api_register = ( params: { username: string, password: string, telephone?: number, email?: string } ) => {
	return request( {
		url: '/register',
		method: 'post',
		data: {
			...params
		}
	} )
}
