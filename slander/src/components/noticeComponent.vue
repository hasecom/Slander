<template>
<div id="noticeComponent">
    <div v-for="(item,index) in noticelistData" :key="index">
        <!-- 連続がひとつ & リプ -->
        <div v-if="item.length == 1">
            <!-- リプ -->
            <div v-if="item[0].type==2" class="row py-2 px-1 border-bottom">
                <div class="col-3 left_item">
                    <div class="reply_icon rounded-circle border my-2">
                        <img v-if="item[0].icon != ''" class="border rounded-circle" :src="imageLoad(item[0].icon)" alt="">
                    </div>
                </div>
                <div class="col-9 notice_info">
                    <div class="font-weight-bold">{{item[0].user_name}}</div>
                    <div class="text-muted small">返信先: {{userInfoArr.name}}さん</div>
                    {{item[0].reply}}
                    <div class="row text-muted text-center pt-3">
                        <div class="col-3 px-0">
                            <font-awesome-icon icon="comment" />
                        </div>
                        <div class="col-3 px-0">
                            <font-awesome-icon icon="retweet" />
                        </div>
                        <div class="col-3 px-0">
                            <font-awesome-icon icon="heart" />
                        </div>
                        <div class="col-3 px-0">
                            <font-awesome-icon icon="external-link-alt" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- good,rt -->
            <div v-else>
                <div class="row py-2 px-1 border-bottom">
                    <div class="col-3 left_item" :style="iconColor(item[0].type)">
                        <div>
                            <font-awesome-icon :icon="typeObj[item[0].type].fontawesome" class="notice_label" />
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="icon rounded-circle border my-2">
                            <img v-if="item[0].icon != ''" class="border rounded-circle" :src="imageLoad(item[0].icon)" alt="">
                        </div>
                        <div class="notice_info">
                            <span class="font-weight-bold">{{item[0].user_name}}</span>さん
                            {{typeObj[item[0].type].message}}
                        </div>
                        <div class="text-muted small">
                            {{item[0].message}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- いいね/RT連続 -->
        <div v-else>
            <!-- good,rt -->
            <div class="row py-2 px-1 border-bottom">
                <div class="col-3 left_item" :style="iconColor(item[0].type)">
                    <div>
                        <font-awesome-icon :icon="typeObj[item[0].type].fontawesome" class="notice_label" />
                    </div>
                </div>
                <div class="col-9">
                    <div class="row mx-0 justify-content-start">
                        <div class="col-1 px-0 mr-3" v-for="(inner,index) in item" :key="index">
                            <div class="icon rounded-circle border my-2">
                                <img v-if="inner.icon != ''" class="border rounded-circle d-inline" :src="imageLoad(inner.icon)" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="notice_info">
                        <span class="font-weight-bold">{{item[0].user_name}}</span>
                        さんと
                        <span v-if="item.length == 2">
                            <span class="font-weight-bold">{{item[1].user_name}}</span>さん
                        </span>
                        <span v-if="item.length != 2">他{{item.length - 1}}人</span>
                        {{typeObj[item[0].type].message}}
                    </div>
                    <div class="text-muted small">
                        {{item[0].message}}
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
                    message: "があなたの投稿を引用しました",
                    fontawesome: 'retweet'
                },
                1: {
                    param: "GOOD",
                    message: "があなたの投稿をいいねしました",
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
        imageLoad(fileName) {
            return require('../assets/images/' + fileName + '.jpg');
        },
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

.notice_label {
    font-size: 20px;
}

</style>
