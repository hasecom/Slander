<template>
<div id="app">
    <div v-if="isPhone">
        <FirstView v-if="isFirstView" />
        <EndRoll v-if="EndRaul" :EndRollArr="endRollArr" :EndPattern="endPatternStr" />
        <TerminalNotice v-if="IsterminalNotice" :terminal_notice_name="Terminal_notice_name" :terminal_notice_message="Terminal_notice_message" :terminal_notice_type="Terminal_notice_type" />
        <div id="content">
            <Header :userInfoLabel="userInfoArr" :PageTitle="pageTitle" />
            <pull-to :top-load-method="refresh" v-if="!IsOpenOtherPage" :top-config="config" @top-state-change="stateChange" :is-bottom-bounce="false" :is-top-bounce="movepullTo">
                <div id="main">
                    <router-view ref="router_view"></router-view>
                </div>
            </pull-to>
            <div v-if="IsOpenOtherPage" id="main">
                <router-view></router-view>
            </div>

            <div class="fixed-button-wrapper">
                <PostBtn :PageParam="pageParam" />
            </div>

            <SideBar v-if="IsOpensideBar" :userInfoLabel="userInfoArr" />
            <Footer :siteInfoLabel="siteInfoArr" />
        </div>
    </div>
    <div class="pc">
        <div class="row">
            <div class="pc_body col-6 px-0">
                <div class="pc_title text-center">
                    炎上・誹謗中傷<br>擬似体験サービス
                </div>
                <div class="pc_inner_body">
                    <div class="pc_inner_child">下記のQRをスマホで読み取ってください</div>
                    <div class="pc_qr_wrapper">
                        <img src="./assets/images/qr.jpg" alt="">
                    </div>
                </div>
            </div>
            <div class="pc_img_wrapper col-6 px-0">
                <img src="./assets/images/top2.png" alt="">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PostBtn from '@/components/postBtn';
import SideBar from '@/components/sideBar';
import TerminalNotice from '@/components/terminalNotice';
import EndRoll from '@/components/endRoll';
import FirstView from '@/components/firstView';
import PullTo from 'vue-pull-to'
import * as userInfo from "./assets/js/userInfo.js";
import * as siteInfo from "./assets/js/siteInfo.js";
import * as userStory from "./assets/js/userStory.js";
import * as message from "./assets/js/message.js";
import * as TimeLine from "./assets/js/timeline.js";
import * as User from "./assets/js/user.js";
import * as UserPost from "./assets/js/userpost.js";
import * as UserNotice from "./assets/js/usernotice.js";
import * as UserDm from "./assets/js/userDm.js";
import * as UserDmDynamic from "./assets/js/userDmDynamic.js";
import * as fnc from "./assets/js/fnc.js";
import * as EndRollInfo from "./assets/js/endRoll.js";
import * as TrendList from "./assets/js/trendList.js";

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        PostBtn,
        SideBar,
        PullTo,
        TerminalNotice,
        EndRoll,
        FirstView
    },
    watch: {
        '$route'(toPage) {
            this.changePath(toPage);
        },
        ExistBurnPost() { //炎上投稿を消したか?
            var self = this;
            //炎上
            if (this.IsTimeOut) {
                setTimeout(function () {
                    self.terminal_notice_set_fnc(message['mail']['3']['name'], message['mail']['3']['message'], 1);
                    setTimeout(function () {
                        self.endPatternStr = "自爆";
                        self.EndRaul = true;
                        self.IsEnd = true;
                    }, 4 * 1000);
                }, 2 * 1000);
            } else {
                //炎上を防げた->end
                setTimeout(function () {
                    self.terminal_notice_set_fnc(message['line']['5']['name'], message['line']['5']['message'], 0);
                    setTimeout(function () {
                        self.endPatternStr = '親友タローが炎上・誹謗中傷';
                        self.EndRaul = true;
                        self.IsEnd = true;
                    }, 8 * 1000);
                }, 2 * 1000);
            }
        },
        sendDm() { //親友タローへのDM送信をしたらフラグ変更
            //もしエンドをしていたらreturn
            if (this.IsEnd) return;
            var self = this;
            //親友タローのDMだけを取り出す
            var taroDm = self.dmArr.filter(function (el) {
                return el.dm_id == self.userStory.taroDmId;
            })[0];
            setTimeout(function () {
                //親友タローからのDM送信
                //3分の一で更生
                var endPatternStr = '自分と親友タロー更生';
                if (fnc.getRandomInt(0, 3) == 0) {
                    taroDm.content.push(self.userStory.taroFirstDmRtn);
                } else {
                    endPatternStr = '親友タローとの関係を断ち切ろう'
                    taroDm.content.push(self.userStory.taroFirstDmRtn2);
                }
                taroDm.read = "1";
                self.dm_count = 1;
                setTimeout(function () {
                    self.endPatternStr = endPatternStr;
                    self.EndRaul = true;
                    self.IsEnd = true;
                }, 5 * 1000);
            }, 3 * 1000);
        },
        IsReplySingerBoy() {
            //もしエンドをしていたらreturn
            if (this.IsEnd) return;
            var self = this;
            setTimeout(function () {
                self.endPatternStr = '他人を傷つける';
                self.EndRaul = true;
                self.IsEnd = true;
            }, 3 * 1000);
        },
        IsCalled() {
            if (this.IsEnd) return;
            var self = this;
            setTimeout(function () {
                self.endPatternStr = '炎上・誹謗中傷';
                self.EndRaul = true;
                self.IsEnd = true;
            }, 3 * 1000);
        },
        isFirstView() {
            this._mounted();
        }

    },
    data() {
        return {
            userStory: [], //サイト内ストーリのイベント
            userInfoArr: [],
            siteInfoArr: [],
            timeLine: [], //タイムライン情報
            user: [], //自分以外のユーザ情報
            userpost: [], //ユーザの投稿
            userNotice: [], //ユーザの通知情報
            userDm: [], //ユーザDMの通知情報
            dmArr: [], //ユーザDMとユーザと内容を混ぜたobj
            trendList: [], //トレンドリスト
            pageTitle: '',
            pageParam: '',
            beforePagePath: '/', //投稿画面用(戻ったときにさっきいたページ)
            IsOpensideBar: false, //sideBarOpenしたらtrue
            IsOpenOtherPage: false, //基本4ページ以外はスワイプ 取り消す
            movepullTo: false, //スクロールトップ以外は通常スクロール
            IsterminalNotice: false, //端末通知がきたか？
            Terminal_notice_name: '', //端末通知名
            Terminal_notice_message: '', //端末通知メッセージ
            Terminal_notice_type: 0, //lime - 0 mail - 1
            notice_count: 0, //通知件数
            dm_count: 0, //dmの通知件数
            sendDm: false, //親友に最初のDMを送信したかどうか
            beforenoticelistLength: 0, //通知の配列length
            ExistBurnPost: true, //炎上投稿を削除したかどうか false->削除済み
            IsTimeOut: false, //炎上投稿を消すタイミング次第でイベント変更->true炎上済み
            EndRaul: false,
            IsEnd: false, //エンドロール流れたか? true->end後
            IsReplySingerBoy: false, //シンガーボーイへリプを送ったか?
            IsCalled: false, //電話はかかってきたか？かかってきたらtrue
            isFirstView: true, //firstview中ならば
            homeSwipeCnt: 0,
            endRollArr: [],
            userDmDynamic: [],
            endPatternStr: '',
            isPhone: true, //スマホかpcか
            config: {
                pullText: '',
                triggerText: '',
                loadingText: '',
                doneText: ''
            },
            otherPagePath: [
                '/post',
                '/dm/',
                '/call',
                '/profile',
                '/logout'
            ]
        }
    },
    created() {
        this.userInfoArr = userInfo['userInfo'];
        this.siteInfoArr = siteInfo['siteInfo'];
        this.timeLine = TimeLine['timeline01'];
        this.userStory = userStory;
        this.user = User['user'];
        this.userpost = UserPost['userPost'];
        this.userNotice = UserNotice['userNotice'];
        this.userDm = UserDm['userDm'];
        this.endRollArr = EndRollInfo['endRoll'];
        this.userDmDynamic = UserDmDynamic['userDmDynamic'];
        this.trendList = TrendList['trendList']
    },
    mounted() {
        //768px以上ならば
        if (768 <= $(window).width()) {
            this.isPhone = false;

        }
    },
    methods: {
        _mounted() {
            if (this.$route.path != '/') {
                this.$router.push('/')
            }
            this.changePath(this.beforePagePath);
            window.addEventListener('scroll', this.handleScroll);
            this.story();
        },
        story() {
            //-------------------------
            //１、友人からTwitterでバズる画像を投稿してくれと催促される。
            //-------------------------
            this.terminal_notice_set_fnc(message['line']['0']['name'], 'おい、' + this.userInfoArr.name + '。' + message['line']['0']['message'], 0);
        },
        first_post_after() {
            //-------------------------
            //２、フォロワーから消した方がいいよ？と忠告される。
            //-------------------------
            var self = this;
            setTimeout(function () {
                //通知
                var beforeNotice = self.userNotice.length

                self.userStory.noticeAction.forEach(el => {
                    self.userNotice.push({
                        notice_id: el.notice_id, //通知ID
                        fk_user_post_id: self.userStory.BurnId, //投稿ID
                        fk_user_id: el.fk_user_id,
                        reply: el.reply,
                        type: el.type //0:RT,1:GOOD,2:REPLY
                    })
                });
                //通知表示件数
                self.notice_count = (self.userNotice.length) - beforeNotice;

                self.timeLine.forEach(el => {
                    if (el.id == self.userStory.BurnId) {
                        el.replyCnt = 1;
                        el.good = 1;
                    }
                });
                self.help_reply_after();
            }, 4 * 1000);
        },
        help_reply_after() {
            //-------------------------
            //３、○秒以内に投稿を消すか消さないかでイベントを変える
            //-------------------------
            let self = this;
            //○秒後まで投稿が残っていた場合
            setTimeout(function () {
                var beforeNotice = self.userNotice.length
                self.userStory.noticeAction2.forEach(el => {
                    self.userNotice.push({
                        notice_id: el.notice_id, //通知ID
                        fk_user_post_id: self.userStory.BurnId, //投稿ID
                        fk_user_id: el.fk_user_id,
                        reply: el.reply,
                        type: el.type //0:RT,1:GOOD,2:REPLY
                    })
                });
                self.notice_count = (self.userNotice.length) - beforeNotice + self.notice_count;
                //タイムラインの表示
                self.timeLine.forEach(el => {
                    if (el.id == self.userStory.BurnId) {
                        el.repost = el.repost + 1;
                        el.good = el.good + 1;
                    }
                });
                //最初のRT後に炎上する流れ
                setTimeout(function () {
                    if (self.ExistBurnPost) {
                        self.toburnStart();
                    }
                }, 8 * 1000);
            }, 5 * 1000);
        },
        toburnStart() {
            //-------------------------
            //4、炎上開始
            //-------------------------
            var self = this;
            //-ユーザID（x++） 初期値
            var count_user_id = 20;
            this.IsTimeOut = true;
            //炎上ループ
            var timerId = function (counter) {
                //-ループの時間(ランダム)範囲設定
                var loopTime = fnc.getRandomInt(100, 1300);
                //-type(RTかGOODかREPLY)->ランダム
                var randType = fnc.getRandomInt(0, 3);
                var reply = "";
                //-リプライ->typeがREPLYの場合配列からランダムで取り出す
                if (randType == 2) {
                    reply = self.userStory.abusive[fnc.getRandomInt(1, 42) - 1];
                }
                var beforeNotice = self.userNotice.length
                self.userNotice.push({
                    notice_id: self.userNotice.length, //通知ID
                    fk_user_post_id: self.userStory.BurnId, //投稿ID
                    fk_user_id: count_user_id + counter,
                    reply: reply,
                    type: randType //0:RT,1:GOOD,2:REPLY
                });
                //タイムラインの表示
                self.timeLine.forEach(el => {
                    if (el.id == self.userStory.BurnId) {
                        if (randType == 0) { //0:RT,1:GOOD,2:REPLY
                            el.repost = el.repost + 1;
                        } else if (randType == 1) {
                            el.good = el.good + 1;
                        } else {
                            el.replyCnt = el.replyCnt + 1;
                        }
                    }
                });
                self.notice_count = (self.userNotice.length) - beforeNotice + self.notice_count;
                self.InloopAction(counter);
                if (counter < 205 && self.ExistBurnPost) {
                    setTimeout(function () {
                        counter++;
                        timerId(counter);
                    }, loopTime);
                }
            }
            timerId(0);
        },
        InloopAction(counter) {
            if (counter == 20) {
                this.terminal_notice_set_fnc(message['line']['1']['name'], message['line']['1']['message'], 0);
            } else if (counter == 30) {
                this.terminal_notice_set_fnc(message['mail']['0']['name'], message['mail']['0']['message'], 1);
            } else if (counter == 40) {
                this.terminal_notice_set_fnc(message['mail']['1']['name'], message['mail']['1']['message'], 1);
            } else if (counter == 50) {
                this.terminal_notice_set_fnc(message['mail']['2']['name'], message['mail']['2']['message'], 1);
            } else if (counter == 60) {
                this.terminal_notice_set_fnc(message['line']['2']['name'], message['line']['2']['message'], 0);
            } else if (counter == 70) {
                this.terminal_notice_set_fnc(message['line']['3']['name'], message['line']['3']['message'], 0);
            } else if (counter == 100) {
                this.terminal_notice_set_fnc(message['line']['4']['name'], message['line']['4']['message'], 0);
            } else if (counter == 200) {
                this.$router.push('call')
            }
        },
        terminal_notice_set_fnc(name, msg, type) {
            this.Terminal_notice_name = name;
            this.Terminal_notice_message = msg;
            this.Terminal_notice_type = type; //lime - 0 ma -1 
            var self = this;
            setTimeout(function () {
                self.IsterminalNotice = true;
            }, 2 * 1000);
        },
        handleScroll() {
            if (window.scrollY < 30) {
                this.movepullTo = true;
            } else {
                this.movepullTo = false;
            }
        },
        changePath(toPage) {
            this.siteInfoArr.forEach(el => {
                if (el.path == this.$route.path) {
                    this.pageTitle = el.name;
                    this.pageParam = el.param;
                    this.beforePagePath = toPage;
                    this.IsOpenOtherPage = false;
                }
            });

            this.otherPagePath.forEach(el => {
                if (el == this.$route.path) {
                    this.IsOpenOtherPage = true;
                } else if ((this.$route.path).match(/\d/) != null) {
                    if (el + (this.$route.path).match(/\d/)[0] == this.$route.path) {
                        this.IsOpenOtherPage = true;
                    }
                }
            });
        },
        stateChange(state) {
            if (state === 'pull') {
                $('.default-text').addClass('_pull');
                $('.default-text').removeClass('_trigger');
                $('.default-text').removeClass('_loaded-done');
            } else if (state === 'trigger') {
                $('.default-text').addClass('_trigger');
                $('.default-text').removeClass('_pull');
                $('.default-text').removeClass('_loaded-done');
            } else if (state === 'loaded-done') {
                $('.default-text').addClass('_loaded-done');
                $('.default-text').removeClass('_pull');
                $('.default-text').removeClass('_trigger');
            }
        },
        changeProfileEnd() {
            if (this.IsEnd) return;
            var self = this;
            setTimeout(function () {
                self.endPatternStr = 'ネットリテラシーが高い';
                self.EndRaul = true;
                self.IsEnd = true;
            }, 3 * 1000);
        },
        refresh(loaded) {
            loaded('done');
            if (this.pageParam == "home") {
                this.homeSwipeEvent();
            } else if (this.pageParam == "notice") {
                //通知スワイプ
                this.$refs.router_view._mounted();
            } else if (this.pageParam == "search") {
                console.log("検索スワイプ ")
            } else if (this.pageParam == "dm") {
                console.log("dmスワイプ ")
            }
        },
        homeSwipeEvent() {
            if (this.homeSwipeCnt == 9) {
                //エンディングを迎えていない&&炎上投稿をしていない
                if (!this.IsEnd && this.ExistBurnPost && !this.IsTimeOut) {
                    var post = this.userStory.timeLineSwipePost;
                    this.timeLine.push({
                        id: this.timeLine.length,
                        name: post.name,
                        type: post.type, //0は他人
                        message: post.message,
                        imagePath: post.imagePath,
                        iconPath: post.iconPath,
                        good: post.good,
                        repost: post.repost,
                        replyCnt: post.replyCnt,
                        timestamp: post.timestamp
                    });
                    this.$refs.router_view.updateTimeLine();
                    this.homeSwipeCnt = 10;
                    var self = this;
                    setTimeout(function () {
                        self.endPatternStr = '情報モラルのあるスワイプマスター';
                        self.EndRaul = true;
                        self.IsEnd = true;
                    }, 4 * 1000);
                } else if (this.IsEnd && !this.ExistBurnPost && !this.IsTimeOut) {
                    var post2 = this.userStory.timeLineSwipePostEd1;
                    this.timeLine.push({
                        id: this.timeLine.length,
                        name: post2.name,
                        type: post2.type, //0は他人
                        message: post2.message,
                        imagePath: post2.imagePath,
                        iconPath: post2.iconPath,
                        good: post2.good,
                        repost: post2.repost,
                        replyCnt: post2.replyCnt,
                        timestamp: post2.timestamp
                    });
                    this.$refs.router_view.updateTimeLine();
                    this.homeSwipeCnt = 10;
                }
            } else if (this.homeSwipeCnt < 9) {
                this.homeSwipeCnt = this.homeSwipeCnt + 1;
            }
        }
    }
}
</script>

<style>
.fixed-button-wrapper {
    position: fixed;
    top: 80%;
    right: 10%;
}

._pull:before {
    content: '↑';
}

._trigger:before {
    content: '↓';
}

._loaded-done {
    background-image: url("./assets/images/loading.gif");
    background-repeat: no-repeat;
    margin: 0 auto;
    background-size: contain;
    width: 25px;
    height: 25px;
}

.vue-pull-to-wrapper {
    background: white;
}

#content {
    background: rgba(231, 235, 239);
}

#main {
    padding-bottom: 30px;
}

.pc {
    padding: 0px 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #2d3436;
    color: white;
}

.pc_img_wrapper{
    background: #d63031;
}
.pc_img_wrapper>img {
    width: 500px;
}

.pc_title {
    font-size: 40px;
    font-weight: bold;
}

.pc_inner_body {
    background: #ffeaa7;
    width: 100%;
    height: 300px;
    position:absolute;
    bottom:0;
}

.pc_qr_wrapper {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.pc_inner_child{
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
}
</style>
