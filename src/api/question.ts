import { request } from "@/axios";

export {
	api_getQuestionList,
	api_getQuestionListType,
	api_checkAnswerAll,
	api_addQuestionList,
	api_addQuestion,
	api_deleteQuestion,
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

const api_addQuestionList = ( params: { question_list_name: string } ) => {
	return request( {
		url: '/addQuestionList',
		method: 'post',
		data: {
			...params
		}
	} )
}

const api_addQuestion = ( params: { content: string, options: string, answer: string, question_list_id: number, type: number } ) => {
	return request( {
		url: '/addQuestion',
		method: 'post',
		data: {
			...params
		}
	} )
}


const api_deleteQuestion = ( params: { question_id: number } ) => {
	return request( {
		url: '/removeQuestion',
		method: 'post',
		data: {
			...params
		}
	} )
}
