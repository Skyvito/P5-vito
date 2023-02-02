//fonction asynchrone pour récupérer les produits depuis l'API, j'utilise la méthode fetch pour obtenir les données à partir de l'URL de l'api;  une fois la réponse récuperée je la convertie en JSON avec la méthode json et  place data dans la fonction createCards. Si une erreur se produit, elle est capturée dans le bloc catch et affichée dans la console.

async function canapes() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        createCards(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


//La fonction createCart Elle prend en entrée les produits récupérés depuis l'API et créer des cartes pour chaque produit contenant un id, une image, le titre et une description, a l'aide de forEach
const createCards = (products) => {
    console.log(products);
    products.forEach((product) => {
        const itemsSection = document.getElementById("items");
        console.log(itemsSection);

        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", "./product.html?id=" + product._id);

        const articleElement = document.createElement("article");
        linkElement.appendChild(articleElement);

        const imgElement = document.createElement("img");
        imgElement.setAttribute("src", product.imageUrl);
        imgElement.setAttribute("alt", product.altTxt);
        articleElement.appendChild(imgElement);

        const titreElement = document.createElement("h3");
        titreElement.classList = "productName";
        titreElement.innerText = product.name;
        articleElement.appendChild(titreElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.classList = "productDescription";
        descriptionElement.innerText = product.description;
        articleElement.appendChild(descriptionElement);

        console.log(linkElement);

        itemsSection.appendChild(linkElement);
    });
};

canapes();
