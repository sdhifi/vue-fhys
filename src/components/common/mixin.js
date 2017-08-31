export const mixin={
  methods: {
		formatDis(d) {
			if(!d) return '未知';
			return d>1000?`${(d / 1000).toFixed(2)}公里`:`${val}米`;
		},
		getImgPath(path){
			return path?path:(process.env.NODE_ENV=='development'?"/static/img/default.png":"./static/img/default.png")
		}
	}
}