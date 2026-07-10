const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function loadProduct() {

    const response = await fetch(
        `http://localhost:3000/api/products/${id}`
    );

    const product = await response.json();

    document.getElementById("product").innerHTML = `

    <img src="images/laptop${product.id}.jpg"
     alt="${product.name}"
     style="width:300px;border-radius:12px;margin-bottom:20px;">

        <h1>${product.name}</h1>

        <p class="category">
            Electronics
        </p>

        <div class="rating">

            ⭐⭐⭐⭐⭐ (125 Reviews)

        </div>

        <h2 class="price">

            ₹${product.price}

        </h2>

        <p>

            <strong>Description</strong>

            <br><br>

            ${product.description}

        </p>

        <p class="stock">

            In Stock : ${product.stock}

        </p>

        <div class="buy-buttons">

            <button
                class="cartBtn"
                onclick="addToCart(${product.id})">

                Add To Cart

            </button>

            

        </div>

        <br>

        <button class="backBtn" onclick="history.back()">

            ← Back

        </button>

    `;
}

async function addToCart(productId){

    const response = await fetch(
        "http://localhost:3000/api/cart/add",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                user_id:1,

                product_id:productId,

                quantity:1

            })

        }
    );

    const data = await response.json();

    alert(data.message);

}

loadProduct();