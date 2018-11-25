<template>
    <div class="goodsComment-container">
        <comment :id="$route.params.id"></comment>
    </div>
</template>
<script>
import comment from "../../components/comment";
export default {
   
    components: {
        comment
    }
}
</script>

<style lang="less">
   .goodsComment-container {
     
   }
</style>


