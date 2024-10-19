let allProducts = []; // Store all products globally

function displayProducts(products) {
    const productList = document.getElementById('product-list');

    // Check if productList exists
    if (!productList) {
        console.error('Product list element not found.');
        return;
    }

    productList.innerHTML = ''; // Clear existing products

    if (products.length === 0) {
        productList.innerHTML = '<p class="text-center text-danger">No products found</p>';
    } else {
        products.forEach((product) => {
            let productElement = document.createElement("div");
            productElement.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-3", "col-xxl-3");

            productElement.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title" data-toggle="tooltip" data-placement="top">${product.title}</h5>
                        <p class="text-success">$ ${product.price.toFixed(2)}</p>
                        <p class="card-text">${product.description.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between">
                            <a href="/productDetails.html" class="btn btn-warning me-2">View Product</a>
                            <a href="#" class="btn btn-primary">Add to cart</a>
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(productElement);
        });
    }
}

// Fetching products from the FakeStore API
function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            allProducts = json.map((p) => {
                p.price = p.price - 5; // Example adjustment
                return p;
            });
            displayProducts(allProducts);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Search function
function searchProducts(event) {
    event.preventDefault(); // Prevent the default form submission
    const searchTerm = document.querySelector('#search-form input[type="search"]').value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Call fetchProducts after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    // Attach search functionality
    document.getElementById('search-form').addEventListener('submit', searchProducts);
});


// Function to fetch cart items and display them
function fetchCartItems() {
    fetch('https://fakestoreapi.com/carts')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(json => {
            // Assuming the API returns an array of carts,
            // You may want to specify a cart if needed.
            displayCartItems(json);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to fetch cart items and display them
function fetchCartItems() {
    fetch('https://fakestoreapi.com/carts')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(carts => {
            // Process each cart
            carts.forEach(cart => {
                cart.products.forEach(product => {
                    // Fetch product details for each productId
                    fetch(`https://fakestoreapi.com/products/${product.productId}`)
                        .then(res => res.json())
                        .then(productDetails => {
                            // Display the cart item using the fetched product details
                            displayCartItem(productDetails, product.quantity);
                        })
                        .catch(error => {
                            console.error('Error fetching product details:', error);
                        });
                });
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display a single cart item in the table
function displayCartItem(product, quantity) {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row"><img src="${product.image}" alt="${product.title}" style="width: 50px;"></th>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>${quantity}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteCartItem(${product.id})">Delete</button></td>
    `;
    cartTableBody.appendChild(row);
}

// Call the function to fetch and display cart items when the page loads
document.addEventListener('DOMContentLoaded', fetchCartItems);


