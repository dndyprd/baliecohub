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

  $(function () {
    animateCounters();
  });
})(window.jQuery || window.$);