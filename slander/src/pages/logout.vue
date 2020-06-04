<template>
<div id="logout">
    <div class="logout_body_wrapper">
        <div class="logout_body">
            {{logoutMsg}}
        </div>
    </div>
</div>
</template>

<script>
import * as message from "../assets/js/message.js";
import $ from 'jquery';
export default {
    data() {
        return {
            logoutMsg: ''
        }
    },
    mounted() {
        this.__mounted();
    },
    methods: {
        __mounted() {
            var self = this;
            //エンド前かつ炎上前
            if (!this.$parent.IsEnd && !this.$parent.IsTimeOut) {
                this.logoutMsg = 'アカウントを使わなくなって数年後...'
                $('.logout_body').animate({
                    'opacity': 1,
                    'font-size': '18px'
                }, 5000, "swing")
                setTimeout(function () {
                    self.terminal_notice_set_fnc(message['mail']['4']['name'], message['mail']['4']['message'], 1);
                    setTimeout(function () {
                        self.$parent.endPatternStr = 'ネットストーカー被害';
                        self.$parent.EndRaul = true;
                        self.$parent.IsEnd = true;
                    }, 6 * 1000);
                }, 5 * 1000);
            } else if (!this.$parent.IsEnd && this.$parent.IsTimeOut) { //エンド前炎上後
                this.logoutMsg = 'ログアウトしても炎上・誹謗中傷は止みません。'
                $('.logout_body').animate({
                    'opacity': 1,
                    'font-size': '14px'
                }, 5000, "swing")
                setTimeout(function () {
                    self.$parent.endPatternStr = '現実世界での嫌がらせヒートアップ';
                    self.$parent.EndRaul = true;
                    self.$parent.IsEnd = true;
                }, 5 * 1000);
            }
        },
        terminal_notice_set_fnc(name, msg, type) {
            this.$parent.Terminal_notice_name = name;
            this.$parent.Terminal_notice_message = msg;
            this.$parent.Terminal_notice_type = type; //lime - 0 ma -1 
            var self = this;
            setTimeout(function () {
                self.$parent.IsterminalNotice = true;
            }, 2 * 1000);
        },
    }
}
</script>

<style scoped>
#logout {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #2d3436;
    z-index: 20;
}

.logout_body_wrapper {
    height: 100%;
}

.logout_body {
    color: red;
    font-weight: bold;
    font-size: 0px;
    opacity: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
