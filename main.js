let productos = [];
let carrito = [];

function cargarCarritoGuardado() {
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarritoDOM();
        calcularTotalCarrito();
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarDatos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos("equiposElectronicos", "productosElectronicos");
            mostrarProductos("ropa", "productosRopa");
            mostrarProductos("zapatillas", "productosZapatillas");
        })
        .catch(error => console.error('Error al cargar datos:', error));
}

function mostrarProductos(categoriaInputId, contenedorProductosId) {
    const contenedorProductos = document.getElementById(contenedorProductosId);

    productos
        .filter(producto => producto.categoria === categoriaInputId)
        .forEach(producto => {
            const productoDiv = crearProductoDiv(producto);
            contenedorProductos.appendChild(productoDiv);
        });
}

function crearProductoDiv(producto) {
    const productoDiv = document.createElement("div");
    productoDiv.className = "producto";
    productoDiv.id = `producto-${producto.id}`;

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const nombre = document.createElement("p");
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al Carrito";
    botonAgregar.addEventListener("click", () => agregarProductoAlCarrito(producto));

    productoDiv.appendChild(imagen);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(precio);
    productoDiv.appendChild(botonAgregar);

    return productoDiv;
}

function buscarProducto() {
    const nombreProductoInput = document.getElementById("productoInputBusqueda");
    const nombreProducto = nombreProductoInput.value.trim().toLowerCase();
    let productoEncontrado = false;

    productos.forEach(producto => {
        const productoDiv = document.getElementById(`producto-${producto.id}`);
        const nombreProductoActual = producto.nombre.toLowerCase();

        if (nombreProductoActual.includes(nombreProducto)) {
            productoDiv.style.border = "2px solid #ffcc00";
            productoEncontrado = true;
        } else {
            productoDiv.style.border = "1px solid #ddd";
        }
    });

    if (!productoEncontrado) {
        Swal.fire({
            icon: 'error',
            title: 'Producto no disponible',
            text: 'Lo sentimos, el producto que estás buscando no está disponible.',
        });
    }
}

function agregarProductoAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarritoDOM();
    calcularTotalCarrito();
}

function actualizarCarritoDOM() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const listItem = document.createElement("li");
        listItem.textContent = `${producto.nombre} - $${producto.precio}`;
        listaCarrito.appendChild(listItem);
    });

    guardarCarritoEnLocalStorage();
    actualizarIconoCarrito();
}

function calcularTotalCarrito() {
    const totalCarrito = document.getElementById("totalCarrito");
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalCarrito.textContent = `Total del carrito: $${total}`;
    guardarCarritoEnLocalStorage();
}

function actualizarIconoCarrito() {
    const iconoCarrito = document.getElementById("carrito-icon");
    iconoCarrito.innerHTML = `<img src="./img/cart-icon.png" alt="Carrito de compras"> ${carrito.length}`;
}

function cargarBuscador() {
    const buscadorContainer = document.createElement("div");
    buscadorContainer.id = "buscador";

    const labelBuscador = document.createElement("label");
    labelBuscador.htmlFor = "productoInputBusqueda";
    labelBuscador.textContent = "Buscar Productos:";

    const inputBuscador = document.createElement("input");
    inputBuscador.type = "text";
    inputBuscador.id = "productoInputBusqueda";
    inputBuscador.oninput = buscarProducto;

    const botonBuscador = document.createElement("button");
    botonBuscador.textContent = "Buscar";
    botonBuscador.onclick = buscarProducto;

    buscadorContainer.appendChild(labelBuscador);
    buscadorContainer.appendChild(inputBuscador);
    buscadorContainer.appendChild(botonBuscador);

    const main = document.querySelector("main");
    main.insertBefore(buscadorContainer, main.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
    cargarBuscador();
    cargarDatos();
    cargarCarritoGuardado();
});