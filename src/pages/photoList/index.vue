<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="{'mui-control-item':true,'mui-active': item.id == 0}" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="img in list" :key="img.id" :to="'/home/photoInfo/' + img.id" tag="li">
                <img v-lazy="img.img_url" >
                <div class="info">
                    <h1 class="info-title">{{ img.title }}</h1>
                    <div class="info-body">{{ img.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: []//图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    //默认进入页面,就主动请求所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    //当组件中的DOM结构被渲染好并放到页面中后,会执行这个钩子函数
    //初始化区域滚动一定要放在mounted钩子函数中
    //因为初始化操作必须要等DOM元素加载完成后才可以进行
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      //获取所有图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //手动拼接出一个完整的分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
        //根据分类id,获取图片列表
        this.$http.get("api/getimages/" + cateId).then(result => {
            if(result.body.status === 0){
                this.list = result.body.message;
            }
        });
    }
  }
};
</script>


<style lang="less">
* {
  touch-action: pan-y;
}
.photo-list {
    li {
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
            width: 40px;
            height: 300px;
            vertical-align: middle;
            background-color: red;
        }
        .info {
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            .info-title {
                font-size: 14px;
            }
            .info-body {
                font-size: 13px;
            }
        }
    }
}
</style>


