<template>
    <div class="imageText-container">
        <h3>{{ info.title }}</h3>
        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info: {}  //图文数据
        };
    },
    created(){
        this.getImageText();
    },
    methods: {
        getImageText(){
            this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(result => {
                console.log(result)
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                }
            })
        }
    }
}
</script>

<style lang="less">
.imageText-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
</style>