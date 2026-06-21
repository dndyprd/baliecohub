(function ($) {
    const $container = $("#blogs-container");
    const $pagination = $("#blogs-pagination");

    if (!$container.length || !$pagination.length) return;

    // DATA BLOGS
    const baseBlogs = [
        {
            title: "5 Langkah Mudah Memilah Sampah Organik Upacara Adat di Rumah",
            date: "29 Juni 2026",
            img: "assets/img/blogs/blogs1.jpg",
            desc: "Sisa janur, bunga, dan sarana upacara (banten) sering kali menumpuk begitu saja. Pelajari cara mengolahnya menjadi kompos berkualitas tinggi secara mandiri tanpa bau."
        },
        {
            title: "Ancaman Mikroplastik di Pesisir Pantai Kuta dan Efeknya Bagi Nelayan Lokal",
            date: "22 Mei 2026",
            img: "assets/img/blogs/blogs2.jpg",
            desc: "Investigasi mendalam mengenai pergerakan arus sampah plastik di perairan Bali Selatan dan bagaimana aksi pelaporan cepat lewat Eco-Report membantu pencegahannya."
        },
        {
            title: "Menuju Pesta Kesenian Bali (PKB) 2026 yang Zero-Waste: Tantangan dan Implementasi",
            date: "10 Mei 2026",
            img: "assets/img/blogs/blogs3.jpg",
            desc: "Menengok kesiapan panitia dan kolaborasi pelaku UMKM kuliner dalam menekan penggunaan wadah plastik sekali pakai selama festival budaya terbesar tahun ini."
        },
        {
            title: "Maksimalkan Cuan Hijau: Strategi Menukar Eco-Points Menjadi Kerajinan Bernilai Jual",
            date: "5 April 2026",
            img: "assets/img/blogs/blogs4.jpg",
            desc: "Panduan lengkap bagi pengguna baru BaliEco Hub untuk mengonversi akumulasi poin timbangan sampah menjadi produk kreatif buatan UMKM lokal Bali."
        },
        {
            title: "Peran Banjar Adat dalam Menggerakkan Digitalisasi Bank Sampah di Pedesaan",
            date: "21 Maret 2026",
            img: "assets/img/blogs/blogs5.jpg",
            desc: "Bagaimana pendekatan kultural dan sentuhan aplikasi teknologi mampu meningkatkan partisipasi warga desa secara masif hingga mencapai angka efisiensi 85%."
        },
        {
            title: "Mengenal Sistem Geofencing pada Fitur Eco-Report BaliEco Hub",
            date: "14 Februari 2026",
            img: "assets/img/blogs/blogs6.jpg",
            desc: "Artikel teknis ringan mengenai cara kerja GPS dan validasi koordinat otomatis saat masyarakat mengirimkan foto tumpukan sampah liar di sekitar mereka."
        },
        {
            title: "Menatap Masa Depan Bali Pasca-TPA Suwung: Bagaimana Teknologi Sirkular Menjadi Penyelamat? ",
            date: "20 Januari 2026",
            img: "assets/img/blogs/blogs7.jpg",
            desc: "Panduan lengkap bagi pengguna baru BaliEco Hub untuk mengonversi akumulasi poin timbangan sampah menjadi produk kreatif buatan UMKM lokal Bali."
        }
    ];

    // JUMLAH BLOGS
    const targetTotal = 17;
    let allBlogs = [];
    
    while (allBlogs.length < targetTotal) {
        const remaining = targetTotal - allBlogs.length;
        if (remaining >= baseBlogs.length) {
            allBlogs = allBlogs.concat(baseBlogs);
        } else {
            allBlogs = allBlogs.concat(baseBlogs.slice(0, remaining));
        }
    }
    
    const itemsPerPage = 6;
    let currentPage = 1;
    const totalPages = Math.ceil(allBlogs.length / itemsPerPage);

    // CONTENT BLOG
    function renderCards(page) {
        $container.empty();
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentBlogs = allBlogs.slice(start, end);

        currentBlogs.forEach(blog => {
            const html = `
                <a href="blog/sample-content.html" class="card">
                    <div class="img">
                        <img src="${blog.img}" alt="${blog.title}">
                    </div>
                    <div class="content">
                        <h2>${blog.title}</h2>
                        <h5>${blog.date}</h5>
                        <p>${blog.desc}</p>
                    </div>
                </a>
            `;
            $container.append(html);
        });
    }

    // PAGINATIION
    function renderPagination() {
        $pagination.empty();
        
        let pagesToShow = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
        } else {
            if (currentPage <= 3) {
                pagesToShow = [1, 2, 3, "...", totalPages];
            } else if (currentPage >= totalPages - 2) {
                pagesToShow = [1, "...", totalPages - 2, totalPages - 1, totalPages];
            } else {
                pagesToShow = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
            }
        }

        // UI PAGINATION
        if (currentPage > 1) {
            $pagination.append(`<a href="#" class="arrow" data-page="${currentPage - 1}"><i class="fa-solid fa-chevron-left"></i></a>`);
        }

        pagesToShow.forEach(p => {
            if (p === "...") {
                $pagination.append(`<span class="dots">...</span>`);
            } else {
                const isActive = p === currentPage ? 'class="active"' : '';
                $pagination.append(`<a href="#" ${isActive} data-page="${p}">${p}</a>`);
            }
        });

        if (currentPage < totalPages) {
            $pagination.append(`<a href="#" class="arrow" data-page="${currentPage + 1}"><i class="fa-solid fa-chevron-right"></i></a>`);
        }
    }

    $pagination.on("click", "a", function (e) {
        e.preventDefault();
        const page = $(this).data("page");
        if (page && page !== currentPage) {
            currentPage = page;
            renderCards(currentPage);
            renderPagination();
        }
    });

    renderCards(currentPage);
    renderPagination();

})(jQuery);
