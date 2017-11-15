<template>
	<div>
		<header-top title="所有栏目"></header-top>
		<main class="scroll-content-2" style="padding-top:.2rem;">
			<yd-cell-group v-for="(item,index) in menu" :key="index">
				<yd-cell-item arrow type="link" :href="'/online/products?type=0&id='+item.id">
					<span slot="icon" :class="['iconfont-large',item.icon]" :style="{color:item.color}"></span>
					<span slot="left">{{item.names}}</span>
				</yd-cell-item>
						<yd-cell-item arrow type="link" :href="'/online/products?type=1&id='+m.id" v-for="(m,i) in item.subcolumn" :key="i">
					<span slot="left">{{m.names}}</span>
				</yd-cell-item>
			
			</yd-cell-group>
		</main>
	</div>
</template>
<script>
import HeaderTop from 'components/header/index'
export default {
	name: "AllColumn",
	data() {
		return {
			menu: [
				{ id: 1333, names: '丽人', icon: 'self-huazhuangpin', color: '#e3c77e', subcolumn: [{ id: 1334, names: '美妆' }, { id: 1400, names: '女性护理' }] },
				{ id: 1335, names: '汽车', icon: 'self-qiche', color: '#fdd357' },
				{ id: 1337, names: '居家', icon: 'self-dianfanguo', color: '#c1dd31', subcolumn: [{ id: 1345, names: '家用电器' }, { id: 1346, names: '生活日用' }] },
				{ id: 1338, names: '生活服务', icon: 'self-shenghuofuwu', color: '#bbdca7' },
				{ id: 1339, names: '休闲娱乐', icon: 'self-KTV', color: '#e4ce37' },
				{ id: 1340, names: '软件服务', icon: 'self-ruanjian', color: '#84c75e' },
				{
					id: 1342, names: '购物', icon: 'self-bags', color: '#ff9b52', subcolumn: [{ id: 1343, names: '食品' }, { id: 1344, names: '精品文具' },
					{ id: 1359, names: '汽车' }, { id: 1401, names: '养生保健' }, { id: 1402, names: '基础护肤' }, { id: 1403, names: '化妆香水' },
					{ id: 1404, names: '个人护理' }, { id: 1405, names: '服装饰品' }, { id: 1406, names: '母婴儿童' }, { id: 1407, names: '食品饮料' },
					{ id: 1408, names: '鞋靴箱包' }, { id: 1409, names: '家居厨卫' }, { id: 1410, names: '数码家电' }]
				}
			]
		}
	},
	components: { HeaderTop },
	activated() {
		if (this.$store.state.positions[this.$route.path]) {
      document.querySelector("main").scrollTop = this.$store.state.positions[
        this.$route.path
      ];
    }
	},
}
</script>
<style lang="less" scoped>
@import '../../style/mixin.less';
</style>	