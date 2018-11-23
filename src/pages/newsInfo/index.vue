<template>
    <div class="newsInfo-container">
        <!-- 大标newsInfo-container题 -->
     <comment :id="id"></comment>   <div class="title"></div>
        <!-- 小标题 -->
        <div class="subtitle">
            <span class="ctime">发表时间:{{ newsInfo.add_time | dateFormat }} </span>
            <span class="click">点击:{{ newsInfo.click  }}次</span>
        </div>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsInfo.content"></div>
        
    </div>
</template>

<script>
import comment from "../../components/comment/";

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
            // console.log(result)
          this.newsInfo = result.body.message[0];
        } else {
          Toast("新闻详情获取失败!请重试!");
        }
      });
    }
  },
  components: {
      comment
  }
};
</script>

<style lang="less">
    .newsInfo-container {
        padding: 0 4px;
        .title {
            font-size: 16px;
            margin: 15px 0;
            color: red;
            text-align: center;
        }
        .subtitle {
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }

</style>

