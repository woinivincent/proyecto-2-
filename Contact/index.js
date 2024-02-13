const userCount = document.querySelector(".user-count");
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
userCount.textContent = carrito.length;

function validateForm() {
    // Obteniendo los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validación
    if (nombre === "") {
        console.error("Por favor, ingrese su nombre.");
        return false; // Evita que el formulario se envíe
    }
    if (email === "") {
        console.error("Por favor, ingrese su correo electrónico.");
        return false; // Evita que el formulario se envíe
    }

    // Mostrando los datos en la consola
    console.log("Datos del formulario:");
    console.log("Nombre:", nombre);
    console.log("Correo Electrónico:", email);
    console.log("Teléfono:", telefono);
    console.log("Mensaje:", mensaje);

    // Devuelve true para permitir que el formulario se envíe
    return true;
}
