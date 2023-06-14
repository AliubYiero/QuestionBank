import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

export default new Vuex.Store( {
	state: {
		userInfo: {
			user_id: '',
			username: '',
			password: '',
			telephone: undefined,
			email: undefined,
			rights: undefined,
		},
		answerList: new Map(),
		questionBankList: [],
		showStatus: 'Question',
	},
	getters: {},
	mutations: {
		changQuestionBank( state, newValue ) {
			state.questionBankList = newValue;
		}
	},
	actions: {},
	modules: {}
} )
