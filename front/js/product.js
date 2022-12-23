const url = window.location.search;
const urlSearchParams = new URLSearchParams(url);
const id = urlSearchParams.get("id");

const fetchproduct = async (id) => {
    try {
        await fetch(`http://localhost:3000/api/products/${id}`)
            .then((reponse) => reponse.json())
            .then((product) => {
                displayProduct(product);
            });
    } catch (error) {
        console.log(error);
    }
};

const displayProduct = (product) => {
    const imgElement = document.createElement("img");
    const itemImg = document.querySelector(".item__img");
    imgElement.setAttribute("src", product.imageUrl);
    imgElement.setAttribute("alt", product.altTxt);
    itemImg.appendChild(imgElement);

    const titre = document.getElementById("title");
    titre.innerText = product.name;

    const prixElement = document.getElementById("price");
    prixElement.innerText = product.price;

    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;

    let colors = document.querySelector("#colors");

    product.colors.forEach((color) => {
        let options = document.createElement("option");

        options.innerText = color;

        colors.appendChild(options);
    });
};

fetchproduct(id);

const buttonPanier = document.getElementById("addToCart");
buttonPanier.addEventListener("click", () => {
    const quantity = document.getElementById("quantity");

    while (quantity.value <= 0) {
        parseInt(quantity.value);
    }

    const color = document.getElementById("colors");

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
        cart = [];
    }

    const product = {
        id: id,
        color: color.value,
        quantity: quantity.value,
    };

    cart.push(product);

    console.log(cart);

    localStorage.setItem("cart", JSON.stringify(cart));
});
