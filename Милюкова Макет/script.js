const products = [
    { imageURL: "assets/img/1.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s"},
    { imageURL: "assets/img/2.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s"},
    { imageURL: "assets/img/3.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/4.png", name: "NuEvey", category: "Category", price: 1.25, date: "19H 09m 12s" },
    { imageURL: "assets/img/2.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/1.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/4.png", name: "NuEvey", category: "Category", price: 1.25, date: "19H 09m 12s" },
    { imageURL: "assets/img/3.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/3.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/1.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/2.png", name: "Sun-Glass", category: "Collection", price: 1.75, date: "07h 09m 12s" },
    { imageURL: "assets/img/4.png", name: "NuEvey", category: "Category", price: 1.25, date: "19H 09m 12s" },
];

const productsContainer = document.querySelector('.products');
const searchInput = document.getElementById('searchProduct');
const sortOrderSelect = document.getElementById('sortOrder');
const filterButtons = document.querySelectorAll('.filters button');

function displayProducts(productsArray) {
    productsContainer.innerHTML = "";
    productsArray.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <p class="date">${product.date}</p>
            <img src="${product.imageURL}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="left">
                <div class="text">
                    <p class="grey">Current bid</p>
                    <p class="price">
                    <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.50103 0.65271L0.969719 9.94531L6.50103 13.2641L12.0323 9.94531L6.50103 0.65271ZM0.969719 11.0516L6.50103 18.7954L12.0323 11.0516L6.50103 14.3704L0.969719 11.0516Z" fill="#141416" />
                    </svg>${product.price}</p>
                </div>
                <button class="bid">PLACE BID</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

function filterProducts(category) {
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    filteredProducts = searchProducts(filteredProducts);
    filteredProducts = sortProducts(filteredProducts);
    displayProducts(filteredProducts);
}

function searchProducts(productsArray) {
    const searchText = searchInput.value.toLowerCase();
    return productsArray.filter(product => product.name.toLowerCase().includes(searchText));
}

function sortProducts(productsArray) {
    const sortOrder = sortOrderSelect.value;
    if (sortOrder === 'lowest') {
        return productsArray.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highest') {
        return productsArray.sort((a, b) => b.price - a.price);
    }
    return productsArray;
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterProducts(button.dataset.category);
    });
});

searchInput.addEventListener('input', () => {
    filterProducts(document.querySelector('.filters button.active')?.dataset.category || 'all');
});

sortOrderSelect.addEventListener('change', () => {
    filterProducts(document.querySelector('.filters button.active')?.dataset.category || 'all');
});

displayProducts(products);