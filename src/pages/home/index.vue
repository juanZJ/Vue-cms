<template>
    <div class="home-container">
        <!-- 轮播图 -->
        <mt-swipe class="banner-container" :auto="4000">
            <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item> 
        </mt-swipe>

        <!-- 网格导航-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newsList">
		            <img src="../../images/menu1.png" alt="">
		            <div class="mui-media-body">新闻资讯</div>
            </router-link>
          </li>
		      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/photoList">
		            <img src="../../images/menu2.png" alt="">
		            <div class="mui-media-body">图片分享</div>
            </router-link>
          </li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/menu3.png" alt="">
		            <div class="mui-media-body">商品购买</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/menu4.png" alt="">
		            <div class="mui-media-body">留言反馈</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/menu5.png" alt="">
		            <div class="mui-media-body">视频专区</div></a></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		            <img src="../../images/menu6.png" alt="">
		            <div class="mui-media-body">联系我们</div></a></li>
		</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui"; //弹出消息插件

export default {
  data() {
    return {
      bannerList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http.get("http://www.lovegf.cn:8899/api/getlunbo").then(result => {
        if (result.body.status === 0) {
          this.bannerList = result.body.message;
        } else {
          Toast("获取轮播图数据失败,请重试!");
        }
      });
    }
  }
};
</script>

<style lang="less">
.home-container {
  //轮播图样式
  .banner-container {
    height: 200px;
    .mint-swipe-item {
      &:nth-child(1) {
        background-color: yellow;
      }
      &:nth-child(2) {
        background-color: skyblue;
      }
      &:nth-child(3) {
        background-color: pink;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
      }
    }
  }

  //九宫格样式
  .mui-table-view {
      background-color: #fff;
      border: none;
      .mui-table-view-cell {
          border: none;
          img {
              width: 60px;
              height: 60px;
          }
          .mui-media-body {
              font-size: 13px;
          }

      }
  }
}
</style>

