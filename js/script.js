"use strict";
/*1. ヘッダーのアニメーション
========================================*/
// ヘッダーに背景色を追加し、ロゴと文字色を変更する関数
function showBG() {
  // headerにchande-colorクラスがついている場合は処理を実行しない
  if ($(".header").hasClass("change-color")) {
    return;
  }
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

$(function () {
  const serviceItem = $(".header__nav-item.has-dropdown");

  // ホバー時の背景色変更とドロップダウンの表示
  serviceItem.hover(function () {
    showSubNav($(this));
    showBG();
  }, function () {
    hideSubNav($(this));
    hideBG();
  });

  // ドロップダウンメニューがホバーされたときの処理
  $(".dropdown").hover(function () {
    showSubNav(serviceItem);
    showBG();
  }, function () {
    hideSubNav(serviceItem);
    hideBG();
  });
});

// ファーストビューを超えたらheader背景色が変わる
$(window).on('scroll', function () {
  if ($('#js-fv').height() < $(window).scrollTop()) {
    $('.header').addClass('change-color');
  }
  else {
    $('.header').removeClass('change-color');
  }
});


/*ハンバーガーメニュー
========================================*/

$(function () {
  var scrollPos;

  // ハンバーガーメニューをクリックしたときの処理
  $('#js-hamburger').on('click', function () {
    // メニューが開いている場合は閉じる
    if ($(this).hasClass('is-openSP')) {
      $('#js-drawer-menu, #js-hamburger').removeClass('is-openSP');
      $(this).removeClass('active');  // activeクラスを削除
      $('body').removeClass('js-fixed');

      // スクロール位置を元に戻す
      window.scrollTo(0, scrollPos);
    } else {
      // メニューが閉じている場合は開く
      scrollPos = $(window).scrollTop();  // 現在のスクロール位置を保存
      $('#js-drawer-menu, #js-hamburger').addClass('is-openSP');
      $(this).addClass('active');  // activeクラスを追加
      $('body').addClass('js-fixed');
    }
  });

  // ハンバーガーメニュー内のリンクをクリックしたらメニューを閉じる
  $('#js-drawer-menu a[href]').on('click', function () {
    $('#js-hamburger').trigger('click');
  });
});



/*3. タイプライターアニメーション
========================================*/
"use strict";

// ページが読み込まれた際にスクロール位置をトップに固定
$(window).on('load', function () {
  $(window).scrollTop(0);
});


/*タイプライターアニメーション
========================================*/
$(function () {
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

  // ページ全体のスクロールを無効化
  $('html, body').css({
    'height': '100%',
    'overflow-y': 'scroll'
  });

  // タイプライター風に一文字ずつ表示する関数
  function typeText() {
    if (index < text.length) {
      // 現在の位置から <br> タグを探す
      const nextBreakIndex = text.indexOf('<br', index);
      
      if (nextBreakIndex === index) {
        // <br> タグの終了位置を探す
        const endOfTag = text.indexOf('>', index) + 1;
        // タグ全体を追加
        textDOM.innerHTML += text.substring(index, endOfTag);
        index = endOfTag; // タグの後ろから再開
      } else {
        // 一文字ずつ追加
        textDOM.innerHTML += text[index];
        index++;
      }
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

            // ページのスクロールを再び有効化
            $('html, body').css({
              'height': '',
              'overflow': ''
            });

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
$(document).ready(function () {
  $('.footer-dropdown').click(function () {
    let container = $(this).find('.footer-dropdown__list');

    // アニメーションの追加・削除
    container.toggleClass('js-footer-dropdown__list');

    // アニメーションが追加されたら一定時間後に削除
    if (container.hasClass('js-footer-dropdown__list')) {
      setTimeout(function () {
        container.removeClass('js-footer-dropdown__list');
      }, 500);
    }
  });
});


document.addEventListener('scroll', function () {
  const layoutService = document.querySelector('.bg_change-w');
  const body = document.body;

  if (layoutService) {
    const rect = layoutService.getBoundingClientRect();
    const scrollPosition = window.scrollY || window.pageYOffset;
    const elementTop = rect.top + scrollPosition;
    const elementBottom = elementTop + rect.height;
    const windowHeight = window.innerHeight;

    // bg-wクラスを追加する条件
    if (scrollPosition > elementTop - 300 && scrollPosition < elementBottom - 300) {
      body.classList.add('bg-w');
    } else {
      body.classList.remove('bg-w');
    }
  }
});


function typeWriter(element, text, delay = 100) {
  let i = 0;
  element.style.width = text.length + "ch"; // テキストの長さに基づいて幅を設定
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    }
  }
  typing();
}

$(function () {
  $(document).ready(function () {
    $('.typewriter').css('visibility', 'hidden');

    // 各要素の高さを計測して固定
    $('.typewriter').each(function () {
      var originalHeight = $(this).outerHeight();
      $(this).css('min-height', originalHeight + 'px'); // 高さを固定
    });

    $(window).scroll(function () {
      var windowHeight = $(window).height(),
        topWindow = $(window).scrollTop();

      $('.typewriter').each(function (index) {
        var objectPosition = $(this).offset().top;

        if (topWindow > objectPosition - windowHeight + 150) {
          if ($(this).prev('.typewriter').length === 0 || $(this).prev('.typewriter').hasClass('completed')) {
            showTextSequentially(index);
          }
        }
      });
    });

    function showTextSequentially(index) {
      var el = $('.typewriter').eq(index);
      if (el.length === 0 || el.css('visibility') !== 'hidden') return;

      el.css('visibility', 'visible');
      var htmlContent = el.html().trim();  // HTMLコンテンツを取得
      el.html(''); // コンテンツをクリアしてタイプライターエフェクトを開始

      typewriter({
        el: el[0],
        speed: 20, // スピードを上げる
        string: htmlContent,
        callback: function () {
          el.addClass('completed'); // エフェクトが完了したらクラスを付与

          // 隣接する次の要素があり、かつその要素が現在の要素と同じ位置にある場合、次の要素を即座に発火
          var nextEl = el.next('.typewriter');
          if (nextEl.length && nextEl.offset().top === el.offset().top + el.outerHeight()) {
            // すぐに次を実行
            showTextSequentially(index + 1);
          } else {
            // 次の要素がスクロールで表示されるのを待つ
            $(window).scroll();
          }
        }
      });
    }

    const typewriter = (param) => {
      let el = param.el;
      let speed = param.speed;
      let string = param.string;
      let callback = param.callback;

      let cursorPos = 0;
      const regex = /<br\s*\/?>|&[^;]+;/gi;

      function typeNext() {
        if (cursorPos < string.length) {
          let match = regex.exec(string);
          if (match && match.index === cursorPos) {
            el.innerHTML += match[0];
            cursorPos += match[0].length;
          } else {
            el.textContent += string[cursorPos];
            cursorPos++;
          }
          setTimeout(typeNext, speed);
        } else if (typeof callback === 'function') {
          callback();
        }
      }

      typeNext();
    };
  });
});

$(document).ready(function () {
  $('.text-fadein').each(function () {
    // Wrap the content with the desired span elements
    $(this).html('<span class="fadein_overflow"><span class="fadein-action">' + $(this).html() + '</span></span>');
  });

  // Add event listeners and check positions
  const fadeInElements = document.querySelectorAll('.fadein-action');

  function checkPosition() {
    fadeInElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // 50px以上画面内に入ったときにクラスを追加
      if (elementPosition < windowHeight - 50) {
        element.classList.add('open');
      }
    });
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', checkPosition);

  // 初回ロード時にもチェック
  checkPosition();
});

