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

fetchproduct()








