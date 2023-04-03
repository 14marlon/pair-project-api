fetch('https://fakestoreapi.com/products').then((data)=> {
    // console.log(data);
    return data.json();
}).then((completedata)=> {
    // console.log(completedata[2].title);
    // document.getElementById('root').
    // innerHTML = completedata[2].title;
    let data1="";
    completedata.map((values, i)=> {
        let description = values.description;
        data1+=`
        <div class="card">
            <div class="product-image-container"><img class="product-image cart-item-image" src="${values.image}" width="100" height="100"" alt="image"></div>
            <h2 class="product-title">${values.title}</h2>
            <p>${description.length > 50 ? description.substring(0, 50).concat('...more'):description}</p>
            <p class="category">${values.category}</p>
            <div class="product-price-container d-flex justify-content-around">
                <p class="price text-center fs-5 fw-semibold">${values.price}</p>
            </div>
            <button class="btn btn-warning btn-sm btn-hover" onclick='addtocart("${i}")'>Add to cart</button>
            </div>
        </div>
            `;
        });
        document.getElementById("cards").innerHTML=data1;
        
    document.getElementById("cards").innerHTML=data1;
}).catch((err)=> {
    console.log(err);
})

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let data = "";
let values = "";

function addtocart(values) { //removed a
    // values = completedata[a];
    cart.push({...values}); // if [a] is ommitted it did'nt work removed[a]
    displaycart();
}
function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}
function displaycart() {
    let j = 0, total=0; 
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ 0.00";
} else {
    document.getElementById("cartItem").innerHTML = cart.map((data)=> {
        if (data) {
        let {image, title, price} = data;
        total=total+data.price;
        return(
            `<div class="cart-item">
                <div class='row-img'>
                    <img class="product-image rowimg" src="${data.image}" alt="image">
                </div>
                <h2 class="cart-item-title"; style='font-size:12px; '>${data.title}</h2>
                <h2 style='font-size:15px;'>$ ${data.price}.00</h2>
                <i class='fa-solid fa-trash' onclick='delElement(${j})'></i>
            </div>`
        );
    }
    j++;
}).join('');
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("total").innerHTML = "$ " + total + ".00";
  }

}

displaycart();

//cart section 1
// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }

// function ready() {
//     let removeCartItemButtons = document.getElementsByClassName('btn-danger');
//     console.log(removeCartItemButtons);
//     for (let i = 0; i < removeCartItemButtons.length; i++) {
//         let button = removeCartItemButtons[i]
//         button.addEventListener('click', removeCartItem)
//     }
// // quantity inputs
//     let quantityInputs = document.getElementsByClassName('cart-quantity-input')
//     for (let i = 0; i < quantityInputs.length; i++) {
//         let input = quantityInputs[i]
//         input.addEventListener('change', quantityChanged)
//     }
//     //add to cart button
//     let addToCartButtons = document.getElementsByClassName('shop-item-button')
//     for (let i = 0; i < addToCartButtons.length; i++) {
//         let button = addToCartButtons[i]
//         button.addEventListener('click', addToCartClicked)
//     }

//     document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }

// function purchaseClicked() {
//     alert('Thank you for your Purchase')
//     let cartItems = document.getElementsByClassName('cart-items')[0]
//     while (cartItems.hasChildNodes()) {
//         cartItems.removeChild(cartItems.firstChild)
//     }
//     updateCartTotal()
// }

// function removeCartItem(event) {
//     let buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
// }

// // check if input is a valid number or not a negative number
// function quantityChanged(event) {
//     let input = event.target
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateCartTotal()
// }

// //add to cart
// function addToCartClicked(event) {
//     let button = event.target
//     let shopItem = button.parentElement.parentElement
//     let title = shopItem.getElementsByClassName('product-title')[0].innerText
//     let price = shopItem.getElementsByClassName('price')[0].innerText
//     let imageSrc = shopItem.getElementsByClassName('product-image')[0].src
//     console.log(title, price, imageSrc)
//     updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc) {
//     let cartRow = document.createElement('div')
//     cartRow.classList.add('cart-row')
//     let cartItems = document.getElementsByClassName('cart-items')[0]
//     let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//     for (let i = 0; i < cartItemNames.length; i++) {
//         if (cartItemNames[i].innerText == title) {
//             alert('This item is already added to the cart')
//             return
//         }
//     }
//     let cartRowContents = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div> `
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }


// //update cart total
// function updateCartTotal() {
//     let cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     let cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     let total = 0
//     for (let i = 0; i < cartRows.length; i++) {
//         let cartRow = cartRows[i]
//         let priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         console.log(priceElement, quantityElement)
//         let price = parseFloat(priceElement.innerText.replace('$', ''))
//         let quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100     //prevent long decimal numbers
//     document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
// }
//hide cart