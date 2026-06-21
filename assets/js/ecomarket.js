/* assets/js/ecomarket.js */
$(document).ready(function () {
    let saldoAktif = 0;
    let statusTerhubung = false;
    let currentPhone = "";

    // Show/Hide Modal functions attached to window
    window.showModal = function(id) {
        $('#modalOverlay').fadeIn(200);
        $('#' + id).fadeIn(200).css('display', 'block');
    }
    
    window.closeModal = function(id) {
        $('#modalOverlay').fadeOut(200);
        $('#' + id).fadeOut(200);
    }
    
    window.showWarning = function(title, msg, type = 'warning') {
        $('#warningTitle').text(title);
        $('#warningMsg').text(msg);
        
        const $icon = $('#modalWarning .modal-icon');
        $icon.removeClass('warning success');
        
        if (type === 'success') {
            $icon.addClass('success').html('<i class="fa-solid fa-gift"></i>');
        } else {
            $icon.addClass('warning').html('<i class="fa-solid fa-triangle-exclamation"></i>');
        }
        
        showModal('modalWarning');
    }

    $('#btnCekSaldo').on('click', function () {
        const inputPhone = $('#inputPhone').val();
        if (!inputPhone) {
            showWarning('Data Tidak Lengkap', 'Silakan masukkan nomor telepon terlebih dahulu semeton!');
            return;
        }

        // Set virtual saldo ketika dicek
        saldoAktif = 45000;
        statusTerhubung = true;
        currentPhone = inputPhone;

        $('#inputPhone').prop('disabled', true);
        $('#saldoDisplay').fadeIn().css('display', 'flex');
        $('.saldo-status').html('Status: <strong class="text-green">Terhubung</strong>');
        $('.saldo-amount').html(`Saldo: <strong class="text-green">${saldoAktif.toLocaleString('id-ID')} Eco-Points</strong>`);

        $('#syncModalPhone').text(inputPhone);
        showModal('modalSyncSuccess');
    });
    $('.product-card .btn-tukar').on('click', function () {
        const namaProduk = $(this).data('name');
        const hargaPoin = parseInt($(this).data('price'), 10);
        const itemType = $(this).data('type');

        if (!statusTerhubung) {
            showWarning('Belum Terhubung', 'Maaf, Anda harus memasukkan nomor telepon terlebih dahulu untuk menghubungkan akun!');
            return;
        }

        if (saldoAktif < hargaPoin) {
            showWarning('Saldo Tidak Cukup', `Waduh! Saldo Anda tidak cukup. Anda butuh ${hargaPoin.toLocaleString('id-ID')} poin untuk menukar ${namaProduk}.`);
            return;
        }

        // Munculkan Modal Redeem
        $('#redeemItemName').text(namaProduk);
        $('#redeemItemPrice').text(hargaPoin.toLocaleString('id-ID'));
        $('#redeemPhone').val(currentPhone);
        $('#redeemAddress').val('');
        
        // Logic show/hide alamat pengiriman
        if(itemType === 'fisik') {
            $('#addressGroup').show();
        } else {
            $('#addressGroup').hide();
        }

        showModal('modalRedeem');
        
        // Handle konfirmasi penukaran
        $('#btnConfirmRedeem').off('click').on('click', function() {
            if(itemType === 'fisik' && !$('#redeemAddress').val().trim()) {
                showWarning('Data Tidak Lengkap', 'Harap isi alamat pengiriman untuk barang fisik.');
                return;
            }
            
            // Proses potong poin
            saldoAktif -= hargaPoin;
            $('.saldo-amount').html(`Saldo: <strong class="text-green">${saldoAktif.toLocaleString('id-ID')} Eco-Points</strong>`);
            
            closeModal('modalRedeem');
            
            // Tampilkan success
            setTimeout(function() {
                showWarning('Penukaran Berhasil!', `🎉 Selamat! Penukaran ${namaProduk} sukses. ${itemType === 'fisik' ? 'Barang akan dikirim ke alamat Anda.' : 'Kode voucher telah dikirim via SMS/WhatsApp.'}`, 'success');
            }, 300);
        });
    });

    // Close modal on overlay click
    $('#modalOverlay').on('click', function() {
        $('.custom-modal').fadeOut(200);
        $(this).fadeOut(200);
    });
});
