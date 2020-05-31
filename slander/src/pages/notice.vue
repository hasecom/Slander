<template>
<div>
    <div class="notice_header row border text-center">
        <div class="col-6  py-2 all">すべて</div>
        <div class="col-6  py-2">@投稿</div>
    </div>
    <!-- <NoticeComponent  :noticelistData="noticelist"  :userInfoArr="userInfoArr" /> -->
</div>
</template>

<script>
import {innerJoin} from "../assets/js/innerJoin.js";
//import NoticeComponent from '@/components/noticeComponent';
export default {
    components:{
        //NoticeComponent
    },
    data() {
        return {
            noticelist: [],
            noticeArr: [],
            userPostArr: [],
            userInfoArr:{},
            user: [],
        }
    },
    mounted() {
        //フッターのカウント表示をなくす
        this.$parent.$parent.notice_count = 0;

        this.noticeArr = this.$parent.$parent.userNotice;
        this.userPostArr = this.$parent.$parent.userpost;
        this.user = this.$parent.$parent.user;
        this.userInfoArr = this.$parent.$parent.userInfoArr;
        this.createdNoticeList();
    },
    methods: {
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
            var tmpArr = innerJoin(userPostNoticeMrg,this.user,
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
                var before_user_post_id ;
                var i = 0;
                tmpArr.forEach((el,inx,arr) => {
                    before_type_id = arr[inx-1] != undefined ? arr[inx-1].type : "" ;
                    before_user_post_id = arr[inx-1]  != undefined ? arr[inx-1].user_post_id : "" ;
                    if(before_type_id == el.type && before_user_post_id == el.user_post_id ){
                        tmpArr[i-1].push(el);
                    }else{
                        tmpArr[i] = [el];
                        i++;
                    }
                });
                this.noticelist = tmpArr;
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