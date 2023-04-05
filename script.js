let allproducts = [];
fetch('https://fakestoreapi.com/products').then((data)=> {
    return data.json();
    }).then((completedata)=> {
    allproducts = completedata;
        let data1="";
        completedata.map((values, i)=> {
            let description = values.description;
            data1+=`
            <div class="card">
                <div class="product-image-container">
                <img class="product-image cart-item-image" src="${values.image}" width="100" height="100"" alt="image">
                </div>
                <h2 class="product-title">${values.title}</h2>
                <p>${description.length > 50 ? description.substring(0, 50).concat('...more'):description}</p>
                <p class="category">${values.category}</p>
                <div class="product-price-container d-flex justify-content-around">
                    <p class="price text-center fs-5 fw-semibold">${values.price}</p>
                </div>
                    <button class="btn btn-warning btn-sm btn-hover" data-index="${values.id}" onclick='addtocart(${values.id})'>Add to cart</button>
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
    } else {
        selectedProduct.quantity = 1;
        cart.push(selectedProduct);
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
    let j = 0, total=0, shippingFee=4; 
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
            `<div class="cart-item">
                <input type="checkbox" class="checkbox" data-index="${index}">
                <div class='row-img'>
                    <img class="product-image rowimg" src="${data.image}" alt="image">
                </div>
                <h2 class="cart-item-title"; style='font-size:10px; '>${data.title}</h2>
                <h2 style='font-size:13px;'>$ ${data.price}</h2>
                <input class="cart-quantity-input" type="number" value="${data.quantity}" min="1" data-index="${index}">
                <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
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
        let quantity = parseInt(event.target.value); //value
        let index = parseInt(event.target.dataset.index); //index
        if (quantity > 0) {
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displaycart();
        }
    });
});
}


//purchase button
const purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', purchaseItems);

function purchaseItems() {
    const cart = document.getElementById('cart');
    const data = cart.querySelectorAll('.cartItem');
    const checkedItems = [];

    for(let i = 0; i < data.length; i++) {
        const item = data[i];
        const checkbox = data.querySelector('.checkbox');

        if (checkbox.checked) {
            checkedItems.push(index);
        }
    }
    checkedItems.forEach(index => data.remove());
    alert('Thank you for your purchase');
}



displaycart();