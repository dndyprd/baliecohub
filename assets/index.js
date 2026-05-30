(function ($) {
  if (!$) {
    console.warn("jQuery not found — scroll-spy requires jQuery.");
    return;
  }

  const $window = $(window);
  const $navbar = $("#navbar");
  const scrollThreshold = 80;
  const $navLinks = $("#navbar ul li a");

  // SECTION CHECK
  const sections = $navLinks
    .map(function () {
      const sel = $(this).attr("href");
      try {
        const el = $(sel);
        return el.length ? el.get(0) : null;
      } catch (e) {
        return null;
      }
    })
    .get()
    .filter(Boolean);

  // NAVBAR ACTIVE
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
      if (href === `#${currentId}`) $a.addClass("active");
      else $a.removeClass("active");
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

  // COUNTER ANIMATION
  function animateCounters() {
    const $counters = $('[data-counter]');
    if (!$counters.length) return;

    const duration = 1.5;
    const fps = 60;
    const frames = Math.round(duration * fps);
    let currentFrame = 0;

    const countersData = $counters.map(function () {
      const $el = $(this);
      const target = parseInt($el.attr('data-counter'));
      const originalText = $el.text();
      
      let format = 'number';
      let suffix = '';
      let prefix = '';
      
      // CHECK TEXT
      if (originalText.includes('Kg')) {
        format = 'decimal1';
        suffix = ' Kg';
      } else if (originalText.includes('%')) {
        format = 'int';
        suffix = '%';
      } else if (originalText.includes('Pahlawan')) {
        format = 'decimal1';
        suffix = '+ Pahlawan';
        prefix = '';
      }
      
      return {
        $el: $el,
        target: target,
        format: format,
        suffix: suffix,
        originalText: originalText
      };
    }).get();

    function formatNumber(value, format) {
      switch (format) {
        case 'decimal1':
          return (value / 1000).toFixed(3).replace(/\./g, ',');
        case 'int':
          return Math.round(value).toString();
        default:
          return Math.round(value).toString();
      }
    }

    function animate() {
      currentFrame++;
      const progress = Math.min(currentFrame / frames, 1);

      countersData.forEach((counter) => {
        const currentValue = counter.target * progress;
        const formatted = formatNumber(currentValue, counter.format);
        
        if (counter.format === 'decimal1' && counter.suffix.includes('Pahlawan')) {
          counter.$el.text(formatted + counter.suffix);
        } else {
          counter.$el.text(formatted + counter.suffix);
        }
      });

      if (currentFrame < frames) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  }

  $(function () {
    updateNavbarActive();
    updateActiveLink();
    animateCounters();

    $window.on("scroll", onScroll);
    $window.on("resize", updateActiveLink);
  });
})(window.jQuery || window.$);
