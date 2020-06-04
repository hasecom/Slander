<template>
<div id="profile">
    <div class="p border-bottom row mx-0">
        <div class="col-2">
            <router-link to="/" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-10 text-right">
        </div>
    </div>
    <div class="home_img"></div>
    <div class="profile_body">
        <div class=px-3>
            <div class="row">
                <div class="col-5">
                    <div class="profile-icon-wrapper">
                        <img v-if="userInfoArr.icon != undefined" :src="imageLoad(userInfoArr.icon)" alt="" class="rounded-circle border">
                    </div>
                </div>
                <div class="col-7 py-2 profile_btn" v-if="!$parent.IsEnd && !$parent.IsTimeOut">
                    <span class="small rounded-pill border px-2 py-2" @click="changeProfile()">プロフィールを変更</span>
                </div>
            </div>
            <div class="font-weight-bold">
                {{userInfoArr.name}}
            </div>
            <div class="text-muted small">
                @{{userInfoArr.id}}
            </div>
            <div>
                {{userInfoArr.profile}}
            </div>
            <div class="py-3 small">
                <span class="px-2">
                    <span class="font-weight-bold">{{userInfoArr.follow}}</span>
                    <span class="text-muted">フォロー</span>
                </span>
                <span class="px-2">
                    <span class="font-weight-bold">{{userInfoArr.follower}}</span>
                    <span class="text-muted">フォロワー</span>
                </span>
            </div>
        </div>
        <div class="border-top">
            <div id="timeline" v-for="(item,index) in userPost.slice().reverse()" :key="index">
                <div class="border-bottom">
                    <div class="row  mx-0 post">
                        <div class="col-2 px-0">
                            <div class="icon rounded-circle border">
                                <img v-if="userInfoArr.icon != undefined" :src="imageLoad(userInfoArr.icon)" alt="" class="rounded-circle border">
                            </div>
                        </div>
                        <div class="col-10 pl-3 pr-0">
                            <div class="row">
                                <div class="col-12">
                                    <div class="font-weight-bold home_name">
                                        {{userInfoArr.name}}
                                    </div>
                                </div>
                            </div>
                            <div>{{item['message']}}</div>
                            <div class="timeline_image">
                                <img v-if="item['imagePath']" class="border" :src="item['imagePath'] != '' ? imageLoad(item['imagePath']) : ''" alt="">
                            </div>
                            <div class="row text-muted text-center pt-3">
                                <div class="col-3 px-0">
                                    <font-awesome-icon icon="comment" @click="reply()" />
                                    <span class="px-1 small" v-show="item.replyCnt > 0">{{item.replyCnt}}</span>
                                </div>
                                <div class="col-3 px-0">
                                    <font-awesome-icon icon="retweet" />
                                    <span class="px-1 small" v-show="item.repost > 0">{{item.repost}}</span>
                                </div>
                                <div class="col-3 px-0">
                                    <font-awesome-icon icon="heart" />
                                    <span class="px-1 small" v-show="item.good > 0">{{item.good}}</span>
                                </div>
                                <div class="col-3 px-0">
                                    <font-awesome-icon icon="external-link-alt" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            userInfoArr: [],
            userPost: []
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.userInfoArr = this.$parent.userInfoArr;
            this.userPost = this.$parent.userpost;
        },
        changeProfile(){
            this.$parent.userInfoArr.profile = this.$parent.userStory.ChangeUserProfile;
            this.$parent.changeProfileEnd();
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
#profile {
    position: fixed;
    width: 100%;
    height: 100%;
    background: white;
    top: 0;
    z-index: 10;
    overflow-y: scroll;
    padding-bottom: 50px;
}

.profile-icon-wrapper>img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}

.home_img {
    width: 100%;
    height: 100px;
    background: #636e72;
}

.icon {
    width: 44px;
    height: 44px;
}

.icon>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#timeline {
    padding: 10px 0px;
}

.home_name {
    font-size: 15px;
}

.post {
    padding: 5px 30px;
}

.timeline_image>img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    margin-top: 20px;
    border-radius: 15px;
}
.profile_btn{
    color:#00acee;
    border-color:#00acee;
}
</style>
