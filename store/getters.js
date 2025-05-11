export default{
	changeprice(state){
		return state.info;
	},
	socketuid(state){//用户uid
		return state.socketuid;
	},
	socketjson(state){//所有会话数据
		return state.socketjson;
	},
	socketjsonlist(state){//当前所有会话数据
		return state.socketjsonlist;
	},
	msgnumindex(state){
		return state.msgnumindex;
	},
	onlinebool(state){
		return state.onlinebool;
	},
	allonline(state){
		return state.allonline;
	},
	socketonline(state){
		return state.socketonline;
	}
	
	
}
