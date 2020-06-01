<template>
<div>
    <div id="timeline" v-for="item in timeline" :key="item['id']">
        <div class="border-bottom">
            <div class="row  mg-0 post">
                <div class="col-2 px-0">
                    <div class="icon rounded-circle border">
                        <img v-if="item['imagePath']" class="border rounded-circle" :src="item['iconPath'] != '' ? imageLoad(item['iconPath']) : ''" alt="">
                    </div>
                </div>
                <div class="col-10 px-0">
                    <div class="row">
                        <div class="col-6">
                            <div class="font-weight-bold home_name">
                                {{item['name']}}
                            </div>
                        </div>
                        <div class="col-4 text-muted small">
                            {{item['timestamp']}}
                        </div>
                        <div class="col-2 small text-muted" @click="home_detail(item)" v-if="item.type==1">
                            <font-awesome-icon icon="chevron-down" />
                        </div>
                    </div>
                    <div>{{item['message']}}</div>
                    <div class="timeline_image">
                        <img v-if="item['imagePath']" class="border" :src="item['imagePath'] != '' ? imageLoad(item['imagePath']) : ''" alt="">
                    </div>
                    <div class="row text-muted text-center pt-3">
                        <div class="col-3 px-0">
                            <font-awesome-icon icon="comment" />
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
    <div class="under_details_wappers" v-if="isUnderDetails" @click.self="detailsClose()">
        <div class="under_details">
            <div class="text-center text-muted">
                <font-awesome-icon icon="minus" />
            </div>
            <div>
                <div class="row mx-0 under_details_msg">
                    <div class="col-3">
                        <font-awesome-icon icon="trash-alt" />
                    </div>
                    <div class="col8" @click="deleteTweet">
                        ツイートを削除
                    </div>
                </div>
            </div>
            <div class="under_details_cancel_btn_wrapper">
                <div class="under_details_cancel_btn btn border rounded-pill" @click="detailsClose()">
                    キャンセル
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    data() {
        return {
            timeline: [],
            isUnderDetails: false,
            selectItem: []
        }
    },
    mounted() {
        this.timeline = (this.$parent.$parent.timeLine).slice().reverse();
    },
    methods: {
        imageLoad(fileName) {
            return require('../assets/images/' + fileName + '.jpg');
        },
        home_detail(item) {
            this.selectItem = item;
            this.isUnderDetails = true;
            this.$nextTick(function () {
                $('.under_details').animate({
                    height: "150px"
                }, 100);

            });
        },
        detailsClose() {
            var self = this;
            $('.under_details').animate({
                height: "0px"
            }, 100, function () {
                self.isUnderDetails = false;
            })
        },
        deleteTweet() {
            var deleteNum = 0;
            this.$parent.$parent.timeLine.slice().reverse().forEach((el, index) => {
                if (el.id == this.selectItem.id) {
                    deleteNum = index;
                    if(this.$parent.$parent.userStory.BurnId == el.id){
                        this.$parent.$parent.ExistBurnPost = false;
                    }
                }
            });
            this.timeline.splice(deleteNum,1)
            this.$parent.$parent.timeLine.splice(this.timeline.length - deleteNum,1);
            this.detailsClose();
        }
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
    position: absolute;
    width: 100%;
    height: 0px;
    bottom: 0;
    background: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
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
</style>
