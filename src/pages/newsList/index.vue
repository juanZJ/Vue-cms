<template>
    <div class="newsList-container">
        <ul class="mui-table-view">
			<li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
				<router-link :to="'/home/newsInfo/'+ item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>	
						<p class="mui-ellipsis">
                            <span>评论时间:{{ newsList.add_time | dateFormat}}</span>
                            <span>点击:{{ item.click }} 次</span>
                        </p>
					</div>
				</router-link>
			</li>
		</ul>
    </div>
</template>


<script>
import { Toast } from "mint-ui";
export default {
	data() {
		return {
			newsList: []
		}
	},
	created() {
		this.getNewsList();
	},
	methods: {
		getNewsList() {
			this.$http.get("api/getnewslist").then(result => {
				if(result.body.status === 0){
					// console.log(result)
					//获取到数据了
					this.newsList = result.body.message;
				} else {
					//获取失败,提醒用户数据获取失败
					Toast("新闻列表获取失败!请重试!");
				}
			});
		}
	}
};
</script>


<style lang="less">
	.mui-table-view {
		li {
			h1 {
				font-size: 14px;
			}
			.mui-ellipsis {
				font-size: 12px;
				color: #226aff;
				display: flex;
				justify-content: space-between;
			}
		}
	}

</style>

