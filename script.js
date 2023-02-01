class Pokemon{
    constructor(nombre,numero,lugar,img){
        this.nombre=nombre;
        this.numero=numero;
        this.lugar=lugar;
        this.img=img;
    }
}

let posicion= 0;
let cardActual=0;
let contadorActual=0;
const contenedorCards=document.getElementById("card_container");
const contenedorTabla=document.getElementById("completado");
let almacenadoLocal= localStorage.getItem("completado");
if(almacenadoLocal){
    contenedorTabla.innerHTML=almacenadoLocal;
}

function crearTarjetaCaceria(posicion,cardActual,contadorActual){    
    let contadorPkm=0;
    cardActual=posicion;

    const divCard = document.createElement("div");
    divCard.className = "card card_pkm text-center";

    const cardImg=document.createElement("img");
    cardImg.className = "card_img";
    cardImg.src=Pokemones[posicion].img;   
    
    const cardTitle=document.createElement("h2");
    cardTitle.className=("card_name");
    cardTitle.innerText=Pokemones[posicion].nombre;

    const textoContador=document.createElement("h2");
    textoContador.className=("card_counter");
    textoContador.innerText=contadorPkm;

    const cardNumber=document.createElement("p");
    cardNumber.innerText=("Numero Pokedex:",Pokemones[posicion].numero);

    const cardLugar=document.createElement("p");
    cardLugar.innerText=Pokemones[posicion].lugar;

    const botonSumar=document.createElement("button");
    botonSumar.innerText=("+");
    botonSumar.className=("btn btn-primary card_button");
    botonSumar.onclick=()=>{
        contadorPkm++;
        textoContador.innerText=contadorPkm;
        contadorActual=contadorPkm;
    }

    const botonRestar=document.createElement("button");
    botonRestar.className=("btn btn-primary card_button");
    botonRestar.innerText=("-");
    botonRestar.onclick=()=>{
        contadorPkm--;
        textoContador.innerText=contadorPkm;
        contadorActual=contadorPkm;
    }

    const botonTerminar=document.createElement("button");
    botonTerminar.innerText=("Terminar");
    botonTerminar.className=("btn btn-primary card_button");
    botonTerminar.onclick=()=>{
        completarCaceria(cardActual,contadorActual);
        almacenadoLocal=localStorage.setItem("completado",contenedorTabla.innerHTML)
        contenedorCards.removeChild(divCard)
    }

    const botonReiniciar=document.createElement("button");
    botonReiniciar.innerText=("Reiniciar");
    botonReiniciar.className=("btn btn-primary card_button");
    botonReiniciar.onclick=()=>{
        contadorPkm=0;
        textoContador.innerText=contadorPkm;
        contadorActual=contadorPkm;
    }
    
    divCard.appendChild(cardImg);
    divCard.appendChild(cardTitle);
    divCard.appendChild(textoContador);        
    divCard.appendChild(cardNumber);
    divCard.appendChild(cardLugar);
    divCard.appendChild(botonSumar);
    divCard.appendChild(botonRestar);
    divCard.appendChild(botonTerminar);
    divCard.appendChild(botonReiniciar);
    contenedorCards.appendChild(divCard);
    return cardActual
    return contadorActual
}

function completarCaceria(cardActual,contadorActual){
    let fecha=new Date();
    let dia=fecha.getDate();
    let mes=fecha.getMonth();
    let year=fecha.getFullYear();
    let fechaActual=`${dia}-${mes}-${year}`;

    const rowTabla = document.createElement("tr");

    const tdIcono=document.createElement("td");
    const tdIconoImg=document.createElement("img");
    tdIconoImg.className=("td_img");
    tdIconoImg.src=Pokemones[cardActual].img;

    const tdNombre=document.createElement("td");
    tdNombre.textContent=Pokemones[cardActual].nombre;

    const tdIntentos=document.createElement("td");
    tdIntentos.textContent=contadorActual;

    const tdFecha=document.createElement("td");
    tdFecha.textContent=(fechaActual);

    tdIcono.appendChild(tdIconoImg);
    rowTabla.appendChild(tdIcono);
    rowTabla.appendChild(tdNombre);
    rowTabla.appendChild(tdIntentos);
    rowTabla.appendChild(tdFecha);
    contenedorTabla.appendChild(rowTabla);
}




const Pokemones=[];
Pokemones.push(new Pokemon("Scizor",261,"Lago Cazola","./scizor_S.png"));
Pokemones.push(new Pokemon("Raichu",075,"Area Cero","./raichu_S.png"));
Pokemones.push(new Pokemon("Psyduck",055,"Bosquejada","./psyduck_S.png"));
Pokemones.push(new Pokemon("Magikarp",134,"Gruta Vestura","./magikarp_S.png"));
Pokemones.push(new Pokemon("Wooper",053,"Area Uno","./wooper_S.png"));

const nombresPokemones=Pokemones.map((el)=> el.nombre);
let cantidadPokemones=Pokemones.length;

let seleccionarPokemon=document.getElementById("seleccionarPokemon");

for(let i=0;i<cantidadPokemones;i++){
    let aux=nombresPokemones[i];
    let crear=document.createElement("option");
    crear.textContent = aux;
    crear.value = aux;
    seleccionarPokemon.appendChild(crear);
}

let botonComenzar=document.getElementById("comenzarCaceria");
let pokemonElegido="";
let botonLimpiar=document.getElementById("limpieza");
let botonLimpiarCompletados=document.getElementById("limpiarCompletados");

botonComenzar.onclick=()=>{
    pokemonElegido=seleccionarPokemon.options[seleccionarPokemon.selectedIndex].text;
    posicion=nombresPokemones.indexOf(pokemonElegido);
    crearTarjetaCaceria(posicion,cardActual,contadorActual);
    sessionStorage.setItem("busqueda",contenedorCards.innerHTML);
}

botonLimpiar.onclick=()=>{
    sessionStorage.clear();
    location.reload();
}

botonLimpiarCompletados.onclick=()=>{
    localStorage.clear();
    location.reload();
}
