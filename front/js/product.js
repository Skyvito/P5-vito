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
    const color = document.getElementById("colors");

    let card = JSON.parse(localStorage.getItem("card"));

    

    if (!card) {
        card = [];
    }

    const product = {
        id: id,
        color: color.value,
        quantity: quantity.value,
    };

    card.push(product);

    console.log(card);

    localStorage.setItem("card", JSON.stringify(card));
});

