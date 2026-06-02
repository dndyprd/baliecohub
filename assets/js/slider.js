(function ($) {
  function initSwiper() {
    if ($('.testimonial-swiper').length) {
      new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        centeredSlides: false,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          }
        }
      });
    }
  }

  $(function () {
    initSwiper();
  });
  
})(window.jQuery || window.$);
