var landingFunctions = {
  init: function () {
    this.initLibraris();
    // this.time()
    // this.modal();
  },

  initLibraris: function () {
    $('[href*="#"]').on("click", function (e) {
      var fixedOffset = 0;
      var cardHeight = $(".order").outerHeight(false);
      var windowHeight = $(window).height();

      if ($(window).width() < 1081) {
        $("html, body")
          .stop()
          .animate({ scrollTop: $(this.hash).offset().top + fixedOffset + (cardHeight - windowHeight) }, 1000);
        e.preventDefault();
      } else {
        $("html, body")
          .stop()
          .animate({ scrollTop: $(this.hash).offset().top + fixedOffset }, 1000);
        e.preventDefault();
      }
    });

    $("#menu-open").click(function () {
      $(this).toggleClass("active");
      $("#menu").toggleClass("active");
    });

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
        $(".info__block-item-text").css("opacity", "1");
        $(".info__block-1 .info__block-item-text, .info__block-2 .info__block-item-text").spincrement({
          thousandSeparator: "",
          duration: 3000,
        });

        show = false;
      }
    });

    const $element = $(".info__bottom"); // Что переносим
    const $originalParent = $(".info__right"); // Где он лежит обычно (десктоп)
    const $targetParent = $(".info__content"); // Куда переносим (мобилка/планшет)
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

  time: function () {
    Date.prototype.daysInMonth = function () {
      return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String(typeof padString !== "undefined" ? padString : " ");
        if (this.length > targetLength) {
          return String(this);
        } else {
          targetLength = targetLength - this.length;
          if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
          }
          return padString.slice(0, targetLength) + String(this);
        }
      };
    }

    function timer() {
      function runMultiple(hoursSelector, minutesSelector, secondsSelector, milisecondsSelector) {
        var d = new Date();
        var h = String(23 - d.getHours()).padStart(2, "0");
        var m = String(59 - d.getMinutes()).padStart(2, "0");
        var s = String(60 - d.getSeconds()).padStart(2, "0");
        // var ms = String(1000 - d.getMilliseconds()).padStart(3, "0");
        $(hoursSelector).text(h);
        $(minutesSelector).text(m);
        $(secondsSelector).text(s);
        // $(milisecondsSelector).text(ms)
      }
      setInterval(function () {
        runMultiple(".hours", ".minutes", ".seconds");
      }, 1000);
    }

    timer();

    function getDate(plusDays) {
      var now = new Date();
      now.setDate(now.getDate() + plusDays);
      var dayNum = "";
      if (now.getDate() < 10) {
        dayNum = "0";
      }
      dayNum += now.getDate();
      var monthNum = "";
      if (now.getMonth() + 1 < 10) {
        monthNum = "0";
      }
      monthNum += now.getMonth() + 1;

      // return dayNum + "." + monthNum + "." + now.getFullYear();
      return dayNum + "." + monthNum + "." + String(now.getFullYear()).substr(String(now.getFullYear()).length - 2);
    }

    // $(".date__1").text(getDate(-5));
    $(".date").text(getDate(2));
  },

  modal: function () {
    $(".add__review").click(function () {
      $(".modal__review").addClass("active");
    });

    function close() {
      $(".modal__review").removeClass("active");
    }

    $(".modal__review").click(function (e) {
      var target = e.target;
      if (target.classList.contains("modal__close")) {
        close();
      }
      if (target.classList.contains("modal")) {
        close();
      }
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        console.log(reader);
        reader.onload = function (e) {
          $(".file img").attr("src", e.target.result).css("display", "block");
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    $(".modal__review .input__file").on("change", function () {
      readURL(this);
    });

    $(".modal__review form").submit(function (e) {
      e.preventDefault();
      $(this).removeClass("active");
      $(".send__window").addClass("active");
      $(".modal__review .name__input").val("");
      $(".modal__review .modal__area").val("");
      $(".modal__review .file img").attr("src", "").css("display", "none");
      delayClose();
    });
    function delayClose() {
      setTimeout(function () {
        $(".modal__review form").addClass("active");
        $(".send__window").removeClass("active");
        close();
      }, 5000);
    }
  },
};

$(document).ready(function () {
  landingFunctions.init();
});
