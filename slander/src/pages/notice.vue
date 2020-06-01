<template>
<div>
    <div class="notice_header row border text-center">
        <div class="col-6  py-2 all">すべて</div>
        <div class="col-6  py-2">@投稿</div>
    </div>
    <NoticeComponent :noticelistData="noticelist" :userInfoArr="userInfoArr" ref="noticeComponent" />
</div>
</template>

<script>
import $ from 'jquery';
import {
    innerJoin
} from "../assets/js/innerJoin.js";
import NoticeComponent from '@/components/noticeComponent';
export default {
    components: {
        NoticeComponent
    },
    data() {
        return {
            noticelist: [],
            difference: 0, //通知前と通知後の配列の差分
            noticeArr: [],
            userPostArr: [],
            userInfoArr: {},
            user: [],
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            //フッターのカウント表示をなくす
            this.$parent.$parent.notice_count = 0;
            this.noticeArr = this.$parent.$parent.userNotice;
            this.userPostArr = this.$parent.$parent.userpost;
            this.user = this.$parent.$parent.user;
            this.userInfoArr = this.$parent.$parent.userInfoArr;
            this.createdNoticeList();
            //初期時
            if (this.$parent.$parent.beforenoticelistLength == 0) {
                this.$parent.$parent.beforenoticelistLength = this.noticelist.length;
            } else {
                this.difference = this.noticelist.length - this.$parent.$parent.beforenoticelistLength;
                this.$nextTick(function () {
                    for (var i = 0; i < this.difference; i++) {
                        $("#noticeComponent").children().eq(i).css("background", 'rgba(237,245,253,1)')
                    }
                    
                    var self = this;
                    setTimeout(function () {
                        for (var i = 0; i < self.difference; i++) {
                            $("#noticeComponent").children().eq(i).css("background", 'white');
                        }
                    }, 4 * 1000);
                    this.$parent.$parent.beforenoticelistLength = 0
                })
            }

        },
        createdNoticeList() {
            let userPostNoticeMrg = innerJoin(this.noticeArr, this.userPostArr,
                ({
                    fk_user_post_id,
                    notice_id,
                    fk_user_id,
                    type,
                    reply
                }, {
                    user_post_id,
                    message
                }) => fk_user_post_id === user_post_id && {
                    user_post_id,
                    fk_user_id,
                    notice_id,
                    message,
                    reply,
                    type
                });
            var tmpArr = innerJoin(userPostNoticeMrg, this.user,
                ({
                    user_post_id,
                    fk_user_id,
                    notice_id,
                    message,
                    reply,
                    type
                }, {
                    user_id,
                    user_name,
                    icon,
                }) => fk_user_id === user_id && {
                    user_name,
                    icon,
                    user_post_id,
                    fk_user_id,
                    notice_id,
                    message,
                    reply,
                    type
                });
            var before_type_id;
            var before_user_post_id;
            var i = 0;
            var tmp = [];
            tmpArr.forEach((el, inx, arr) => {
                before_type_id = arr[inx - 1] != undefined ? arr[inx - 1].type : "";
                before_user_post_id = arr[inx - 1] != undefined ? arr[inx - 1].user_post_id : "";
                if (before_type_id == el.type && before_user_post_id == el.user_post_id && el.type != 2) {
                    tmp[i - 1].push(el);
                } else {
                    tmp[i] = [el];
                    i++;
                }
            });
            this.noticelist = tmp;
        },
    }
}
</script>

<style scoped>
.notice_header>.all {
    color: #00acee;
    border-bottom: 2px solid #00acee;
}
</style>
