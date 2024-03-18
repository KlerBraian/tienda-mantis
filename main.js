const prodArray = [
    {
        id:"guitarra-1",
        titulo:"🎸 Guitarra Dean Mustaine Signature",
        imagen:"./img/guitarras/guitarra-1-dean.jpg",
        precio: 180000,
        categoria:"Guitarras"
    },
    {
        id:"guitarra-2",
        titulo:"🎸 Guitarra Gibson ES35",
        imagen: "./img/guitarras/guitarra-2-gibson.jpg",
        precio: 130000,
        categoria:"Guitarras"
    },   
    {
        id:"guitarra-3",
        titulo:"🎸 Guitarra Fender Stratocaster Standard",
        imagen: "./img/guitarras/guitarra-3-fender.jpg",
        precio: 120000,
        categoria:"Guitarras"
    },   
    {
        id:"guitarra-4",
        titulo:"🎸 Guitarra Gibson Lespaul Red Signature",
        imagen: "./img/guitarras/guitarra-4-lespaul.jpg",
        precio: 130000,
        categoria:"Guitarras"
    },  
    {
        id:"guitarra-5",
        titulo:"🎸 Guitarra Gibson Firebird",
        imagen:"./img/guitarras/guitarra-5-firebird.jpg",
        precio: 150000,
        categoria:"Guitarras"
    },   
    {
        id:"bajo-1",
        titulo:"🎻 Bajo Gibson LesPaul 2015",
        imagen: "./img/bajos/bajo-1-gibson.jpg",
        precio: 120000,
        categoria:"Bajos"
    },   
    {
        id:"bajo-2",
        titulo:"🎻 Bajo Spector Legend STD ",
        imagen:"./img/bajos/bajo-2-spector.jpg",
        precio: 160000,
        categoria:"Bajos"
    },  
     {
        id:"bajo-3",
        titulo: "🎻 Bajo Gibson Midtown",
        imagen:"./img/bajos/bajo-3-gibson.jpg",
        precio: 140000,
        categoria:"Bajos"
    },   
    {
        id:"bajo-4",
        titulo:"🎻 Bajo Spector NS Pulse",
        imagen:"./img/bajos/bajo-4-spector.jpg",
        precio: 180000,
        categoria:"Bajos"
    },   
    {
        id:"bajo-5",
        titulo: "🎻 Bajo Fender American",
        imagen:"./img/bajos/bajo-5-fender.jpg",
        precio: 150000,
        categoria:"Bajos"
    },   
    {
        id:"pedales-1",
        titulo: "🎛️ Pedal Vox Wah",
        imagen:"./img/pedales/pedal-1-vox.jpg",
        precio: 80000,
        categoria:"Pedales"
    },  
    {
        id:"pedales-2",
        titulo:"🎛️ Pedal Hummingverb2 Reverb",
        imagen:"./img/pedales/pedal-2-hummingverb.jpg",
        precio:60000,
        categoria:"Pedales"
    },   
    {
        id:"pedales-3",
        titulo:"🎛️ Pedal British Drive",
        imagen:"./img/pedales/pedal-3-bdrive.jpg",
        precio: 65000,
        categoria:"Pedales"
    },   
    {
        id:"pedales-4",
        titulo:"🎛️ Pedal Boss Distortion Ds2",
        imagen:"./img/pedales/pedal-4-distortion.jpg",
        precio: 50000,
        categoria:"Pedales"
    },   
    {
        id:"pedales-5",
        titulo: "🎛️ Pedal Whammy",
        imagen:"./img/pedales/pedal-5-whammy.jpg",
        precio: 68000,
        categoria:"Pedales"
    },   
    {
        id:"accesorios-1",
        titulo:"🔌 Afinador Analogico",
        imagen:"./img/accesorios/acces-1-afinador.jpg",
        precio: 15000,
        categoria:"Accesorios"
    },   
    {
        id:"accesorios-2",
        titulo: "🔌 Correa Cuero",
        imagen:"./img/accesorios/acces-2-correa.jpg",
        precio: 7000,
        categoria:"Accesorios"
    },   
    {
        id:"accesorios-3",
        titulo: "🔌 Cable 7M",
        imagen:"./img/accesorios/acces-3-cable.jpg",
        precio: 12000,
        categoria:"Accesorios"
    },   
    {
        id:"accesorios-4",
        titulo:"🔌 Capotraste Regulable",
        imagen:"./img/accesorios/acces-4-capotraste.jpg",
        precio: 6000,
        categoria:"Accesorios"
    },   
    {
        id:"accesorios-5",
        titulo:"🔌 Pua Fender Medium",
        imagen:"./img/accesorios/acces-5-puas.jpg",
        precio: 2000,
        categoria:"Accesorios"
    }
]
const categorias = ["Guitarras", "Bajos", "Pedales", "Accesorios"];
 

let carrito = [];

let botonCompra = document.querySelector('#botonCompra');
botonCompra.addEventListener('click',iniciarPrograma);

function iniciarPrograma(){
    agregarAlCarrito();
    cambios();
}

function agregarAlCarrito() {
    let montoTotal = 0;
    let comprar = true;

    while (comprar) {
        let categoriaInput = prompt('Elija el número de la categoría:\n 1. 🎸Guitarras\n 2. 🎻Bajos\n 3. 🎛️Pedales\n 4. 🔌Accesorios');
        let categoria = parseInt(categoriaInput);
        if (isNaN(categoria) || categoria < 1 || categoria > 4) {
            alert("Opción no válida. Por favor, elija un número del 1 al 4.");
            continue;
        }

        let productosCategoria = prodArray.filter(producto => producto.categoria === categorias[categoria - 1]);

        let continuarSeleccionando = true;
        while (continuarSeleccionando) {
            let mensajeProductos = 'Ingrese el número del producto que desea:\n';
            productosCategoria.forEach((producto, index) => {
                mensajeProductos += `${index + 1}. ${producto.titulo}. Precio por unidad: $${producto.precio}\n`;
            });

            let producto = parseInt(prompt(mensajeProductos));
            if (isNaN(producto) || producto < 1 || producto > productosCategoria.length) {
                alert(`Opción no válida, elija un número del 1 al ${productosCategoria.length}.`);
                continue;
            }

            let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productosCategoria[producto - 1].titulo} que desea`));
            if (isNaN(cantidad) || cantidad === 0) {
                alert(`Debe colocar un número mayor a 0 para definir la cantidad de ${productosCategoria[producto - 1].titulo}`);
                continue;
            }

            let productoIndex = prodArray.findIndex(prod => prod.id === productosCategoria[producto - 1].id);
            montoTotal += prodArray[productoIndex].precio * cantidad;
            carrito.push({ cantidad: cantidad, nombre: prodArray[productoIndex].titulo, precio: prodArray[productoIndex].precio * cantidad });

            let continuar = prompt(`Usted seleccionó ${prodArray[productoIndex].titulo}. Unidades: ${cantidad}.\nEl valor total de su compra hasta el momento es de $${montoTotal}\nDesea agregar otro producto de esta categoria? (Si / No)`);
            if (validarRespuesta(continuar) ==='no') {
                continuarSeleccionando = false;
            }
        }
        let comprarMasProductos = true
        while(comprarMasProductos){
        let continuarComprando = prompt("¿Desea seguir comprando mas productos? (si/no)");
        if (validarRespuesta(continuarComprando) === 'no') {
            comprarMasProductos = false;
            comprar = false
        } else if(validarRespuesta(continuarComprando) ==='si') {
            continuarComprando= false;
            break;
        }
    }
    }
    alert(mostrarCarrito());
}

function validarRespuesta(pregunta) {
    let respuesta = true
    while(respuesta){
        if(pregunta.toLowerCase() !== 'no' && pregunta.toLowerCase() !== 'si'){
        alert ('Ingrese una opcion valida: Si/No');}
     else respuesta = false;
        return pregunta.toLowerCase();
    }
}


// agregarAlCarrito();
function cambios() {
let deseaModificar = true;
while (deseaModificar) {
    let opcionModificar;
    while (true) {
        opcionModificar = parseInt(prompt('Seleccione qué desea hacer:\n 1. Modificar cantidades de un producto\n 2. Eliminar un producto del carrito\n 3. Salir y Confirmar compra'));
        if (!isNaN(opcionModificar) && (opcionModificar === 1 || opcionModificar === 2 || opcionModificar === 3)) {
            break;
        } else {
            alert('Por favor, elija una opción válida.');
        }
    }
    
    if (opcionModificar === 1) {
        modificarCantidadProducto();
    } else if (opcionModificar === 2) {
        eliminarProducto();
    } else {
        deseaModificar = false;
        alert(`Felicidades por su comprar, gracias por visitar Tienda Mantis\nTenga buen dia!😄\n${mostrarCarrito()}`);
    }
}
}

function modificarCantidadProducto() {
    let modificar = true;
    while (modificar) {
        let mensajeModificar = 'Carrito actual:\n';
        carrito.forEach((producto, index) => {
            mensajeModificar += `${index + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}\n`;
        });
        mensajeModificar += '\nIngrese el número del producto que desea modificar:';
        console.log(mensajeModificar);

        let productoMod = parseInt(prompt(mensajeModificar));

        if (productoMod >= 1 && productoMod <= carrito.length) {
            let prodExistente = carrito[productoMod - 1];
            let nuevaCantidad = parseInt(prompt(`Carrito actual:\n${productoMod}. ${prodExistente.nombre} - Cantidad: ${prodExistente.cantidad} - Precio: $${prodExistente.precio}\n\nIngrese la nueva cantidad para ${prodExistente.nombre}:`));
            if(isNaN(nuevaCantidad) || nuevaCantidad < 1){
                alert('Debe seleccionar una cantidad en formato numerico mayor a 0')}
                else {
            let montoTotalNuevo = prodArray.find(item => item.titulo === prodExistente.nombre).precio * nuevaCantidad;
            prodExistente.cantidad = nuevaCantidad;
            prodExistente.precio = montoTotalNuevo;
            alert(`La cantidad y el monto total para ${prodExistente.nombre} han sido actualizados.`);
            console.log(`La cantidad y el monto total para ${prodExistente.nombre} han sido actualizados.`);
        }} else {
            alert('El número de producto ingresado no es válido.');
            console.log('El número de producto ingresado no es válido.');
        }
        let modificarMasProductos = true
        while(modificarMasProductos){
            let continuarModificando = prompt('¿Desea modificar la cantidad de otro producto? (si/no)');
            if (validarRespuesta(continuarModificando) === 'no') {
                modificarMasProductos = false
                modificar = false;
        } else if(validarRespuesta(continuarModificando) ==='si') {
            break;
    }
    }
}
}

function eliminarProducto() {
    let eliminar = true;
    while (eliminar) {
        let mensajeEliminar = 'Carrito actual:\n';
        carrito.forEach((producto, index) => {
            mensajeEliminar += `${index + 1}. ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}\n`;
        });
        mensajeEliminar += '\nIngrese el número del producto que desea eliminar:';
        console.log(mensajeEliminar);

        let productoEliminar = parseInt(prompt(mensajeEliminar));

        if (productoEliminar >= 1 && productoEliminar <= carrito.length) {
            let productoEliminado = carrito.splice(productoEliminar - 1, 1);
            alert(`El producto ${productoEliminado[0].nombre} ha sido eliminado del carrito.`);
            console.log(`El producto ${productoEliminado[0].nombre} ha sido eliminado del carrito.`);
        } else {
            alert('El número de producto ingresado no es válido.');
            console.log('El número de producto ingresado no es válido.');
        }
        let eliminarMasProductos = true
        while(eliminarMasProductos){
            let continuarEliminando = prompt('¿Desea eliminar otro producto? (si/no)');
            if (validarRespuesta(continuarEliminando) === 'no') {
                eliminarMasProductos = false
                eliminar = false;
        } else if(validarRespuesta(continuarEliminando) ==='si') {
            break;
    }
    }
    }
}

function mostrarCarrito() {
    let mensajeCarrito = 'Productos en el carrito:\n';
    let montoTotal = 0;
    carrito.forEach(item => {
        mensajeCarrito += `${item.nombre}\nCantidad: ${item.cantidad} - Precio por unidad: $${item.precio / item.cantidad}\nPrecio total: $${item.precio}\n\n`;
        montoTotal += item.precio;
    });
    mensajeCarrito += `Monto total: $${montoTotal}`;
    console.log(mensajeCarrito);
    return mensajeCarrito

}


