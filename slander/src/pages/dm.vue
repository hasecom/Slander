<template>
    <div>
        あ
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this._mounted();
    },
    methods:{
        _mounted(){
            this.$parent.$parent.dm_count = 0;
        }
    }
}
</script>
<style scoped>

</style>