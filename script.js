function validateForm() {
    let hasError = false;
    //RESET ERROR
    const formErrors= document.getElementsByClassName('form-error');
    for(let fe of formErrors) {
        fe.textContent = '';
        fe.classList.add('d-none');
    }
    //  EMAIL VALIDATION
    const emailAddressInput = document.getElementById('email');
    if (emailAddressInput.value === '') {
        const emailAddressError = document.getElementById('email-address-error');
        emailAddressError.classList.remove('d-none');
        emailAddressError.textContent = 'Email address is required';
        hasError = true;
    }
    //PASSWORD VALIDATION
    let passwordErrorText = '';
    const passwordError = document.getElementById('password-error');
    const passwordInput = document.getElementById('pwd');
    if (passwordInput.value === '') {
        passwordError.classList.remove('d-none');
        passwordErrorText += 'Password is required\n';
        hasError = true;
    } else if (passwordInput.value.length < 8) {
        passwordError.classList.remove('d-none');
        passwordErrorText += 'Password must contain at least 8 characters\n';
        hasError = true;
    }
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.classList.remove('d-none');
        passwordErrorText += 'Password did not match';
        hasError = true;
    }

    passwordError.textContent = passwordErrorText;

    const firstNameInput = document.getElementById('fname');
    if (firstNameInput.value === '') {
        const firstNameError = document.getElementById('first-name-error');
        firstNameError.classList.remove('d-none');
        firstNameError.textContent = 'First name is required';
        hasError = true;
    }
        const lastNameInput = document.getElementById('lname');
    if (lastNameInput.value === '') {
        const lastNameError = document.getElementById('last-name-error');
        lastNameError.classList.remove('d-none');
        lastNameError.textContent = 'Last name is required';
        hasError = true;
    }

    //AGE VALIDATION
    const age = document.getElementById('age');
    if (age.value < 18) {
        const ageError = document.getElementById('age-error');
        ageError.classList.remove('d-none');
        ageError.textContent = 'User Should be 18 years old and above';
        hasError = true;
    }
    const terms = document.getElementById('terms');
    const termsError = document.getElementById('terms-error');
    if (!terms.checked ) {
        termsError.textContent = 'Please agree to the terms and conditions'
        termsError.classList.remove('d-none');
        hasError = true;
       }
    
       if (!hasError) {
        signUp(event);
    } else {
        window.scrollTo(0, 0);
    }

}
function alertSuccess() {
    alert('Successfully registered!');
    }

//FORM VALIDATION LOGIN PAGE
function valicateLogin(){

}

const signUp = e => {
let fname = document.getElementById('fname').value,
lname = document.getElementById('lname').value,
email = document.getElementById('email').value,
pwd = document.getElementById('pwd').value;

let formData = JSON.parse(localStorage.getItem('formData')) || [];

let exist = formData.length && 
JSON.parse(localStorage.getItem('formData')).some(data => 
    data.fname.toLowerCase() == fname.toLowerCase() && 
    data.lname.toLowerCase() == lname.toLowerCase()
);

if(!exist){
formData.push({ fname, lname, email, pwd });
localStorage.setItem('formData', JSON.stringify(formData));
document.querySelector('form').reset();
document.getElementById('fname').focus();
alert("Account Created.\n\nPlease Sign In using the link below.");
location.href = "login.html"
}
else{
alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
}
e.preventDefault();
}
// function updateContent(name){
//         let welcome=getElementById('brand');
//         welcome.textcontent="hello";
// }
function signIn(e) {
// let welcome=getElementById('brand');
let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
let formData = JSON.parse(localStorage.getItem('formData')) || [];
let exist = formData.length && 
JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);

if(!exist){
alert("Incorrect login credentials");

}
else{
location.href = "index.html";
// loggedin=true;
// return true;

}

e.preventDefault();
}

let formData = JSON.parse(localStorage.getItem('formData'))
console.log(formData)

//fakestore fetch

let allproducts = [];
fetch('https://fakestoreapi.com/products').then((data)=> {
    return data.json();
    }).then((completedata)=> {
    allproducts = completedata;
        let data1="";
        completedata.map((values, i)=> {
            let description = values.description;
            let cardTitle= values.title;
            data1+=`
            <div class="card mt-3 id="card-id mx-auto">
                <div class="product-image-container">
                    <img class="product-image cart-item-image" src="${values.image}"  alt="image">
                </div>
                <div class="title-description d-flex flex-column">
                    <a href="productpage.html?title=${values.title}&description=${values.description}&image=${values.image}&category=${values.category}&price=${values.price}&rating=${values.rating.rate}&count=${values.rating.count}&id=${values.id}&" target="_blank"><p class="product-title">${cardTitle.length > 30 ? cardTitle.substring(0, 30).concat('...'):cardTitle}</p></a>
                    <p class = "product-description">${description.length > 30 ? description.substring(0, 30).concat('...'):description}</p>
                    <p class="category">${values.category}</p>
                    
                </div> 
                <div class="product-price-container d-flex justify-content-around align-items-center">
                    <p class="price text-center fs-5 fw-semibold">$${values.price}</p>
                    <button class=" add-to-cart-product" data-index="${values.id}" onclick='addtocart(${values.id})'>Add to cart</button>
                </div>
            </div>
                `;
            });

        document.getElementById("cards").innerHTML=data1;
    }).catch((err)=> {
        console.log(err);
    })

cart = JSON.parse(localStorage.getItem('cart')) || [];

// add to cart
function addtocart(id) {
    let selectedProduct = allproducts.find(product => product.id == id);
    let existingItemIndex = cart.findIndex(item => item.id === selectedProduct.id);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
        alert('Item already exist in cart. Adding quantity..');
    } else {
        selectedProduct.quantity = 1;
        cart.push(selectedProduct);
        alert('new item will be added to cart');
    }
    //cart.push({...selectedProduct});
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();

    //update total
    let total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    document.getElementById("total").innerHTML = "$ " + total.toFixed();
  }

  // delete element
function delElement(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displaycart();

        // update total
        let total = cart.reduce((acc, item) => {
        return acc + item.price;
        }, 0);
        document.getElementById("total").innerHTML = "$ " + total.toFixed();
    }

function displaycart() {
    let j = 0, total=0, shippingFee=2; 
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById("cartItem").innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((data, index)=> {
    if (data) {
        let {image, title, price, input} = data;
        total += parseInt(data.price * data.quantity + shippingFee);
    return (
            `<div class="cart-item checked">
                <input type="checkbox" class="checkbox" data-index="${index}">
                <div class='row-img width:20%;'>
                    <img class="product-image rowimg" src="${data.image}" alt="image">
                </div>
                <h2 class="cart-item-title"; style='font-size:.8rem; width:50%; '>${data.title}</h2>
                <h2 style='font-size:1rem; font-weight:bold;'>$ ${data.price}</h2>
                <input class="cart-quantity-input"  type="number" value="${data.quantity}" min="1" data-index="${index}">
                <i class='fa-solid fa-trash' style='width:6%;' onclick='delElement(${index})'></i>
            </div>
            
            `);
        }
        j++;
}).join('');
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("total").innerHTML = "$ " + total.toFixed();
  }

  // quantity inputs check if input is a valid or not negative
let quantityInputs = document.querySelectorAll(".cart-quantity-input");
    quantityInputs.forEach(input => {
    input.addEventListener("change", (event) => {
        let quantity = parseInt(event.target.value);
        let index = parseInt(event.target.dataset.index);
        if (quantity > 0) {
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displaycart();
        }
    });
});
}
// let loggedin="";
// delete the checked item when the purchase button is clicked
document.getElementById("purchaseButton").addEventListener("click", function() {
    // if (!loggedin){
    //     alert("you are not logged in");
    // }else{
    var checkedItems = document.querySelectorAll(".cart-item input:checked");
    for (var i = 0; i < checkedItems.length; i++) {
        checkedItems[i].parentNode.remove();
        
    }alert('Your order is received and being process');
});

// display cart section when the cart icon is clicked
document.querySelector('.fa-cart-shopping').addEventListener('click', () => {
  document.querySelector('.cart-section').style.display = 'block';
});

// hide the cart section when the store icon is clicked
document.querySelector('.fa-store').addEventListener('click', () => {
  document.querySelector('.cart-section').style.display = 'none';
});

displaycart();

//view-product
const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const title = urlParams.get('title');
const description = urlParams.get('description');
const image = urlParams.get('image');
const rating = urlParams.get('rating');
const count = urlParams.get('count');
const price = urlParams.get('price');
const category = urlParams.get('category');
const productID = urlParams.get('id');
console.log(productID)

let productTitle = document.getElementById('product-title');
let productDescription =  document.getElementById('product-description');
let productImage =  document.getElementById('product-image');
let productRating = document.getElementById('rating');
let productCategory = document.getElementById('category');
let productPrice = document.getElementById('price');



productTitle.innerHTML = title;
productDescription.innerHTML = description;
productImage.src=image;
productRating.innerHTML = count +" "+ "ratings";
productCategory.innerHTML = category;
productPrice.innerHTML = "$"+price;
//star ratings
document.getElementById("stars").innerHTML = getStars(rating);
function getStars(rating) {
    
// Round to nearest half
rating = Math.round(rating * 2) / 2;
let output = [];
    let i=0;
// Append all the filled whole stars
for (let i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

// If there is a half a star, append it
if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

// Fill the empty stars
for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gray;"></i>&nbsp;');

return output.join('');
}
