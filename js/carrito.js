let productosEnCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-boton-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-boton-comprar");

                //                                                          CARGAR PRODUCTOS DEL CARRITO 


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


                    //                                              HABILITA LOS BOTONES PARA ELIMINAR PRODUCTOS

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

}
 
//                                                                          ELIMAR PRODUCTOS AGREGADOS

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarCarrito();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));

    opcionesEnvio.classList.add("disabled");
    desplegado.classList.remove("show");
    montoEnvio.classList.add("disabled")
    montoEnvio.innerText = `Costo de envío:`;
}

                             //                                                  VACIAR EL CARRITO

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
 productosEnCarrito.length = 0
 localStorage.setItem('productos-carrito', JSON.stringify(productosEnCarrito));
 cargarCarrito();
}

//                                                                           ACTUALIZA EL TOTAL

function actualizarTotal() {
    const montoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
    contenedorTotal.innerText = `$${montoTotal}`;
}

//                                                                                  CONFIRMAR COMPRA


botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

//                                                                        CALCULAR COSTO DE ENVIO

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
    
    let opcionSelec = null; // Variable global para almacenar la opción seleccionada



                                                 //MODIFICAR CANTIDADES DESDE EL CARRITO

    
function volverAModificarCantidades(){
    botonesCambiarCantidadResta.forEach(boton => boton.disabled = false);
    botonesCambiarCantidadSuma.forEach(boton => boton.disabled = false);
    opcionSelec = null;
    botonDesplegable.innerHTML = `<button id="dropbtn" class="dropbtn">Seleccionar opción <i class="bi bi-arrow-down-circle"></i></button>`;
    opcionesEnvio.classList.add("disabled");
    montoEnvio.classList.add("disabled");
}

                       // MOSTRAR EL CALCULO DE ENVIO



function mostrarEnvio() {
    opcionSelec = null;
    botonDesplegable.innerHTML = `<button id="dropbtn" class="dropbtn">Seleccionar opción <i class="bibi-arrow-down-circle"></i></button>`;
    opcionesEnvio.classList.remove("disabled");
    montoEnvio.classList.remove("disabled");
    // Deshabilita los botones de cantidad
    botonesCambiarCantidadResta.forEach(boton => boton.disabled = true);
    botonesCambiarCantidadSuma.forEach(boton => boton.disabled = true);
}
   


                                                                // MOSTRAR OPCIONES DE ENVIO



function seleccionaOpcion(opcion) {
        opcionSelec = opcion;
        botonDesplegable.innerHTML = `<button id="dropbtn" class="dropbtn">${opcion} <i class="bi bi-arrow-down-circle"></i></button>`;
        desplegado.classList.remove("show");
        opcionesEnvio.classList.remove("disabled"); 
        if (opcionSelec) {
            calcularEnvio(opcion);
            botonDesplegable.classList.remove("active")
        }
}



        //                                                             CALCULAR ENVIO


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



//                                                                  MENU DESPLEGABLE

function menuDesplegable() {
    desplegado.classList.toggle("show");
    botonDesplegable.classList.toggle("active")
}



                                                                 //ARRAY DE COSTO DE ENVIO

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
    },
    {
        id : "Volver",
        costo: 0
    }
  ];  


                                                                           // HABILITAR LOS BOTONES DE CANTIDAD

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

                                                              // CAMBIAR LAS CANTIDADES Y ACTUALIZAR LOS TOTALES

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







// const botonDescuento = document.querySelector("#boton-descuento");
// const solapaDescuento = document.querySelector(".solapa-descuento")
// botonDescuento.addEventListener("click", ()=> { 
//  solapaDescuento.classList.remove("disabled");
//  botonesCambiarCantidadResta.forEach(boton => boton.disabled = true);
//  botonesCambiarCantidadSuma.forEach(boton => boton.disabled = true);
// })

// let descuentoAplicado = localStorage.getItem('descuentoAplicado') === 'true';
// let totalConDescuento = parseFloat(localStorage.getItem('totalConDescuento')) || null;

// // Si no hay ningún valor guardado en localStorage para el total con descuento, lo establecemos en null
// // Esto indica que aún no se ha calculado el total con descuento
// if (totalConDescuento === null) {
//     totalConDescuento = null;
// }

// const codigoAplicado = document.querySelector(".cupon-descuento");
// const codigoDescuento = document.querySelector(".boton-aplicar-descuento");

// // Si el total con descuento ya ha sido calculado, actualizamos la interfaz con ese valor
// if (totalConDescuento !== null) {
//     contenedorTotal.innerText = `$${totalConDescuento}`;
// }

// aplicarDescuento();

// function aplicarDescuento() {
//     const descuento = 0.1;

//     codigoDescuento.addEventListener("click", () => {
//         const codigoIngresado = codigoAplicado.value.toLowerCase(); // Obtenemos el valor del input y lo convertimos a minúsculas
//         if (!descuentoAplicado) {
//             if (codigoIngresado === "mantis10") {
//                 let montoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);
//                 let nuevoTotal = montoTotal * (1 - descuento); // Aplicamos el descuento al monto total
//                 contenedorTotal.innerText = `$${nuevoTotal}`;
//                 localStorage.setItem('descuentoAplicado', true);
//                 localStorage.setItem('totalConDescuento', nuevoTotal); // Guardamos el total con descuento en localStorage
//                 codigoAplicado.value = ""; // Limpiamos el contenido del input
//                 codigoAplicado.setAttribute("placeholder", "Código de descuento");
//                 alert("Su cupón ha sido aplicado, gracias");
//             } else {
//                 alert("Código erróneo");
//                 codigoAplicado.value = ""; 
//                 codigoAplicado.setAttribute("placeholder", "Código de descuento");
//             }
//         } else {
//             if (codigoIngresado === "mantis10") {
//                 alert("Este cupón ya ha sido utilizado");
//             } else {
//                 alert("Código erróneo");
//             }
//             codigoAplicado.value = ""; 
//             codigoAplicado.setAttribute("placeholder", "Código de descuento");
//         }
//     });
// }