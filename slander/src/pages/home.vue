<template>
<div>
    <div id="timeline" v-for="item in timeline" :key="item['id']">
        <div class="border-bottom">
            <div class="row  mg-0 post">
                <div class="col-2 px-0">
                    <div class="icon rounded-circle border">
                        <img v-if="item['imagePath']" class="border rounded-circle" :src="item['iconPath'] != '' ? imageLoad(item['iconPath']) : ''" alt="">
                    </div>
                </div>
                <div class="col-10 px-0">
                    <div class="row">
                        <div class="col-8">
                            <div class="font-weight-bold">
                                {{item['name']}}
                            </div>
                        </div>
                        <div class="col-4 text-muted small">
                            {{item['timestamp']}}
                        </div>
                    </div>
                    <div>{{item['message']}}</div>
                    <div class="timeline_image">
                        <img v-if="item['imagePath']" class="border" :src="item['imagePath'] != '' ? imageLoad(item['imagePath']) : ''" alt="">
                    </div>
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
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            timeline: []
        }
    },
    mounted() {
        this.timeline = this.$parent.$parent.timeLine;
    },
    methods: {
        imageLoad(fileName) {
            return require('../assets/images/' + fileName + '.jpg');
        },
    }
}
</script>

<style scoped>
.icon {
    width: 44px;
    height: 44px;
}
.icon > img {
    width:100%;
    height:100%;
    object-fit: cover;
}
#timeline {
    padding: 10px 0px;
}

.post {
    padding: 5px 30px;
}

.timeline_image > img{
    width:100%;
    height:150px;
    object-fit: cover;
    margin-top:20px;
    border-radius:15px;
}
</style>
