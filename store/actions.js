export default {
	setsocketuid({commit},value){
		commit('setsocketuid',value);
	},
	setsocketio({commit},data){
		commit('setsocketio',data);
	},
	addsocket({commit},value){
		commit('addsocket',value)
	}
}
