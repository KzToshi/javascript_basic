// 神経衰弱

// 要素を取得する
const panel = document.getElementById('panel');
const nextPlayer = document.getElementById('nextPlayer');
const player1point = document.getElementById('player1Point');
const player2point = document.getElementById('player2Point');

// 変数を宣言
let countNum = [];
let maxNum = 4;
let length = maxNum * 2;
let cardNum = [];
let judgeCount = 0;
let judgeNum = 0;
let judgeLast = 0;
let playerCount = [0, 0];
let clearCount = 0;
let next = 1;
let doubleClick = 0;
let stopDel;
let stopClose;

// 一枚目の数字を記録する配列の初期化
for (let i = 0; i < maxNum; i++) {
    judgeNum[i] = 0;
}

// 一番下から処理スタート

// 数字の配列を作る。例)countNum=[1,2,3,4,1,2,3,4]
const createCount = function () {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < maxNum; j++) {
            countNum[j + i * maxNum] = j + 1;
        }
    }
};

// フィッシャー–イェーツのシャッフルを使用して、配列をランダムにする
const createRandom = function () {
    for (let i = 0; i < length; i++) {
        let random = Math.floor(Math.random() * (length - i - 1));
        cardNum[i] = countNum[random];
        for (let j = random; j < length - 1; j++) {
            countNum[j] = countNum[j + 1];
        }
    }
};

// プレイヤー状況を表示
const playerset = function () {
    nextPlayer.innerHTML = '次はplayer' + next + 'の番です';
    player1point.innerHTML = 'player1:' + playerCount[0];
    player2point.innerHTML = 'player2:' + playerCount[1];
};

// 2枚の数字があっているかいないかの処理
const judge = function (num) {
    judgeCount++;//1枚目か2枚目かをカウント
    if (judgeCount > 1) {//2枚目だったら
        console.log('aaaaa');
        // 同じカードをクリックしたとき
        if (num === judgeLast && judgeCount === 2) {
            alert('同じカードだよ');
            let cardClick1 = document.querySelector(`.card${num + 1}`);
            cardClick1.innerHTML = '';
            cardClick1.classList.add('back');
            judgeCount = 0;
            judgeNum = 0;
            doubleClick = 0;
        }
        //1枚目と2枚目が一緒かどうか
        else if (judgeNum === cardNum[num]) {
            del(num, judgeLast);//2枚を削除
        } else {
            closeback(num, judgeLast);//2枚を再び裏返す
            //プレイヤーの入れ替え
            switch (next) {
                case 1:
                    next = 2;
                    break;
                case 2:
                    next = 1;
                    break;
            }
        }
        playerset();//プレイヤー状況を処理
        //枚数と一枚目の情報を処理
        judgeNum = 0;
    } else {//1枚目なら
        //一枚目の配列番号を格納
        judgeLast = num;
        //一枚目のカードの数字を格納
        judgeNum = cardNum[num];
    }
};

//カードを削除する
const del = function (num, judgeLast) {
    if (doubleClick > 2) {
        alert('ダブルクリックしないで！');
        doubleClick = 0;
        judgeCount = 0;
    }
    else {
        stopDel = setTimeout(function () {
            let cardClick2 = document.querySelector(`.card${judgeLast + 1}`);
            let cardClick1 = document.querySelector(`.card${num + 1}`);
            cardClick2.innerHTML = '';
            cardClick1.innerHTML = '';
            cardClick2.classList.add('finish');
            cardClick1.classList.add('finish');
            clearCount++;//1ペア消えたことをカウント
            playerCount[next - 1]++;//プレイヤーの勝ち数をカウント
            finish();//すべて消えたときの処理
            judgeCount = 0;
            doubleClick = 0;
        }, 500);
    }
};

//カードを裏返す
const closeback = function (num, judgeLast) {
    if (doubleClick > 2) {
        alert('ダブルクリックしないで！');
    }
    stopClose = setTimeout(function () {
        let cardClick2 = document.querySelector(`.card${judgeLast + 1}`);
        let cardClick1 = document.querySelector(`.card${num + 1}`);
        cardClick2.innerHTML = '';
        cardClick1.innerHTML = '';
        cardClick2.classList.add('back');
        cardClick1.classList.add('back');
        doubleClick = 0;
        judgeCount = 0;
    }, 500);
};

//カードを作成
const createCard = function () {
    //カードの長さ分繰り返す
    for (let i = 0; i < length; i++) {
        //カードを一枚作成し、htmlに表示、再び呼び出して格納
        let card = document.createElement('div');
        card.classList.add('card', 'back', `card${i + 1}`);
        panel.appendChild(card);
        let cardClick = document.querySelector(`.card${i + 1}`);
        //カードがクリックされたとき
        cardClick.addEventListener('click', function () {
            //カードの数値を表示
            doubleClick++;
            cardClick.innerHTML = cardNum[i];
            cardClick.classList.remove('back');
            judge(i);//関数呼び出し
        });
    }
};

//すべてのカードが消えたときの処理
const finish = function () {
    if (clearCount === maxNum) {
        alert('終了！');
        //時間を一致させる
        setTimeout(function () {
            //初期化する
            panel.innerHTML = '';
            playerCount[0] = playerCount[1] = 0;
            next = 1;
            //再び最初から始める
            main();
        }, 600);
    }
}

// 各関数を宣言する
const main = function () {
    console.log('bbbbb');
    createCount();
    createRandom();
    playerset();
    createCard();
};

// 処理スタート
main();