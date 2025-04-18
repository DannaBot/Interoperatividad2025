function cambiarTema(){
    document.body.classList.toggle('modoOscuro');
}

function iniciarSesion() {
    window.location.href = 'formularioInicio.html';
    let nombreUsuario = localStorage.getItem('nombre');
    if (nombreUsuario) {
        let mensajeBienvenida = `Bienvenido, ${nombreUsuario}!`;
        document.getElementById('bienvenida').innerText = mensajeBienvenida;
    }
}

// inicioSesion.js

function mostrarBienvenida() {
    
    let nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
        let mensajeBienvenida = `¡HOLA, ${nombreUsuario}🥑!`;
        document.getElementById('bienvenida').innerText = mensajeBienvenida;
    }
}

// Llamar a la función de mostrar la bienvenida al cargar la página
window.onload = mostrarBienvenida;

function cerrarSesion() {
    // Eliminar el nombre del usuario del almacenamiento local
    localStorage.removeItem('nombreUsuario');

    // Redirigir a la página de inicio de sesión
    window.location.href = 'formularioInicio.html';
}



// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('nombre').value;
    const contra = document.getElementById('contra').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.contra === contra);

    if (usuarioValido) {
        // Guardar el nombre del usuario en el almacenamiento local
        localStorage.setItem('nombreUsuario', usuario);

        // Redirigir a la página principal
        window.location.href = 'carritoTienda.html';
    } else {
        alert('Nombre de usuario o contraseña incorrectos o no existe.');
    }
});

// Función para cargar el carrito y mostrarlo al usuario
function cargarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    console.log(document.getElementById("carrito")); // Debería devolver un elemento <ul>

    console.log("Carrito encontrado en DOM:", carritoDiv !== null);

    carritoDiv.innerHTML = ""; // Limpiar el contenido actual

    let usuarioLogueado = localStorage.getItem('nombreUsuario');
    console.log("Usuario logueado:", usuarioLogueado);

    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para ver tu carrito.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
    console.log("Carrito cargado desde localStorage:", carrito);

    let total = 0;

    if (carrito.length === 0) {
        carritoDiv.innerHTML = "<li>Tu carrito está vacío.</li>";
    } else {
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.classList.add('carrito-item');
            li.innerHTML = `
                ${producto.nombre} - $${producto.precio.toFixed(2)} x ${producto.cantidad} 
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            carritoDiv.appendChild(li);
            total += producto.precio * producto.cantidad;
        });
    }

    document.getElementById("total").textContent = total.toFixed(2); // Mostrar total
}

// Función para guardar el carrito del usuario logueado
function guardarCarrito(carrito) {
    let usuarioLogueado = localStorage.getItem('nombreUsuario'); // Obtener el usuario logueado
    if (!usuarioLogueado) {
        alert("Error: No hay usuario logueado.");
        return;
    }

    // Guardar el carrito en el almacenamiento local
    localStorage.setItem(`carrito_${usuarioLogueado}`, JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    let usuarioLogueado = localStorage.getItem('nombreUsuario'); // Verificar usuario logueado
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementar cantidad si ya existe
    } else {
        carrito.push({ nombre, precio, cantidad: 1 }); // Agregar un nuevo producto
    }

    guardarCarrito(carrito);
    cargarCarrito(); // Actualizar la interfaz
}

// Función para eliminar un producto específico del carrito
function eliminarProducto(index) {
    let usuarioLogueado = localStorage.getItem('nombreUsuario'); // Verificar usuario logueado
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para modificar tu carrito.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
    
    // Reducir la cantidad o eliminar el producto si es el último
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1); // Eliminar completamente si la cantidad es 1
    }

    guardarCarrito(carrito);
    cargarCarrito(); // Actualizar la interfaz
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    let usuarioLogueado = localStorage.getItem('nombreUsuario');
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para vaciar el carrito.");
        return;
    }

    guardarCarrito([]); // Guardar un carrito vacío
    cargarCarrito(); // Actualizar la interfaz
}

// Función para finalizar la compra
function finalizarCompra() {
    let usuarioLogueado = localStorage.getItem('nombreUsuario');
    if (!usuarioLogueado) {
        alert("Debes iniciar sesión para finalizar la compra.");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioLogueado}`)) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay nada que comprar.");
        return;
    }

    alert("Compra finalizada. ¡Gracias por tu compra!");
    guardarCarrito([]); // Vaciar el carrito después de la compra
    cargarCarrito(); // Actualizar la interfaz
}

// Función para navegar al carrito al hacer clic en el ícono flotante
function irACarrito() {
    const seccionCarrito = document.getElementById('carrito0'); // ID de la sección "CARRITO"
    seccionCarrito.scrollIntoView({ behavior: 'smooth' }); // Scroll suave hasta la sección del carrito
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarBienvenida(); // Mostrar el mensaje de bienvenida
    cargarCarrito(); // Mostrar el carrito guardado
});
