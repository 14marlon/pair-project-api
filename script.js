fetch('https://fakestoreapi.com/products').then((data)=> {
    // console.log(data);
    return data.json();
}).then((completedata)=> {
    // console.log(completedata[2].title);
    // document.getElementById('root').
    // innerHTML = completedata[2].title;
    let data1="";
    completedata.map((values)=> {
        let description = values.description;
        data1+=`
        <div class="card ">
            <div class="product-image-container"><img class="product-image" src="${values.image}" alt="image"></div>
            <h2 class="product-title">${values.title}</h2>
            <p>${description.length > 80 ? description.substring(0, 80).concat('...more'):description}</p>
            <p class="category">${values.category}</p>
            <p class="price text-center">${values.price}</p>
        </div>
        `;
    });
    document.getElementById("cards").innerHTML=data1;
}).catch((err)=> {
    console.log(err);
})