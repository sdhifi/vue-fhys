export const mixin={
  methods: {
		formatDis(d) {
			if(!d) return '未知';
			return d>1000?`${(d / 1000).toFixed(2)}公里`:`${d}米`;
		},
		formatPrice(m){
			return (m||0).toFixed(2);
		},
		getImgPath(path){
			return path?path:(process.env.NODE_ENV=='development'?"/static/img/default.png":"./static/img/default.png")
		}
	}
}