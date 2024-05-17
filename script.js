// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const filterInput = document.querySelector('#filter');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

let items = [
    {
        id: 1,
        name: 'Apple',
        price: 0.5,
        image: "images/apple.jpg"
    },
    {
        id: 2,
        name: 'Banana',
        price: 2,
        image: "images/banana.jpg"
    },
    {
        id: 3,
        name: 'Pineapple',
        price: 5,
        image: "images/pineapple.jpg"
    },
    {
        id: 4,
        name: 'Strawberry',
        price: 1.5,
        image: "images/strawberry.jpg"
    },
    {
        id: 5,
        name: 'Orange',
        price: 2,
        image: "images/orange.jpg"
    },
    {
        id: 6,
        name: 'Lemon',
        price: 1,
        image: "images/lemon.jpg"
    },
    {
        id: 7,
        name: 'Kiwi',
        price: 3.2,
        image: "images/kiwi.jpg"
    },
    {
        id: 8,
        name: 'Avocado',
        price: 7,
        image: "images/avocado.jpg"
    },
    {
        id: 5.5,
        name: 'Passion Fruit',
        price: 3.2,
        image: "images/passion_fruit.jpg"
    }
];

let cart = [];

function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src=${item.image} alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function addToCart(itemId) {
    const selectedItem = items.find(it => it.id === itemId);
    const totalPrice = parseFloat(cartTotal.textContent.replace('$', ''));
    const newTotal = totalPrice + selectedItem.price;

    updateCartBadge(1);
    addToModal(itemId);

    cart.push(selectedItem);

    cartTotal.textContent = `$${newTotal.toFixed(2)}`;
}

function updateCartBadge(value = 0, empty = false) {
    cartBadge.textContent = parseInt(cartBadge.textContent) + value;

    if (empty)
        cartBadge.textContent = 0;
}

function addToModal(itemId) {
    let selectedItem = items.find(it => it.id == itemId);
    const existsInCart = cart.some(item => item.name === selectedItem.name);
    cartItemsList.style.display = 'block';

    if (existsInCart) {
        const itemsContainer = document.querySelectorAll('.item-container .item-description');

        itemsContainer.forEach(container => {
            const itemNameElement = container.querySelector('p:nth-child(2)');
            if (itemNameElement.textContent === selectedItem.name) {
                const itemQuantityElement = container.querySelector('.item-quantity');
                itemQuantityElement.textContent = parseInt(itemQuantityElement.textContent) + 1;
            }
        });
        return;
    }

    let itemLi = document.createElement('li');
    itemLi.innerHTML = `
    <div class="item-container">
        <div class="item-description">
            <p class="item-quantity">1</p>
            <p>${selectedItem.name}</p>
        </div>
        <button class="remove-btn" onclick="removeItem(${itemId})">Remove</button>
    </div>
    `;
    cartItemsList.appendChild(itemLi)
}

function removeItem(itemId) {
    let selectedItem = items.find(it => it.id == itemId);
    cart = cart.filter(it => it !== selectedItem);

    const totalPrice = parseFloat(cartTotal.textContent.replace('$', ''));
    cartTotal.textContent = "$" + (totalPrice - selectedItem.price).toFixed(2);

    const itemsContainer = document.querySelectorAll('.item-container');

    itemsContainer.forEach(container => {
        const itemNameElement = container.querySelector('p:nth-child(2)');
        const itemQuantityElement = container.querySelector('p:nth-child(1)');

        if (itemNameElement.textContent === selectedItem.name) {
            if (parseInt(itemQuantityElement.textContent) <= 1) {
                parent = container.parentNode;
                parent.parentNode.removeChild(parent);        
                container.parentNode.removeChild(container);
            } 
            else {
                itemQuantityElement.textContent = parseInt(itemQuantityElement.textContent) - 1;
            }
        }
    });

    updateCartBadge(-1);
}

function removeAllItems() {
    const itemsContainer = document.querySelectorAll('.item-container');

    itemsContainer.forEach(container => {
        parent = container.parentNode;
        parent.parentNode.removeChild(parent);
        container.parentNode.removeChild(container);
    });

    updateCartBadge(0, true);
}

function buy() {
    if (cart.length > 0) {
        cart = [];
        cartTotal.textContent = 0.0;
        removeAllItems();
        alert("Items successfully bought!");
    }
    else {
        alert("There are no items in the cart!")
    }
}

function filterItems(event) {
    const filterValue = event.target.value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(filterValue));
    
    itemsGrid.innerHTML = '';
    for (const item of filteredItems) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src=${item.image} alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
}

fillItemsGrid();

filterInput.addEventListener('input', filterItems)
buyButton.addEventListener('click', buy);
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);