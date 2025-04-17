 let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    let total = 0;
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <span>${item.name}</span>
                <span class="quantity-badge">${item.quantity}</span>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    totalElement.textContent = total.toFixed(2);
    updateCartCount();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

function checkout() {
    alert(`Order placed! Total: $${total.toFixed(2)}`);
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// Initial cart display
updateCartDisplay();