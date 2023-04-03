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
console.log(cart);

// add to cart
function addtocart(id) {
    let selectedProduct = allproducts.find(product => product.id == id);
    cart.push({...selectedProduct});
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();

    //update total
    let total = cart.reduce((acc, item) => {
        return acc + item.price;
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
    let j = 0, total=0; 
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById("cartItem").innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((data, index)=> {
    if (data) {
        let {image, title, price} = data;
        total += parseInt(data.price);
    return (
            `<div class="cart-item">
                <div class='row-img'>
                    <img class="product-image rowimg" src="${data.image}" alt="image">
                </div>
                <h2 class="cart-item-title"; style='font-size:12px; '>${data.title}</h2>
                <h2 style='font-size:15px;'>$ ${data.price}.00</h2>
                <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
            </div>`);
        }
        j++;
}).join('');
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("total").innerHTML = "$ " + total.toFixed();
  }

}

displaycart();