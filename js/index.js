
console.log("Function");


const usuarios =[{
    usuario: "admin",
    pwd: "admin",
    nombre:"Nacho"

}];
const productos =[{
    id: 1,
    nombre: "Antiparras",
    precio: 3000,
    img: "https://http2.mlstatic.com/D_NQ_NP_602923-MLA51992135455_102022-O.webp"
},
{
    id: 2,
    nombre: "Aniparras de Aguas Abiertas",
    precio: 5000,
    img: "https://http2.mlstatic.com/D_NQ_NP_857843-MLA31042138634_062019-O.webp"
},
{
    id: 3,
    nombre: "Clip de nariz",
    precio: 1500,
    img: "https://http2.mlstatic.com/D_NQ_NP_939273-MLA50455736186_062022-O.webp"
},
{ 
    id:4,
    nombre: "Tapones de oido",
    precio: 1500,
    img: "https://http2.mlstatic.com/D_NQ_NP_869335-MLA48456336271_122021-O.webp"
},
{
    id:5,
    nombre: "Anti-Fog",
    precio: 1500,
    img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/069/256/products/liquido-antifog-dak-21-6ef1051ac4b77a10c616616308205500-1024-1024.png"
}]

const usuario = document.getElementById("usuario");
const pwd = document.getElementById("pw");
const recordarme = document.getElementById("recordarme");
const btnlogin = document.getElementById("btnlogin");
const cards = document.getElementById("cards");
const elementosToggeables = document.querySelectorAll(".togeable");
const compras = document.getElementById("carrito");

function validarUsuario(user, pwd, datos){
    let encontrado = datos.find(datos=>datos.usuario === user);
    console.log( "Encontrado: "+ encontrado.pwd);
    if(encontrado === undefined){
        Toastify({
            text:   "Credenciales Incorrectas",
            position: "center",
            gravity: "top",
            duration: 5000,
            style:{
                background: "red"
            },
            avatar: "./assets/x-circle.svg"
            }).showToast();
            return false;
    }else{
        if(encontrado.pwd != pwd){
            Toastify({
                text:   "Credenciales Incorrectas",
                position: "center",
                gravity: "top",
                duration: 5000,
                style:{
                    background: "red"
                },
                avatar: "./assets/x-circle.svg"
                }).showToast();
                return false;
        }else{
            return encontrado;
        }
    }
}

function saludar(usuario){
    Toastify({
        text:   "Bienvenido " + usuario.name,
        position: "center",
        gravity: "bottom",
        duration: 5000,
        }).showToast();

}
function guardarDatos(datos, storage){
    const usuario ={
        "name": datos.nombre,
        "user": datos.usuario,
        "pwd": datos.pwd

    }
storage.setItem("usuario", JSON.stringify(usuario));
}
function borrarDatos(){
localStorage.clear();
sessionStorage.clear();
};
function recuperarDatosUsuario(storage){
    return JSON.parse(storage.getItem("usuario"));
}



function mostarCards(Productos){
const carrito =[];
cards.innerHTML="";
Productos.forEach(element => {
    let html = `<div class="card" style="width; id="card${element.nombre}">
    <img src="${element.img}" class="card-img-top" alt="${element.nombre}">
    <div class="card-body">
      <h5 class="card-title">${element.nombre}</h5>
      <p class="card-text">$${element.precio}</p>
      <button class="btn btn-primary addcar" id="btn${element.id}" value="${element.id}">Agregar al Carrito</button> 
    </div>
  </div>`
  cards.innerHTML += html;
});
    const btns = document.querySelectorAll(".addcar");
        console.log(btns);  
    btns[0].addEventListener("click", (event) =>{
        event.preventDefault;
        carrito.push(productos[0]);
        console.log(carrito)
        
    });    




}
function mostrarinfo(array, clase){
array.forEach(element =>{
    element.classList.toggle(clase)
})
}

function Logeado(usuario){
    if(usuario){
        saludar(usuario)
        mostarCards(productos)
        mostrarinfo(elementosToggeables, "d-none");

    }
}
btnlogin.addEventListener("click", (event)=>{
    event.preventDefault();
    if(!usuario.value || !pwd.value){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Complete todos los campos'
          })
        
    }else{
            let data = validarUsuario(usuario.value, pwd.value, usuarios);
            if(!data){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay registros'
                  })
            }else{
                if(recordarme.cheked){
                guardarDatos(data, localStorage)
                saludar(recuperarDatosUsuario(data, localStorage));
                }else{
                    guardarDatos(data,sessionStorage);
                    saludar(recuperarDatosUsuario(sessionStorage));
                }
                mostarCards(productos);
                mostrarinfo(elementosToggeables, "d-none");
                
            }
           
    }
});


window.onload=() =>{
    Logeado(recuperarDatosUsuario(localStorage));
   

}



