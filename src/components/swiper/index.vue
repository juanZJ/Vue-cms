<template>
    <div class="swiper-container">
        <mt-swipe :auto="4000">
            <!-- 在组件中,使用v-for循环的话,一定要使用 key -->
            <!-- 将来,谁使用此轮播图组件,谁为我们传递 bannerList -->
            <!-- 此时,bannerList应该是父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="(item, index) in bannerList" :key="index">
                <a :href="item.url">
                    <img :src="item.img" :class="{'full': isfull}">
                </a>
            </mt-swipe-item> 
        </mt-swipe>
    </div>

    <!-- 分析: 为什么商品评论中的轮播图那么丑
    1.首页图片中,它的宽和高都是使用了100%的宽度
    2.在商品详情页面中,轮播图也使用宽高为100%的话,小图片会被拉伸失帧,页面不好看
    3.商品详情页的轮播图,期望高度是100%,但是宽度为自适应
    4.这两个轮播图,宽度有分歧,可以定义一个属性,让使用轮播图的调用者,手动指定是否为100%的宽度 -->

</template>

<script>
export default {
  props: ["bannerList", "isfull"]
};
</script>

<style lang="less">
.swiper-container {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    &:nth-child(1) {
      background-color: yellow;
    }
    &:nth-child(2) {
      background-color: skyblue;
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    img {
      // width: 100%;
      height:100%
    }
  }
}
.full {
  width:100%;
}
</style>

