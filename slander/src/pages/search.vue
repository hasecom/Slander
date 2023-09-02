<template>
<div>
    <div class="ads mb-2">
        <div class="small px-2 ads_c">
            スポンサーリンク
        </div>
    </div>
    <div class="py-2">
        <div class="font-weight-bold border-bottom pb-1 tr-title">トレンド</div>
        <ul>
            <router-link :to="'trend/'+ trend.trend_id" tag="li" v-for="(trend,index) in trendList" :key="index" class="border-bottom px-2 py-4">
                <div class="font-weight-bold">{{trend.name}}</div>
            </router-link>
        </ul>
        <ul>
            <router-link :to="'share/'+ trend.id+'/?name='+trend.room_name+'&id=' + trend.id"  tag="li" v-for="(trend,index) in slanderlist" :key="index" class="border-bottom px-2 py-4">
                <div class="font-weight-bold">{{trend.room_name}}</div>
            </router-link>
        </ul>
    </div>
</div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
export default {
    data() {
        return {
            trendList: [],
            slanderlist:[]
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.trendList = this.$parent.$parent.trendList;
        }
    }
}
</script>

<style scoped>
.ads {
    width: 100%;
    height: 200px;
    background: #636e72;
    color: white;
    position: relative;
}

.ads_c {
    position: absolute;
    bottom: 0;
}

.tr-title {
    font-size: 20px;
}

ul {
    padding: 0px;
    margin-bottom:0px;
}

</style>
