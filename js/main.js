fetch("./json/datos.json")
    .then((resp) => resp.json())
    .then((data) => {
        productos = [...data[0]];
        cargarProductos(productos);
    })



/*  FUNCION PARA CARGAR PRODUCTOS AL MAIN  (CATEGORIA O BUSQUEDA)*/


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numeroCarrito = document.querySelector(".numero-carrito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = ''

    if (!productosElegidos) {
        let div = document.createElement('div');
            div.classList.add('producto-titulo');
            div.innerHTML = `
    <p class="titulo-principal">  No se encontraron productos </p>`
    contenedorProductos.append(div);
    }
    else {
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
}


//ASIGNAR BOTONES AGREGAR

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".boton-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}



//MOSTRAR PRODUCTOS POR BARRA DE BUSQUEDA



const inputBusqueda = document.querySelector("#buscar");
inputBusqueda.addEventListener("input", () => {
    const productosFiltrados = productos.filter(producto => producto.titulo.toLowerCase().includes(inputBusqueda.value.toLowerCase()));
    if (productosFiltrados.length == 0) {
        cargarProductos(null)
    } else 
        cargarProductos(productosFiltrados);
    
})


// MOSTRAR PROD SEGUN CATEGORIA


botonCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id !== 'todos') {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos)
        }
    })
})


/*CHEQUEAR EL LOCALSTORAGE*/

let carrito;
let productosCarritoLS = localStorage.getItem("productos-carrito");
productosCarritoLS ? (
    carrito = JSON.parse(productosCarritoLS),
    actualizarNumeroCarrito()
) : carrito = [];




/* AGREGAR PRODUCTOS AL CARRITO Y ACTUALIZAR LS Y NUMERO DE PROD CARRITO */

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if (carrito.some(producto => producto.id === idBoton)) {
        const index = carrito.findIndex(producto => producto.id === idBoton);
        carrito[index].cantidad++;
        carrito[index].subtotal += carrito[index].precio;
    } else {
        productoAgregado.subtotal = productoAgregado.precio;
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }
    actualizarNumeroCarrito();
    Toastify({
        text: "Producto agregado",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #060808,#a00d0d,#060808)",
            textShadow: " 0 0 5px red, 0 0 5px red, 0 0 5px red, 0 0 5px red",
            borderRadius: "0.5rem",
            fontSize: "1.2rem"
        },
        offset: {
            y: 70
        },
    }).showToast();

    localStorage.setItem("productos-carrito", JSON.stringify(carrito));

}

/*  FUNCION ACTUALIZAR NUMERO DE PROD CARRITO*/

function actualizarNumeroCarrito() {
    let nuevoNumero = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumero;
}


let menuHamburguesa = document.querySelector(".menu-nav-ul")
let menu = document.querySelector("#button-menu");

menu.addEventListener("click", () => {
    menuHamburguesa.classList.toggle("desplegar")
})