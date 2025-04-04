let productosEnCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-boton-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-boton-comprar");
const botonContinuarComprando= document.querySelector("#continuar-comprando")
const apartadoDescuento = document.querySelector(".contenedor-apartado-descuento")
const botonOcultarMenu = document.querySelector(".boton-ocultar")
const mainCart= document.querySelector(".cart-main")
const botonMostrarMenu = document.querySelector(".mostrar-menu")
                //                                                    CARGAR PRODUCTOS DEL CARRITO


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
let opcionSelec = null; 


                    //                                              HABILITA LOS BOTONES PARA ELIMINAR PRODUCTOS

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

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


//                                                                           ACTUALIZA EL TOTAL

const descuentoAplicado = localStorage.getItem("descuento-aplicado") || false;
const compraDescuentoAplicado = localStorage.getItem("compra-descuento-aplicado") || false;


function actualizarTotal() {  
    let montoTotal = 0
    if (localStorage.getItem("descuento-aplicado") === "true" && !localStorage.getItem("compra-con-descuento")){
        montoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0) * 0.90; 
        console.log("Hola")
    } else {
        montoTotal = productosEnCarrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0); 
    }  
    contenedorTotal.innerText = `$${montoTotal}`;
    localStorage.setItem("total", JSON.stringify(montoTotal));
}





//                                                                          ELIMAR PRODUCTOS AGREGADOS

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    const productoEliminado = productosEnCarrito[index];
 Swal.fire({ 
        imageUrl: `${productoEliminado.imagen}`,
        imageHeight: 300,
        imageAlt: `${productoEliminado.titulo}`,
        title: `¿Estás seguro que quieres eliminar ${productoEliminado.titulo} del carrito?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No,me arrepenti"
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.splice(index, 1);
            localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
            cargarCarrito();
            opcionesEnvio.classList.add("disabled");
            desplegado.classList.remove("show");
            montoEnvio.classList.add("disabled")
            montoEnvio.innerText = `Costo de envío:`;
            Swal.fire({
                imageUrl: `${productoEliminado.imagen}`,
                imageHeight: 300,
                imageAlt: `${productoEliminado.titulo}`,
                title: `El producto ${productoEliminado.titulo} fue eliminado del carrito`,
                icon: "success"
              });
        }
    });
    
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
 apartadoDescuento.classList.add("disabled")
}




//                                                                            CONFIRMAR COMPRA


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
    if(localStorage.getItem("descuento-aplicado") === "true"){
        localStorage.setItem("compra-con-descuento" , true);
   }
   apartadoDescuento.classList.add("disabled")
}

                                                      // CAMBIAR LAS CANTIDADES Y ACTUALIZAR LOS TOTALES


function cambiarCantidad(e){
    const classBoton = e.currentTarget.classList;
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    classBoton.contains('cantidad-resta') ? 
        productosEnCarrito[index].cantidad > 1 && (
            productosEnCarrito[index].cantidad--,
            actualizarTotal())  : productosEnCarrito[index].cantidad++,
                                    actualizarTotal();
    productosEnCarrito[index].subtotal = productosEnCarrito[index].cantidad * productosEnCarrito[index].precio;
    cargarCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));}
                                                                                               


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


//                                                                  MENU DESPLEGABLE    

function menuDesplegable() {
    desplegado.classList.toggle("show");
    botonDesplegable.classList.toggle("active")
}



                                                                // MOSTRAR OPCIONES DE ENVIO

function seleccionaOpcion(opcion) {
        opcionSelec = opcion;
        botonDesplegable.innerHTML = `<button id="dropbtn" class="dropbtn">${opcion} <i class="bi bi-arrow-down-circle"></i></button>`;
        desplegado.classList.remove("show");
        opcionesEnvio.classList.remove("disabled");
        
        opcionSelec && (
            calcularEnvio(opcion),
            botonDesplegable.classList.remove("active")
        );
    }


        //                                                             CALCULAR ENVIO

fetch ("./json/datos.json")
    .then((resp)  => resp.json())    
    .then((data) => {
    costoEnvio = [...data[2]];
})


function calcularEnvio(opcionElegida) {
    let montoTotal = 0
    costoSeleccionado = costoEnvio.find(opcion => opcion.id === opcionElegida);
    costoSeleccionado && (
        montoTotal = productosEnCarrito.reduce((acc, producto) => acc + producto.subtotal, 0),
        nuevoTotal =  montoTotal + costoSeleccionado.costo,
        montoEnvio.innerText = `Costo de envío: $${costoSeleccionado.costo}`,
        contenedorTotal.innerText = `$${nuevoTotal}`,
        // Deshabilita los botones de cantidad
        botonesCambiarCantidadResta.forEach(boton => boton.disabled = true),
        botonesCambiarCantidadSuma.forEach(boton => boton.disabled = true)
        )
    }





    //                                                              SECCION DESCUENTO   


const botonCupon = document.querySelector("#boton-cupon")
const botonDescuento = document.querySelector(".descuento-boton");
const inputDescuento = document.querySelector(".descuento-input");

let totalConDescuento = JSON.parse(localStorage.getItem("total"));
let banderaDescuento = JSON.parse(localStorage.getItem("bandera-descuento")) || false;

let cuponMaximo = JSON.parse(localStorage.getItem("cupon-maximo")) || 0;
botonCupon.addEventListener("click", () => {
    if (cuponMaximo < 1) {
        Swal.fire({
            icon: "success",
            text: "¡Felicidades, tienes un 10% de descuento en tu primera compra utilizando el código: mantis!",
        });
        cuponMaximo++;
        localStorage.setItem("cupon-maximo" , JSON.stringify(cuponMaximo));
    } else {
        Swal.fire({
            icon: "error",
            title: "Paraaaa",
            imageUrl: "https://i.ytimg.com/vi/FwrB8sMiZCY/oar2.jpg?sqp=-oaymwEYCJgDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLArfaEnOqZA7L6PBm1LNfC5tSryHw",
            imageHeight: 200,
            text: "Lo sentimos, ya te dimos un código",
        });
    }
});


botonDescuento.addEventListener("click", () => {
    if(inputDescuento.value != "mantis") {
        Swal.fire({
            icon: "error",
            title: "ah ah ah no dijiste la palabra magica",
            imageUrl: "https://pbs.twimg.com/tweet_video_thumb/CFqc-ipW8AAaQRz.png",
            imageHeight: 200,
            text: "Cupon invalido",
          });
          inputDescuento.value =""
    } else if (banderaDescuento=== false) {
        aplicarDescuento();
        banderaDescuento = true;
        localStorage.setItem("bandera-descuento", JSON.stringify(banderaDescuento));
        localStorage.setItem("descuento-aplicado" ,true)
        Swal.fire({ 
            text: "Cupon aplicado, gracias",
            icon: "success"
          });
          inputDescuento.value =""
    } else  Swal.fire({
        icon: "error",
        text: "Ya ingresaste este cupon, te olvidaste?",
      });
      inputDescuento.value =""
})

function aplicarDescuento () {
    montoTotal = localStorage.getItem("total")
    totalConDescuento = montoTotal *0.90
    contenedorTotal.innerText = `${totalConDescuento}`
    localStorage.setItem("total" , JSON.stringify(totalConDescuento))
} 


botonMostrarMenu.addEventListener("click", () => {
    botonMostrarMenu.classList.toggle("ocultar-menu")
    mainCart.classList.toggle("ocultar")
    if (botonMostrarMenu.classList.contains("ocultar-menu")) {
        botonMostrarMenu.innerHTML = "➡"; // Ocultar
      } else {
        botonMostrarMenu.innerHTML = "⬅"; // Mostrar
      }

})