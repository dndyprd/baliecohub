(function ($) {
  const $window = $(window);
  const $navbar = $("#navbar");
  const scrollThreshold = 80;
  const $navLinks = $("#navbar ul li > a");

  // CHECK SECTION
  const sections = $navLinks
    .map(function () {
      const sel = $(this).attr("href");
      if (!sel || !sel.startsWith("#")) return null;
      try {
        const el = $(sel);
        return el.length ? el.get(0) : null;
      } catch (e) {
        return null;
      }
    })
    .get()
    .filter(Boolean);

  // NAVBAR SCROLL ACTIVE
  function updateNavbarActive() {
    if (!$navbar.length) return;
    if ($window.scrollTop() > scrollThreshold)
      $navbar.addClass("active");
    else $navbar.removeClass("active");
  }

  // NAVLINK ACTIVE
  function updateActiveLink() {
    if (!sections.length) return;
    const offset = 120;
    const scrollPos = $window.scrollTop() + offset;

    // CEK NAVLINK KONTAK
    const isAtBottom = $window.scrollTop() + $window.height() >= $(document).height() - 4;
    if (isAtBottom && $("#kontak").length) {
      $navLinks.removeClass("active").filter("[href='#kontak']").addClass("active");
      return;
    }

    let currentId = sections[0].id;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollPos)
        currentId = sections[i].id;
    }

    $navLinks.each(function () {
      const $a = $(this);
      const href = $a.attr("href");

      if (href === `#${currentId}`) {
        $a.addClass("active");
      } else {
        $a.removeClass("active");
      }
    });
  }

  // TRIGGER ON SCROLL
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateNavbarActive();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  // DROPDOWN
  function initDropdown() {
    const $items = $(".has-dropdown");
    let closeTimer = null;

    function openDropdown($li) {
      clearTimeout(closeTimer);
      $items.not($li).removeClass("open");
      $li.addClass("open");
    }

    function closeDropdown($li) {
      closeTimer = setTimeout(function () {
        $li.removeClass("open");
      }, 150);
    }

    // Desktop Toggle
    $items.on("mouseenter", function () {
      if ($window.width() <= 768) return;
      openDropdown($(this));
    });

    $items.on("mouseleave", function () {
      if ($window.width() <= 768) return;
      closeDropdown($(this));
    });

    $items.find(".dropdown-menu").on("mouseenter", function () {
      clearTimeout(closeTimer);
    });

    // Mobile Toggle
    $(".has-dropdown > a").on("click", function (e) {
      if ($window.width() > 768) return;
      e.preventDefault();
      const $li = $(this).closest(".has-dropdown");
      $li.toggleClass("open");
    });

    $(document).on("click", function (e) {
      if (!$(e.target).closest(".has-dropdown").length) {
        $items.removeClass("open");
      }
    });
  }


  // DARKMODE TOGGLE
  function initDarkMode() {
    const $btns = $(".darkmode-btn");
    const STORAGE_KEY = "baliecohub_dark";

    function applyDark(isDark) {
      const iconHtml = isDark
        ? '<i class="fa-solid fa-cloud-sun"></i>'
        : '<i class="fa-solid fa-cloud-moon"></i>';
      if (isDark) {
        $("body").addClass("dark");
      } else {
        $("body").removeClass("dark");
      }
      $btns.html(iconHtml);
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    applyDark(saved === "1");

    $btns.on("click", function () {
      const willBeDark = !$("body").hasClass("dark");
      localStorage.setItem(STORAGE_KEY, willBeDark ? "1" : "0");
      applyDark(willBeDark);
    });
  }

  // MOBILE MENU TOGGLE
  function initMobileMenu() {
    const $toggleBtn = $("#mobile-menu");
    const $icon = $toggleBtn.find("i");

    $toggleBtn.on("click", function () {
      const isOpen = $navbar.toggleClass("open").hasClass("open");
      $icon.toggleClass("fa-bars", !isOpen).toggleClass("fa-xmark", isOpen);
    });

    // Tutup menu ketika klik link
    $navbar.on("click", "ul li > a", function () {
      if ($(window).width() <= 768 && !$(this).closest(".has-dropdown").length) {
        $navbar.removeClass("open");
        $icon.addClass("fa-bars").removeClass("fa-xmark");
      }
    });
  }

  $(function () {
    updateNavbarActive();
    updateActiveLink();
    initDropdown();
    initDarkMode();
    initMobileMenu();

    $window.on("scroll", onScroll);
    $window.on("resize", updateActiveLink);
  });
})(window.jQuery || window.$);
