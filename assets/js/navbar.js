(function ($) {
  if (!$) {
    console.warn("jQuery not found — navbar.js requires jQuery.");
    return;
  }

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


  $(function () {
    updateNavbarActive();
    updateActiveLink();
    initDropdown();

    $window.on("scroll", onScroll);
    $window.on("resize", updateActiveLink);
  });
})(window.jQuery || window.$);
