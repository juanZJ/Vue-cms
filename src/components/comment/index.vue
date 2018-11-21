<template>
    <div class="comment-container">
        <h2>发表评论</h2>
    <hr>
    <textarea placeholder="请输入您要评论的内容!最多输入120字" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="comment-list" v-for="(item, i) in comments" :key="item.add_time" >
       <div class="comment-item">
         <div class="comment-title">
           第{{ i+1 }}楼 &nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
         </div>
         <div class="comment-body">
           {{ item.content === 'udefined' ? '此用户无评论' : item.content }}
         </div>
       </div>
    </div>

    <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      pageIndex: 1 , //默认显示第一页的数据
      comments: [] //所有的评论数据
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments(){
      this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
        if(result.body.status === 0) {
          this.comments = result.body.message;
        } else {
          Toast("获取评论失败!");
        }
      })
    }
    
  }
};
</script>

<style lang="less">
  .comment-container{
    h2{
      font-size: 16px;
    }
    textarea{
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .comment-list{
      margin: 5px 0;
      .comment-item{
        font-size: 13px;
        .comment-title{
          line-height: 30px;
          background-color: #ccc;
        }
        .comment-body{
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>

