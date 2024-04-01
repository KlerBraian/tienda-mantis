const prodArray = [
    {
        id:"guitarra-1",
        titulo:"🎸 Guitarra Dean Mustaine Signature",
        imagen:"./img/guitarras/guitarra-1-dean.jpg",
        precio: 180000,
        categoria:"Guitarras",
        stock: 5
    },
    {
        id:"guitarra-2",
        titulo:"🎸 Guitarra Gibson ES35",
        imagen: "./img/guitarras/guitarra-2-gibson.jpg",
        precio: 130000,
        categoria:"Guitarras",stock: 5

    },   
    {
        id:"guitarra-3",
        titulo:"🎸 Guitarra Fender Stratocaster Standard",
        imagen: "./img/guitarras/guitarra-3-fender.jpg",
        precio: 120000,
        categoria:"Guitarras",
        stock: 5
    },   
    {
        id:"guitarra-4",
        titulo:"🎸 Guitarra Gibson Lespaul Red Signature",
        imagen: "./img/guitarras/guitarra-4-lespaul.jpg",
        precio: 130000,
        categoria:"Guitarras",
        stock: 5
    },  
    {
        id:"guitarra-5",
        titulo:"🎸 Guitarra Gibson Firebird",
        imagen:"./img/guitarras/guitarra-5-firebird.jpg",
        precio: 150000,
        categoria:"Guitarras",
        stock: 5
    },   
    {
        id:"bajo-1",
        titulo:"🎻 Bajo Gibson LesPaul 2015",
        imagen: "./img/bajos/bajo-1-gibson.jpg",
        precio: 120000,
        categoria:"Bajos",
        stock: 5
    },   
    {
        id:"bajo-2",
        titulo:"🎻 Bajo Spector Legend STD ",
        imagen:"./img/bajos/bajo-2-spector.jpg",
        precio: 160000,
        categoria:"Bajos",
        stock: 5
    },  
     {
        id:"bajo-3",
        titulo: "🎻 Bajo Gibson Midtown",
        imagen:"./img/bajos/bajo-3-gibson.jpg",
        precio: 140000,
        categoria:"Bajos",
        stock: 5
    },   
    {
        id:"bajo-4",
        titulo:"🎻 Bajo Spector NS Pulse",
        imagen:"./img/bajos/bajo-4-spector.jpg",
        precio: 180000,
        categoria:"Bajos",
        stock: 5
    },   
    {
        id:"bajo-5",
        titulo: "🎻 Bajo Fender American",
        imagen:"./img/bajos/bajo-5-fender.jpg",
        precio: 150000,
        categoria:"Bajos",
        stock: 5
    },   
    {
        id:"pedales-1",
        titulo: "🎛️ Pedal Vox Wah",
        imagen:"./img/pedales/pedal-1-vox.jpg",
        precio: 80000,
        categoria:"Pedales",
        stock: 5
    },  
    {
        id:"pedales-2",
        titulo:"🎛️ Pedal Hummingverb2 Reverb",
        imagen:"./img/pedales/pedal-2-hummingverb.jpg",
        precio:60000,
        categoria:"Pedales",
        stock: 5
    },   
    {
        id:"pedales-3",
        titulo:"🎛️ Pedal British Drive",
        imagen: "./img/pedales/pedal-3-britishdrive.jpg",
        precio: 65000,
        categoria:"Pedales",
        stock: 5
    },   
    {
        id:"pedales-4",
        titulo:"🎛️ Pedal Boss Distortion Ds2",
        imagen:"./img/pedales/pedal-4-distortion.jpg",
        precio: 50000,
        categoria:"Pedales",
        stock: 5
    },   
    {
        id:"pedales-5",
        titulo: "🎛️ Pedal Whammy",
        imagen:"./img/pedales/pedal-5-whammy.jpg",
        precio: 68000,
        categoria:"Pedales",
        stock: 5
    },   
    {
        id:"accesorios-1",
        titulo:"🔌 Afinador Analogico",
        imagen:"./img/accesorios/acces-1-afinador.jpg",
        precio: 15000,
        categoria:"Accesorios",
        stock: 5
    },   
    {
        id:"accesorios-2",
        titulo: "🔌 Correa Cuero",
        imagen:"./img/accesorios/acces-2-correa.jpg",
        precio: 7000,
        categoria:"Accesorios",
        stock: 5
    },   
    {
        id:"accesorios-3",
        titulo: "🔌 Cable 7M",
        imagen:"./img/accesorios/acces-3-cable.jpg",
        precio: 12000,
        categoria:"Accesorios",
        stock: 5
    },   
    {
        id:"accesorios-4",
        titulo:"🔌 Capotraste Regulable",
        imagen:"./img/accesorios/acces-4-capotraste.jpg",
        precio: 6000,
        categoria:"Accesorios",
        stock: 5
    },   
    {
        id:"accesorios-5",
        titulo:"🔌 Pua Fender Medium",
        imagen:"./img/accesorios/acces-5-puas.jpg",
        precio: 2000,
        categoria:"Accesorios",
        stock: 5
    }
]
const categorias = ["Guitarras", "Bajos", "Pedales", "Accesorios"];
 

            /*  FUNCION PARA CARGAR PRODUCTOS AL MAIN  (CATEGORIA O BUSQUEDA)*/


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numeroCarrito = document.querySelector(".numero-carrito");

function cargarProductos (productosElegidos){
    contenedorProductos.innerHTML = ''

    productosElegidos.forEach(producto => {

        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="detalles-productos">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="boton-agregar" id ="${producto.id}">Agregar al carrito</button>
        </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

cargarProductos(prodArray);

                                  //MOSTRAR PRODUCTOS POR BARRA DE BUSQUEDA

const inputBusqueda = document.querySelector("#buscar");
inputBusqueda.addEventListener("input", () => {
    const productosFiltrados = prodArray.filter (producto => producto.titulo.toLowerCase().includes(inputBusqueda.value.toLowerCase()));
    console.log(productosFiltrados)
    cargarProductos(productosFiltrados);
})


                                // MOSTRAR PROD SEGUN CATEGORIA
botonCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id !== 'todos') {
            const productoCategoria = prodArray.find(producto => producto.categoria === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosBoton = prodArray.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(prodArray)
        }
    })
})


                        /*CHEQUEAR EL LOCALSTORAGE*/ 

let carrito;
let productosCarritoLS = localStorage.getItem("productos-carrito");

if (productosCarritoLS) {
    carrito = JSON.parse(productosCarritoLS);
    actualizarNumeroCarrito();
} else {
    carrito = [];
}


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".boton-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


                 /* AGREGAR PRODUCTOS AL CARRITO Y ACTUALIZAR LS Y NUMERO DE PROD CARRITO */

function agregarAlCarrito(e) {

            const idBoton = e.currentTarget.id;
            const productoAgregado = prodArray.find(producto => producto.id === idBoton);

    
                if(carrito.some(producto => producto.id === idBoton)) {
                    const index = carrito.findIndex(producto => producto.id === idBoton);
                    carrito[index].cantidad++;
                    carrito[index].subtotal += carrito[index].precio;
        
                    } else {
                    productoAgregado.subtotal = productoAgregado.precio;
                    productoAgregado.cantidad = 1;
                    carrito.push(productoAgregado);
            }
     
        actualizarNumeroCarrito();

        localStorage.setItem("productos-carrito", JSON.stringify(carrito));

} 
    

                 /*  FUNCION ACTUALIZAR NUMERO DE PROD CARRITO*/

function actualizarNumeroCarrito() {
let nuevoNumero = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
numeroCarrito.innerText = nuevoNumero;
}

