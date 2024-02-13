const contenedor = document.querySelector(".container-products");
const templateProduct = document.getElementById("card-product");
const loader = document.querySelector(".loader");
const userCount = document.querySelector(".user-count");
const fragment = document.createDocumentFragment();
let productos = [];
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
userCount.textContent = carrito.length;

const loading = (state) => {
    if (state) {
        loader.style.display = "flex";
    } else {
        loader.style.display = "none";
    }
};

const cargarProductos = async () => {
    try {
        loading(true);
        const response = await fetch("./products.json");
        productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener el archivo JSON:', error);
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.style.paddingTop = "5rem"
        h2.style.paddingBottom = "5rem"
        h2.textContent = "Error de Red"
        contenedor.appendChild(h2);
    }
    finally {
        loading(false);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

const mostrarProductos = () => {
    if (productos.length !== 0) {
        productos.forEach(producto => {
            const clone = templateProduct.content.cloneNode(true);
            clone.querySelector('.product-card').dataset.id = producto.id;
            clone.getElementById('name').textContent = producto.nameProduct;
            clone.getElementById('img').src = producto.img;
            clone.getElementById('img').alt = producto.img;
            clone.querySelector('#price span').textContent = producto.price;
            clone.getElementById('btn-add-product').dataset.id = producto.id;
            fragment.appendChild(clone);
        });
        contenedor.appendChild(fragment);
    } else {
        const h2 = document.createElement("h2");
        h2.className = "main__store";
        h2.style.paddingTop = "5rem"
        h2.style.paddingBottom = "5rem"
        h2.textContent = "No hay Productos para Mostrar"
        contenedor.appendChild(h2);
    }
};

const agregarCarrito = (event) => {
    const productId = parseInt(event.target.dataset.id);
    const productoEnCarrito = carrito.find(producto => producto.id === productId);

    if (!productoEnCarrito) {
        const producto = productos.find(producto => producto.id === productId);
        const { id, nameProduct, img, price } = producto;
        carrito.push({ id, nameProduct, img, price, count: 1 });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        userCount.textContent = carrito.length;
    }
};

contenedor.addEventListener("click", (event) => {
    if (event.target.matches("#btn-add-product")) {
        agregarCarrito(event);
    }
});
