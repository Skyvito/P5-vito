// Je recupere la localisation qui va me permettre de récupérer l'id de l'url

const url = document.location;
console.log(url);
// J'utilise new url pour pouvoir utiliser  searchParams et searchParams pour pouvoir utiliser l'id grace a get

const urlSearchParams = new URL(url).searchParams;
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
console.log(id);

// J'utilise la méthode fetch pour récupérer les informations sur le produit en utilisant l'ID. j'utilise ensuite la méthode then pour parser les données JSON et appelle la fonction displayProduct pour afficher les détails du produit sur la page.
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

//Je prends en entrée les détails du produit et les utilise pour créer et ajouter des éléments HTML sur la page, image,  titre,  prix, description et des options de couleur pour le produit.
const displayProduct = (product) => {
    console.log(product);
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

// Elle vérifie si une couleur a été choisie et si la quantité est comprise entre 1 et 100. Si ces conditions sont remplies, elle ajoute l'article au panier en utilisant les données stockées dans localStorage. Si ces conditions ne sont pas remplies, elle affiche un message d'erreur et empêche l'utilisateur de cliquer sur le bouton à nouveau pendant 2 secondes
buttonPanier.addEventListener("click", () => {
    const quantity = document.getElementById("quantity");

    const color = document.getElementById("colors");

    if (color.value != 0 && quantity.value <= 100 && quantity.value > 0) {
        let cart = JSON.parse(localStorage.getItem("cart"));

        if (!cart) {
            cart = [];
        }

        let settingQuantity = cart.find(
            (product) => product.id === id && product.color === color.value
        );

        if (settingQuantity) {
            settingQuantity.quantity += parseInt(quantity.value);
        } else {
            const product = {
                id: id,
                color: color.value,
                quantity: parseInt(quantity.value),
            };
            cart.push(product);
        }

        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        let erreur = document.createElement("P");
        erreur.innerText =
            "Veuillez Choisir une couleur et une quantité de 1 a 100";
        erreur.style.color = "black";
        erreur.style.fontWeight = "bold";
        erreur.style.fontSize = "19px";

        let parentsErreur = document.querySelector(
            ".item__content__settings__quantity"
        );
        parentsErreur.appendChild(erreur);
        buttonPanier.disabled = true;
        setTimeout(() => {
            erreur.innerText = "";
            buttonPanier.disabled = false;
        }, 2000);
    }
});
