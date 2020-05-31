<template>
<div id="app">
    <TerminalNotice v-if="IsterminalNotice" :terminal_notice_name="Terminal_notice_name" :terminal_notice_message="Terminal_notice_message" />
    <div id="content">
        <Header :userInfoLabel="userInfoArr" :PageTitle="pageTitle" />
        <pull-to :top-load-method="refresh" v-if="!IsOpenOtherPage" :top-config="config"  @top-state-change="stateChange" :is-bottom-bounce="false" :is-top-bounce="movepullTo">
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
            userStory: [],
            userInfoArr: [],
            siteInfoArr: [],
            timeLine: [],
            user: [],
            userpost: [],
            userNotice: [],
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
            beforenoticelistLength:0, //通知の配列length
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
            //友人からのlineがくる
            this.Terminal_notice_name = message['line']['0']['name'];
            this.Terminal_notice_message = message['line']['0']['message'];
            var self = this;
            setTimeout(function () {
                self.IsterminalNotice = true;
            }, 2 * 1000);
        },
        first_post_after() {
            var self = this;
            setTimeout(function () {
                //通知が来る
                self.notice_count = 1;
                console.log(self.userStory)
                self.userNotice.unshift({
                    notice_id: 7, //通知ID
                    fk_user_post_id: 2, //投稿ID
                    fk_user_id: 1,
                    reply: "さすがにそれまずくね？",
                    type: 2 //0:RT,1:GOOD,2:REPLY
                })
            }, 3 * 1000);
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
            if(this.pageParam == "home"){
                console.log("homeスワイプ ")
            }else if(this.pageParam == "notice"){
                //通知スワイプ
                this.$refs.router_view._mounted();
            }else if(this.pageParam == "search"){
                console.log("検索スワイプ ")
            }else if(this.pageParam == "dm"){
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
