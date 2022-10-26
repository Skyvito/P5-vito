const product = window.location.search.split("?").join("")
console.log(product);

let produitTab = []

const fetchproduct = async () => {
    await fetch(`http://localhost:3000/api/products/${product}`)
    .then((reponse) => reponse.json())
    .then((Promise) => {
        produitTab = Promise;
        console.log(produitTab);
       
    })
}




const produits = async () => {
    await fetchproduct()



     document.querySelector(".item__img").innerHTML = `
      <img class = "item__img" src=${produitTab.imageUrl} alt="${produitTab.altTxt}">
      `
      document.querySelector(".item__content__titlePrice").innerHTML = `
      <h1 id="title">${produitTab.name}</h1>
      `

      document.querySelector(".item__content__titlePrice").innerHTML = `
      <p>Prix : <span id="price">${produitTab.price}</span>€</p>
      `

      document.querySelector(".item__content__description").innerHTML = `
      <p id="description">${produitTab.description}</p>
      `

      let color = document.querySelector("#colors")
     

// rappel La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
      produitTab.colors.forEach((couleur) => {
        
        console.log(couleur);
        let options = document.createElement("option")

        options.innerHTML = `${couleur}`
        options.value = `${couleur}`

        color.appendChild(options)
       


      })

   
}


produits()






































































