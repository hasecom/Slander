<template>
<div id="post">
    <div class="post-header border-bottom row mx-0">
        <div class="col-2">
            <router-link :to="$parent.beforePagePath" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-10 text-right">
            <button type="button" class="btn btn-sm send-btn rounded-pill">投稿する</button>
        </div>
    </div>
    <div class="post-main row">
        <div class="post-icon-wrapper col-3 text-center">
            <img :src="iconPath" alt="" class="rounded-circle border">
        </div>
        <div class="post-textarea col-9">
            <textarea name="" id="" cols="33" rows="4" placeholder="いまなにしてる？"></textarea>
        </div>
    </div>
</div>
</template>

<script>
import * as userInfo from "../assets/js/userInfo.js";
export default {
    data(){
        return{
            userInfoArr:[],
            iconPath:''
        }
    },
    created(){
        this.userInfoArr = userInfo['userInfo'];
    },
    mounted(){
        this.iconPath = this.imageLoad(this.userInfoArr['icon']);  
    },
    methods:{
    imageLoad(fileName) {
        return require('../assets/images/' + fileName + '.jpg');
    },
    }
}
</script>

<style scoped>
.post-icon-wrapper {
    padding-left: 14px;
    padding-right: 14px;
}
.post-icon-wrapper > img{
    width:46px;
    height:46px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}
.post-header{
    padding:10px 0px;
}
#post {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width:100%;
    z-index: 30;
    background: white;
}
.send-btn{
    background:#00acee;
    color:white;
    font-weight:600;
}
.arrow-left{
    color:#00acee;
}
.post-main{
    padding-top:10px;
}
.post-textarea > textarea{
    border:none;
    font-size:18px;
}
.post-textarea > textarea:focus{
    outline:0px;
}
</style>
