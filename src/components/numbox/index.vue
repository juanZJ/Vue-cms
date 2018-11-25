<template>
    
        <div class="numbox">
            <button class="minus" @click="numberMinus">-</button>
            <input  id="text" type="number" v-model="number">
            <button class="plus" @click="number++">+</button>
        </div>
    
</template>

<script>
export default {
    data() {
        return{
            number: 1,
        }
    },
    methods: {
        
    } 
}
</script>

<style lang="less">
        .numbox {
            position: relative;
            display: inline-block;
            width: 120px;
            height: 25px;
            padding: 0 40px;
            border: 1px solid #bbb;
            border-radius: 3px;
            background-color: #efeff4;
            .minus {
                left: 0;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
                font-size: 18px;
                font-weight: 400;
                line-height: 100%;
                position: absolute;
                top: 0;
                overflow: hidden;
                width: 40px;
                height: 100%;
                padding: 0;
                color: #555;
                border: none;
                background-color: #f9f9f9;
            }
            #text {
                display: inline-block;
                overflow: hidden;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0 3px;
                text-align: center;
                border-right: 1px solid #ccc;
                border-left: 1px solid #ccc;
            }
            .plus {
                right: 0;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                font-size: 18px;
                font-weight: 400;
                line-height: 100%;
                position: absolute;
                top: 0;
                overflow: hidden;
                width: 40px;
                height: 100%;
                padding: 0;
                color: #555;
                border: none;
                background-color: #f9f9f9;
            }
        }
    
</style>


