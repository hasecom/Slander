<template>
<div id="app">
    <TerminalNotice v-if="IsterminalNotice" :terminal_notice_name="Terminal_notice_name" :terminal_notice_message="Terminal_notice_message" />
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
</template>

<script>
import $ from 'jquery';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PostBtn from '@/components/postBtn';
import SideBar from '@/components/sideBar';
import TerminalNotice from '@/components/terminalNotice';
import PullTo from 'vue-pull-to'
import * as userInfo from "./assets/js/userInfo.js";
import * as siteInfo from "./assets/js/siteInfo.js";
import * as userStory from "./assets/js/userStory.js";
import * as message from "./assets/js/message.js";
import * as TimeLine from "./assets/js/timeline.js";
import * as User from "./assets/js/user.js";
import * as UserPost from "./assets/js/userpost.js";
import * as UserNotice from "./assets/js/usernotice.js";
import * as fnc from "./assets/js/fnc.js";

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        PostBtn,
        SideBar,
        PullTo,
        TerminalNotice
    },
    watch: {
        '$route'(toPage) {
            this.changePath(toPage);
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
            pageTitle: '',
            pageParam: '',
            beforePagePath: '/', //投稿画面用(戻ったときにさっきいたページ)
            IsOpensideBar: false, //sideBarOpenしたらtrue
            IsOpenOtherPage: false, //基本4ページ以外はスワイプ 取り消す
            movepullTo: false, //スクロールトップ以外は通常スクロール
            IsterminalNotice: false, //端末通知がきたか？
            Terminal_notice_name: '', //端末通知名
            Terminal_notice_message: '', //端末通知メッセージ
            notice_count: 0, //通知件数
            beforenoticelistLength: 0, //通知の配列length
            ExistBurnPost: true, //炎上投稿を削除したかどうか false->削除済み
            config: {
                pullText: '',
                triggerText: '',
                loadingText: '',
                doneText: ''
            },
            otherPagePath: [
                '/post'
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
    },
    mounted() {
        if (this.$route.path != '/') {
            this.$router.push('/')
        }
        this.changePath(this.beforePagePath);
        window.addEventListener('scroll', this.handleScroll);

        this.story();
    },
    methods: {
        story() {
            //-------------------------
            //１、友人からTwitterでバズる画像を投稿してくれと催促される。
            //-------------------------
            this.Terminal_notice_name = message['line']['0']['name'];
            this.Terminal_notice_message = message['line']['0']['message'];
            var self = this;
            setTimeout(function () {
                self.IsterminalNotice = true;
            }, 2 * 1000);
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
            }, 3 * 1000);
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
                    self.toburnStart();
                }, 2 * 1000);
            }, 2 * 1000);
        },
        toburnStart() {
            //-------------------------
            //4、炎上開始
            //-------------------------
            var self = this;
            //-ユーザID（x++） 初期値
            var count_user_id = 20;

            //炎上ループ
            var timerId = function (counter) {
                //-ループの時間(ランダム)範囲設定
                var loopTime = fnc.getRandomInt(300, 1000);
                //-type(RTかGOODかREPLY)->ランダム
                var randType = fnc.getRandomInt(0, 3);
                var reply = "";
                //-リプライ->typeがREPLYの場合配列からランダムで取り出す
                if (randType == 2) {
                    reply = self.userStory.abusive[fnc.getRandomInt(1, 30) - 1];
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
                if (counter < 130 && self.ExistBurnPost) {
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
                this.Terminal_notice_name = message['line']['1']['name'];
                this.Terminal_notice_message = message['line']['1']['message'];
                var self = this;
                setTimeout(function () {
                    self.IsterminalNotice = true;
                }, 2 * 1000);
            }
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
        refresh(loaded) {
            loaded('done');
            if (this.pageParam == "home") {
                console.log("homeスワイプ ")
            } else if (this.pageParam == "notice") {
                //通知スワイプ
                this.$refs.router_view._mounted();
            } else if (this.pageParam == "search") {
                console.log("検索スワイプ ")
            } else if (this.pageParam == "dm") {
                console.log("dmスワイプ ")
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
</style>
