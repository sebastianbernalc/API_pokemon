
const boton = document.querySelector(".searchB");

const text_input = document.querySelector("input");

text_input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      boton.click(); 
  }
});

boton.addEventListener(
  "click",
  () => {
    remove_card()
    const searchInput = document.getElementById("search-input");  
    consumeApiWithAxios(searchInput.value);
    

  }
);

const botonHome = document.querySelector("#homeB.contenedor");
botonHome.addEventListener(
  "click",
  () => {
    return_style();
    remove_card()
  }
);



// acceso Api principal
async function consumeApiWithAxios(page) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const url = `${baseUrl}/${page.toLowerCase()}`;
  if (page == "") {
    return_style();
    alert("Ingresa un pokemon");
    url = "";
    
  }
  try {
    const response = await axios.get(url);
    console.log(`la petición a la api se completo correctamente con status: ${response.status}`);
    getDataFromApiResponse(response.data)
    change_style();
    return await response.data;
  } catch (error) {
    console.error(`fallo la petición a la api con error: ${error.message}`);
    return_style();
    remove_card()
    alert("Pokemon no valido, intenta otra vez!");
    return flag;
  }
}

//accseso Api species
async function consumeApiSpecies(name) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon-species";
  const url = `${baseUrl}/${name}`;
  console.log(`la url de la api es: ${url}`);
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch (error) {
    console.error(`fallo la petición a la api con error: ${error.message}`);
  }
}

async function consumeApiEvolution(name) {
  const baseUrl = "https://pokeapi.co/api/v2/evolution-chain";
  const url = `${baseUrl}/${name}`;
  console.log(`la url de la api es: ${url}`);
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch (error) {
    console.error(`fallo la petición a la api con error: ${error.message}`);
  }
}


async function consumeNApi(url) {
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch (error) {
    console.error(`fallo la petición a la api con error: ${error.message}`);
  }
}


/* Acceso a los datoss de la respuesta */


async function getDataFromApiResponse(response) {
  const apiResponse = await response;

  //Info pokemon
  const imagen = apiResponse.sprites;
  const nombre = apiResponse.name;
  const mov1 = apiResponse.abilities[0].ability.name;
  const mov2 = apiResponse.abilities[1].ability.name;
  const id_evol = apiResponse.id;


  const response2 = consumeApiSpecies(nombre)
  const apiResponse2 = await response2;
  const descripcion = apiResponse2.flavor_text_entries[34].flavor_text;



  const body = document.querySelector("header");

  const homeB = document.querySelector(".contenedor");
  const Hbutton = document.createElement("button");
  Hbutton.setAttribute("class", "homeButton");
  Hbutton.innerHTML = "HOME";

  const contenedor = document.createElement("div");
  contenedor.setAttribute("class", "container");

  const card = document.createElement("div");
  card.setAttribute("class", "card");

  const info = document.createElement("div");
  info.setAttribute("class", "info");


  const img = document.createElement("img");
  img.setAttribute("src", imagen.other.home.front_default);

  const fullName = document.createElement("h");
  fullName.innerHTML = `<strong>Name: </strong> ${nombre}`;

  const descp = document.createElement("p");
  descp.innerHTML = `<strong>Descripcion: </strong>${descripcion}`;

  const abi1 = document.createElement("p");
  abi1.innerHTML = `<strong>Ability1: </strong>${mov1}`;

  const abi2 = document.createElement("p");
  abi2.innerHTML = `<strong>Ability2: </strong>${mov2}`;

  const ability1 = document.createElement("div");
  ability1.setAttribute("class", "ability1");

  
  const ability2 = document.createElement("div");
  ability2.setAttribute("class", "ability2");



  card.appendChild(fullName);
  card.appendChild(img);
  info.appendChild(descp);
  card.appendChild(info);
  ability1.appendChild(abi1);
  ability2.appendChild(abi2);
  
  card.appendChild(ability1);
  card.appendChild(ability2);
  contenedor.appendChild(card);
  contenedor.style.textAlign = "center";

  const contenedor2 = document.createElement("div");
  contenedor2.setAttribute("class", "container2");
   // Crear un botón
   const button = document.createElement("button");
   button.setAttribute("class", "evol");
   button.innerHTML = "Evolucionar"; // Texto del botón
  
   const apievol = consumeNApi(apiResponse2.evolution_chain.url)
   const apiResponse3 = await apievol;
   if (apiResponse3.chain.evolves_to[0] && apiResponse3.chain.evolves_to[0].species && apiResponse3.chain.evolves_to[0].species.name ) {
    contenedor2.appendChild(button);
    contenedor2.style.textAlign = "center";
   } 
 
   // Agregar el botón como hijo del contenedor
   

  homeB.appendChild(Hbutton);
  body.appendChild(contenedor);
  body.appendChild(contenedor2);
  
  
  const ideEvol = apiResponse3.chain.evolves_to[0].evolves_to[0].species.url;
  const apievolspecie = consumeNApi(ideEvol)
  console.log("")
  const apiResponse4 = await apievolspecie;
  const urlEvol = apiResponse4.varieties[0].pokemon.url;



  const apievolspeciepoke = consumeNApi(urlEvol);
  const botonEvol = document.querySelector(".evol");
  
  const apiResponse5 = await apievolspeciepoke;
  if(id_evol != apiResponse5.id){

    botonEvol.addEventListener(
      "click",
      () => {
        remove_card()
        getDataFromApiResponse(apievolspeciepoke); 
      }
    );
  }
  else{
    const botonEvol = document.querySelector(".evol");
    botonEvol.remove();
  }
  
}



async function change_style() {
  const logo = document.querySelector(".logo");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchPadding = document.querySelector(".search");
  searchPadding.style.padding = "10px";
  searchButton.style.width = "80px";
  searchButton.style.height = "30px";
  searchButton.style.fontSize = "1px";
  searchInput.style.width = "180px"; /* Aumenta el ancho del cuadro de búsqueda según tus preferencias */
  searchInput.style.height = "30px";
  searchInput.style.fontSize = "14px";

  logo.style.width = "35%";

}

async function return_style() {
  const logo = document.querySelector(".logo");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchPadding = document.querySelector(".search");
  searchPadding.style.padding = "50px";
  searchButton.style.width = "100px";
  searchButton.style.height = "60px";
  searchButton.style.fontSize = "16px";
  searchInput.style.width = "400px"; /* Aumenta el ancho del cuadro de búsqueda según tus preferencias */
  searchInput.style.height = "60px";
  searchInput.style.fontSize = "16px";
  logo.style.width = "50%";
}

async function remove_card() {
  const card = document.querySelector(".container");
  card.remove();
  const button = document.querySelector(".container2");
  button.remove();
  const Bhome = document.querySelector(".homeButton");
  Bhome.remove();
}


