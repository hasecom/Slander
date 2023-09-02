<template>
<div id="post">
    <div class="post-header border-bottom row mx-0">
        <div class="col-2">
            <router-link to="/" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-10 text-right">
            <button type="button" class="btn btn-sm send-btn rounded-pill" @click="post">投稿する</button>
        </div>
    </div>
    <div class="post-main row mx-0">
        <div class="post-icon-wrapper col-3 text-center px-0">
            <img :src="iconPath" alt="" class="rounded-circle border">
        </div>
        <div class="post-textarea col-9 px-0">
            <textarea name="" id="postTextarea" cols="20" rows="4" maxlength="200" placeholder="いまなにしてる？" v-model="postTextAreaVal"></textarea>
        </div>
    </div>
    <div class="text-danger text-center small">
        ※このコメントはサーバー上に保存されます。<br>
        最初に入力した名前が使用されます。
    </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
import * as userInfo from "../assets/js/userInfo.js";
export default {
    data() {
        return {
            userInfoArr: [],
            iconPath: '',
            share_id: '',
            postTextAreaVal: '',
        }
    },
    created() {
        this.userInfoArr = userInfo['userInfo'];
    },
    mounted() {
        this.iconPath = this.imageLoad(this.userInfoArr['icon']);
        this.share_id = this.$route['params'].id;
    },
    methods: {
        post() {
        }
    },
    computed: {
        imageLoad: function () {
            return function (fileName) {
                return require('../assets/images/' + fileName + '.jpg');
            }
        },
    }
}
</script>

<style scoped>
.post-icon-wrapper {
    padding-left: 14px;
    padding-right: 14px;
}

.post-icon-wrapper>img {
    width: 46px;
    height: 46px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}

.post-header {
    padding: 10px 0px;
}

#post {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 30;
    background: white;
}

.send-btn {
    background: #00acee;
    color: white;
    font-weight: 600;
}

.arrow-left {
    color: #00acee;
}

.post-main {
    padding-top: 10px;
}

.post-textarea>textarea {
    border: none;
    font-size: 18px;
}

.post-textarea>textarea:focus {
    outline: 0px;
}

.first_post_img>img {
    width: 80%;
    border-radius: 10px;

}
</style>
