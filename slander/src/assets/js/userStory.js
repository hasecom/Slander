//スタートした？
export let start = false;
//メッセージ投稿1回目-投稿した？
export let firstPost = false;
//炎上投稿ID
export let BurnId = 'qwerty';

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

//一気に拡散
