document.addEventListener("DOMContentLoaded", function () {
    loadCart();
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    const totalElem = document.getElementById('total-price');

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="color:white; padding:20px;">Your cart is empty.</p>';
        if(footer) footer.style.display = 'none';
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        let img = item.image || 'https://via.placeholder.com/50';

        const row = `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #333; color:white;">
                <div style="display:flex; align-items:center;">
                    <img src="${img}" style="width:50px; height:75px; margin-right:15px; object-fit:cover;">
                    <div>
                        <h4 style="margin:0;">${item.title}</h4>
                        <p style="margin:0; color:#aaa;">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQty(${index}, this.value)" style="width:40px; text-align:center;">
                    <button onclick="removeItem(${index})" style="background:red; color:white; border:none; padding:5px; cursor:pointer;"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        container.innerHTML += row;
    });

    if(totalElem) totalElem.innerText = totalPrice.toFixed(2);
    if(footer) footer.style.display = 'block';
}

function updateQty(index, newQty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQty < 1) newQty = 1;
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    if(!confirm("Remove item?")) return;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}