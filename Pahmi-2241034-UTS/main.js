const CART_KEY = 'shoppingCart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productName, productPrice) {
    const cart = getCart();
    const productIndex = cart.findIndex(product => product.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    saveCart(cart);
    alert(`${productName} berhasil ditambahkan ke keranjang!`);
}

function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang kosong</p>';
        return;
    }

    cartContainer.innerHTML = '';
    cart.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: Rp${product.price.toLocaleString()}</p>
            <p>Jumlah: 
                <button onclick="updateQuantity(${index}, -1)">-</button>
                ${product.quantity}
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </p>
            <button onclick="removeFromCart(${index})">Hapus</button>
        `;
        cartContainer.appendChild(productDiv);
    });
}

function updateQuantity(index, change) {
    const cart = getCart();
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);

    saveCart(cart);
    displayCart();
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    displayCart();
}

function displayCheckout() {
    const cart = getCart();
    const summaryContainer = document.getElementById('checkout-summary');

    if (cart.length === 0) {
        summaryContainer.innerHTML = '<p>Tidak ada produk di keranjang.</p>';
        return;
    }

    let total = 0;
    summaryContainer.innerHTML = '<ul>';
    cart.forEach(product => {
        const subtotal = product.price * product.quantity;
        total += subtotal;
        summaryContainer.innerHTML += `
            <li>${product.name} (x${product.quantity}): Rp${subtotal.toLocaleString()}</li>
        `;
    });
    summaryContainer.innerHTML += `</ul><p>Total: Rp${total.toLocaleString()}</p>`;
}

const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', event => {
        event.preventDefault();
        alert('Pembayaran berhasil! Terima kasih telah berbelanja.');
        clearCart();
        window.location.href = 'daftarproduk.html'; 
    });
}

if (document.getElementById('cart-items')) {
    displayCart();
}

if (document.getElementById('checkout-summary')) {
    displayCheckout();
}
