<template>
<div>
    <div id="timeline" v-for="item in timeline01" :key="item['id']">
        <div class="border-bottom">
            <div class="row  mg-0 post">
                <div class="col-2 px-0">
                    <div class="icon rounded-circle border">
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
import * as TimeLine from "../assets/js/timeline.js";
export default {
    data() {
        return {
            timeline01: TimeLine['timeline01']
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
.icon {
    width: 44px;
    height: 44px;
}

#timeline {
    padding: 10px 0px;
}

.post {
    padding: 5px 30px;
}
</style>
