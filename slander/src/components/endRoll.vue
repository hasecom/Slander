<template lang="en">
<div id="endroll">
    <div class="endrollWrapper">
        <div class="endrollContent px-3 py-3">
            <h2 class="text-center font-weight-bold">{{EndRollArr.sevice_name}}</h2>
            <div class="text-center py-3 border  my-4">
                <h5 class="font-weight-bold">{{EndPattern}}エンド</h5>
                <span class="text-right d-block small px-2">
                    <span class="kasen">
                        <a :href="EndRollArr.note_url" target="_blank">エンドパターン・解説はこちら</a>
                    </span>
                    <font-awesome-icon icon="chevron-right" />
                </span>
            </div>
            <div class="text-right">製作者：{{EndRollArr.producer}} ( <a class="supporter_link" :href="'https://twitter.com/'+EndRollArr.producer_twitter_id" target="_blank">@{{EndRollArr.producer_twitter_id}}</a> ) </div>
            <div class="py-3">{{EndRollArr.description}}</div>
            <div class="twitter_share text-center my-3">
                <div>
                    多くのネットユーザに届きますように<br>シェアのご協力お願いいたします。
                </div>
                <div class="twitter btn border shadow-sm mt-3" @click="twitterShare">
                    <font-awesome-icon :icon="['fab', 'twitter']" />
                    ツイート
                </div>
            </div>
            <div class="supporter_list py-3">
                <h5 class="font-weight-bold">サポーター様のご紹介<span class="small">(順不同)</span></h5>
                <div v-if="EndRollArr.supporter.length != 0" class="supporter py-2" v-for="(item,index) in EndRollArr.supporter" :key="index">
                    ・{{item.name}}様
                    <span v-if="item.type == 0">（ <a class="supporter_link" :href="'https://twitter.com/'+item.account_id" target="_blank">@{{item.account_id}}</a> )</span>
                </div>
                <div v-if="EndRollArr.supporter.length == 0" class="text-white text-center">現在サポーター様はおりません。</div>
                <div v-if="EndRollArr.supporter.length != 0" class="text-center py-3">以上、{{EndRollArr.supporter.length}}名様<br>ご協力ありがとうございます。</div>
            </div>
            <div class="supporter_recruitment my-3">
                <div>
                    応援してください。<br>社会がよりハッピーになる活動を続けます。
                </div>
                <h5 class="text-center pt-1 font-weight-bold">
                    サポーター募集
                    <font-awesome-icon icon="chevron-right" />
                </h5>
            </div>
            <div class="py-5  text-center">
                <div class="close_btn btn border rounded-pill" @click="closeEndRoll">
                    閉じる
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    props: {
        EndRollArr: {
            type: Object
        },
        EndPattern: {
            type: String
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        $('.endrollWrapper').hide().fadeIn(3000);
        $('body').css('overflow', 'hidden');
        $('body').css('position', 'fixed');
    },
    methods: {
        closeEndRoll() {
            $('body').css('overflow', 'auto');
            $('body').css('position', 'static');
            this.$parent.EndRaul = false;
        },
        twitterShare() {
            //シェアする画面を設定
            var shareURL = 'https://twitter.com/intent/tweet?text=【' + this.EndPattern+"エンド】"+"%0A%23炎上・誹謗中傷擬似体験%0A" + '&url=' + "https://slander-app.herokuapp.com/#/";
            //シェア用の画面へ移行
            window.open(shareURL, "_blank");
        }
    }
}
</script>

<style scoped>
.endrollWrapper {
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow-y: scroll;
}

.endrollContent {
    color: white;
}

.endrollContent>h2 {
    font-size: 18px;
}

.twitter_share {
    background: white;
    color: black;
    padding: 30px 5px;
    border-radius: 15px;
    font-weight: bold;
    font-size: 15px;
}

.twitter {
    display: inline-block;
    background: #00acee;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    margin-top: 5px;
}

.supporter_recruitment {
    background: #FF9888;
    color: white;
    padding: 10px 10px;
    border-radius: 15px;
    font-weight: bold;
    font-size: 15px;
}

.supporter_recruitment>div {
    font-size: 13px;
}

.supporter_link {
    color: white;
    text-decoration: underline;
}

.close_btn {
    background: #b2bec3;
    color: white;
}

.kasen {
    text-decoration: underline;
}
</style>
