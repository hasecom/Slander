<template>
<div id="app">
    <div id="content">
        <Header :userInfoLabel="userInfoArr" :PageTitle="pageTitle" />

        <pull-to v-if="!IsOpenOtherPage" :top-config="config" :top-load-method="refresh" @top-state-change="stateChange">
            <div id="main" style="height:1500px;">
                <router-view></router-view>
            </div>
        </pull-to>
        <div v-if="IsOpenOtherPage" id="main" style="height:1500px;">
            <router-view></router-view>
        </div>


        <div class="fixed-button-wrapper">
            <PostBtn :PageParam="pageParam" set="a" />
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
import PullTo from 'vue-pull-to'
import * as userInfo from "./assets/js/userInfo.js";
import * as siteInfo from "./assets/js/siteInfo.js";
export default {
    name: 'App',
    components: {
        Header,
        Footer,
        PostBtn,
        SideBar,
        PullTo
    },
    watch: {
        '$route'(toPage) {
            this.changePath(toPage);
        }
    },
    data() {
        return {
            userInfoArr: [],
            siteInfoArr: [],
            pageTitle: '',
            pageParam: '',
            beforePagePath: '/',
            IsOpensideBar: false,
            IsOpenOtherPage:false,
            config: {
                pullText: '',
                triggerText: '',
                loadingText: '',
                doneText: ''
            },
            otherPagePath:[
                '/post'
            ]
        }
    },
    created() {
        this.userInfoArr = userInfo['userInfo'];
        this.siteInfoArr = siteInfo['siteInfo'];
    },
    mounted() {
        this.changePath(this.beforePagePath);
    },
    methods: {
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
                if(el == this.$route.path){
                    this.IsOpenOtherPage = true;
                }
            });
        },
        stateChange(state) {
            if (state === 'pull') {
                $('.default-text').addClass('_pull');
                $('.default-text').removeClass('_trigger');
                $('.default-text').removeClass('_loaded-done');
            }else if(state === 'trigger'){
                $('.default-text').addClass('_trigger');
                $('.default-text').removeClass('_pull');
                $('.default-text').removeClass('_loaded-done');
            }else if (state === 'loaded-done') {
                $('.default-text').addClass('_loaded-done');
                $('.default-text').removeClass('_pull');
                $('.default-text').removeClass('_trigger');
            }
        },
        refresh(loaded) {
            loaded('done');
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
._pull:before{
    content:'↑';
}
._trigger:before{
    content:'↓';
}
._loaded-done{
    background-image: url("./assets/images/loading.gif");
    background-repeat: no-repeat;
    margin:0 auto;
    background-size: contain;
    width:25px;
    height:25px;
}
</style>
