<template>
<div>
    あ
</div>
</template>

<script>
import {
    innerJoin
} from "../assets/js/innerJoin.js";
export default {
    data() {
        return {
            dmArr: [],
            userPostArr: [],
            user: [],
        }
    },
    mounted() {
        this._mounted();
    },
    methods: {
        _mounted() {
            this.$parent.$parent.dm_count = 0;
            this.dmArr = this.$parent.$parent.userDm;
            this.user = this.$parent.$parent.user;

            this.createdDmList();
        },
        createdDmList() {
            var tmpArr = innerJoin(this.user, this.dmArr,
                ({
                    user_id,
                    user_name,
                    icon,
                }, {
                    dm_id,
                    fk_user_id,
                    message,
                    read,
                }) => fk_user_id === user_id && {
                    user_name,
                    icon,
                    fk_user_id,
                    dm_id,
                    read,
                    message,
                });
            console.log(tmpArr)
        }
    }
}
</script>

<style scoped>

</style>
