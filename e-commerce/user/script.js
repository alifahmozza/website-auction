// File Index-guest
    document.getElementById('search-button').addEventListener('click', function() {
        performSearch();
    });

    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const items = document.querySelectorAll('.item-lelang');

        items.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
            if (title.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

// File Register
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
        
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const confirmPassword = document.getElementById('confirmPasswordInput').value;
    const alertDiv = document.getElementById('alertMessage');
        
    alertDiv.classList.add('d-none');
    alertDiv.classList.remove('alert-danger');
    alertDiv.classList.add('alert-success');
        
    if (password !== confirmPassword) {
        alertDiv.innerHTML = 'Password dan Konfirmasi Password tidak cocok.';
        alertDiv.classList.remove('d-none');
        alertDiv.classList.remove('alert-success');
        alertDiv.classList.add('alert-danger');
        return;
    }

    if (password.length < 6) {
        alertDiv.innerHTML = 'Password minimal harus 6 karakter.';
        alertDiv.classList.remove('d-none');
        alertDiv.classList.remove('alert-success');
        alertDiv.classList.add('alert-danger');
        return;
    }
        
    alertDiv.innerHTML = 'Pendaftaran berhasil! Silakan <a href="login.html" class="alert-link">Login</a> untuk mulai menawar.';
    alertDiv.classList.remove('d-none');
    document.getElementById('registrationForm').reset();
});

// File Login
function login() {
    const ADMIN_USERNAME = 'admin@lelang.com'; 
    const ADMIN_PASSWORD = 'admin123';

    var email = document.getElementById('emailInput').value;
    var password = document.getElementById('passwordInput').value;
    var alertDiv = document.getElementById('alertMessage');

    alertDiv.classList.add('d-none');

    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Login Admin Sukses
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../admin/home.html';
    } else {
            // Login Gagal
            if (email.length < 5 || password.length < 3) { 
             alertDiv.classList.remove('d-none'); // Tampilkan pesan error
             return;
        }

        // Login untuk Pengguna Biasa 
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../user/home.html'; 
    }
}

// FUNGSI LOGOUT
function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    // Animasi Logout dengan jQuery (Contoh Sederhana)
    $('body').fadeOut(500, function() {
        window.location.href = 'index.html'; 
    });
}


// File Index-user
$(document).ready(function() {
    // Tambahkan event listener untuk tombol "Tandai Semua Sudah Dibaca" di notif.html menggunakan jQuery
    $('#mark-all-read-btn').on('click', markAllNotificationsAsRead);

    // Memastikan tombol Cari di index.html menggunakan event click
    $('#search-button').on('click', searchItem);
});

function searchItem() {
    const searchTerm = $('#search-input').val().toLowerCase();    const itemsContainer = document.querySelector('.row.row-cols-1.row-cols-md-3.g-4'); 
    const itemContainer = $('.auction-list');
    let foundCount = 0;

    $('#no-result-message').remove();

    $('.item-lelang').each(function() { 
        const itemCol = $(this); // Gunakan jQuery
        const title = itemCol.data('title').toLowerCase(); // Ambil dari data-attribute, lebih robust

        if (title.includes(searchTerm) || searchTerm === '') {
            itemCol.show(); // Gunakan jQuery
            foundCount++;
        } else {
            itemCol.hide(); // Gunakan jQuery
        }
    });

    if (foundCount === 0 && searchTerm !== '') {
        const noResult = $('<div>').attr('id', 'no-result-message').addClass('col-12 alert alert-warning mt-3');
        noResult.text(`Tidak ditemukan item lelang dengan kata kunci: "${searchTerm}"`);
        itemsContainer.after(noResult); // Tampilkan setelah kontainer item
    }
}
// FUNGSI UNTUK MENGIRIM TAWARAN DAN MENGARAHKAN KE RIWAYAT
function submitBid(itemId, itemName, currentHighestBid) {
    const bidInputId = `bidAmount${itemId}`;
    const bidAmountInput = document.getElementById(bidInputId);
    
    if (!bidAmountInput) {
        alert(`Error: Input tawaran untuk Item ID ${itemId} tidak ditemukan. ID yang dicari: ${bidInputId}`);
        return;
    }
    
    const bidAmount = parseInt(bidAmountInput.value);
    
    // 1. Validasi Tawaran (harus lebih tinggi)
    if (isNaN(bidAmount) || bidAmount <= currentHighestBid) { 
        alert(`Tawaran tidak valid. Tawaran harus lebih tinggi dari Rp ${currentHighestBid.toLocaleString('id-ID')}.`);
        return;
    }

    // 2. Simulasi
    console.log(`Tawaran Diterima: Item ID ${itemId} (${itemName}) dengan jumlah Rp ${bidAmount.toLocaleString('id-ID')}`);
    
    // 3. Tampilkan Notifikasi dan Arahkan ke Halaman Riwayat Lelang
    alert(`Penawaran Anda sebesar Rp ${bidAmount.toLocaleString('id-ID')} untuk ${itemName} telah berhasil dikirim! Anda akan diarahkan ke Riwayat Lelang.`);
    
    // Tutup modal
    const modalElement = document.getElementById(`bidModal${itemId}`);
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
    
    // Arahkan ke halaman history.html
    window.location.href = 'history.html';
}

// File Notif-user
function markAllNotificationsAsRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    const notifBadge = document.querySelector('.navbar .badge');
    
    if (unreadItems.length === 0) {
        alert('Tidak ada notifikasi yang belum dibaca.');
        return;
    }

    // Hapus 'unread'
    unreadItems.forEach(item => {
        item.classList.remove('unread');
    });

    // Perbarui badge notifikasi di navbar
    if (notifBadge) {
        notifBadge.textContent = '0'; 
        notifBadge.classList.add('d-none'); 
    }
    alert('Semua notifikasi telah ditandai sebagai sudah dibaca.');
}