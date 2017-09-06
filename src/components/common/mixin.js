export const mixin={
  methods: {
		/**
		 * 格式化距离
		 * @param {*数值} d 
		 */
		formatDis(d) {
			if(!d) return '未知';
			return d>1000?`${(d / 1000).toFixed(2)}公里`:`${d}米`;
		},
		/**
		 * 格式化金额，返回两位小数
		 * @param {*数值} m 
		 */
		formatPrice(m){
			return (m||0).toFixed(2);
		},
		/**
		 * 格式化图片地址，默认图片
		 * @param {*路径} path 
		 */
		getImgPath(path){
			return path?path:(process.env.NODE_ENV=='development'?"/static/img/default.png":"./static/img/default.png")
		},
		filterMotion(v){
			return v.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")
		}
	}
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}