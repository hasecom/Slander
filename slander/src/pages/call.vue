<template>
<div id="call">
    <div class="call_title">非通知</div>
    <div class="container">
        <div class="call_select row mx-0">
            <div class="col-6">
                <div class="hungup" @click="closeCall()">
                    <font-awesome-icon icon="phone-slash" class="font-awesome-icon-element" />
                </div>
                <div class="text-white py-3">拒否</div>
            </div>
            <div class="col-6">
                <div class="answer" @click="closeCall()">
                    <font-awesome-icon icon="phone-alt" class="font-awesome-icon-element" />
                </div>
                <div class="text-white py-3">応答</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods:{
        closeCall(){
            this.$parent.IsCalled = true;
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
#call {
    position: fixed;
    z-index: 40;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #2d3436;
}

.call_title {
    padding: 30px;
    text-align: center;
    font-size: 25px;
    color: white;
}

.call_select {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 50px;
    text-align: center;
}

.hungup {
    position: relative;
    width: 80px;
    height: 80px;
    color: white;
    background: rgb(234, 78, 63);
    border-radius: 50%;
    font-size: 40px;
    margin:0 auto;
}

.answer {
    position: relative;
    width: 80px;
    height: 80px;
    color: white;
    background: rgb(120, 215, 116);
    border-radius: 50%;
    font-size: 40px;
    margin:0 auto;
}

.answer>.font-awesome-icon-element,
.hungup>.font-awesome-icon-element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}
</style>
