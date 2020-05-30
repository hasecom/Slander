<template>
<div>
    <div class="notice_header row border text-center">
        <div class="col-6  py-2 all">すべて</div>
        <div class="col-6  py-2">@投稿</div>
    </div>
    <NoticeComponent  :noticelistData="noticelist" />
</div>
</template>

<script>
import {innerJoin} from "../assets/js/innerJoin.js";
import NoticeComponent from '@/components/noticeComponent';
export default {
    components:{
        NoticeComponent
    },
    data() {
        return {
            noticelist: [],
            noticeArr: [],
            userPostArr: [],
            user: [],
            typeObj:{//0:RT,1:GOOD,2:REPLY
                0:{
                    param:"RT",
                    message:"さんがあなたのツイートを引用しました"
                },
                1:{
                    param:"GOOD",
                    message:"さんがあなたのツイートをいいねしました"
                },
                2:{
                    param:"REPLY",
                    message:""
                }
            }
        }
    },
    mounted() {
        //フッターのカウント表示をなくす
        this.$parent.$parent.notice_count = 0;

        this.noticeArr = this.$parent.$parent.userNotice;
        this.userPostArr = this.$parent.$parent.userpost;
        this.user = this.$parent.$parent.user;
        this.createdNoticeList();
        console.log(this.noticelist)
    },
    methods: {
        createdNoticeList() {
            let userPostNoticeMrg = innerJoin(this.noticeArr, this.userPostArr,
                ({
                    fk_user_post_id,
                    notice_id,
                    fk_user_id,
                    type
                }, {
                    user_post_id,
                    message
                }) => fk_user_post_id === user_post_id && {
                    user_post_id,
                    fk_user_id,
                    notice_id,
                    message,
                    type
                });
            this.noticelist = innerJoin(userPostNoticeMrg,this.user,
                ({
                    user_post_id,
                    fk_user_id,
                    notice_id,
                    message,
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
                    type
                });
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