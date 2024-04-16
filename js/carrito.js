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

botonVaciar.addEventListener("click", ()=> Swal.fire({
    title: "Estas seguro que quieres vaciar el carrito?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciar carrito",
    cancelButtonText: "No, volver al carrito"
  }).then((result) => {
    if (result.isConfirmed) {
        vaciarCarrito();
      Swal.fire({
        title: "El carrito fue vaciado",
        icon: "success"
      });
    }
  }));



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


botonComprar.addEventListener("click", ()=> Swal.fire({
    title: "Desea confirmar la compra?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Volver"
  }).then((result) => {
    if (result.isConfirmed) {
        comprarCarrito();
      Swal.fire({
        title: "Muchas gracias por tu compra",
        icon: "success"
      });
    }
  }));

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

//                                                                        ASIGNACION DE BOTONES


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
        // opcionSelec && (
        //     calcularEnvio(opcion);
        //     botonDesplegable.classList.remove("active")
        // );

        if (opcionSelec) {
            calcularEnvio(opcion);
            botonDesplegable.classList.remove("active")
        }
}



        //                                                             CALCULAR ENVIO


fetch ("/json/datos.json")
    .then((resp)  => resp.json())    
    .then((data) => {
    costoEnvio = [...data[21]];
    calcularEnvio(costoEnvio);})


function calcularEnvio(opcionElegida) {
    costoSeleccionado = costoEnvio.find(opcion => opcion.id === opcionElegida);
    // costoSeleccionado && (
    //     let montoTotal = productosEnCarrito.reduce((acc, producto) => acc + producto.subtotal, 0);
    //     nuevoTotal =  montoTotal + costoSeleccionado.costo;
    //     montoEnvio.innerText = `Costo de envío: $${costoSeleccionado.costo}`;
    //     contenedorTotal.innerText = `$${nuevoTotal}`;
    //     // Deshabilita los botones de cantidad
    //     botonesCambiarCantidadResta.forEach(boton => boton.disabled = true);
    //     botonesCambiarCantidadSuma.forEach(boton => boton.disabled = true);
    //     );


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
    
    
//     classBoton.contains('cantidad-resta') ? 
//         productosEnCarrito[index].cantidad > 1 && (
//             productosEnCarrito[index].cantidad--;
//             actualizarTotal()
//         );
//     : productosEnCarrito[index].cantidad++;
//       actualizarTotal();
// }

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



