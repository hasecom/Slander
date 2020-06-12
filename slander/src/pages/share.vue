<template>
<div>
    <div class="border-bottom row mx-0">
        <div class="col-3 px-0 py-2">
            <router-link to="/search" tag='button' class="btn footer-router-link">
                <font-awesome-icon icon="arrow-left" class="arrow-left" />
            </router-link>
        </div>
        <div class="col-6 px-0 py-2 text-center font-weight-bold">
            {{room_name}}
        </div>
        <div class="col-3 px-0"></div>
    </div>
    <div class="trend_body">
        <div id="timeline" v-for="item in slander_message" :key="item.id">
            <div class="border-bottom">
                <div class="  mg-0 post">
                    <div class="pl-3 pr-0">
                        <div class="row">
                            <div class="col-12">
                                <div class="font-weight-bold home_name">
                                    {{item.user_name}}
                                </div>
                            </div>
                        </div>
                        <div>{{item.message}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
export default {
    data() {
        return {
            slander_message: [],
            room_name:""
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.room_name = this.$route.query.name;
            var params = new URLSearchParams()
            params.append('room_id', this.$route.params.id)
            axios.post('https://weblike-haseapp.ssl-lolipop.jp/SlanderInclude/slanderGetMessage.php', params)
                .then(response => {
                    this.slander_message = response['data'];
                });
        }
    }
}
</script>

<style scoped>
.icon {
    width: 44px;
    height: 44px;
}

.icon>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

#timeline {
    padding: 10px 0px;
}

.home_name {
    font-size: 15px;
}

.post {
    padding: 5px 30px;
}

.timeline_image>img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    margin-top: 20px;
    border-radius: 15px;
}
.reply {
    width: 100%;
    height: 100%;
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 60px !important;
}

.reply_text {
    color: #00acee;
}
.send-btn {
    background: #00acee;
    color: white;
    font-weight: 600;
}
.trend_body{
    margin-bottom: 30px;
}
</style>
