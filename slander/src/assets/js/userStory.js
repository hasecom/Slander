//スタートした？
export let start = false;
//メッセージ投稿1回目-投稿した？
export let firstPost = false;
//炎上投稿ID
export let BurnId = 'qwerty';

export const ChangeUserProfile = 'みんな仲良くしてください。'
//スワイプ連続時ユーザ投稿
export let timeLineSwipePost = {
    id: '',
    name: 'きき',
    type:0, //0は他人
    message: '投稿をする前に、他人を傷つける投稿じゃないか考えるのって大切だよね。',
    imagePath:'',
    iconPath:'icon2',
    good: 0,
    repost: 0,
    replyCnt: 0,
    timestamp: ""
}
export let timeLineSwipePostEd1 = {
    id: '',
    name: 'きき',
    type:0, //0は他人
    message: 'うんこなう',
    imagePath:'',
    iconPath:'icon2',
    good: 0,
    repost: 0,
    replyCnt: 0,
    timestamp: "" 
}
export function firstPostFnc(){
    firstPost = true;
}
export let postAction = [
    {
        user_post_id:0,
        message:'この間行った本屋で落書きしたったｗｗｗ',
        imagePath:"firstpost",
        good:0,
        repost:0,
        timestamp:"",
    }
]
//投稿時に忠告をするリプといいね
export let noticeAction = [
    {
        notice_id: 7, //通知ID
        fk_user_post_id: 0, //投稿ID
        fk_user_id: 1,
        reply: "",
        type: 1 //0:RT,1:GOOD,2:REPLY
    },
    {
        notice_id: 8, //通知ID
        fk_user_post_id: 0, //投稿ID
        fk_user_id: 1,
        reply: "これやばいよ。やっていること最低だけれどはやく消した方がいい・・。",
        type: 2 //0:RT,1:GOOD,2:REPLY
    },
]
//忠告を聞かずに投稿を残した場合のエンゲージメント
export let noticeAction2 = [
    {
        notice_id: 9, //通知ID
        fk_user_post_id:0, //投稿ID
        fk_user_id:7,
        reply: "",
        type: 1 //0:RT,1:GOOD,2:REPLY
    },
    {
        notice_id: 10, //通知ID
        fk_user_post_id: 0, //投稿ID
        fk_user_id: 7,
        reply: "",
        type:0 //0:RT,1:GOOD,2:REPLY
    },
]
export let taroDmId = 2;
//親友タローへのDM
export let taroFirstDm = {
    'type':0, //ゼロが自分 1が相手
    'message':'自分たちがやったことは悪いことだって気づいた。本屋に謝りに行こうと思う。親友タローも一緒に行かない？'
};
//親友タローからの返信DM:良心
export let taroFirstDmRtn = {
    'type':1, //ゼロが自分 1が相手
    'message':'そうだね。俺も反省してた・・・。'
};
//親友タローからの返信DM:悪意
export let taroFirstDmRtn2 = {
    'type':1, //ゼロが自分 1が相手
    'message':'なに言ってんの？今更ふざけんなよ。'
};

//シンガーボーイへの誹謗中傷
export let singerBoyTrendId = '3';
export let singerBoyReply = 'お前がいなくなればみんな幸せ。嬉しすぎる。本当にありがとう。今後一生メディアに映らないでくれよｗﾀﾋ'

//悪口リプ一覧(炎上ツイートに対して) 1-30
export let abusive = [
    '気持悪・・・',
    'やめろ。犯罪者が。',
    'どうかしてるだろ頭ｗｗｗｗ',
    '特定班住所特定求ｗｗｗｗ',
    'あたおかすぎる',
    'キチガイ乙',
    'こういう行為する理由がわからない',
    'ﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋﾀﾋ',
    '消えろ',
    '○ね',
    '○ろすぞ',
    '日本の恥、消えろ',
    'ありえねええ',
    '自己顕示欲爆発厨かｗｗｗ',
    'こういうカスがいるせいで国が腐るんだろうなｗｗｗ',
    '心の底から消えてください。',
    '住所特定してよだれか',
    'アイコンお前か？ブッサイクだな。',
    '学校特定したよ。',
    '勤務先特定したよ。',
    '電話番号特定したよ。',
    '人生崩壊しろwwww',
    'こいつのLIME特定したｗｗ',
    'ブス乙消えろ',
    '逃げるなよｋｓ',
    'お前何歳だよｗｗｗｗかすが',
    '低能すぎｗｗ',
    '消しても無駄だよ',
    'お前・・・',
    '本気でﾀﾋね',
    'お前のおやがみてえわｗｗｗ',
    '家族共々不幸になってもらうわｗｗｗｗ',
    '住所特定したから壁に落書きしにいきます',
    '電話番号特定したからお電話するねｗ',
    'こういうのやめたほうがいい。投稿するのも間違っている。明らかに炎上する。',
    'w',
    '自害したほうがいいと思いますけど？人間の恥なので。',
    'あなたが消えることで悲しむ人は誰1人いませんよ。だからはやく。',
    '自分のやっていることをしっかり考えて。',
    'こいつの恋人ぶすなんだよなｗｗ',
    'こいつのリア友です。こいつの性癖発表します！',
    'こいつの父親、〇〇らしいぞｗ'
];
