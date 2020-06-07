<template>
<div>
    <div class="border-bottom row mx-0">
        <div class="col-3 px-0 py-2">
            <router-link to="/search" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-6 px-0 py-2 text-center font-weight-bold">
            {{trend.name}}
        </div>
        <div class="col-3 px-0"></div>
    </div>
    <div class="trend_body">
        <div id="timeline" v-for="item in trend.content" :key="item['id']">
            <div class="border-bottom">
                <div class="row  mg-0 post">
                    <div class="col-2 px-0">
                        <div class="icon rounded-circle border">
                            <img v-if="item['iconPath']" class="border rounded-circle" v-lazy="item['iconPath'] != '' ? imageLoad(item['iconPath']) : ''" alt="">
                        </div>
                    </div>
                    <div class="col-10 pl-3 pr-0">
                        <div class="row">
                            <div class="col-12">
                                <div class="font-weight-bold home_name">
                                    {{item['name']}}
                                </div>
                            </div>
                        </div>
                        <div>{{item['message']}}</div>
                        <div class="timeline_image">
                            <img v-if="item['imagePath']" class="border" v-lazy="item['imagePath'] != '' ? imageLoad(item['imagePath']) : ''" alt="">
                        </div>
                        <div class="row text-muted text-center pt-3">
                            <div class="col-3 px-0">
                                <font-awesome-icon icon="comment" @click="reply(item.id)" />
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
    <div class="reply py-3 px-3" v-if="
    Postreplay && 
    IssingerBoy && 
    !$parent.$parent.IsReplySingerBoy &&
     !$parent.$parent.IsEnd &&
     !$parent.$parent.IsTimeOut
     ">
        <div class="text-right">
            <button type="button" class="btn btn-sm send-btn rounded-pill" @click="post" >返信する</button>
        </div>
        <div>
            <span class="text-muted small">返信先：</span>
            <span class="reply_text small">@シンガーボーイ</span>
            <div>{{replyText}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            trend_id: 0,
            trend: [],
            replyText: "",
            IssingerBoy: false,
            Postreplay: false,//リプライを押したら
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.trend_id = this.$route.params.id;
            var self = this;
            this.trend = this.$parent.$parent.trendList.filter(function (el) {
                return el.trend_id == self.trend_id;
            })[0];
            this.replyText = this.$parent.$parent.userStory.singerBoyReply
        },
        reply(id) {
            this.Postreplay = true;
            //シンガーボーイのトレンド
            if (this.trend_id == this.$parent.$parent.userStory.singerBoyTrendId && id== 0) {
                this.IssingerBoy = true;
            }

        },
        post(){
            this.$parent.$parent.IsReplySingerBoy = true;
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

.under_details_wappers {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 30;
}

.under_details {
    position: fixed;
    width: 100%;
    height: 150px;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    background: white;
    z-index: 30;
}

.under_details_cancel_btn {
    width: 90%;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    margin-bottom: 10px;
    font-weight: bold;
    background: #dfe6e9;
}

.under_details_msg {
    font-size: 18px;
    padding: 40px 10px;
    color: #ff7675;
}

.reply {
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 60px !important;
}

.reply_text {
    color: #00acee;
}
.send-btn {
    background: #00acee;
    color: white;
    font-weight: 600;
}

</style>
