// Je recupere la localisation qui va me permettre de récupérer l'id de l'url
let Url = document.location;
console.log(Url);

// J'utilise new url pour pouvoir utiliser  searchParams et searchParams pour pouvoir utiliser l'id grace a get
let urlRecovery = (new URL(Url)).searchParams
let id = urlRecovery.get("id")
console.log(id);
// Une fois l"id récupéré je vais la mettre dans ma page 
let orderId = document.getElementById("orderId")
orderId.innerText = id