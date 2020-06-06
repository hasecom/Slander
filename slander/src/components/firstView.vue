<template>
<div id="firstView">
    <div class="page-top">
        <div class="top-image-wrapper"><img src="../assets/images/top2.png" alt=""></div>
        <h1 class="siteTitle py-3">炎上・誹謗中傷<br>擬似体験サービス</h1>
    </div>
    <div class="firstViewBody">
        <div class="text-center pb-4 small">
            このサービスは、普段使っているSNSで<br>
            起うる炎上・誹謗中傷を擬似的に<br>
            体験することができます。
        </div>
        <div class="form-group py-2">
            <label class="label" for="user_name">名前（ニックネーム）</label>
            <input type="text" id="user_name" class="form-control" v-model="user_name" placeholder="はなこ" maxlength='6'>
        </div>
        <div class="gender">
            <label class="label">性別<span class="compulsion">*</span></label>
            <div class="row mx-0 text-center py-2 font-weight-bold">
                <div class="col-6">
                    <span id="gender_0" class="border rounded-pill px-4 py-2 gender" @click="genderSelect(0)">男性</span>
                </div>
                <div class="col-6">
                    <span id="gender_1" class="border rounded-pill px-4 py-2 gender" @click="genderSelect(1)">女性</span>
                </div>
            </div>
        </div>
        <div class="age py-3">
            <label class="label">年齢<span class="compulsion">*</span></label>
            <div class="row small text-center font-weight-bold">
                <div class="col-4">
                    <div id="age_0" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(0)">10代未満</div>
                </div>
                <div class="col-4">
                    <div id="age_1" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(1)">10代</div>
                </div>
                <div class="col-4">
                    <div id="age_2" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(2)">20代</div>
                </div>
                <div class="col-4">
                    <div id="age_3" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(3)">30代</div>
                </div>
                <div class="col-4">
                    <div id="age_4" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(4)">40代</div>
                </div>
                <div class="col-4">
                    <div id="age_5" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(5)">50代</div>
                </div>
                <div class="col-4">
                    <div id="age_6" class="border py-2 px-1  rounded-pill my-2" @click="ageSelect(6)">60代以上</div>
                </div>
            </div>
        </div>
        <div class="border note">
            当サービスは、一部過激な表現を含んでいるため、トラウマをお持ちの方や児童のご利用は、ご注意ください。
            また、利用者の名前（ニックネーム）・性別・年齢を収集させていただくため予めご了承ください。収集する情報のうち個人を特定できる情報に関しましては一切の利用をいたしません。
        </div>
        <div class="form-check text-right py-2">
            <input class="form-check-input chkBox" type="checkbox" id="check1b" v-model="checked">
            <label class="form-check-label" for="check1b">同意する</label>
        </div>
        <div class="text-center py-2 fixed-bottom bottom_wrap border-top shadow-sm">
            <button id="start_btn" class="btn btn-lg  btn-danger rounded-pill shadow-sm px-5" @click="start()" disabled>始める</button>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
export default {
    data() {
        return {
            user_name: "",
            genderSelected: false,
            ageSelected: false,
            checked: false,
            gender: 0,
            age: 0,
        }
    },
    watch: {
        genderSelected() {
            this.firstViewCheck();
        },
        ageSelected() {
            this.firstViewCheck();
        },
        checked() {
            this.firstViewCheck();
        }
    },
    created() {

    },
    mounted() {
        $('.page-top').width($(window).width()).height($(window).height());
        $('.top-image-wrapper > img').height($(window).height() - 160);
        $('body').css('overflow', 'hidden');
        $('body').css('position', 'fixed');
    },
    methods: {
        firstViewCheck() {
            if (this.genderSelected && this.ageSelected && this.checked) {
                $('#start_btn').prop('disabled', false);
            } else {
                $('#start_btn').prop('disabled', true);
            }
        },
        start() {
            if (this.user_name != '') {
                this.$parent.userInfoArr.name = this.user_name;
            }
            var params = new URLSearchParams()
            params.append('age', this.age)
            params.append('gender', this.gender)
            params.append('user_name', this.user_name)
            axios.post('https://weblike-haseapp.ssl-lolipop.jp/Slander/', params);
            $('body').css('overflow', 'auto');
            $('body').css('position', 'static');
            this.$parent.isFirstView = false;
        },
        ageSelect(age) {
            this.age = age;
            this.ageSelected = true;
            for (var i = 0; i < 7; i++) {
                if (i == age) {
                    $('#age_' + i).css({
                        "background": "#74b9ff",
                        "color": "white"
                    })
                } else {
                    $('#age_' + i).css({
                        "background": "#2d3436",
                        "color": "white"
                    })
                }
            }
        },
        genderSelect(gender) {
            this.gender = gender;
            this.genderSelected = true;
            if (gender == 0) {
                $('#gender_0').css({
                    "background": "#0984e3",
                    "color": "white"
                })
                $('#gender_1').css({
                    "background": "#2d3436",
                    "color": "white"
                })
            } else {
                $('#gender_0').css({
                    "background": "#2d3436",
                    "color": "white"
                })
                $('#gender_1').css({
                    "background": "#ff7675",
                    "color": "white"
                })
            }
        }
    },
    computed: {
        imageLoad: function () {
            return function (fileName) {
                return require('../assets/images/' + fileName + '.jpg');
            }
        },
    }
}
</script>

<style scoped>
#firstView {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    padding-bottom: 100px !important;
    background: #2d3436;
    color: white;
}
.top-image-wrapper {
    text-align: center;
    background:#d63031;
    overflow-x: hidden;
}
.top-image-wrapper>img {
    object-fit: cover;
}

.page-top {
    background: #2d3436;
}

.siteTitle {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: white;
}
.compulsion{
    padding:0px 5px;
    color:#ff7675;
    font-size:20px;
}

.label {
    color: white;
    font-weight: bold;
}

#gender_0 {
    color: #0984e3;
    font-weight: bold;
    border-color: #0984e3 !important;
}

#gender_1 {
    color: #ff7675;
    font-weight: bold;
    border-color: #ff7675 !important;
}

#firstView {
    overflow-y: scroll;
}

.note {
    height: 90px;
    font-size: 15px;
    overflow-y: scroll;
    padding: 10px 5px;
}

.chkBox {
    transform: scale(1.5);
}
.firstViewBody{
    width:85%;
    margin:0 auto;
}
.bottom_wrap{
    background: rgba(250,250,250,1);
}
</style>
