<template>
<div style="height:1500px;">
    <div v-for="(item,index) in noticelistData" :key="item.notice_id" class="">
        <!-- リプ -->
        <div v-if="item.type==2" class="row py-2 px-1 border-bottom">
            <div class="col-3 left_item">
                <div class="reply_icon rounded-circle border my-2">
                    <img class="border rounded-circle" :src="item.icon" alt="">
                </div>
            </div>
            <div class="col-9 notice_info">
                <div class="font-weight-bold">{{item.user_name}}</div>
                <div class="text-muted small">返信先: {{userInfoArr.name}}さん</div>
                {{item.reply}}
            </div>
        </div>
        <!-- good,rt -->
        <div v-else>
            <!-- 通知をまとめる -->
            <div class="row py-2 px-1 border-bottom" v-if="!(
                    noticePut(item.type,item.user_post_id,index+1 < noticelistData.length ?
                    noticelistData[index+1]['type'] : null,index+1 < noticelistData.length ?
                    noticelistData[index+1]['user_post_id'] : null))
                    ">
                <div class="col-3 left_item" :style="iconColor(item.type)">
                    <div>
                        <font-awesome-icon :icon="typeObj[item.type].fontawesome" />
                    </div>
                </div>
                <div class="col-9" >
                    <div class="icon rounded-circle border my-2">
                        <img class="border rounded-circle" :src="item.icon" alt="">
                    </div>
                    <div class="notice_info">
                        <span class="font-weight-bold">{{item.user_name}}</span>
                        {{typeObj[item.type].message}}
                    </div>
                    <div class="text-muted small">
                        {{item.message}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        noticelistData: {
            type: Array
        },
        userInfoArr: {
            type: Object
        }
    },
    data() {
        return {
            typeObj: { //0:RT,1:GOOD,2:REPLY
                0: {
                    param: "RT",
                    message: "さんがあなたの投稿を引用しました",
                    fontawesome: 'retweet'
                },
                1: {
                    param: "GOOD",
                    message: "さんがあなたの投稿をいいねしました",
                    fontawesome: 'heart'
                },
                2: {
                    param: "REPLY",
                    message: "",
                    fontawesome: ''
                }
            }
        }
    },
    mounted() {
    },
    methods: {

    },
    computed: {
        iconColor: function () {
            return function (type) {
                var color = "";
                if (type == 0) {
                    color = "#00b894";
                } else if (type == 1) {
                    color = "#d63031";
                }
                return {
                    "color": color
                };
            }
        },
        noticePut: function () {
            return function (type_id, user_post_id, after_type_id, after_user_post_id) {
                if (after_type_id === type_id && after_user_post_id === user_post_id) {
                    //投稿形式とアクションした投稿IDが同じ
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}
</script>

<style scoped>
.reply_icon {
    width: 49px;
    height: 49px;
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

.left_item {
    display: flex;
    justify-content: center;
    align-items: center;
}

.notice_info {
    font-size: 16px;
}
</style>
