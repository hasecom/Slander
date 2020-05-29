<template>
<div id="terminalNoitce" class="notice shadow my-2 border">
    <div class="row px-2">
        <div class="icon col-2">
            ■
        </div>
        <div class="col-10 px-0">
            LIME
        </div>
    </div>
    <div class="px-3 name">{{terminal_notice_name}}</div>
    <div class="px-3">{{terminal_notice_message}}</div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    props:{
        terminal_notice_name:{
            type:String,
        },
        terminal_notice_message:{
            type:String,
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        var self = this;
        if (this.$parent.IsterminalNotice) {
            this.openTerminalNoticeAnimate();
        }
        setTimeout(function () {
            self.closeTerminalNoticeAnimate();
        }, 4 * 1000);
    },
    methods: {
        openTerminalNoticeAnimate() {
            $('#terminalNoitce').animate({
                "top": 0
            }, 1000);
        },
        closeTerminalNoticeAnimate(){
            var self = this;
            $('#terminalNoitce').animate({
                "top": "-100%"
            },1000,function(){
                self.$parent.IsterminalNotice = false
            });
        }
    }
}
</script>

<style scoped>
.notice {
    position: fixed;
    width: 90%;
    height: 80px;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: -100%;
    background: rgba(250, 250, 250, 0.97);
    border-radius: 10px;
    z-index: 35;
}

.icon {
    color: #00B900;
}

.name {
    font-weight: bold;
}
</style>
