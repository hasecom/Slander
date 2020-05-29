//スタートした？
export let start = false;
//メッセージ投稿1回目-投稿した？
export let firstPost = false;
//初回メッセージ内容
export let firstPostMessage = "この間行った本屋で落書きしたったｗｗｗ"
//初回画像name
export let firstPostImgName = "firstpost"

export function firstPostFnc(){
    firstPost = true;
}