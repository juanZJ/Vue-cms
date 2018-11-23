<template>
  <div class="app-container">

    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="Vue CMS"></mt-header>

	 <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="my-mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="my-mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="my-mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="my-mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  



    <!-- 中间的路由 router-view 区域 -->
	<transition>
		<router-view></router-view>
	</transition>





   
  </div>
</template>

<script>
export default {};
</script>


<style lang="less">
	 .app-container{
		 padding-top: 40px;
		 padding-bottom: 50px;
		 overflow-x: hidden;

		 .v-enter {
			 transform: translateX(100%);
			 opacity: 0;
		 }
		 .v-leave-to {
			 position: absolute;
			 transform: trans (-100%);
			 opacity: 0;
		 }
		 .v-enter-active,
		 .v-leave-active {
			 transition: all 0.6s ease;
		 }
		 
		 .mui-bar-tab {
			 //该类名,解决tabbar点击无法切换的问题
			 .my-mui-tab-item {
				display: table-cell;
    			overflow: hidden;
    			width: 1%;
    			height: 50px;
    			text-align: center;
    			vertical-align: middle;
    			white-space: nowrap;
    			text-overflow: ellipsis;
    			color: #929292;
				.mui-icon {
					top: 3px;
    				width: 24px;
    				height: 24px;
    				padding-top: 0;
    				padding-bottom: 0;
				}
				.mui-tab-label {
					font-size: 11px;
    				display: block;
    				overflow: hidden;
    				text-overflow: ellipsis;
				}
			 }
			 .mui-active {
			 	color: #007aff;
		 	}	
		}
	}

</style>
