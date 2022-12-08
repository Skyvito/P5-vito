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
