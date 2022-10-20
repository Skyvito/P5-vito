let canape = [];

const fetchcanape = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((reponse) => reponse.json())
        .then((responses) => {
            canape = responses;
            console.log(canape);
        });
};

const canapes = async () => {
    await fetchcanape();

    document.querySelector(".items").innerHTML = `
    
    <a href="./product.html?${canape[0]._id}">
    <article>
     <img src="${canape[0].imageUrl}" alt="${canape[0].altTxt}">
     <h3 class="productName">${canape[0].name}</h3>
     <p class="productDescription">${canape[0].description}</p>
    </article>
  </a>

  <a href="./product.html?${canape[1]._id}">
  <article>
   <img src="${canape[1].imageUrl}" alt="${canape[1].altTxt}">
    <h3 class="productName">${canape[1].name}</h3>
   <p class="productDescription">${canape[1].description}</p>
 </article>
</a>

<a href="./product.html?${canape[2]._id}">
<article>
 <img src="${canape[2].imageUrl}" alt="${canape[2].altTxt}">
  <h3 class="productName">${canape[2].name}</h3>
 <p class="productDescription">${canape[2].description}</p>
</article>
</a>

<a href="./product.html?${canape[3]._id}">
<article>
 <img src="${canape[3].imageUrl}" alt="${canape[3].altTxt}">
  <h3 class="productName">${canape[3].name}</h3>
 <p class="productDescription">${canape[3].description}</p>
</article>
</a>

<a href="./product.html?${canape[4]._id}">
<article>
 <img src="${canape[4].imageUrl}" alt="${canape[4].altTxt}">
  <h3 class="productName">${canape[4].name}</h3>
 <p class="productDescription">${canape[4].description}</p>
</article>
</a>

<a href="./product.html?${canape[5]._id}">
<article>
 <img src="${canape[5].imageUrl}" alt="${canape[5].altTxt}">
  <h3 class="productName">${canape[5].name}</h3>
 <p class="productDescription">${canape[5].description}</p>
</article>
</a>

<a href="./product.html?${canape[6]._id}">
<article>
 <img src="${canape[6].imageUrl}" alt="${canape[6].altTxt}">
  <h3 class="productName">${canape[6].name}</h3>
 <p class="productDescription">${canape[6].description}</p>
</article>
</a>

<a href="./product.html?${canape[7]._id}">
<article>
 <img src="${canape[7].imageUrl}" alt="${canape[7].altTxt}">
  <h3 class="productName">${canape[7].name}</h3>
 <p class="productDescription">${canape[7].description}</p>
</article>
</a>
`

};


canapes();
















