<template>
    <div id="footer" class="fixed-bottom">
        <div class="row  footer_menu_wrapper">
            <div class="text-center col-3" v-for="item in siteInfoLabel" :key="item['param']">
                <router-link :to="item['path']" tag='button' class="btn footer-router-link">
                    <font-awesome-icon :icon="item['fontawesome']" :style="selectPage(item['path'])" />
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        siteInfoLabel:{
            type:Array
        }
    },
    mounted(){
    },
    methods:{

    },
    computed:{
        selectPage:function(){
            return function(path){
                let rtnVal = [];
                if(this.$route.path == path){
                    rtnVal = {
                        "color":"#00acee"
                    }
                }else{
                    rtnVal = {
                        "color":"#2d3436"
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
    width:100%;
    height:50px;
    border-top:solid 0.5px rgba(0,0,0,0.2);
    background:white;
    z-index:10;
}
.footer_menu_wrapper{
    margin:0px !important;
}
.footer-router-link  {
    font-size:23px !important;
}
</style>