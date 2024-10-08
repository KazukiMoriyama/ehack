"use strict";
/*1. ヘッダーのアニメーション
========================================*/
// ヘッダーに背景色を追加し、ロゴと文字色を変更する関数
function showBG() {
    // headerにchange-colorクラスがついている場合は処理を実行しない
    if ($(".header").hasClass("change-color")) {
        return;
    }

    $(".header").addClass("show-bg");
    $(".header__nav-item a").addClass("text-dark");

    // bodyにtop_bodyクラスがある場合は異なるロゴを設定
    if ($('body').hasClass('top_body')) {
        $("#js-logo img").attr("src", "./images/common/logo-black.svg");
    } else {
        $("#js-logo img").attr("src", "../images/common/logo-black.svg");
    }
}


// ヘッダーから背景色を削除し、ロゴと文字色を元に戻す関数
function hideBG() {
    $(".header").removeClass("show-bg");
    $(".header__nav-item a").removeClass("text-dark");

    // bodyにtop_bodyクラスがない場合
    if (!$('body').hasClass('top_body')) {
        $("#js-logo img").attr("src", "../images/common/logo-white.svg");
    } else {
        $("#js-logo img").attr("src", "./images/common/logo-white.svg");
    }
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
    // ローディングテキスト
    const textDOM = document.getElementById('loading__typewriter-text'); 
    // ローディング全体
    const loadingDOM = document.querySelector('.loading'); 
    // ファーストビューのテキスト
    const fvTextDOM = document.getElementById('fv-typewriter-text'); 


     // どれか1つでも見つからなければ処理を終了
     if (!textDOM || !loadingDOM || !fvTextDOM) {
        return; // 処理を中止
    }


    // タイプライターの速度
    const delay = 150;
    let index = 0;
    let intervalId;

    // 必要な要素がすべて存在するか確認
    if (!textDOM || !loadingDOM || !fvTextDOM) {
        console.warn('必要な要素が見つかりません。');
        return; // 要素がなければ処理を終了
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
// const hoverBtn = document.getElementById('js-btn-hover');
// const contactWrap = document.querySelector('.contact__wrap');

// // hoverBtnが存在する場合のみ、イベントリスナーを追加する
// if (hoverBtn) {
//     hoverBtn.addEventListener('mouseenter', () => {
//         contactWrap.classList.add('active');
//     });

//     hoverBtn.addEventListener('mouseleave', () => {
//         contactWrap.classList.remove('active');
//     });
// }

/*contactホバーアニメーション（768px以上のときactive付いたら背景・テキスト色が変わる）
========================================*/
const hoverBtn = document.getElementById('js-btn-hover');
const contactWrap = document.querySelector('.contact__wrap');

// hoverBtnが存在する場合のみ、かつウィンドウ幅が767px以上のときにイベントリスナーを追加する
if (hoverBtn && window.innerWidth >= 767) {
    hoverBtn.addEventListener('mouseenter', () => {
        contactWrap.classList.add('active');
    });

    hoverBtn.addEventListener('mouseleave', () => {
        contactWrap.classList.remove('active');
    });
}

// ウィンドウのリサイズイベントを監視して、767px以上かどうかをチェック
window.addEventListener('resize', () => {
    if (hoverBtn && window.innerWidth >= 767) {
        // イベントリスナーを追加
        hoverBtn.addEventListener('mouseenter', () => {
            contactWrap.classList.add('active');
        });

        hoverBtn.addEventListener('mouseleave', () => {
            contactWrap.classList.remove('active');
        });
    } else {
        // イベントリスナーを削除
        hoverBtn.removeEventListener('mouseenter', () => {
            contactWrap.classList.add('active');
        });

        hoverBtn.removeEventListener('mouseleave', () => {
            contactWrap.classList.remove('active');
        });
    }
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
    const layoutServices = document.querySelectorAll('.bg_change-w'); // .bg_change-wクラスを持つ全ての要素を取得

    layoutServices.forEach(layoutService => {
        const rect = layoutService.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 要素が200px以上画面内に入ったらクラスを追加し、残り200pxでクラスを削除
        if (rect.top < windowHeight - 300 && rect.bottom > 300) {
            layoutService.classList.add('bg-w'); // クラスを追加
        } else {
            layoutService.classList.remove('bg-w'); // クラスを削除
        }
    });
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

/*TOP about タイプライターテキストアニメーション（4つ順番に発火）
========================================*/
// $(function () {
//     $(document).ready(function () {
//         $('.typewriter').css('visibility', 'hidden');

//         // 各要素の高さを計測して固定
//         $('.typewriter').each(function () {
//             var originalHeight = $(this).outerHeight();
//             $(this).css('min-height', originalHeight + 'px'); // 高さを固定
//         });

//         $(window).scroll(function () {
//             var windowHeight = $(window).height(),
//                 topWindow = $(window).scrollTop();

//             $('.typewriter').each(function (index) {
//                 var objectPosition = $(this).offset().top;

//                 if (topWindow > objectPosition - windowHeight + 150) {
//                     if ($(this).prev('.typewriter').length === 0 || $(this).prev('.typewriter').hasClass('completed')) {
//                         showTextSequentially(index);
//                     }
//                 }
//             });
//         });

//         function showTextSequentially(index) {
//             var el = $('.typewriter').eq(index);
//             if (el.length === 0 || el.css('visibility') !== 'hidden') return;

//             el.css('visibility', 'visible');
//             var htmlContent = el.html().trim();  // HTMLコンテンツを取得
//             el.html(''); // コンテンツをクリアしてタイプライターエフェクトを開始

//             typewriter({
//                 el: el[0],
//                 speed: 20, // スピードを上げる
//                 string: htmlContent,
//                 callback: function () {
//                     el.addClass('completed'); // エフェクトが完了したらクラスを付与

//                     // 隣接する次の要素があり、かつその要素が現在の要素と同じ位置にある場合、次の要素を即座に発火
//                     var nextEl = el.next('.typewriter');
//                     if (nextEl.length && nextEl.offset().top === el.offset().top + el.outerHeight()) {
//                         // すぐに次を実行
//                         showTextSequentially(index + 1);
//                     } else {
//                         // 次の要素がスクロールで表示されるのを待つ
//                         $(window).scroll();
//                     }
//                 }
//             });
//         }

//         const typewriter = (param) => {
//             let el = param.el;
//             let speed = param.speed;
//             let string = param.string;
//             let callback = param.callback;

//             let cursorPos = 0;
//             const regex = /<br\s*\/?>|&[^;]+;/gi;

//             function typeNext() {
//                 if (cursorPos < string.length) {
//                     let match = regex.exec(string);
//                     if (match && match.index === cursorPos) {
//                         el.innerHTML += match[0];
//                         cursorPos += match[0].length;
//                     } else {
//                         el.textContent += string[cursorPos];
//                         cursorPos++;
//                     }
//                     setTimeout(typeNext, speed);
//                 } else if (typeof callback === 'function') {
//                     callback();
//                 }
//             }

//             typeNext();
//         };
//     });
// });


/*TOP about タイプライターテキストアニメーション（4つ同時に発火）
========================================*/
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
                    // すべての.typewriter要素に対して一斉にアニメーションを開始
                    if ($(this).css('visibility') === 'hidden') {
                        showText($(this));
                    }
                }
            });
        });

        function showText(el) {
            el.css('visibility', 'visible');
            var htmlContent = el.html().trim();  // HTMLコンテンツを取得
            el.html(''); // コンテンツをクリアしてタイプライターエフェクトを開始

            typewriter({
                el: el[0],
                speed: 20, // スピードを上げる
                string: htmlContent,
                callback: function () {
                    el.addClass('completed'); // エフェクトが完了したらクラスを付与
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




/* 下からふわっと出てくるようにするアニメーション
========================================*/
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



/* E-Cycleページ results 制作実績 スライドショー
========================================*/

// スライドショーの要素が存在するか確認
document.addEventListener('DOMContentLoaded', function () {
    var splideElement = document.querySelector('#js-result__slider');

    // スライドショーの要素が存在する場合のみSplideを初期化
    if (splideElement) {
      const options1 = {
        type: 'loop',
        //autoplay: true,
        perMove: 1, //一枚ずつ動く
        perPage: 1, //一枚ずつ表示
        pagination: false, //ページネーション非表示
        gap: '13.125rem', //スライド間のスペース
        breakpoints: {
          768: {
            gap: '1.5rem', //スライド間のスペース
          }
        }
      };

      const splide1 = new Splide(splideElement, options1);
      splide1.mount();
    }
  });



