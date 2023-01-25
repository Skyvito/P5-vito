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

    // si la couleur n'est pas égal a 0 donc couleur pas choisie alors ça ne marche pas et si la quantité n'est pas entre 100 et 0 alors ça ne marche pas
    // J'utilise les ET logique pour rajouter des contraintes pour l'excution du produit si un est pas respecté alors ça ne s'applique pas

    if (color.value != 0 && quantity.value <= 100 && quantity.value > 0) {
        // si la carte existe deja alors on creer sinon ou creer pas on saute le if ça nous permet d'avoir un seul tableau avec tous les éléments
        // et de rajouter a chaque ajout de canape dans la meme cart
        let cart = JSON.parse(localStorage.getItem("cart"));

        if (!cart) {
            cart = [];
        }
        /*
        if (
            cart.some(
                (product) => product.id === id && product.color === color.value
            )
        ) {
            cart = cart.map((product) => {
                if (product._id === id && product.color === color.value) {
                    product.quantity += parseInt(quantity.value);
                }
                return product;
            });
        } else {
            const product = {
                id: id,
                color: color.value,
                quantity: parseInt(quantity.value),
            };
            cart.push(product);
        }
*/
        //  je vais chercher la valeur qui correspond a mes conditions grace a .find
        let settingQuantity = cart.find(
            (product) => product.id === id && product.color === color.value
        );

        // utilise le settingQuantity.quantity a la place de product.quantity car en déclarant la varible settingQuantity
        // on a incrémenté product donc elle a pris ça valeur
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

        // console.log(settingQuantity);

        console.log(cart);

        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        let erreur = document.createElement("h3");
        erreur.innerText =
            "Veuillez Choisir une couleur et une quantité de 1 a 100";
        erreur.style.color = "black";

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
