<template>
<div id="footer" class="fixed-bottom">
    <div class="row  footer_menu_wrapper">
        <div :id="item['param']" :data-item="dataSelect(item['param'])" class="text-center col-3" v-for="item in siteInfoLabel" :key="item['param']">
            <router-link :to="item['path']" tag='button' class="btn footer-router-link">
                <font-awesome-icon :icon="item['fontawesome']" :style="selectPage(item['path'])" />
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    props: {
        siteInfoLabel: {
            type: Array
        }
    },
    watch: {
        "$parent.notice_count"() {
            this.noticeChange();   
        },
        "$parent.dm_count"(){
            this.dmChange();
        }
    },
    mounted() {
        this.noticeChange();
        this.dmChange();
    },
    methods: {
        noticeChange() {
            $('#notice').data('item', this.$parent.notice_count);
            if ($('#notice').data('item') > 0) {
                $('#notice').addClass('noticeDisplay');
            } else {            
                $('#notice').removeClass('noticeDisplay');
            }
        },
        dmChange() {
            $('#dm').data('item', this.$parent.dm_count);
            if ($('#dm').data('item') > 0) {
                $('#dm').addClass('dmDisplay');
            } else {
                $('#dm').removeClass('dmDisplay');
            }
        },
        dataSelect(el){
            if(el == "notice"){
                return this.$parent.notice_count < 21 ? this.$parent.notice_count : 20;
            }else if(el == "dm"){
                return this.$parent.dm_count < 21 ? this.$parent.dm_count : 20;
            }
        }
    },
    computed: {
        selectPage: function () {
            return function (path) {
                let rtnVal = [];
                if (this.$route.path == path) {
                    rtnVal = {
                        "color": "#00acee"
                    }
                } else {
                    rtnVal = {
                        "color": "#2d3436"
                    }
                }
                return rtnVal;
            }
        }
    }
}
</script>

<style scoped>
#footer {
    width: 100%;
    height: 50px;
    border-top: solid 0.5px rgba(0, 0, 0, 0.2);
    background: white;
    z-index: 10;
}

.footer_menu_wrapper {
    margin: 0px !important;
}

.footer-router-link {
    font-size: 23px !important;
}

.noticeDisplay:after {
    content: attr(data-item);
    font-size: 13px;
    left: 50%;
    position: absolute;
    background: #00acee;
    border: solid 1px white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    color: white;
}

.dmDisplay:after {
    content: attr(data-item);
    font-size: 13px;
    left: 50%;
    position: absolute;
    background: #00acee;
    border: solid 1px white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    color: white;
}
</style>
