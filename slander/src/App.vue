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
        <Footer :siteInfoLabel="siteInfoArr" />
    </div>
</div>
</template>

<script>
import Header from '@/components/header';
import Footer from '@/components/footer';
import PostBtn from '@/components/postBtn';

import * as userInfo from "./assets/js/userInfo.js";
import * as siteInfo from "./assets/js/siteInfo.js";

export default {
    name: 'App',
    components: {
        Header,
        Footer,
        PostBtn
    },
    watch: {
        '$route'() {
            this.changePath();
        }
    },
    data() {
        return {
            userInfoArr: [],
            siteInfoArr: [],
            pageTitle: '',
            pageParam: '',
        }
    },
    created() {
        this.userInfoArr = userInfo['userInfo'];
        this.siteInfoArr = siteInfo['siteInfo'];
    },
    mounted() {
        this.changePath();
    },
    methods: {
        changePath() {
            this.siteInfoArr.forEach(el => {
                if (el.path == this.$route.path) {
                    this.pageTitle = el.name;
                    this.pageParam = el.param;
                    console.log(this.pageParam);
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
