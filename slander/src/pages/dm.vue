<template>
<div>
    <ul>
        <router-link :to="'dm/'+item.dm_id" tag="li" v-for="(item,index) in dmArr" :key="index" class="row mg-0 border-bottom dm">
            <div class="col-3 px-0 left_item">
                <div class="reply_icon rounded-circle border my-2">
                    <img v-if="item.icon != ''" class="border rounded-circle" :src="imageLoad(item.icon)" alt="">
                </div>
            </div>
            <div class="col-9 px-0">
                <div class="font-weight-bold">{{item.user_name}}</div>
                <div v-if="item.content[item.content.length - 1].type == 0" class="text-muted dm_msg">あなた：{{item.content[item.content.length - 1].message}}</div>
                <div v-else class="text-muted dm_msg">{{item.content[item.content.length - 1].message}}</div>
            </div>
        </router-link>
    </ul>
</div>
</template>

<script>
import {
    innerJoin
} from "../assets/js/innerJoin.js";
export default {
    data() {
        return {
            dmArr: [],
            userDm: [],
            user: [],
            userDmDynamic: [],
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.$parent.$parent.dm_count = 0;
            this.dm_id = this.$route.params.id;
            this.userDmDynamic = this.$parent.$parent.userDmDynamic;
            this.userDm = this.$parent.$parent.userDm;
            this.user = this.$parent.$parent.user;

            this.createdDmList();
        },
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
            this.dmArr = innerJoin(tmpArr, this.userDmDynamic,
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
        },
        imageLoad(fileName) {
            return require('../assets/images/' + fileName + '.jpg');
        },
    }
}
</script>

<style scoped>
.reply_icon {
    width: 46px;
    height: 46px;
}

.reply_icon>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.dm {
    padding: 5px 30px;
}

.dm_msg {
    max-height: 50px;
    overflow-y: hidden;
}

ul {
    padding: 0px;
}
</style>
