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

// File Admin-index
function addNewItem() {
    // 1. ambil nilai dari form modal
    const itemName = document.getElementById('itemName').value;
    const initialPriceInput = document.getElementById('initialPrice').value;
    const endDate = document.getElementById('endDate').value;

    // lakukan validasi sederhana
    const initialPrice = parseFloat(initialPriceInput);

    if (isNaN(initialPrice) || initialPrice <= 0) {
        alert("VERIFIKASI GAGAL: Harga Awal harus berupa angka positif yang valid!");
        document.getElementById('initialPrice').focus(); // Fokuskan kembali ke input yang salah
        return; 
    }
    // 2.validasi kelengkapan form
    if (!itemName || !endDate) {
        alert("Mohon lengkapi semua bidang untuk item lelang baru!");
            return;
    }

    // 3. tampilkan notifikasi sukses
    alert(`Item baru berhasil ditambahkan!
    - Nama: ${itemName}
    - Harga Awal: Rp ${new Intl.NumberFormat('id-ID').format(initialPrice)}
    - Waktu Berakhir: ${new Date(endDate).toLocaleString('id-ID')}`);
        
    // fungsi bawaan bootstrap untuk menutup modal
    const modalElement = document.getElementById('addItemModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
    // 4. reset form
    document.querySelector('#addItemModal form').reset();
} 

// File Admin-Payment
function markAsPaid(transactionId, buttonElement) {
    // 1. Ubah status badge
    const row = buttonElement.closest('tr'); 
    const statusCell = row.children[5]; 
    statusCell.innerHTML = '<span class="badge bg-success">Lunas</span>';
    // 2. Ubah tombol aksi
    const actionCell = row.children[6]; // Kolom Aksi (index 6)
    actionCell.innerHTML = `
        <button class="btn btn-sm btn-info text-white" onclick="viewDetails('${transactionId}')">Lihat Detail</button>
        <button class="btn btn-sm btn-danger disabled">Batalkan</button>
    `;
    // 3. Tampilkan notifikasi
    alert(`Transaksi ${transactionId} berhasil ditandai sebagai Lunas.`);
}

function viewDetails(transactionId) {
    alert(`Menampilkan detail untuk transaksi: ${transactionId}`);
}

function cancelTransaction(transactionId, buttonElement) {
    // 1. Konfirmasi pembatalan
    if (!confirm(`Apakah Anda yakin ingin membatalkan transaksi ${transactionId}?`)) {
        return;
    }
    // 2. Ubah status badge
    const row = buttonElement.closest('tr'); 
    const statusCell = row.children[5]; 
    statusCell.innerHTML = '<span class="badge bg-danger">Dibatalkan</span>';
    // 3. Ubah tombol aksi
    const actionCell = row.children[6]; // Kolom Aksi (index 6)
    actionCell.innerHTML = `
        <button class="btn btn-sm btn-info text-white" onclick="viewDetails('${transactionId}')">Lihat Detail</button>
        <button class="btn btn-sm btn-danger disabled">Batalkan</button>
    `;
    // 4. Tampilkan notifikasi
    alert(`Transaksi ${transactionId} telah dibatalkan.`);
}





