"use strict";(self["webpackChunkslander"]=self["webpackChunkslander"]||[]).push([[294],{2294:function(t,s,r){r.r(s),r.d(s,{default:function(){return _}});var e=function(){var t=this,s=t._self._c;return s("div",{attrs:{id:"endroll"}},[s("div",{staticClass:"endrollWrapper"},[s("div",{staticClass:"endrollContent px-3 py-3"},[s("h2",{staticClass:"text-center font-weight-bold"},[t._v(t._s(t.EndRollArr.sevice_name))]),s("div",{staticClass:"text-center py-3 border my-4"},[s("h5",{staticClass:"font-weight-bold"},[t._v(t._s(t.EndPattern)+"エンド")]),s("span",{staticClass:"text-right d-block small px-2"},[s("span",{staticClass:"kasen"},[s("a",{attrs:{href:t.EndRollArr.note_url,target:"_blank"}},[t._v("エンドパターン・解説はこちら")])]),s("font-awesome-icon",{attrs:{icon:"chevron-right"}})],1)]),s("div",{staticClass:"text-right"},[t._v("製作者："+t._s(t.EndRollArr.producer)+" ( "),s("a",{staticClass:"supporter_link",attrs:{href:"https://twitter.com/"+t.EndRollArr.producer_twitter_id,target:"_blank"}},[t._v("@"+t._s(t.EndRollArr.producer_twitter_id))]),t._v(" ) ")]),s("div",{staticClass:"py-3"},[t._v(t._s(t.EndRollArr.description))]),s("div",{staticClass:"twitter_share text-center my-3"},[t._m(0),s("div",{staticClass:"twitter btn border shadow-sm mt-3",on:{click:t.twitterShare}},[s("font-awesome-icon",{attrs:{icon:["fab","twitter"]}}),t._v(" ツイート ")],1)]),s("div",{staticClass:"supporter_list py-3"},[t._m(1),t._l(t.EndRollArr.supporter,(function(r,e){return 0!=t.EndRollArr.supporter.length?s("div",{key:e,staticClass:"supporter py-2"},[t._v(" ・"+t._s(r.name)+"様 "),0==r.type?s("span",[t._v("（ "),s("a",{staticClass:"supporter_link",attrs:{href:"https://twitter.com/"+r.account_id,target:"_blank"}},[t._v("@"+t._s(r.account_id))]),t._v(" )")]):t._e()]):t._e()})),0==t.EndRollArr.supporter.length?s("div",{staticClass:"text-white text-center"},[t._v("現在サポーター様はおりません。")]):t._e(),0!=t.EndRollArr.supporter.length?s("div",{staticClass:"text-center py-3"},[t._v("以上、"+t._s(t.EndRollArr.supporter.length)+"名様"),s("br"),t._v("ご協力ありがとうございます。")]):t._e()],2),s("div",{staticClass:"supporter_recruitment my-3"},[t._m(2),s("h5",{staticClass:"text-center pt-1 font-weight-bold"},[t._v(" サポーター募集 "),s("font-awesome-icon",{attrs:{icon:"chevron-right"}})],1)]),s("div",{staticClass:"py-5 text-center"},[s("div",{staticClass:"close_btn btn border rounded-pill",on:{click:t.closeEndRoll}},[t._v(" 閉じる ")])])])])])},n=[function(){var t=this,s=t._self._c;return s("div",[t._v(" 多くのネットユーザに届きますように"),s("br"),t._v("シェアのご協力お願いいたします。 ")])},function(){var t=this,s=t._self._c;return s("h5",{staticClass:"font-weight-bold"},[t._v("サポーター様のご紹介"),s("span",{staticClass:"small"},[t._v("(順不同)")])])},function(){var t=this,s=t._self._c;return s("div",[t._v(" 応援してください。"),s("br"),t._v("社会がよりハッピーになる活動を続けます。 ")])}],a=r(9755),l=r.n(a),i={props:{EndRollArr:{type:Object},EndPattern:{type:String}},data(){return{}},mounted(){l()(".endrollWrapper").hide().fadeIn(3e3),l()("body").css("overflow","hidden"),l()("body").css("position","fixed")},methods:{closeEndRoll(){l()("body").css("overflow","auto"),l()("body").css("position","static"),this.$parent.EndRaul=!1},twitterShare(){var t="https://twitter.com/intent/tweet?text=【"+this.EndPattern+"エンド】%0A%23炎上・誹謗中傷擬似体験%0A&url=https://slander-app.herokuapp.com/#/";window.open(t,"_blank")}}},o=i,c=r(1001),d=(0,c.Z)(o,e,n,!1,null,"73f3cc94",null),_=d.exports}}]);
//# sourceMappingURL=294.7e4ea415.js.map