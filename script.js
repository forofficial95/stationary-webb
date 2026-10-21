
const products = [
    {
        id: 1,
        name: "Pastel Notebook",
        category: "Notebooks",
        price: 149,
        emoji: "📒",
        color: "#fff0d8",
        description: "A5 notebook for notes and ideas."
    },
    {
        id: 2,
        name: "Colorful Pen Set",
        category: "Writing",
        price: 99,
        emoji: "🖊️",
        color: "#fce3ed",
        description: "A set of smooth-writing colorful pens."
    },
    {
        id: 3,
        name: "Art Pencil Set",
        category: "Art",
        price: 199,
        emoji: "✏️",
        color: "#e4edff",
        description: "Drawing pencils for budding artists."
    },
    {
        id: 4,
        name: "Cute Sticky Notes",
        category: "Accessories",
        price: 79,
        emoji: "🗒️",
        color: "#fff4b9",
        description: "Bright notes for reminders and lists."
    },
    {
        id: 5,
        name: "Study Planner",
        category: "Notebooks",
        price: 179,
        emoji: "📔",
        color: "#e9e1ff",
        description: "Plan your daily goals and study time."
    },
    {
        id: 6,
        name: "Highlighter Pack",
        category: "Writing",
        price: 129,
        emoji: "🖍️",
        color: "#dff7e9",
        description: "Highlight important notes with ease."
    },
    {
        id: 7,
        name: "Watercolor Set",
        category: "Art",
        price: 249,
        emoji: "🎨",
        color: "#ffe3d8",
        description: "Explore your creativity with colors."
    },
    {
        id: 8,
        name: "Cute Pencil Pouch",
        category: "Accessories",
        price: 159,
        emoji: "👝",
        color: "#fce4fa",
        description: "Keep your stationery neat and tidy."
    }
];

// Shopping cart stores product quantities by ID.
const cart = {};

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-button");
const emptyMessage = document.getElementById("empty-message");
const toast = document.getElementById("toast");

let toastTimer;

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// Display products on the page.
function displayProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    productGrid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <div
                class="product-art"
                style="background-color: ${product.color}"
            >
                <span role="img" aria-label="${product.name}">
                    ${product.emoji}
                </span>
            </div>

            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">
                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        data-product-id="${product.id}"
                    >
                        + Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `).join("");

    emptyMessage.hidden = filteredProducts.length !== 0;
}

// Show a small notification.
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

// Add one product to the cart.
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    cart[productId] = (cart[productId] || 0) + 1;

    updateCartCount();
    showToast(product.name + " added to your cart!");
}

// Update the number shown on the cart button.
function updateCartCount() {
    const totalItems = Object.values(cart).reduce(
        (total, quantity) => total + quantity,
        0
    );

    cartCount.textContent = totalItems;
}

// Display cart contents and total price.
function showCart() {
    const cartItems = products.filter(product => cart[product.id]);

    if (cartItems.length === 0) {
        showToast("Your cart is empty. Add something you love!");
        return;
    }

    const itemLines = cartItems.map(product => {
        const quantity = cart[product.id];

        return `${product.name} × ${quantity} = ${
            formatPrice(product.price * quantity)
        }`;
    });

    const total = cartItems.reduce((sum, product) => {
        return sum + product.price * cart[product.id];
    }, 0);

    alert(
        "YOUR PAPERNEST CART\n\n" +
        itemLines.join("\n") +
        "\n\nTotal: " + formatPrice(total) +
        "\n\nThis is a demo cart. Online checkout is not enabled."
    );
}

// Listen for clicks on dynamically created product buttons.
productGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-product-id]");

    if (!button) return;

    addToCart(Number(button.dataset.productId));
});

// Search and category filter.
searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);

// Open the cart summary.
cartButton.addEventListener("click", showCart);

// Automatically display the current year.
document.getElementById("year").textContent =
    new Date().getFullYear();

// Render the initial product collection.
displayProducts();
