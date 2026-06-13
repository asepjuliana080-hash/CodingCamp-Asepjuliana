
const products = [
    {
        id: 1,
        title: "AuraSound Premium Headphone ANC Bluetooth 5.0",
        price: 2499000,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=500&auto=format&fit=crop",
        rating: 4.9,
        sold: 234,
        badge: "Terlaris",
        category: "Aksesoris"
    },
    {
        id: 2,
        title: "Smartwatch Series 8 - Midnight Black Active Band",
        price: 3299000,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=500&auto=format&fit=crop",
        rating: 4.8,
        sold: 156,
        badge: "Diskon 10%",
        category: "Gadget"
    },
    {
        id: 3,
        title: "Kamera Mirrorless Alpha A7 - Body Only (Black)",
        price: 15499000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
        rating: 5.0,
        sold: 45,
        badge: "",
        category: "Kamera"
    },
    {
        id: 4,
        title: "Sneakers Cloud Walk Classic - Putih Original",
        price: 799000,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500&auto=format&fit=crop",
        rating: 4.7,
        sold: 512,
        badge: "Pilihan Utama",
        category: "Fashion"
    },
    {
        id: 5,
        title: "Laptop Gaming ProBook 15 - RTX 4060 16GB RAM",
        price: 18999000,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500&auto=format&fit=crop",
        rating: 4.8,
        sold: 89,
        badge: "Gratis Ongkir",
        category: "Peralatan"
    },
    {
        id: 6,
        title: "Kacamata Hitam Aviator Premium Polarized",
        price: 349000,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=500&auto=format&fit=crop",
        rating: 4.6,
        sold: 890,
        badge: "Promo",
        category: "Fashion"
    },
    {
        id: 7,
        title: "Tas Ransel Kanvas Anti Air Original Outdoor",
        price: 289000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop",
        rating: 4.5,
        sold: 342,
        badge: "",
        category: "Fashion"
    },
    {
        id: 8,
        title: "Mechanical Keyboard RGB Switch Merah TKL",
        price: 859000,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=500&auto=format&fit=crop",
        rating: 4.9,
        sold: 671,
        badge: "Terbaru",
        category: "Aksesoris"
    }
];


let cart = [];
let currentCategory = "Semua";
let searchQuery = "";


const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};


const renderProducts = () => {
    const productContainer = document.getElementById('productList');
    const noProductMsg = document.getElementById('noProductMsg');
    
    productContainer.innerHTML = ''; 
   
    const filteredProducts = products.filter(product => {
        const matchCategory = currentCategory === "Semua" || product.category === currentCategory;
        const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filteredProducts.length === 0) {
        noProductMsg.style.display = 'block';
    } else {
        noProductMsg.style.display = 'none';
        
        filteredProducts.forEach(product => {
            const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
            
            const cardHTML = `
                <div class="product-card">
                    <div class="product-image">
                        ${badgeHTML}
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h4 class="product-title">${product.title}</h4>
                        <div class="product-price">${formatRupiah(product.price)}</div>
                        <div class="product-rating">
                            <i class="fa-solid fa-star"></i>
                            <span>${product.rating} | Terjual ${product.sold}</span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-cart-plus"></i> Masukkan
                        </button>
                    </div>
                </div>
            `;
            
            productContainer.innerHTML += cardHTML;
        });
    }
};


window.addToCart = (productId) => {
    
    const product = products.find(p => p.id === productId);
    
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.qty += 1; 
    } else {
        cart.push({ ...product, qty: 1 }); 
    }
    
    updateCartUI();
};


window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCartItems(); 
};


const updateCartUI = () => {
    const cartBadge = document.getElementById('cartCount');
    const totalItemCount = cart.reduce((total, item) => total + item.qty, 0);
    
    cartBadge.innerText = totalItemCount;
    
    
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
    }, 200);
    
   
    renderCartItems();
};


const renderCartItems = () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyMsg = document.getElementById('emptyCartMsg');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        cartItemsContainer.appendChild(emptyMsg);
        cartTotalPrice.innerText = 'Rp 0';
        return;
    } 
    
    emptyMsg.style.display = 'none';
    cartItemsContainer.appendChild(emptyMsg); 
    
    let subtotal = 0;
    
    
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${formatRupiah(item.price)}</div>
                    <div class="cart-item-qty">Jumlah: ${item.qty}x</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });
    
    
    cartTotalPrice.innerText = formatRupiah(subtotal);
};


const renderCheckoutSummary = () => {
    const summaryContainer = document.getElementById('checkoutSummary');
    let html = '<h4>Ringkasan Pesanan</h4>';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        grandTotal += itemTotal;
        html += `
            <div class="checkout-item">
                <span>${item.title} (${item.qty}x)</span>
                <span>${formatRupiah(itemTotal)}</span>
            </div>
        `;
    });

    html += `
        <div class="checkout-grand-total">
            <span>Total Pembayaran</span>
            <span>${formatRupiah(grandTotal)}</span>
        </div>
    `;

    summaryContainer.innerHTML = html;
};


document.addEventListener('DOMContentLoaded', () => {
    
    
    renderProducts();

   
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');

    const toggleCart = () => {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    };

    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart); 

    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts(); 
    });
    
    
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
           
            categoryCards.forEach(c => c.classList.remove('active'));
            
            card.classList.add('active');
            
            
            currentCategory = card.getAttribute('data-category');
            renderProducts();
        });
    });

   
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

   
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const submitOrderBtn = document.getElementById('submitOrderBtn');
    const successOverlay = document.getElementById('successOverlay');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Keranjang Anda masih kosong! Tambahkan barang terlebih dahulu.', 'warning');
            return;
        }

       
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');

        
        renderCheckoutSummary();

        
        checkoutOverlay.classList.add('active');
    });

    
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutOverlay.classList.remove('active');
    });

   
    checkoutOverlay.addEventListener('click', (e) => {
        if (e.target === checkoutOverlay) {
            checkoutOverlay.classList.remove('active');
        }
    });

    
    submitOrderBtn.addEventListener('click', () => {
        const custName = document.getElementById('custName');
        const custPhone = document.getElementById('custPhone');
        const custAddress = document.getElementById('custAddress');
        const paymentMethod = document.getElementById('paymentMethod');

       
        if (!custName.value.trim()) {
            showToast('Mohon isi nama lengkap Anda.', 'error');
            custName.focus();
            return;
        }
        
        if (!custPhone.value.trim()) {
            showToast('Mohon isi nomor telepon Anda.', 'error');
            custPhone.focus();
            return;
        }
        
        if (!custAddress.value.trim()) {
            showToast('Mohon isi alamat pengiriman Anda.', 'error');
            custAddress.focus();
            return;
        }
        
        if (!paymentMethod.value) {
            showToast('Mohon pilih metode pembayaran terlebih dahulu.', 'error');
            return;
        }

        
        const method = paymentMethod.value;
        if (method === 'transfer') {
            const confirmTransfer = document.getElementById('confirmTransfer');
            if (!confirmTransfer.checked) {
                showToast('Harap lakukan pemabayaran terlebih dahulu.', 'warning');
                return;
            }
        }
        if (method === 'ewallet') {
            const confirmEwallet = document.getElementById('confirmEwallet');
            if (!confirmEwallet.checked) {
                showToast('Harap lakukan pembayaran terlebih daulu.', 'warning');
                return;
            }
        }

        
        const orderId = 'AM-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

        
        checkoutOverlay.classList.remove('active');

        
        document.getElementById('orderId').innerText = 'Order ID: ' + orderId;
        successOverlay.classList.add('active');

        
        cart = [];
        updateCartUI();
        document.getElementById('checkoutForm').reset();
        resetPaymentPanels();
    });

    
    closeSuccessBtn.addEventListener('click', () => {
        successOverlay.classList.remove('active');
    });

   
    const paymentOptions = document.querySelectorAll('.payment-option');
    const detailTransfer = document.getElementById('detailTransfer');
    const detailEwallet = document.getElementById('detailEwallet');
    const detailCod = document.getElementById('detailCod');

    const resetPaymentPanels = () => {
        paymentOptions.forEach(o => o.classList.remove('selected'));
        detailTransfer.classList.remove('visible');
        detailEwallet.classList.remove('visible');
        detailCod.classList.remove('visible');
        paymentMethod.value = '';
    };

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            
            paymentOptions.forEach(o => o.classList.remove('selected'));
            detailTransfer.classList.remove('visible');
            detailEwallet.classList.remove('visible');
            detailCod.classList.remove('visible');

            
            option.classList.add('selected');
            const method = option.getAttribute('data-method');
            paymentMethod.value = method;

            
            if (method === 'transfer') {
                detailTransfer.classList.add('visible');
            } else if (method === 'ewallet') {
                detailEwallet.classList.add('visible');
            } else if (method === 'cod') {
                detailCod.classList.add('visible');
            }
        });
    });

   
    const ewalletData = {
        gopay:  { label: 'GOPAY', number: '0812-3456-7890', raw: '081234567890' },
        ovo:    { label: 'OVO',   number: '0813-7890-1234', raw: '081378901234' },
        dana:   { label: 'DANA',  number: '0815-6789-0123', raw: '081567890123' }
    };

    const ewalletChips = document.querySelectorAll('.ewallet-chip');
    ewalletChips.forEach(chip => {
        chip.addEventListener('click', () => {
            ewalletChips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');

            const wallet = chip.getAttribute('data-ewallet');
            const data = ewalletData[wallet];
            
            document.getElementById('ewalletLabel').innerText = data.label;
            document.getElementById('ewalletNumber').innerText = data.number;
            
            
            const copyBtn = document.getElementById('ewalletCopyBtn');
            copyBtn.setAttribute('onclick', `copyToClipboard('${data.raw}', this)`);
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Salin';
        });
    });

    
    closeCheckoutBtn.addEventListener('click', () => {
        
        resetPaymentPanels();
    });

});


window.copyToClipboard = (text, btnElement) => {
    navigator.clipboard.writeText(text).then(() => {
        btnElement.classList.add('copied');
        btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        
        setTimeout(() => {
            btnElement.classList.remove('copied');
            btnElement.innerHTML = '<i class="fa-solid fa-copy"></i> Salin';
        }, 2000);
    }).catch(() => {
        
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        btnElement.classList.add('copied');
        btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        setTimeout(() => {
            btnElement.classList.remove('copied');
            btnElement.innerHTML = '<i class="fa-solid fa-copy"></i> Salin';
        }, 2000);
    });
};


const showToast = (message, type = 'error') => {
    const container = document.getElementById('toastContainer');
    
    const icons = {
        error: 'fa-circle-exclamation',
        warning: 'fa-triangle-exclamation',
        success: 'fa-circle-check'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon"><i class="fa-solid ${icons[type]}"></i></span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3600);
};
