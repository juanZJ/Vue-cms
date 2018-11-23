<template>
    <div class="photoInfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击: {{ photoInfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <img class="preview-img" v-for="(item, index) in list" :key="index" :src="item.src" height="100" @click="$preview.open(index, list)">

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoInfo.content">
        </div>

        <!-- 评论子组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
// 1. 导入评论子组件
import comment from "../../components/comment/";

import { Toast } from "mint-ui";

export default {
    data(){
        return {
            id: this.$route.params.id, //从路由中获取到的图片id
            photoInfo: {}, //图片详情
            list: [], //缩略图数组
        }
    },
    created() {
        this.getphotoInfo(),
        this.getThumbs()

    },
    methods: {
        getphotoInfo() {
            //获取图片详情
            this.$http.get('api/getimageInfo/' + this.id).then(result => {
                // console.log(result)
                if(result.body.status === 0){
                    this.photoInfo = result.body.message[0];
                }
            })
        },
        getThumbs(){
            //获取缩略图
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0) {
                    // console.log(result)
                    if(result.body.status === 0) {
                        //循环每个图片数据,补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                        });
                        //把完整的数据保存到 list 中
                        this.list = result.body.message;
                    }
                }
            })

        }
    },
    components: {
        comment
    }
}
</script>
    
<style lang="less">
    .photoInfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size:15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content {
            font-size: 13px;
            line-height: 30px;
        }
    }
</style>


