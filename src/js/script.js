const landingFunctions = {
  init: function () {
    this.initLibraris();
    this.menu();
    this.spincrement();
    this.progress();
    this.modal();
    // this.copy();
  },

  initLibraris: function () {
    // AOS.init({
    //   disable: function () {
    //     if ($(window).width() <= 1080) {
    //       return true;
    //     }
    //     return false;
    //   },
    //   once: true,
    //   duration: 1000,
    //   offset: 0,
    // });
    // $(window).resize(function () {
    //   AOS.refresh();
    // });
    // $("[data-fancybox]").fancybox({
    //   loop: true,
    //   infobar: false,
    //   animationEffect: false,
    //   backFocus: false,
    //   hash: false,
    // });
  },

  progress: function () {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const MAX = 100;

    $(".max").text(MAX);

    function updateProgress() {
      const storageCurrent = localStorage.getItem("progress");
      let current = 0;

      if (storageCurrent) {
        current = +storageCurrent;
      } else {
        current = 20;
      }

      if (current < MAX - 10) {
        current = current + getRandomInt(3);
        const remainder = MAX - current;
        const progressPercent = (current / MAX) * 100;
        $(".current").text(current);
        $(".remainder").text(remainder);
        $(".bar").css("width", progressPercent + "%");
        localStorage.setItem("progress", current);
      } else {
        localStorage.setItem("progress", 20);
      }
    }

    updateProgress();

    setInterval(updateProgress, 50000);
  },

  menu: function () {
    $("#menu-open").click(function () {
      $(this).toggleClass("active");
      $("#menu").toggleClass("active");
    });
  },

  spincrement: function () {
    var show = true;
    var countbox = ".info__section";
    $(window).on("scroll load resize", function () {
      if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
      var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
      var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
      var w_height = $(window).height(); // Высота окна браузера
      var d_height = $(document).height(); // Высота всего документа
      var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
      if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
        // $(".info__block-item-text").css("opacity", "1");
        $(".info__block-1 .info__block-item-text span, .info__block-2 .info__block-item-text span").spincrement({
          thousandSeparator: "",
          duration: 3000,
        });

        show = false;
      }
    });
  },

  copy: function () {
    const $element = $(".info__bottom");
    const $originalParent = $(".info__right");
    const $targetParent = $(".info__content");
    const breakpoint = 1080;

    function moveElement() {
      const windowWidth = $(window).width();

      if (windowWidth < breakpoint) {
        $element.detach().appendTo($targetParent);
      } else {
        $element.detach().appendTo($originalParent);
      }
    }

    moveElement();

    $(window).on("resize", function () {
      moveElement();
    });
  },

  modal: function () {
    $("[data-modal='open']").click(function () {
      $("#modal").fadeIn(300);
      $("body").css("overflow", "hidden");
      $("#modal").find(".modal__wrapper").addClass("active");
    });

    function close() {
      $("#modal").fadeOut(300);
      $("body").css("overflow", "auto");
      $("#modal").find(".modal__wrapper").removeClass("active");
    }

    $("#modal").click(function (e) {
      var target = e.target;
      if (target.classList.contains("modal__close")) {
        close();
      }
      if ($(target).closest(".modal").length === 0) {
        close();
      }
    });
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
