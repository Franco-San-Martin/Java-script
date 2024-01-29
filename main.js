let productos =
    [{ id: 1, nombre: "Computadora", precio: 20 },
    { id: 2, nombre: "Televisor", precio: 30 },
    { id: 3, nombre: "Celular", precio: 40 },
    { id: 4, nombre: "Maquina de Afeitar", precio: 50 },
    { id: 5, nombre: "Cargador de bateria", precio: 60 },];

let carrito = [];

function agregarProductoAlCarrito() {
    const productoInput = document.getElementById("productoInput");
    const nombreProducto = productoInput.value.toLowerCase(); const productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto);
    if (productoEncontrado) {
        carrito.push(productoEncontrado);

        actualizarCarritoDOM();
        calcularTotalCarrito();
    } else {
        mostrarMensaje("Producto no encontrado");
    }
}
function mostrarMensaje(mensaje) {
    const mensajeElement =
        document.createElement("p");
    mensajeElement.textContent = mensaje;
    document.body.appendChild(mensajeElement);
    setTimeout(() => {
        document.body.removeChild(mensajeElement);
    }, 2000);
}
function actualizarCarritoDOM() {
    const listaCarrito =
        document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const listItem =
            document.createElement("li");
        listItem.textContent =
            `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(listItem);
    });
}

function calcularTotalCarrito() {
    const totalCarrito = document.getElementById("totalCarrito");
    const total = carrito.reduce((sum, producto) =>
        sum + producto.precio, 0); totalCarrito.textContent = `Total del carrito: $${total}`;
}