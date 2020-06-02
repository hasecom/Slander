<template>
<div class="dmdynamic">
    <div class="border-bottom row mx-0">
        <div class="col-3 px-0">
            <router-link to="/dm" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-6 px-0 text-center font-weight-bold">
            {{dmArr.user_name}}
        </div>
        <div class="col-3 px-0"></div>
    </div>
    <div class="dm_body">
        <div>
            <div v-for="(item,index) in dmArr.content" :key="index">
                <div v-if="item.type==0" class="text-right">
                    <div class="px-0 my_msgWrap">
                        <div class="my_msg">{{item.message}}</div>
                    </div>
                </div>
                <div v-else class="text-left row mx-0">
                    <div class="col-2 px-0">
                        <div class="icon rounded-circle border my-2">
                            <img v-if="dmArr.icon != ''" class="border rounded-circle" :src="imageLoad(dmArr.icon)" alt="">
                        </div>
                    </div>
                    <div class="col-10 px-0 you_msgWrap">
                        <div class="you_msg">{{item.message}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom border-top">
            入力
        </div>
    </div>
</div>
</template>

<script>
import {
    innerJoin
} from "../assets/js/innerJoin.js";
export default {
    data() {
        return {
            dm_id: 0,
            userDm: [],
            user: [],
            userDmDynamic: [],
            dmArr: [],
        }
    },
    mounted() {
        this.dm_id = this.$route.params.id;
        this.userDmDynamic = this.$parent.userDmDynamic;
        this.userDm = this.$parent.userDm;
        this.user = this.$parent.user;
        this.createdDmList();
    },
    methods: {
        createdDmList() {
            var tmpArr = innerJoin(this.user, this.userDm,
                ({
                    user_id,
                    user_name,
                    icon,
                }, {
                    dm_id,
                    fk_user_id,
                    message,
                    read,
                }) => fk_user_id === user_id && {
                    user_name,
                    icon,
                    fk_user_id,
                    dm_id,
                    read,
                    message,
                });
            var tmpArr2 = innerJoin(tmpArr, this.userDmDynamic,
                ({
                    user_name,
                    icon,
                    fk_user_id,
                    dm_id,
                    read,
                    message,
                }, {
                    dynamic_dm_id,
                    content
                }) => dm_id === dynamic_dm_id && {
                    user_name,
                    icon,
                    fk_user_id,
                    dm_id,
                    read,
                    message,
                    content
                });
            var self = this;
            this.dmArr = tmpArr2.filter(function (el) {
                return el.dm_id == self.dm_id;
            })[0];
        },
    }
}
</script>

<style scoped>
.dmdynamic {
    position: fixed;
    z-index: 40;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: white;
}

.dm_body {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.dm_body>div {
    padding: 0px 10px;
}

.icon {
    width: 39px;
    height: 39px;
}

.icon>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.you_msg {
    background: #dfe6e9;
    display: inline;
    padding: 5px 5px;
    border-radius: 15px;
}

.my_msg {
    background: rgb(75, 156, 230);
    display: inline;
    padding: 5px 5px;
    border-radius: 15px;
    color: white;
}


.you_msgWrap {
    display: flex;
    align-items: center;
}
</style>
