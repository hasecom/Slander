<template>
<div>
    <div v-for="item in noticelistData" :key="item.notice_id" class="border-bottom">
        <div class="row">
            <div class="col-2">{{item.type}}</div>
            <div class="col-10">{{item}}
                <div class="text-muted small">
                    {{item.message}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        noticelistData:{
            type:Array
        }
    }
}
</script>

<style scoped>

</style>
