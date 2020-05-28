<template>
    <div id="header" class="shadow-sm row mx-0 sticky-top">
        <div class="header-icon-wrapper col-2">
            <img :src="iconPath" alt="" class="rounded-circle border"  @click="$parent.IsOpensideBar = true">
        </div>
        <div class="col-7 page-title">
            {{PageTitle}}
        </div>
        <div class="col-3">

        </div>
    </div>
</template>
<script>
export default {
    props:{
        userInfoLabel:{
            type:Object
        },
        PageTitle:{
            type:String
        }
    },
    data(){
        return {
            iconPath:''
        }
    },
    mounted(){
        this.iconPath = this.imageLoad(this.userInfoLabel['icon'])
    },
    methods:{
        imageLoad(fileName) {
            return require('../assets/images/' + fileName + '.jpg');
        },
    }
}
</script>
<style scoped>
#header{
    width:100%;
    padding:10px 0px;
    z-index:10;
    background:white;
}
.header-icon-wrapper {
    padding-left: 14px;
    padding-right: 14px;
}
.header-icon-wrapper > img{
    width:30px;
    height:30px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 2px inset;
}
.page-title{
    font-size:20px;
    font-weight:600;
}
</style>