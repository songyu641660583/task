export default {
	data(){
		return {
			beforeReady:true,
		}
	},
	mounted() {
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.beforeReady = false
			},500)
		})
	}
}