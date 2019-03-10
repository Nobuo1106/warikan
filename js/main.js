// 厳密なエラーチェック
(function() {
  'use strict';

// 変数price, num, unit, btn, unit, btn, result, resetの宣言とhtmlからのIDの取得
  var price = document.getElementById('price');
  var num = document.getElementById('num');
  var unit = document.getElementById('unit');
  var btn = document.getElementById('btn');
  var result = document.getElementById('result');
  var reset = document.getElementById('reset');

// checkInputという関数を定義
  function checkInput () {
// matchメソッドで文字列を検索。正規表現でprice(値段)とnum(人数)が数字以外の場合。
// 正規表現(^$で初めから終わりまで、[1-9][0-9]*で一桁目の数字と二桁目以降の数字の繰り返しという意味)
// !== null 正規表現でマッチした場合
    if (
      price.value.match(/^[1-9][0-9]*$/) !==null &&
      num.value.match(/^[1-9[0-9]*$/) !== null
    ){
// btnのdisabledクラスを外す
      btn.classList.remove('disabled');
    } else {
// btnのdisabledクラスを付ける
      btn.classList.add('disabled');
    }
  }
// btnをクリックした時にfunction以下の処理をする。
  btn.addEventListener('click', function(){
// 変数payLess, short, payMore, over, strの宣言
  var payLess;
  var short;
  var payMore;
  var over;
  var str;
// もしボタンのクラスにdisabledが含まれていたら
  if (this.classList.contains('disabled') === true) {
// returnの意味がわからない。
    return;
  }
// payLessにprice(値段) / num(人数) / unit(割り勘単位)計算後小数点以下切り捨て数字を代入。
  payLess = Math.floor(price.value / num.value / unit.value) * unit.value;
// shortにprice(値段)-(payLess * num(人数))を代入
  short = price.value - (payLess * num.value);
// payMoreにprice(値段) / num(人数) / unit(割り勘単位)計算後小数点以下を切り上げ。
  payMore = Math.ceil(price.value / num.value /
  unit.value) * unit.value;
// overに
  over = Math.abs(price.value - (payMore * num.value));
// もし余りも不足もなかったら
  if (over === 0 && short === 0) {
// 変数strは一人、値段/人数 円丁度です。
    str = '一人' + (price.value / num.value) + '円ちょうどです!';
// それ以外なら
  } else {
// 変数strは一人変数payLess円だと変数short円足りません。一人変数payMore円だと変数over円余ります。
      str =
        '一人' + payLess + '円だと' + short + '円足りません。' + '一人' + payMore + '円だと' + over + '円余ります。';
  }
// 変数result(htmlId:result)に変数strをテキストとして出力。
  result.textContent = str;
// 変数reset(htmlId: reset)からhiddenクラスを取り除く。
  reset.classList.remove('hidden');
  });
// priceフォームからキーボードから離れた時、チェックインプット関数を呼ぶ。
  price.addEventListener('keyup', checkInput);
// numフォームからキーボードから離れた時、チェックインプット関数を呼ぶ。
  num.addEventListener('keyup', checkInput);
// もう一度計算するボタンをクリックすると、以下の関数を処理する。
  reset.addEventListener('click', function() {
    result.textContent = 'ここに結果を表示します';
    price.value = '';
    num.value = '';
    unit.value = 100;
    btn.classList.add('disabled');
    this.classList.add('hidden');
  });
})();
