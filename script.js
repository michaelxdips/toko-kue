let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-item-container'); // corrected selector

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Learn More";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Learn Less";
      moreText.style.display = "inline";
    }
  }
  
  function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active'); // change from 'remove' to 'active'
}


document.querySelector('#search-btn').onclick = () => {
    const searchForm = document.querySelector('.search-form');
    searchForm.classList.toggle('active');
};

function toggleDescription(element) {
    const description = element.parentElement.querySelector('.description');
    if (description.style.display === "block") {
        description.style.display = "none";
    } else {
        description.style.display = "block";
    }
}


let resultsContainer = document.getElementById('results-container');
document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const cartButtons = document.querySelectorAll('.btnmenu');
    const cartCount = document.getElementById('cart-count');
    const cartItemContainer = document.querySelector('.cart-items-list');
    const checkoutButton = document.querySelector('.btnco');
    const totalPriceElement = document.getElementById('total-price');
    let itemCounter = 0;
    const cartItems = {};

    const cakes = [
        { name: "Orange Cake", price: "Rp. 28,000", img: "kue 1.jpg" },
        { name: "Matcha Cake", price: "Rp. 32,000", img: "kue 2.jpg" },
        { name: "Chocolate Cake", price: "Rp. 30,000", img: "kue 3.jpg" },
        { name: "Carrot Cake", price: "Rp. 25,000", img: "kue 4.jpg" },
        { name: "Blueberries Cake", price: "Rp. 30,000", img: "kue 5.jpg" },
        { name: "Cookies-cream Cake", price: "Rp. 28,000", img: "kue 6.jpg" },
        { name: "Strawberry-choco Cake", price: "Rp. 32,000", img: "kue 7.jpg" },
        { name: "Lotus Cake", price: "Rp. 40,000", img: "kue 8.jpg" },
        { name: "Red Velvet Cake", price: "Rp. 40,000", img: "kue 9.jpg" },
        { name: "Rainbow Cake", price: "Rp. 45,000", img: "kue 10.jpg" },
        { name: "Caramel Cake", price: "Rp. 35,000", img: "kue 11.jpg" },
        { name: "Vanilla Cake", price: "Rp. 25,000", img: "kue 12.jpg" }
    ];

    searchBox.addEventListener('input', performSearch);
    searchBox.addEventListener('focus', () => {
        if (resultsContainer.childElementCount > 0) {
            resultsContainer.classList.add('active'); // Show results container when focused
        }
    });

    searchBox.addEventListener('blur', () => {
        setTimeout(() => {
            // Delay to allow click event on results container
            if (!resultsContainer.contains(document.activeElement)) {
                resultsContainer.classList.remove('active'); // Hide results container when focus is lost
            }
        }, 100);
    });

    function performSearch() {
        const query = searchBox.value.trim().toLowerCase();
        resultsContainer.innerHTML = ''; // Clear the previous results

        if (query !== '') {
            const filteredCakes = cakes.filter(cake => cake.name.toLowerCase().includes(query));

            if (filteredCakes.length > 0) {
                resultsContainer.classList.add('active'); // Show results container
                filteredCakes.forEach(cake => {
                    const cakeElement = document.createElement('div');
                    cakeElement.classList.add('box');
                    cakeElement.innerHTML = `
                        <img src="${cake.img}" alt="${cake.name}">
                        <h3>${cake.name}</h3>
                        <div class="price">${cake.price}</div>
                        <button class="btnmenu">Add To Cart</button>
                    `;
                    resultsContainer.appendChild(cakeElement);
                });
                // Recalculate the container's height after adding elements
            resultsContainer.style.height = 'auto';
            } else {
                resultsContainer.innerHTML = '<p>No results found</p>';
            }
        } else {
            // Hide the results container if the query is empty
            resultsContainer.classList.remove('active');
        }

        // Reattach cart button event listeners
        attachCartButtonListeners();
    }

    function attachCartButtonListeners() {
        const cartButtons = document.querySelectorAll('.btnmenu');
        cartButtons.forEach(cartButton => {
            cartButton.addEventListener('click', function() {
                const productName = this.parentElement.querySelector('h3').textContent;
                const productPriceText = this.parentElement.querySelector('.price').textContent;
                const productPrice = parseFloat(productPriceText.replace(/[^0-9]/g, ""));
                const productImage = this.parentElement.querySelector('img').src;

                if (cartItems[productName]) {
                    const itemElement = document.querySelector(`.cart-item[data-name="${productName}"] .quantity`);
                    cartItems[productName].quantity += 1;
                    itemElement.textContent = cartItems[productName].quantity;
                } else {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.setAttribute('data-name', productName);

                    cartItems[productName] = {
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    };

                    cartItem.innerHTML = `
                        <img src="${productImage}" alt="${productName}" class="cart-item-image">
                        <span class="textitem">${productName} - ${formatRupiah(productPrice)}</span>
                        <div class="quantity-controls">
                            <button class="minus-btn">-</button>
                            <span class="quantity"> 1 </span>
                            <button class="plus-btn">+</button>
                        </div>
                        <button class="remove-item">Remove</button>
                    `;

                    cartItemContainer.appendChild(cartItem);

                    cartItem.querySelector('.plus-btn').addEventListener('click', function() {
                        cartItems[productName].quantity += 1;
                        cartItem.querySelector('.quantity').textContent = cartItems[productName].quantity;
                        updateCartCount();
                        updateTotalPrice();
                    });

                    cartItem.querySelector('.minus-btn').addEventListener('click', function() {
                        if (cartItems[productName].quantity > 1) {
                            cartItems[productName].quantity -= 1;
                            cartItem.querySelector('.quantity').textContent = cartItems[productName].quantity;
                        } else {
                            removeItem(productName);
                        }
                        updateCartCount();
                        updateTotalPrice();
                    });

                    cartItem.querySelector('.remove-item').addEventListener('click', function() {
                        removeItem(productName);
                    });
                }

                updateCartCount();
                updateTotalPrice();
            });
        });
    }

    function removeItem(productName) {
        delete cartItems[productName];
        const cartItemElement = document.querySelector(`.cart-item[data-name="${productName}"]`);
        cartItemElement.remove();
        updateCartCount();
        updateTotalPrice();
    }

    function updateCartCount() {
        itemCounter = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCounter;
    }

    function updateTotalPrice() {
        const totalPrice = Object.values(cartItems).reduce((total, item) => total + (item.price * item.quantity), 0);
        totalPriceElement.textContent = formatRupiah(totalPrice);
    }

    function formatRupiah(amount) {
        return "Rp. " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    checkoutButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (itemCounter === 0) {
            showNotification('Cart is empty. Please add items before checking out.');
        } else {
            cartItemContainer.innerHTML = '';
            for (let item in cartItems) {
                delete cartItems[item];
            }
            itemCounter = 0;
            cartCount.textContent = itemCounter;
            totalPriceElement.textContent = formatRupiah(0);
            showNotification("Checkout successful! Enjoy your cake");
        }
    });

    // Function to show the notification
    function showNotification(message) {
        var notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(function() {
            notification.classList.remove('show');
        }, 2000);
    }

    // Initial setup for cart buttons
    attachCartButtonListeners();
});




document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active'); 
    resultsContainer.classList.remove('active');// change from 'remove' to 'active'
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
    resultsContainer.classList.remove('active'); // change from 'remove' to 'active'
}




// Alpine.js menu code
document.addEventListener('alpine:init', () => {
    Alpine.data('menu', () => ({
        items: [
            {id: 1, name: 'Orange Cake', img: 'kue 1.jpg', price: 28000},
            {id: 2, name: 'Matcha Cake', img: 'kue 2.jpg', price: 32000},
            {id: 3, name: 'Chocolate Cake', img: 'kue 3.jpg', price: 30000},
            {id: 4, name: 'Carrot Cake', img: 'kue 4.jpg', price: 25000},
            {id: 5, name: 'Blueberries Cake', img: 'kue 5.jpg', price: 30000},
            {id: 6, name: 'Cookies-Cream Cake', img: 'kue 6.jpg', price: 28000},
            {id: 7, name: 'Strawberry-Choco Cake', img: 'kue 7.jpg', price: 32000},
            {id: 8, name: 'Lotus Cake', img: 'kue 8.jpg', price: 40000},
            {id: 9, name: 'Red Velvet Cake', img: 'kue 9.jpg', price: 40000},
            {id: 10, name: 'Rainbow Cake', img: 'kue 10.jpg', price: 45000},
            {id: 11, name: 'Caramel Cake', img: 'kue 11.jpg', price: 35000},
            {id: 12, name: 'Vanilla Cake', img: 'kue 12.jpg', price: 28000},
        ],
        formatRupiah(value) {
            // Function to convert number to Rupiah format with commas
            return "Rp. " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adds commas for thousands and adds Rp. prefix
        },
    }));
});

// Utility function to format currency
const rupiah = (number) => {
    return "Rp. " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Replace periods with commas and add Rp. prefix
};



// Function to load reviews from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadReviewsFromLocalStorage();
});

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('reviewtext').value;
    const rating = document.getElementById('rating').value;

    // Create a new review object
    const review = {
        name: name,
        reviewText: reviewText,
        rating: rating
    };

    // Add review to local storage
    saveReviewToLocalStorage(review);

    // Add review to the DOM
    addReviewToDOM(review);

    // Clear the form after submission
    document.getElementById('reviewForm').reset();
});

// Function to add review to the DOM
function addReviewToDOM(review) {
    // Create a new review box
    const reviewBox = document.createElement('div');
    reviewBox.classList.add('review-box');

    // Add content to the review box
    reviewBox.innerHTML = `
        <h3>${review.name}</h3>
        <p>${review.reviewText}</p>
        <p class="rating">${getStars(review.rating)}</p>
    `;

    // Append the new review to the review container
    document.getElementById('reviewContainer').appendChild(reviewBox);
}

// Function to convert numeric rating to stars
function getStars(rating) {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '');
}

// Function to save review to local storage
function saveReviewToLocalStorage(review) {
    // Get existing reviews from local storage
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Add new review to the array
    reviews.push(review);

    // Save updated reviews array back to local storage
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Function to load reviews from local storage and display them
function loadReviewsFromLocalStorage() {
    // Get reviews from local storage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Loop through each review and add it to the DOM
    reviews.forEach(review => addReviewToDOM(review));
}

// Retrieve data from localStorage or initialize an empty array if it doesn't exist
const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
const registeredPhoneNumbers = JSON.parse(localStorage.getItem('registeredPhoneNumbers')) || [];

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('number').value;
    const notification = document.getElementById('notification');

    // Clear previous notification text and classes
    notification.innerHTML = '';
    notification.className = 'notification';

    // Check if email or phone number is already registered
    if (registeredEmails.includes(email)) {
        notification.innerHTML = 'This email is already registered!';
        notification.classList.add('error'); // Add error class for styling
        notification.style.display = 'block'; // Ensure it is displayed
        return false; // Prevent form submission
    }

    if (registeredPhoneNumbers.includes(phoneNumber)) {
        notification.innerHTML = 'This phone number is already registered!';
        notification.classList.add('error'); // Add error class for styling
        notification.style.display = 'block'; // Ensure it is displayed
        return false; // Prevent form submission
    }

    // If not registered, add email and phone number to arrays
    registeredEmails.push(email);
    registeredPhoneNumbers.push(phoneNumber);

    // Store the updated arrays in localStorage
    localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));
    localStorage.setItem('registeredPhoneNumbers', JSON.stringify(registeredPhoneNumbers));

    
    notification.innerHTML = `Registration successful! You are our member now :)`;
    notification.classList.add('success'); // Add success class for styling
    notification.style.display = 'block'; // Ensure it is displayed

    // Reset the form
    document.getElementById('contactForm').reset();

    // Hide the notification after a few seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide after 3 seconds

    return false; // Prevent form submission for now
}

function validateInput(event) {
    const input = event.target.value;

    // Regular expression to match non-scientific number formats
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (!regex.test(input) && input !== "") {
        event.target.setCustomValidity("Please enter a valid number");
    } else {
        event.target.setCustomValidity("");
    }
}

// new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }

//     },

// })

// bar chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Sales (in IDR)',
            data: [8000000, 15000000, 18000000, 17000000, 22000000, 20000000],
            backgroundColor: [
                '#4bc0c0',  
                '#36a2eb',  
                '#ffce56',  
                '#9933ff',  
                '#ff9f40',  
                '#c9cbd9'   
            ],
            borderColor: [
                '#4bc0c0',  
                '#36a2eb',  
                '#ffce56',  
                '#9933ff',  
                '#ff9f40',  
                '#c9cbd9'   
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data'
            }
        }
    }
});



// Pie Chart
const ctxPie = document.getElementById('pieChart').getContext('2d');

const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Number of Customers',
            data: [130, 185, 250, 170, 320, 200],
            backgroundColor: [
                '#4bc0c0',  
                '#36a2eb',  
                '#ffce56',  
                '#9933ff',  
                '#ff9f40',  
                '#c9cbd9'   
            ],
            borderColor: [
                '#4bc0c0',  
                '#36a2eb',  
                '#ffce56',  
                '#9933ff',  
                '#ff9f40',  
                '#c9cbd9'   
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of Custumers'
            },
            
        }
    }
});