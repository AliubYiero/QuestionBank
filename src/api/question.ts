import { request } from "@/axios";

export {
	api_getQuestionList,
	api_getQuestionListType,
	api_checkAnswerAll
}

const api_getQuestionList = ( params: { question_list_id: number } ) => {
	return request( {
		url: `/getQuestions/${ params.question_list_id }`,
		method: 'get',
	} )
}

const api_getQuestionListType = () => {
	return request( {
		url: '/getQuestionListType',
		method: 'get',
	} )
}


const api_checkAnswerAll = ( params: Array<{ question_id: number, answer: string }> ) => {
	return request( {
		url: '/checkAnswerAll',
		method: 'post',
		data: params
	} )
}
