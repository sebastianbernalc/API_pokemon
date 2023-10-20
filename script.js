const url = "https://reqres.in/api/users?page=2"
const boton = document.querySelector("button");
boton.addEventListener(
  "click",
  () => {
    getDataFromApiResponse(consumeApiWithAxios(url));
  }
);



async function consumeApiWithAxios(url) {
  try {
    const response = await axios.get(url);
    console.log(`la petición a la api se completo correctamente con status: ${response.status}`);
    return await response.data;
  } catch (error) {
    console.error(`fallo la petición a la api con error: ${error.message}`);
  }
}


/* Acceso a los datos de la respuesta */


async function getDataFromApiResponse(response) {
  const apiResponse = await response;
  const datos = apiResponse.data;
  const body = document.querySelector("body");
  const contenedor = document.createElement("div");
  contenedor.setAttribute("class", "container");
  for (dato of datos) {
    console.log(dato);
    const user = document.createElement("div");
    user.setAttribute("class", "user");
    const userImg = document.createElement("div");
    userImg.setAttribute("class", "user-pic");
    const img = document.createElement("img");
    img.setAttribute("src", dato.avatar);
    const userName = document.createElement("div");
    userName.setAttribute("class", "user-name");
    const userEmail = document.createElement("div");
    userEmail.setAttribute("class", "user-mail");
    const fullName = document.createElement("p");
    fullName.innerHTML = `<strong>Name: </strong> ${dato.first_name} ${dato.last_name}`;
    const email = document.createElement("p");
    email.innerHTML = `<strong>Email: </strong>${dato.email}`;
    userName.appendChild(fullName);
    userEmail.appendChild(email);
    userImg.appendChild(img);
    user.appendChild(userImg);
    user.appendChild(userName);
    user.appendChild(userEmail);
    contenedor.appendChild(user);
  }
  body.appendChild(contenedor);
}
