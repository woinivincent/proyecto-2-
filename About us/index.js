const userCount = document.querySelector(".user-count");
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
userCount.textContent = carrito.length;
