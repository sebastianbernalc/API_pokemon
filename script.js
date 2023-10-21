const boton = document.querySelector("button");
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



async function consumeApiWithAxios(page) {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const url = `${baseUrl}/${page.toLowerCase()}`;
  flag = true;
  console.log(`la url de la api es: ${url}`);
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


/* Acceso a los datoss de la respuesta */


async function getDataFromApiResponse(response) {
  const apiResponse = await response;
  const imagen = apiResponse.sprites;
  const nombre = apiResponse.name;
  const edad = apiResponse.order;
  const body = document.querySelector("header");
  const contenedor = document.createElement("div");
  contenedor.setAttribute("class", "container");


  const user = document.createElement("div");
  user.setAttribute("class", "user");


  const userImg = document.createElement("div");
  userImg.setAttribute("class", "user-pic");
  const img = document.createElement("img");
  img.style.maxWidth = "200px";
  img.setAttribute("src", imagen.other.home.front_default);
  const userName = document.createElement("div");
  userName.setAttribute("class", "user-name");
  const userEmail = document.createElement("div");
  userEmail.setAttribute("class", "user-mail");
  const fullName = document.createElement("p");
  fullName.innerHTML = `<strong>Name: </strong> ${nombre}`;
  const email = document.createElement("p");
  email.innerHTML = `<strong>Email: </strong>${edad}`;
  userName.appendChild(fullName);
  userEmail.appendChild(email);
  userImg.appendChild(img);
  user.appendChild(userImg);
  user.appendChild(userName);
  user.appendChild(userEmail);
  contenedor.appendChild(user);

  body.appendChild(contenedor);
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
}


