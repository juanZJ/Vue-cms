<template>
    <div class="goodsInfo-container">

        <transition name="my-ball"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref='ball'></div>
        </transition>
       

        <!-- 商品轮播图 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :bannerList="lunbotu" :isfull="false"></swiper>
				</div>
			</div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
              市场价: <del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价: <span class="nowPrice">￥{{ goodsInfo.sell_price }}</span>  
          </p>
                  
            购买数量:
          <p class="mui-numbox" data-numbox-min='1'>
              <button class="mui-btn mui-btn-numbox-minus" type="button" @click="getMinus">-</button>
              <input id="test" class="mui-input-numbox" type="number" v-model="num" />
              <button class="mui-btn mui-btn-numbox-plus" type="button" @click="getPlus">+</button>
          </p> 
              <p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                  <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
              </p>
				</div>
			</div>
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号: {{ goodsInfo.goods_no }}</p>
                    <p>库存情况: {{ goodsInfo.stock_quantity }}件</p>
                    <p>上架时间: {{ goodsInfo.add_time | dateFormat }}</p>
				</div>
				</div>
			<div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goImageText(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>

    </div>
</template>

<script>
//导入轮播图组件
import swiper from "../../components/swiper";

import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的 id 挂载到 data,方便后期调用
      lunbotu: [], //轮播图的数据
      goodsInfo: {}, // 获取到的商品信息
      ballFlag: false, //控制小球的隐藏和显示的标识符
      num: 1,
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    ...mapMutations(['addToCar']),
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          //先循环轮播图数组的每一项,为 item 添加 img 属性,因为在轮播图组件中,只认识 item.img,不认识item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      //获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    goImageText(id){
        //点击使用编程式导航跳转到图文介绍页面
        // this.$router.push("home/imageText/" + id);
        this.$router.push({name: 'imageText', params: id})
    },
    goComment(id){
        //点击跳转到评论页面
        this.$router.push({name: 'goodsComment', params: id});
    },
    
    addToShopCar(){
        //添加到购物车
        this.ballFlag = !this.ballFlag;
        // { id:商品的id, count:要购买的数量, price:商品的单价, selected:false}
        //拼接出一个要保存到 store 中car 数组里的商品信息对象
        var goodsInfo = {
          id: this.id,
          count: this.num,
          price: this.goodsInfo.sell_price,
          selected: true
        };
        // 调用store 中的mutation来将商品加入购物车
        // this.$store.commit("addToCar", goodsInfo);
        this.addToCar(goodsInfo)
    },
    beforeEnter(el){
        el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
        el.offsetWidth;
        //获取小球在页面中的位置
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        //获取 徽标在页面中的位置
        const badgePosition = document.getElementById("badge").getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
        el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
        done();
    },
    afterEnter(el) {
        this.ballFlag = !this.ballFlag;
    },
    getPlus() {
      if(this.num < this.goodsInfo.stock_quantity){
        this.num++;
      }
    },
    getMinus() {
      if(this.num > 1){
        this.num--;
      }
    }
    
  },
  components: {
    swiper
  },
  watch:{
    num: function(to, from){
      if(to > this.goodsInfo.stock_quantity){
        this.num = this.goodsInfo.stock_quantity
      } else if (to < 1){
        this.num =1;
      }
    }
  }
};
</script>

<style lang="less">
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    p {
      margin: 5px 0;
    }
  }
  .nowPrice {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>


