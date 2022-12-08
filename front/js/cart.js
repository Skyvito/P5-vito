let card = localStorage.getItem("card");
card = JSON.parse(card);
let totalPrice = 0;
let totalArticle = 0;

console.log(card);

card.forEach((element) => {
    fetch("http://localhost:3000/api/products/" + element.id)
        .then((reponse) => reponse.json())
        .then((product) => {
            displayProduct(product, element);
        })
        .then(() => {
            // fetch("http://localhost:3000/api/products/" + element.id)
            //     .then((reponses) => reponses.json())
            //     .then((products) => {
            //         console.log(products);
            //         localStorage.setItem("tab", JSON.stringify(products._id));
                });
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

const btnFomulaire = document.querySelector("#order");

// Au click du bouton je récupère les valeurs du formulaire dans le local storage
// click
btnFomulaire.addEventListener("mouseenter", () => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    let test = localStorage.getItem("card");
    test = JSON.parse(test);
  

  TabId = []

  // Je veux récuperer les id de test dans le tableau mais j'en récupere a chaque fois que une
  //Donc la avec le if je veux faire en sorte qu' a chaque fois que test.id et inférieur a aux idées du tableau alors j'en rajoute une
 
    if (i = test.id , i < length.test , i++) {
  TabId.push(test[i].id)
  console.log(TabId);
 
}
console.log(TabId);
    let order = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
        products: TabId,
    };

    console.log(order);
    const PostFetch = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-type": "application/json",
        },
    });

});
// }
