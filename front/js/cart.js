let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);
let totalPrice = 0;
let totalArticle = 0;

cart.forEach((element) => {
    fetch("http://localhost:3000/api/products/" + element.id)
        .then((reponse) => reponse.json())
        .then((product) => {
            displayProduct(product, element);
        });
});

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

    inputQuantity.addEventListener("change", function (e) {
        let errorInputQuantity = inputQuantity.value;

        if (e.target.value > 100 || e.target.value < 0) {
            errorSetting(e, errorInputQuantity, element);
            
        } else {
            changeQuantity(e, element);
            updateTotalPrice();
            zeroQuantity(errorInputQuantity, element, e);
        }
    });

    // });
    divQuantity.appendChild(inputQuantity);

    const divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    divSetting.appendChild(divDelete);

    const deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerText = "Supprimer";
    divDelete.appendChild(deleteItem);
    deleteItem.addEventListener("click", () => {
        deleteFunction(element);
    });

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
btnFomulaire.addEventListener("click", () => {
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



const errorSetting = (e, errorInputQuantity, element) => {
    if (errorInputQuantity > 100 || errorInputQuantity < 1) {
        alert("La quantité doit être comprise entre 1 et 100");
        e.target.value = element.quantity;
        console.log(element.quantity);
    }
};

const zeroQuantity = (errorQuantity, element, e) => {
     if (element.quantity === 0) {
        const index = cart.indexOf(element);
        alert("Il y a plus de canapé, Votre canapé va être supprimé");
        console.log(errorQuantity);
        cart.splice(index, 1);
        console.log(element);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
 };

const changeQuantity = (e, element) => {
    const cartProduct = cart.find(
        (product) => element.id == product.id && element.color == product.color
    );
    if (cartProduct) {
        cartProduct.quantity = parseInt(e.target.value);

        localStorage.setItem("cart", JSON.stringify(cart));
        let modifQuantity = 0;

        for (const products of cart) {
            modifQuantity = modifQuantity + parseInt(products.quantity);
            console.log(products);
        }
        // console.log(modifQuantity);
        document.getElementById("totalQuantity").innerText = modifQuantity;
    }
};

const updateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((element) => {
        fetch("http://localhost:3000/api/products/" + element.id)
            .then((response) => response.json())
            .then((product) => {
                console.log(product);
                console.log(element);
                totalPrice += element.quantity * product.price;
                console.log(totalPrice);
                document.getElementById("totalPrice").innerText = totalPrice;
            });
    });
};

const deleteFunction = (element) => {
    let index = cart.indexOf(element);
    console.log(index);
    cart.splice(index, 1);
    console.log(element);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
};



const firstName = document.getElementById("firstName").value
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")

const lastName = document.getElementById("lastName").value
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

const address = document.getElementById("address");
const addressErrorMsg = document.getElementById("addressErrorMsg");

const city = document.getElementById("city");
const cityErrorMsg = document.getElementById("cityErrorMsg");

const email = document.getElementById("email");
const emailErrorMsg = document.getElementById("emailErrorMsg");

