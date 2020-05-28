<template>
<div id="sideBar" @click.self="closeSideMenu">
    <div class="openMenu">
        <div class="MenuHeader border-bottom row mx-0">
            <div class="col-10 px-0">アカウント情報</div>
            <div class="col-2 px-0">
                <font-awesome-icon icon="times" class="font-awesome-icon-element" @click="closeSideMenu" />
            </div>
        </div>
        <div class="MenuMain">
            <div class="header-icon-wrapper">
                <img :src="iconPath" alt="" class="rounded-circle border">
            </div>
            <div class="MenuName">
                {{userInfoLabel['name']}}
            </div>
            <div class="text-muted small">
                @{{userInfoLabel['id']}}
            </div>
            <div class="follow row mg-0 py-3">
                <div class="col-6 pr-0">
                    <span class="font-weight-bold">{{userInfoLabel['follow']}}</span><span class="text-muted small">フォロー中</span>
                </div>
                <div class="col-6  pr-0">
                    <span class="font-weight-bold">{{userInfoLabel['follower']}}</span><span class="text-muted small">フォロワー</span>
                </div>
            </div>
            <div class="sideMenuContent border-bottom">
                <div>
                    <font-awesome-icon icon="user" class="text-muted" />
                    <span class="pl-2">プロフィール</span>
                </div>
                <div>
                    <font-awesome-icon icon="comment-dots" class="text-muted" />
                    <span class="pl-2">トピック</span>
                </div>
                <div>
                    <font-awesome-icon icon="list-alt" class="text-muted" />
                    <span class="pl-2">リスト</span>
                </div>
                <div>
                    <font-awesome-icon icon="bookmark" class="text-muted" />
                    <span class="pl-2">ブックマーク</span>
                </div>
                <div>
                    <font-awesome-icon icon="bolt" class="text-muted" />
                    <span class="pl-2">モーメント</span>
                </div>
            </div>
            <div>
                <div class="py-4">ログアウト</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        userInfoLabel: {
            type: Object
        }
    },
    data(){
        return{
            iconPath:''
        }
    },
    mounted() {
        this.iconPath = this.imageLoad(this.userInfoLabel['icon'])
    },
    methods: {
        imageLoad(fileName) {
            return require('../assets/images/' + fileName + '.jpg');
        },
        closeSideMenu() {
            this.$parent.IsOpensideBar = false;
        }
    }
}
</script>

<style scoped>
#sideBar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 20;
}

.header-icon-wrapper > img{
    width:37px;
    height:37px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}

.openMenu {
    background: white;
    width: 70%;
    height: 100%;
}

.MenuHeader {
    font-size: 18px;
    font-weight: 600;
    padding: 10px 20px;
}

.MenuMain {
    padding: 5px 10px;
}
.MenuName{
    font-size:15px;
}
.font-awesome-icon-element{
    color:#00acee;
    text-align: right;
}
.sideMenuContent >div{
    padding:10px 0px;
}
</style>
