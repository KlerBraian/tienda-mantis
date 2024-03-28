let productosEnCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <div class="carrito-opciones-cantidad">
                    <button id="${producto.id}" class="cantidad-resta">- </button>
                    <p> ${producto.cantidad} </p>
                    <button id="${producto.id}" class="cantidad-suma"> +</button>
                    </div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.subtotal}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    actualizarBotonesCantidad();
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

    console.log(botonesEliminar)
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarCarrito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
 productosEnCarrito.length = 0
 localStorage.setItem('productos-carrito', JSON.stringify(productosEnCarrito));
 cargarCarrito();
}


function actualizarTotal() {
    const montoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
    contenedorTotal.innerText = `$${montoTotal}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}





    botonEnvio = document.querySelector("#boton-envio");
    botonEnvio.addEventListener("click", mostrarEnvio);

    botonDesplegable = document.querySelector("#dropbtn");
    botonDesplegable.addEventListener("click", menuDesplegable);

    menuDesplegado= document.querySelector("#desplegado");

    opcionesEnvio= document.querySelector("#envio");

    opcionSeleccionada = document.querySelectorAll(".opcion");
    opcionSeleccionada.forEach (opcion => opcion.addEventListener("click", function(e) {
        seleccionaOpcion(e.target.innerText); 
    }));

    montoEnvio = document.querySelector("#costo");
    
    const botonVolver = document.querySelector("#boton-volver");
    botonVolver.addEventListener("click", volverAModificarCantidades);

    function volverAModificarCantidades(){
        botonesCambiarCantidadResta.forEach(boton => boton.disabled = false);
        botonesCambiarCantidadSuma.forEach(boton => boton.disabled = false);
        opcionesEnvio.classList.add("disabled");
        montoEnvio.classList.add("disabled");
    }


    function mostrarEnvio() {
        opcionesEnvio.classList.remove("disabled");
        montoEnvio.classList.remove("disabled");
        // Deshabilita los botones de cantidad
        botonesCambiarCantidadResta.forEach(boton => boton.disabled = true);
        botonesCambiarCantidadSuma.forEach(boton => boton.disabled = true);
    }
    
    function seleccionaOpcion(opcion) {
        botonDesplegable.innerHTML = `<button id="dropbtn" class="dropbtn">${opcion} <i class="bi bi-arrow-down-circle"></i></button>`;
        desplegado.classList.remove("show");
        opcionesEnvio.classList.remove("disabled"); 
        calcularEnvio(opcion);
    }
    
    function calcularEnvio(opcionElegida) {
        costoSeleccionado = costoEnvio.find(opcion => opcion.id === opcionElegida);
        if(costoSeleccionado){
            let montoTotal = productosEnCarrito.reduce((acc, producto) => acc + producto.subtotal, 0); 
            nuevoTotal =  montoTotal + costoSeleccionado.costo;
            montoEnvio.innerText = `Costo de envío: $${costoSeleccionado.costo}`;
            contenedorTotal.innerText = `$${nuevoTotal}`;
            // Deshabilita los botones de cantidad
            botonesCambiarCantidadResta.forEach(boton => boton.disabled = true);
            botonesCambiarCantidadSuma.forEach(boton => boton.disabled = true);
        }
    }
    

   
function menuDesplegable() {
    desplegado.classList.toggle("show");
  }

  costoEnvio = [
    {
        id: "CABA",
        costo: 1500
    }  ,
    {
        id: "Gran Buenos Aires",
        costo: 2000
    } , 
    {
        id: "Interior",
        costo: 2500
    },
    {
        id : "Retiro en tienda",
        costo: 0
    }
  ];  


  function actualizarBotonesCantidad() {
    botonesCambiarCantidadResta = document.querySelectorAll(".cantidad-resta");
    
    botonesCambiarCantidadSuma = document.querySelectorAll(".cantidad-suma");
    
    botonesCambiarCantidadResta.forEach(boton => {
        boton.addEventListener("click", cambiarCantidad);
    });
    
    botonesCambiarCantidadSuma.forEach(boton => {
        boton.addEventListener("click", cambiarCantidad);
    });
}

function cambiarCantidad(e){
    const classBoton = e.currentTarget.classList;
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    if (classBoton.contains('cantidad-resta')) {
        if(productosEnCarrito[index].cantidad > 1) {
            productosEnCarrito[index].cantidad--;
            actualizarTotal();
        }
    } else {
        productosEnCarrito[index].cantidad++;
    actualizarTotal();
}
    productosEnCarrito[index].subtotal = productosEnCarrito[index].cantidad * productosEnCarrito[index].precio;
    cargarCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
}



