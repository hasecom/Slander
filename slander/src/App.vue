<template>
<div id="app">
    <div id="content">
        <Header :userInfoLabel="userInfoArr" :PageTitle="pageTitle" />
        <div style="height:1500px;">
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
import Header from '@/components/header';
import Footer from '@/components/footer';
import PostBtn from '@/components/postBtn';
import SideBar from '@/components/sideBar';

import * as userInfo from "./assets/js/userInfo.js";
import * as siteInfo from "./assets/js/siteInfo.js";

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        PostBtn,
        SideBar
    },
    watch: {
        '$route'(to) {
            this.changePath(to);
        }
    },
    data() {
        return {
            userInfoArr: [],
            siteInfoArr: [],
            pageTitle: '',
            pageParam: '',
            beforePagePath:'/',
            IsOpensideBar:false
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
        changePath(to) {
            this.siteInfoArr.forEach(el => {
                if (el.path == this.$route.path) {
                    this.pageTitle = el.name;
                    this.pageParam = el.param;
                    this.beforePagePath = to;
                }
            });
        }
    }
}
</script>

<style>
.fixed-button-wrapper{
  position:fixed;
  top:80%;
  right:10%;
}
</style>
