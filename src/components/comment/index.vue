<template>
    <div class="comment-container">
        <h2>发表评论</h2>
    <hr>
    <textarea placeholder="请输入您要评论的内容!最多输入120字" maxlength="120" v-model="msg" ></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
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

    <mt-button type="danger" size="large" plain @click="getMore" >加载更多</mt-button>
    </div>
</template>

<script>

import { Toast } from "mint-ui";

export default {
  props: ["id"],
  data() {
    return {
      pageIndex: 1 , //默认显示第一页的数据
      comments: [],//所有的评论数据
      msg: ""//评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments(){
      this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
        if(result.body.status === 0) {
          //每当获取新评论数据的时候,不要把老数据清空覆盖,而是应该以老数据拼接上新数据
          //concat() 方法用于连接两个或多个字符串
          this.comments = this.comments.concat(result.body.message);
        } else {
          Toast("获取评论失败!");
        }
      })
    },
    getMore(){
      //加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
    //校验是否为空内容
    //trim() 函数用于去除字符串两端的空白字符
    if(this.msg.trim().length === 0) {
      return Toast("评论内容不能为空!");
    }
    /**发表评论
      参数1: 请求的URL地址
      参数2: 提交给服务器的数据对象 { content: this.msg }
      参数3: 定义提交时候,表单中数据的格式 { emulateJSON:true }
   */
    this.$http.post("api/postcomment/" + this.id, { content: this.msg.trim()}).then(result => {
      console.log(result)
      if(result.body.status === 0) {
        //拼接出一个评论对象
        // var comment = {
        //   user_name: "匿名用户",
        //   add_time: Date.now(),
        //   content: this.msg.trim()
        // };
        // this.comments.unshift(comment);
        // this.msg = "";

        //刷新评论时将pageIndex重置为1 并且将数组清空
        this.pageIndex = 1 ;
        this.comments = [];
        this.msg = "";
        //重新发送请求获取第一页的评论内容并渲染
        this.getComments()
      }
    });
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

