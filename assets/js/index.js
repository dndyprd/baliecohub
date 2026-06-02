(function ($) {
  if (!$) {
    console.warn("jQuery not found — index.js requires jQuery.");
    return;
  }

  // COUNTER ANIMATION
  function animateCounters() {
    const $counters = $("[data-counter]");
    if (!$counters.length) return;

    const duration = 1.5;
    const fps = 60;
    const frames = Math.round(duration * fps);
    let currentFrame = 0;

    const countersData = $counters
      .map(function () {
        const $el = $(this);
        const target = parseInt($el.attr("data-counter"));
        const originalText = $el.text();

        let format = "number";
        let suffix = "";

        if (originalText.includes("Kg")) {
          format = "decimal1";
          suffix = " Kg";
        } else if (originalText.includes("%")) {
          format = "int";
          suffix = "%";
        } else if (originalText.includes("Pahlawan")) {
          format = "decimal1";
          suffix = "+ Pahlawan";
        }

        return { $el, target, format, suffix };
      })
      .get();

    function formatNumber(value, format) {
      switch (format) {
        case "decimal1":
          return (value / 1000).toFixed(3).replace(/\./g, ",");
        case "int":
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
        counter.$el.text(formatNumber(currentValue, counter.format) + counter.suffix);
      });

      if (currentFrame < frames) requestAnimationFrame(animate);
    }

    animate();
  }

  // TYPED ANIMATION
  function initTyped() {
    const $element = $('.typed-text');
    if (!$element.length) return;

    const words = [
      'BaliEco Hub', 
      'Bank Sampah Digital', 
      'Platform Clean-Tech', 
      'Solusi Ekonomi Sirkular'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    if (!$('#cursor-style').length) {
      $('head').append('<style id="cursor-style">.typed-cursor { opacity: 1; animation: blink 1s infinite; margin-left: 2px; } @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }</style>');
    }
    
    $element.html('<span class="text"></span><span class="typed-cursor">|</span>');
    const $textElement = $element.find('.text');

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        $textElement.text(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        $textElement.text(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    setTimeout(type, 500);
  }

  $(function () {
    animateCounters();
    initTyped();
  });
})(window.jQuery || window.$);