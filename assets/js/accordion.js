(function ($) {
    if (!$) {
        console.warn("jQuery not found — accordion.js requires jQuery.");
        return;
    }

    // BANGUN STRUKTUR DOM
    function buildAccordionStructure() {
        $(".faq-item").each(function () {
            const $item = $(this);
            const $header = $item.find("h5");
            const $paragraph = $item.find("p");

            if (!$header.length || !$paragraph.length) return;

            if (!$header.find(".faq-icon").length) {
                $header.append('<span class="faq-icon"><i class="fa-solid fa-chevron-down"></i></span>');
            }

            if (!$item.find(".faq-body").length) {
                $paragraph.wrap('<div class="faq-body-inner"></div>').parent().wrap('<div class="faq-body"></div>');
            }
        });
    }

    // TUTUP SEMUA ACCORDION
    function closeAll() {
        $(".faq-item").removeClass("open").find(".faq-body").removeClass("open");
    }

    // TOGGLE ACCORDION
    function toggleItem($item) {
        const isOpen = $item.hasClass("open");
        closeAll();
        if (!isOpen) {
            $item.addClass("open").find(".faq-body").addClass("open");
        }
    }

    // PASANG EVENT
    function bindEvents() {
        $(document).on("click", ".faq-item h5", function () {
            toggleItem($(this).closest(".faq-item"));
        });

        $(document).on("keydown", ".faq-item h5", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleItem($(this).closest(".faq-item"));
            }
        });

        $(".faq-item h5").attr("tabindex", "0");
    }

    $(function () {
        buildAccordionStructure();
        bindEvents();
    });
})(window.jQuery || window.$);
