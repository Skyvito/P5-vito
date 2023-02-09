// je  récupère la valeur de l'article "panier" du localStorage et le parse pour pouvoir l'utiliser

let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

//je définis le prix total et le prix article a 0
let totalPrice = 0;
let totalArticle = 0;

// Je boucle sur cart avec foreach pour parcourir tous les éléments du panier et je récupère  les données des produits avec les id spécifier par element.id et transforme la réponse en .json une fois récupéré j'appelle la fonction displayproduct en passant les éléments product et element
cart.forEach((element) => {
    fetch("http://localhost:3000/api/products/" + element.id)
        .then((reponse) => reponse.json())
        .then((product) => {
            displayProduct(product, element);
        });
});

//  J'affiche les informations sur les produit dans la page HTML. La fonction crée des éléments HTML tels que des articles, des images, des titres, des paragraphes et des entrées de formulaire, puis les ajoute à des éléments HTML existant. La fonction attribue également des écouteurs d'événements à certains des éléments créés pour gérer la modification de la quantité et la suppression de l'article. Enfin, la fonction met à jour le total des prix et des articles.
const displayProduct = (product, element) => {
    const item = document.getElementById("cart__items");
    const article = document.createElement("Article");
    article.className = "cart__item";
    article.setAttribute("data-id", element.id);
    article.setAttribute("data-color", element.color);
    item.appendChild(article);

    const divItemimg = document.createElement("div");
    divItemimg.className = "cart__item__img";
    article.appendChild(divItemimg);

    const imageProduit = document.createElement("img");
    imageProduit.setAttribute("src", product.imageUrl);
    imageProduit.setAttribute("alt", product.description);
    divItemimg.appendChild(imageProduit);

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart__item__content";
    article.appendChild(itemDiv);

    const divItemDescription = document.createElement("div");
    divItemDescription.className = "cart__item__content__description";
    itemDiv.appendChild(divItemDescription);

    const nameProduct = document.createElement("h2");
    nameProduct.innerText = product.name;
    divItemDescription.appendChild(nameProduct);

    const couleurName = document.createElement("p");
    couleurName.innerText = element.color;
    divItemDescription.appendChild(couleurName);

    const Price = document.createElement("p");
    Price.innerText = product.price + "€";
    divItemDescription.appendChild(Price);

    const divSetting = document.createElement("div");
    divSetting.className = "cart__item__content__settings";
    itemDiv.appendChild(divSetting);

    const divQuantity = document.createElement("div");
    divQuantity.className = "cart__item__content__settings__quantity";
    divSetting.appendChild(divQuantity);

    const quantityName = document.createElement("p");
    quantityName.innerText = "Quantité :";
    divQuantity.appendChild(quantityName);

    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.className = "itemQuantity";
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", element.quantity);

    //C'est un addEventListener pour le changement de quantité elle utilise l'événement "change" sur le champ de input de la quantité pour déclencher la fonction
    inputQuantity.addEventListener("change", function (e) {
        let errorInputQuantity = inputQuantity.value;
        // Ici on veut que si la valeur de l'élément est de  0 alors j'affiche une erreur et supprime cet élément puis met à jour le localstorage pour enfin recharger la page
        if (e.target.value == 0) {
            const index = cart.indexOf(element);
            alert("Il y a plus de canapé, Votre canapé va être supprimé");

            cart.splice(index, 1);
            console.log(element);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();

            // Sinon si la valeur est au-dessus de 100 où inférieur a 1 alors j'appelle la fonction errorSetting en plaçant les éléments (e, errorInputQuantity, element)
        } else if (e.target.value > 100 || e.target.value < 1) {
            errorSetting(e, errorInputQuantity, element);
            //Sinon j'appelle les fonctions changeQuantity et updateTotalPrice
        } else {
            changeQuantity(e, element);
            updateTotalPrice();
        }
    });

    divQuantity.appendChild(inputQuantity);

    const divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    divSetting.appendChild(divDelete);

    // Si je click sur deleteItem j'appelle la fonction deleteFunction
    const deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerText = "Supprimer";
    divDelete.appendChild(deleteItem);
    deleteItem.addEventListener("click", () => {
        deleteFunction(element);
    });

    // Je mets à jour le prix
    const quantityTotal = document.getElementById("totalPrice");
    totalPrice += element.quantity * product.price;
    quantityTotal.innerText = totalPrice;

    const ArticleNumber = document.getElementById("totalQuantity");
    // Je mets à jour les nombres totals d'articles
    totalArticle = totalArticle + parseInt(element.quantity);
    ArticleNumber.innerText = totalArticle;
};

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

let firstnameTrue = false;
let lastNameTrue = false;
let adresseTrue = false;
let cityTrue = false;
let emailTrue = false;

//Je dois commencer par une majuscule et suivies par lettres majuscule ou minuscule et qui peut contenir certains caractères spéciaux
const RegexLettre = /^[A-Z][A-Za-z\é\è\ê\ë\-]+$/;

//Il doit y avoir au moins deux mots séparés par un espace qui commence par des lettres ou chiffres
const RegexAddress =
    /^[a-zA-Z0-9\é\è\ê\ë\-]+(?:[\s][a-zA-Z0-9\é\è\ê\ë\-]+){2,}$/;

//Je dois commencer par certains caractères spéciaux ou lettre et chiffre suivis d'un @ suivis de lettres / chiffres caractères spéciaux suivi d'un point suivis de lettre

const RegexEmail = /^[A-Za-z0-9_!'+\/=?`{|}^.-éèêë]+@[A-Za-z0-9.-]+[.][a-z]+$/;

//Cette fonction permet de faire une sécurité sur les formulaires en utilisant des regexs et des conditions si les conditions ne sont pas réspectées alors j'envoie une erreur sinon j'envoie rien et je donne une valeur true à un élement

firstName.addEventListener("input", () => {
    if (!RegexLettre.test(firstName.value)) {
        firstNameErrorMsg.innerText =
            "Veuillez écrire votre prénom en commençant par une majuscule";
    } else if (firstName.value.length < 3 || firstName.value.length > 15) {
        firstNameErrorMsg.innerText =
            "Votre prénom doit contenir entre 3 et 15 lettres";
    } else {
        firstNameErrorMsg.innerText = "";
        firstnameTrue = true;
    }
});

lastName.addEventListener("input", () => {
    if (!RegexLettre.test(lastName.value)) {
        lastNameErrorMsg.innerText =
            "Veuillez écrire votre nom en commençant par une majuscule";
    } else if (lastName.value.length < 3 || lastName.value.length > 15) {
        lastNameErrorMsg.innerText =
            "Votre prénom doit contenir entre 3 et 15 lettres";
    } else {
        lastNameErrorMsg.innerText = "";
        lastNameTrue = true;
    }
});

address.addEventListener("input", () => {
    if (!RegexAddress.test(address.value)) {
        addressErrorMsg.innerText = "Veuillez entrer votre adresse";
    } else addressErrorMsg.innerText = "";
    adresseTrue = true;
});

city.addEventListener("input", () => {
    if (!RegexLettre.test(city.value)) {
        cityErrorMsg.innerText = "Veuillez entrer le nom de votre Ville";
    } else if (city.value.length < 3 || city.value.length > 15) {
        cityErrorMsg.innerText = "Veuillez entrer le nom de votre Ville";
    } else {
        cityErrorMsg.innerText = "";
        cityTrue = true;
    }
});

email.addEventListener("input", () => {
    if (!RegexEmail.test(email.value)) {
        emailErrorMsg.innerText = "Veuillez entrer votre adresse mail";
    } else {
        emailErrorMsg.innerText = "";
        emailTrue = true;
    }
});

// Au click du bouton je récupère les valeurs du formulaire  ainsi que la liste des id de produits si tout le formulaire n'est pas true ou qu'il y a plus d'article dans le panier alors j'envoie pas le formulaire et affiche une erreur sinon j'appelle la fonction pour envoyer le formulaire
const btnFomulaire = document.getElementById("order");
btnFomulaire.addEventListener("click", (e) => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    productsId = [];

    cart.forEach((element) => {
        productsId.push(element.id);
    });

    let order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        },
        products: productsId,
    };

    console.log(order);
    if (
        firstnameTrue == false ||
        lastNameTrue == false ||
        adresseTrue == false ||
        cityTrue == false ||
        emailTrue == false
    ) {
        alert("Veuillez valider et remplir correctement  le formulaire");
    } else if (cart.length == 0) {
        alert("Aucun article dans le panier");
    } else {
        sendOrder(order);
    }
});

//Cette fonction permet d'envoyer une commande à un serveur. Elle utilise la méthode fetch pour envoyer une requête POST au serveur et place mon order dans le body en utilisant JSON.stringify puis j'utilise .json pour avoir la réponse du serveur et enfin une fois la réponse obtenue, la page actuelle est redirigée vers la page de confirmation en ajoutant l'orderid de la commande à l'URL

const sendOrder = async (order) => {
    const response = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            Accept: "appliction/json",
            "Content-Type": "application/json",
        },
    });

    const data = await response.json().then((response) => {
        localStorage.removeItem("cart");
        document.location.href = "confirmation.html?id=" + response.orderId;
    });
    console.log(data);
    console.log(response);
};

// Cette fonction permet d'afficher une erreur si la quantité est supérieure a 100 où inférieur à 1 et retourner la valeur à sa précédente en lui donnant sa valeur element.quantity.
const errorSetting = (e, errorInputQuantity, element) => {
    if (errorInputQuantity > 100 || errorInputQuantity < 1) {
        alert("La quantité doit être comprise entre 1 et 100");
        e.target.value = element.quantity;
        console.log(element.quantity);
    }
};

//Cette fonction permet de supprimer le produit au click j'utilise la méthode splice pour enlever l'élément spécifié du tableau cart en utilisant son index, puis je mets à jour cart enfin, la page est rechargée pour que les modifications puissent être affichées à l'utilisateur.
const deleteFunction = (element) => {
    let index = cart.indexOf(element);
    console.log(index);
    cart.splice(index, 1);
    console.log(element);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};

//Cette fonction permet de changer la quantité total d'article dans le panier. La fonction commence par trouver le produit dans le panier en utilisant la méthode find sur l'objet cart. Si le produit existe dans le panier, la quantité de l'élement est mise à jour en utilisant la valeur saisie par l'utilisateur. Ensuite, le panier est mis à jour en utilisant localStorage.setItem pour stocker les modifications dans le stockage local du navigateur. Enfin,

const changeQuantity = (e, element) => {
    const cartProduct = cart.find(
        (product) => element.id == product.id && element.color == product.color
    );
    if (cartProduct) {
        cartProduct.quantity = parseInt(e.target.value);

        localStorage.setItem("cart", JSON.stringify(cart));
        let modifQuantity = 0;
        console.log(element.quantity);
        //la quantité totale de produits dans le panier est mise à jour en parcourant tous les produits dans le panier et en ajoutant leur quantité.
        for (const products of cart) {
            modifQuantity = modifQuantity + parseInt(products.quantity);
            console.log(products);
        }
        // console.log(modifQuantity);
        document.getElementById("totalQuantity").innerText = modifQuantity;
    }
};

//Cette fonction est utilisée pour mettre à jour le prix total du panier. La fonction définit une variable totalPrice à 0 pour enregistrer le prix total. Ensuite, elle utilise la méthode forEach sur l'objet cart pour itérer sur chaque élément du panier, elle retourne les informations du produit correspondant à l'ID de l'élément. Lorsque la réponse est reçue, elle est convertie en JSON et enregistrée dans la variable product. Ensuite, la fonction ajoute le prix de ce produit (calculé en multipliant la quantité par le prix ) au total de prix.
const updateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((element) => {
        fetch("http://localhost:3000/api/products/" + element.id)
            .then((response) => response.json())
            .then((product) => {
                console.log(product.price);
                console.log(element.quantity);
                totalPrice += element.quantity * product.price;
                console.log(totalPrice);
                document.getElementById("totalPrice").innerText = totalPrice;
            });
    });
};
