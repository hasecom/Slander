<template>
<div class="">
    <button @click="ClickPostBtn" class="btn footer-router-link post-button rounded-circle shadow-sm border">
        <font-awesome-icon :icon="ChangeIcon()" class="font-awesome-icon-element" />
    </button>
</div>
</template>

<script>
export default {
    props: {
        PageParam: {
            type: String
        }
    },
    methods: {
        ChangeIcon() {
            if (this.PageParam == "dm") {
                return 'envelope'
            }
            return 'feather-alt'
        },
        ClickPostBtn() {
            if (!this.$route['path'].indexOf('/share/')) {
                this.$router.push({
                    path: '/trendPost/' + this.$route['query']['id'] +'/'+  this.$route['query']['name']
                })
            } else {
                var toPath = this.PageParam == 'dm' ? '' : '/post';
                this.$router.push({
                    path: toPath
                })
            }
        }
    },
}
</script>

<style scoped>
.post-button {
    position: relative;
    width: 55px;
    height: 55px;
    background: #00acee;
    color: white;
}

.post-button>.font-awesome-icon-element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
</style>
