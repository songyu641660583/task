export default {
	//mutations的唯一目的就是修改state中的状态
	//mutations的设计原则就是每个函数方法只负责一件事,有利于vue的插件方便调试
	changeInfo(state,payload) {
		state.info = payload;
	},
	getLevel(state,payload) {
		state.level = payload
	},
	changeprice(state,price){
		state.balanceprice = price;
	},
	setsocketuid(state, value){
		state.socketuid = value;
	},
	setsocketio(state,value){
		if(value.page < 2){
			state.socketjson = value.data;
		}else{
			value.data.map(function(item,index,arr){
				state.socketjson.push(item);
			});
		}
		
	},
	setsockettotal(state,value){
		state.sockettotal = value;
	},
	loadsocketlist(state,value){
		state.socketjsonlist = value;
	},
	addsocket(state,value){
		state.socketjsonlist.push(value);
	},
	msgnum(state,value){ //系统推送未查看消息
		state.msgnumindex = value;
	},
	onlinecheck(state,value){//用户当前是否在线
		state.onlinebool = value;
	},
	onlinesocket(state,value){//上级未查看信息
		state.socketonline = value;
	},
	allonlinesocket(state,value){//后台未查看信息
		state.allonline = value;
	}
	
}
