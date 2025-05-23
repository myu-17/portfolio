/* ====================
  wave-lineの表示に関する処理
==================== */
const observeSVG = () => {
  const paths = document.querySelectorAll(".line");
  for (const path of paths) {
    const length = path.getTotalLength();
    path.style.setProperty("--path-length", length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            path.style.animation = "wave-line 2s linear 1 forwards";
            observer.unobserve(path);
          }
        });
      },
      { threshold: 0.8 }
    );
    observer.observe(path);
  }
};

window.onload = function () {
  var nav = document.getElementById("nav-wrapper");
  var hamburger = document.getElementById("js-hamburger");
  var blackBg = document.getElementById("js-black-bg");
  var topWorks = document.querySelector(".top-works");
  var navLinks = document.querySelectorAll(".hmg-menu a");

  // ハンバーガークリック
  hamburger.addEventListener("click", function () {
    nav.classList.toggle("open");
  });

  // 黒背景クリック
  blackBg.addEventListener("click", function () {
    nav.classList.remove("open");
  });

  // ページのどこをクリックしても閉じる
  $(document).click(function (e) {
    var target = e.target;
    if ($(target).attr("id") !== "js-hamburger") {
      $(".hmg-menu").removeClass("open");
      $("#nav-wrapper").removeClass("open");
      $("#js-hamburger").removeClass("active");
    }
  });
  $("#js-hamburger").click(function () {});

  // スクロールでナビ表示
  window.addEventListener("scroll", function () {
    var topWorksTop = topWorks.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (topWorksTop < windowHeight) {
      nav.classList.add("is-show");
    } else {
      nav.classList.remove("is-show");
    }
  });

  // ナビ内リンククリック
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");

      if (href.startsWith("#") && href.length > 1) {
        // ページ内リンク
        e.preventDefault();

        var target = document.querySelector(href);
        if (target) {
          var rect = target.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: rect,
            behavior: "smooth",
          });

          setTimeout(function () {
            nav.classList.remove("open");
          }, 800); // スクロール時間に合わせる
        }
      } else {
        // 通常リンク
        nav.classList.remove("open");
      }
    });
  });

  observeSVG();
};

// scroll down
document.addEventListener("DOMContentLoaded", () => {
  const text = "scroll down ";
  const repeatedText = text.repeat(2);
  const circleText = document.querySelector(".circle-text-01");
  const totalChars = repeatedText.length;
  const anglePerChar = 360 / totalChars;

  for (let i = 0; i < totalChars; i++) {
    const span = document.createElement("span");
    span.textContent = repeatedText[i];
    span.style.transform = `rotate(${i * anglePerChar}deg)`;
    circleText.appendChild(span);
  }
});

// トグルボタンでメニュー開閉
$(".toggle_btn").on("click", function () {
  if ($nav.hasClass(open)) {
    $wrapper.fadeOut(500, function () {
      $nav.removeClass(open);
      // 既存のswiperインスタンスを破棄し再初期化
      swiper1.destroy(true, true);
      swiper2.destroy(true, true);
      initSwiper(); // 再初期化
    });
  } else {
    $nav.addClass(open);
    $wrapper.fadeIn(500, function () {});
  }
});

// マスククリックで閉じる
// $mask.on('click', function () {
//   $wrapper.fadeOut(500, function () {
//     $nav.removeClass(open);
//     swiper1.destroy(true, true);
//     swiper2.destroy(true, true);
//     initSwiper();
//   });
// });

/* ====================
   h2文字アニメーション
==================== */
// 指定したセレクタの子要素を1文字づつspanタグで囲む

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".anime-up");
  // .anime-up クラスがついてる要素を全て取得。

  targets.forEach((target) => {
    const text = target.textContent.trim();
    target.textContent = "";
    // 要素の中身（テキスト）を取得して、空にする。

    for (let i = 0; i < text.length; i++) {
      const char = text[i] === " " ? "\u00A0" : text[i];
      // スペース（半角空白）は &nbsp;（\u00A0）に変換。空白が消えないようにする。

      const outerSpan = document.createElement("span");
      const innerSpan = document.createElement("span");
      innerSpan.textContent = char;
      innerSpan.style.animationDelay = `${i * 0.07}s`;
      outerSpan.appendChild(innerSpan);
      target.appendChild(outerSpan);
      // 1文字ずつ、内側の <span> に文字とアニメーション遅延を設定。
      // それを外側の </span> に包んで、ターゲット要素に追加。
    }
  });

  // アニメーションの指定
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("displayed");
        obs.unobserve(entry.target);
      }
    });
  });

  targets.forEach((target) => observer.observe(target));
});

window.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll(".pararaxImg");
  new simpleParallax(images);
});

/* ====================
  imgアニメーション
==================== */
$(window).scroll(function () {
  $(".anime-wrap").each(function () {
    var offset = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var wHeight = $(window).height();

    if (scroll > offset - wHeight + wHeight / 10) {
      $(this).addClass("show");
    }
  });
});

/* ====================
  works切り替え
==================== */
document.addEventListener("DOMContentLoaded", () => {
  const topWorks = document.getElementById("works");
  const selectedSection = document.getElementById("top-works-selected");
  const allSection = document.querySelector(".top-works-all");

  const viewAllBtn = selectedSection.querySelector(".all-btn a");
  const viewSelectedBtn = allSection.querySelector(".all-btn a");

  // 初期表示では selectedSection を表示、allSection を非表示にする（スクロールなし）
  selectedSection.style.display = "block";
  allSection.style.display = "none";

  function showSelected(scroll = true) {
    selectedSection.style.display = "block";
    allSection.style.display = "none";
    if (scroll) {
      window.scrollTo({ top: selectedSection.offsetTop, behavior: "instant" });
    }
  }

  function showAll(scroll = true) {
    allSection.style.display = "block";
    selectedSection.style.display = "none";
    if (scroll) {
      window.scrollTo({ top: allSection.offsetTop, behavior: "instant" });
    }
  }

  function fade() {
    topWorks.style.transition = "none";
    topWorks.style.opacity = 0;
    setTimeout(() => {
      topWorks.style.transition = "opacity 0.8s";
      topWorks.style.opacity = 1;
    }, 100);
  }

  viewAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fade();
    showAll(true);
  });

  viewSelectedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fade();
    showSelected(true);
  });
});

/* ====================
parallax
==================== */

document.addEventListener("DOMContentLoaded", function () {
  const elem = document.querySelector(".js-parallax");
  if (elem !== null) {
    let target = document.getElementsByClassName("js-parallax");
    let parallaxConfig = {
      delay: 0, // スクロール止めてから動く秒数
      orientation: "up", // 動く方向
      scale: 1.2, // 動く大きさ
    };
    const parallax_instance = new simpleParallax(target, parallaxConfig);
  }
});

/* ====================
GSAP
==================== */

// fv-text全体の指定
// gsap.to(".fv-text", {
//   opacity: 1,
//   delay: 0.5,
//   stagger: 1,
//   ease: "power2.out",
// });

const paragraphs = document.querySelectorAll(".fv-text01, .fv-text04");

paragraphs.forEach((paragraph) => {
  const textContent = paragraph.textContent;
  const newTextContent = [...textContent]
    .map((char) => `<span>${char}</span>`)
    .join("");
  paragraph.innerHTML = newTextContent;
});

const jsLoaderBg = ".js-loader-bg";
const jsNav = ".js-nav";
const jsScrollDown = ".js-scroll-down";

const tl = gsap.timeline();
// timelineを作成

tl.to(jsLoaderBg, {
  y: "100%",
  delay: 0.8,
})
  .fromTo(
    ".fv-text01 span",
    /* 前のアニメーションが完了する0.5秒後に実行 */
    {
      autoAlpha: 0,
      y: 30,
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.04,
    },
    "+=0.4"
  )
  .fromTo(
    ".fv-text04 span",
    /* 前のアニメーションが完了する0.1秒前に実行 */
    {
      autoAlpha: 0,
      y: 30,
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.04,
    },
    "-=0.1"
  )
  .to(
    /* リード文 */
    jsNav,
    {
      /* 前のアニメーションが完了する0.1秒後に実行 */
      opacity: 1,
      y: 0,
    },
    "+=0.1"
  )
  .to(
    /* ヘッダー */
    /* 前のアニメーションと同時 */
    jsScrollDown,
    {
      opacity: 1,
      y: 0,
    },
    "<"
  );
