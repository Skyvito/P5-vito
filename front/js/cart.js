let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);
let totalPrice = 0;
let totalArticle = 0;

cart.forEach((element) => {
    fetch("http://localhost:3000/api/products/" + element.id)
        .then((reponse) => reponse.json())
        .then((product) => {
            displayProduct(product, element);
        }); /*
        .then(() => {
            // fetch("http://localhost:3000/api/products/" + element.id)
            //     .then((reponses) => reponses.json())
            //     .then((products) => {
            //         console.log(products);
            //         localStorage.setItem("tab", JSON.stringify(products._id));
        });*/
});
// });

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
    divQuantity.appendChild(inputQuantity);

    const divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    divSetting.appendChild(divDelete);

    const deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerText = "Supprimer";
    divDelete.appendChild(deleteItem);

    const quantityTotal = document.getElementById("totalPrice");
    totalPrice += element.quantity * product.price;
    quantityTotal.innerText = totalPrice;

    const ArticleNumber = document.getElementById("totalQuantity");

    totalArticle = totalArticle + parseInt(element.quantity);
    ArticleNumber.innerText = totalArticle;
};

const btnFomulaire = document.getElementById("order");

// Au click du bouton je récupère les valeurs du formulaire dans le local storage
// click
btnFomulaire.addEventListener("click", (e) => {
    e.preventDefault();
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

    sendOrder(order);
});

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
        document.location.href = "confirmation.html?id=" + response.orderId;
    });
    console.log(data);
    console.log(response);
};
