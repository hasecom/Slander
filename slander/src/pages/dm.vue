<template>
<div>
    <ul>
        <router-link to="path" tag="li" v-for="(item,index) in dmArr" :key="index" class="row mg-0 border-bottom dm">
            <div class="col-3 px-0 left_item">
                <div class="reply_icon rounded-circle border my-2">
                    <img v-if="item.icon != ''" class="border rounded-circle" :src="imageLoad(item.icon)" alt="">
                </div>
            </div>
            <div class="col-9 px-0">
                <div class="font-weight-bold">{{item.user_name}}</div>
                <div class="text-muted dm_msg">{{item.message}}</div>
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
            userPostArr: [],
            user: [],
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.$parent.$parent.dm_count = 0;
            this.dmArr = this.$parent.$parent.userDm;
            this.user = this.$parent.$parent.user;

            this.createdDmList();
        },
        createdDmList() {
            var tmpArr = innerJoin(this.user, this.dmArr,
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
            this.dmArr = tmpArr;
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

.icon {
    width: 30px;
    height: 30px;
}

.icon>img {
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
ul{
    padding:0px;
}
</style>
