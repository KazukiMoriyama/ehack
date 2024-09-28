"use strict";
/*1. ヘッダーのアニメーション
========================================*/
// ヘッダーに背景色を追加し、ロゴと文字色を変更する関数
function showBG() {
    $(".header").addClass("show-bg");
    $(".header__nav-item a").addClass("text-dark");
    $("#js-logo img").attr("src", "./images/common/logo-black.svg");
}

// ヘッダーから背景色を削除し、ロゴと文字色を元に戻す関数
function hideBG() {
    $(".header").removeClass("show-bg");
    $(".header__nav-item a").removeClass("text-dark");
    $("#js-logo img").attr("src", "./images/common/logo-white.svg");
}

// ドロップダウンメニューを表示する関数
function showSubNav(element) {
    element.find(".dropdown").addClass("show");
    element.addClass("show-subnav");
}

// ドロップダウンメニューを非表示にする関数
function hideSubNav(element) {
    element.find(".dropdown").removeClass("show");
    element.removeClass("show-subnav");
}

$(function() {
    const serviceItem = $(".header__nav-item.has-dropdown");

    // ホバー時の背景色変更とドロップダウンの表示
    serviceItem.hover(function() {
        showSubNav($(this));
        showBG();
    }, function() {
        hideSubNav($(this));
        hideBG();
    });

    // ドロップダウンメニューがホバーされたときの処理
    $(".dropdown").hover(function() {
        showSubNav(serviceItem);
        showBG();
    }, function() {
        hideSubNav(serviceItem);
        hideBG();
    });
});

// ファーストビューを超えたらheader背景色が変わる
$(window).on('scroll', function() {
  if($('#js-fv').height() < $(window).scrollTop())
    {
      $('.header').addClass('change-color');
    }
    else
    {
      $('.header').removeClass('change-color');
    }
});


/*ハンバーガーメニュー
========================================*/

$(function() {
    // ハンバーガーメニューをクリックしたときの処理
    $('#js-hamburger').on('click', function () {
        // メニューが開いている場合は閉じる
        if ($(this).hasClass('is-openSP')) {
            $('#js-drawer-menu, #js-hamburger').removeClass('is-openSP');
            $(this).removeClass('active');  // activeクラスを削除
            $('body').removeClass('js-fixed');
        } else {
            // メニューが閉じている場合は開く
            $('#js-drawer-menu, #js-hamburger').addClass('is-openSP');
            $(this).addClass('active');  // activeクラスを追加
            $('body').addClass('js-fixed');
        }
    });

    // ハンバーガーメニュー内のリンクをクリックしたらメニューを閉じる
    $('#js-drawer-menu a[href]').on('click', function() {
        $('#js-hamburger').trigger('click');
    });
});


/*3. タイプライターアニメーション
========================================*/
"use strict";

// ページが読み込まれた際にスクロール位置をトップに固定
$(window).on('load', function() {
    $(window).scrollTop(0);
});


/*タイプライターアニメーション
========================================*/
$(function() {
  console.log('タイプライターアニメーションの処理を開始');

  const textDOM = document.getElementById('loading__typewriter-text'); // ローディングテキスト
  const loadingDOM = document.querySelector('.loading'); // ローディング全体
  const fvTextDOM = document.getElementById('fv-typewriter-text'); // ファーストビューのテキスト
  const delay = 150; // タイプライターの速度
  let index = 0;
  let intervalId;

  if (!textDOM) {
      console.error('ローディングテキストが見つかりません');
      return;
  }

  const text = textDOM.innerHTML;
  textDOM.innerHTML = ''; // 初期状態でテキストを空にする

  // タイプライター風に一文字ずつ表示する関数
  function typeText() {
      if (index < text.length) {
          textDOM.innerHTML += text[index]; // 一文字ずつ追加
          index++;
      } else {
          clearInterval(intervalId);
          // タイピング終了後に黒文字から白文字に変える処理を開始
          setTimeout(() => {
              textDOM.classList.add('white-text'); // 白文字に変わるクラスを追加
              setTimeout(() => {
                  loadingDOM.classList.add('fade-out'); // ローディング画面をフェードアウト
                  setTimeout(() => {
                      // ローディング画面が消えた後、ファーストビューとともにヘッダーとスクロールボタンを表示
                      fvTextDOM.innerHTML = textDOM.innerHTML; // ファーストビューのテキストにコピー
                      fvTextDOM.classList.add('show-text');
                      $(".header").addClass("slide-down");
                      $(".scroll-button").addClass("slide-up");
                  }, 500); // 遅延処理でスクロールボタンとヘッダーを表示
              }, 2000); // 白文字に変わってからローディング画面がフェードアウトする
          }, 1000); // 1秒後に白文字に変わる
      }
  }

  intervalId = setInterval(typeText, delay); // タイピングアニメーションを開始
});


/*contactホバーアニメーション（active付いたら背景・テキスト色が変わる）
========================================*/
const hoverBtn = document.getElementById('js-btn-hover');
const contactWrap = document.querySelector('.contact__wrap');

hoverBtn.addEventListener('mouseenter', () => {
  contactWrap.classList.add('active');
});

hoverBtn.addEventListener('mouseleave', () => {
  contactWrap.classList.remove('active');
});


/*footerドロップダウンアニメーション 何回でも繰り返し
========================================*/
$(document).ready(function() {
  $('.footer-dropdown').click(function() {
    let container = $(this).find('.footer-dropdown__list');

    // アニメーションの追加・削除
    container.toggleClass('js-footer-dropdown__list');

    // アニメーションが追加されたら一定時間後に削除
    if (container.hasClass('js-footer-dropdown__list')) {
      setTimeout(function() {
        container.removeClass('js-footer-dropdown__list');
      }, 500);
    }
  });
});
