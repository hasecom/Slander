<template>
<div id="post">
    <div class="post-header border-bottom row mx-0">
        <div class="col-2">
            <router-link :to="$parent.beforePagePath != undefined ? $parent.beforePagePath : '/' " tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-10 text-right">
            <button type="button" class="btn btn-sm send-btn rounded-pill" @click="post" :disabled="this.$parent.IsEnd && this.$parent.ExistBurnPost ? true : false">投稿する</button>
        </div>
    </div>
    <div class="post-main row">
        <div class="post-icon-wrapper col-3 text-center">
            <img :src="iconPath" alt="" class="rounded-circle border">
        </div>
        <div class="post-textarea col-9">
            <textarea name="" id="postTextarea" cols="20" rows="4" placeholder="いまなにしてる？" v-bind:readonly="is_readonly"></textarea>
            <div class="first_post_img" v-if="this.$parent.userStory != undefined ? !this.$parent.userStory['firstPost'] : false">
                <img class="border" v-lazy="imageLoad(this.$parent.userStory['postAction'][0].imagePath)" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import * as userInfo from "../assets/js/userInfo.js";
export default {
    data() {
        return {
            userInfoArr: [],
            iconPath: '',
            is_readonly: true
        }
    },
    created() {
        this.userInfoArr = userInfo['userInfo'];
    },
    mounted() {
        this.iconPath = this.imageLoad(this.userInfoArr['icon']);
        if (this.$parent.userStory != undefined) {
            //初回投稿前
            if (!this.$parent.userStory['firstPost']) {
                $('#postTextarea').val(this.$parent.userStory['postAction'][0].message);
            } else {
                this.is_readonly = false;
            }
        }
    },
    methods: {
        post() {
            //投稿ボタンを押したら
            this.$router.push('/')
            var postFirstAction = this.$parent.userStory['postAction'][0];

            //初回
            if (!this.$parent.userStory['firstPost']) {
                this.$parent.timeLine.push({
                    id: this.$parent.userStory.BurnId,
                    name: this.userInfoArr['name'],
                    type: 1,
                    message: postFirstAction.message,
                    imagePath: postFirstAction.imagePath,
                    iconPath: this.userInfoArr['icon'],
                    good: 0,
                    repost: 0,
                    replyCnt: 0,
                    timestamp: ""
                });
                this.$parent.userpost.push({
                    user_post_id: this.$parent.userStory.BurnId,
                    name: this.userInfoArr['name'],
                    message: postFirstAction.message,
                    imagePath: postFirstAction.imagePath,
                    iconPath: this.userInfoArr['icon'],
                    good: 0,
                    repost: 0,
                    replyCnt: 0,
                    timestamp: ""
                })
                this.$parent.userStory.firstPostFnc();
                this.$parent.first_post_after();
            }
        }
    },
    computed: {
        imageLoad:function() {
            return function(fileName){
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
