document.addEventListener("DOMContentLoaded", () => {
    const productInput = document.getElementById("product-name");
    const priceInput = document.getElementById("price");
    const imageURL = document.getElementById("imageURL");
    const createBtn = document.getElementById("create-btn");
    const productList = document.getElementById("product-list");
    const errorMessage = document.getElementById("errorMessage");
    const addCartBtn = document.getElementById("add-cart");
    const cartList = document.getElementById("cart-list");
    const calculatePriceBtn = document.getElementById("calculate-price");
    const finalPriceDiv = document.getElementById("final-price");

    let dashboard = [];
    let cart = [];

    createBtn.addEventListener("click", (e) => {
        e.preventDefault();
        errorMessage.innerHTML = "";

        const productText = productInput.value.trim();
        const productPrice = priceInput.value.trim();
        const productImage = imageURL.value.trim();

        if (!productText || !productPrice || !productImage) {
            errorMessage.innerHTML = `<p class="errorMessage">All fields are required.</p>`;
            return;
        }

        if (isNaN(productPrice)) {
            errorMessage.innerHTML = `<p class="errorMessage">Price must be a number.</p>`;
            return;
        }

        if (!isImgUrl(productImage)) {
            errorMessage.innerHTML = `<p class="errorMessage">Please enter a valid image URL.</p>`;
            return;
        }

        const productObject = {
            id: Date.now(),
            name: productText,
            price: parseFloat(productPrice),
            image: productImage,
            selected: false
        };

        dashboard.push(productObject);
        renderDashboard(dashboard);

        productInput.value = "";
        priceInput.value = "";
        imageURL.value = "";
    });

    function renderDashboard(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productItem = document.createElement("li");
            productItem.className = "product-card";
            productItem.innerHTML = `
                <div class="product-info">
                    <input type="checkbox" class="product-checkbox" data-id="${product.id}" ${product.selected ? "checked" : ""}>
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            productList.appendChild(productItem);
        });
        updateCartButton();
    }

    productList.addEventListener("change", (e) => {
        if (e.target.classList.contains("product-checkbox")) {
            const productId = e.target.getAttribute("data-id");
            const product = dashboard.find(p => p.id == productId);
            if (product) {
                product.selected = e.target.checked;
            }
            updateCartButton();
        }
    });

    addCartBtn.addEventListener("click", () => {
        cart = dashboard.filter(product => product.selected);
        renderCart(cart);
        updateCartButton();
    });

    function renderCart(cartItems) {
        cartList.innerHTML = "";
        cartItems.forEach(item => {
            const cartItem = document.createElement("li");
            cartItem.className = "product-card";
            cartItem.innerHTML = `
                <div class="product-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            cartList.appendChild(cartItem);
        });

        calculatePriceBtn.style.display = cartItems.length ? "block" : "none";
    }

    calculatePriceBtn.addEventListener("click", () => {
        const totalPrice = cart.reduce((total, product) => total + product.price, 0);
        finalPriceDiv.innerHTML = `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
    });

    function updateCartButton() {
        const selectedCount = dashboard.filter(product => product.selected).length;
        addCartBtn.textContent = `Add to Cart (${selectedCount})`;
    }

    function isImgUrl(url) {
        const pattern = /\.(jpg|jpeg|png|gif)$/i;
        return pattern.test(url);
    }
});