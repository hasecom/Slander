<template>
<div class="dmdynamic">
    <div class="border-bottom row mx-0">
        <div class="col-3 px-0 py-2">
            <router-link to="/dm" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-6 px-0 py-2 text-center font-weight-bold">
            {{dmArr.user_name}}
        </div>
        <div class="col-3 px-0"></div>
    </div>
    <div class="dm_body">
        <div class="msg">
            <div v-for="(item,index) in dmArr.content" :key="index">
                <div v-if="item.type==0" class="text-right my-3">
                    <div class="px-0 my_msgWrap">
                        <div class="my_msg">{{item.message}}</div>
                    </div>
                </div>
                <div v-else class="text-left row mx-0 my-3">
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
        <div class="bottom border-top row py-2">
            <div class="col-2"></div>
            <div class="input rounded-pill col-8 text-muted py-2">{{inputFnc()}}</div>
            <div class="col-2 send_btn py-2" @click="sendDm()">
                <font-awesome-icon icon="paper-plane" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
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
        this._mounted();
    },
    methods: {
        _mounted() {
            this.dm_id = this.$route.params.id;
            this.userDmDynamic = this.$parent.userDmDynamic;
            this.userDm = this.$parent.userDm;
            this.user = this.$parent.user;
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
        inputFnc() {
            //親友タローのIDかつ一度もDMを送信していない場合
            if (this.dmArr.fk_user_id == '3' && !this.$parent.sendDm) {
                $('.input').removeClass('text-muted');
                return '自分たちがやったことは...';
            } else {
                $('.input').addClass('text-muted');
                return 'メッセージを作成';
            }
        },
        sendDm() {
            console.log(this.$parent.userStory.taroFirstDm)
            console.log(this.$parent.userDmDynamic)
            //親友のタローのIDかつ一度もDMを送信していない場合
            if (this.dmArr.fk_user_id == '3' && !this.$parent.sendDm) {
                var self = this;
                //親友タローのDMだけを取り出す
                var aaa = this.$parent.userDmDynamic.filter(function (el) {
                    return el.dynamic_dm_id == self.dm_id;
                })[0];
                console.log(aaa)
                //親友タローへのDM送信

                //送信フラグをtrue(送信済みにする)
                this.$parent.sendDm = true;
            }
        }
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

.dm_body>.msg {
    padding: 0px 10px;
    padding-bottom: 50px
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
    padding: 10px 10px;
    border-radius: 15px;
}

.my_msg {
    background: rgb(75, 156, 230);
    display: inline;
    padding: 10px 10px;
    border-radius: 15px;
    color: white;
}

.you_msgWrap {
    display: flex;
    align-items: center;
}

.bottom>.input {
    background: #dfe6e9;
    width: 60%;
}

.send_btn {
    color: #00acee;
}
</style>
