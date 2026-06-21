$(document).ready(function () {
    // Toggle dropdown on click
    $(".custom-select .select-selected").on("click", function (e) {
        e.stopPropagation();
        var $select = $(this).closest(".custom-select");
        var $itemsList = $select.find(".select-items");
        var $icon = $(this).find("i");

        // Close others
        closeAllSelect($select[0]);

        // Toggle current
        $itemsList.toggleClass("select-hide");
        $(this).toggleClass("select-active");
        $icon.toggleClass("fa-chevron-up fa-chevron-down");
    });

    // Item click
    $(".custom-select .select-items div").on("click", function (e) {
        var $item = $(this);
        var val = $item.data("value");
        var text = $item.html();

        var $select = $item.closest(".custom-select");
        var $selected = $select.find(".select-selected");
        var $selectedText = $selected.find("span");
        var $hiddenInput = $select.find("input[type='hidden']");
        var $icon = $selected.find("i");

        // Update selected value
        $selectedText.html(text).css("color", "var(--black)");
        if ($hiddenInput.length) {
            $hiddenInput.val(val);
        }

        // Active state
        $item.siblings().removeClass("same-as-selected");
        $item.addClass("same-as-selected");

        // Close dropdown
        $select.find(".select-items").addClass("select-hide");
        $selected.removeClass("select-active");
        $icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
    });

    // Function to close all selects
    function closeAllSelect(except) {
        $(".custom-select").each(function () {
            if (this !== except) {
                $(this).find(".select-items").addClass("select-hide");
                $(this).find(".select-selected").removeClass("select-active");
                $(this).find(".select-selected i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            }
        });
    }

    // Close on document click
    $(document).on("click", function () {
        closeAllSelect(null);
    });

    // Handle Dropzone File Upload
    $("#file-upload").on("change", function(e) {
        var file = e.target.files[0];
        if (file) {
            $("#dropzone-text span").html("File terpilih: <b>" + file.name + "</b>").css("color", "var(--primary)");
            $("#dropzone-text p").text("Klik ulang untuk mengganti");
            $(".dropzone .icon").removeClass("fa-camera").addClass("fa-image");
        }
    });

    // Handle GPS Button Interaction
    $("#btn-gps").on("click", function() {
        var $btn = $(this);
        var $icon = $btn.find("i");
        var $text = $btn.find("span");

        $btn.css("pointer-events", "none");
        $icon.removeClass("fa-location-crosshairs").addClass("fa-spinner fa-spin");
        $text.text("Mencari Lokasi...");

        setTimeout(function() {
            $icon.removeClass("fa-spinner fa-spin").addClass("fa-check");
            $text.text("Lokasi Ditemukan!");
            $btn.css({
                "background-color": "var(--primary)",
                "color": "var(--white)",
                "border-color": "var(--primary)"
            });

            $("#detail-lokasi").val("Jl. Perum Pasraman Unud, Jimbaran, Kuta Selatan (-8.796, 115.167)");
            
            var $gianyarOption = $(".custom-select .select-items div[data-value='Badung']");
            if ($gianyarOption.length) {
                $gianyarOption.click();
            }

            setTimeout(function() {
                $icon.removeClass("fa-check").addClass("fa-location-crosshairs");
                $text.text("Gunakan Lokasi Saya (GPS)");
                $btn.css({
                    "background-color": "",
                    "color": "",
                    "border-color": "",
                    "pointer-events": "auto"
                });
            }, 3000);
        }, 1500);
    });
});
