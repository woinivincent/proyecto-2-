const contenedor = document.querySelector(".container-products");
const templateProduct = document.getElementById("card-product");
const loader = document.querySelector(".loader");
const userCount = document.querySelector(".user-count");
const containerPagination = document.querySelector(".pagination-container");
const fragment = document.createDocumentFragment();
let productos = [];
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
let nextPageUrl = null;
let prevPageUrl = null;

const loading = (state) => {
    if (state) {
        loader.style.display = "flex";
    } else {
        loader.style.display = "none";
    }
};

const cargarProductos = async (url) => {
    try {
        loading(true);
        const response = await fetch(url);
        const data = await response.json();
        productos = data.results;
        mostrarProductos();
        nextPageUrl = data.info.next;
        if (nextPageUrl) {
            habilitarBotonSiguiente();
        } else {
            deshabilitarBotonSiguiente();
        }
        prevPageUrl = data.info.prev;
        if (prevPageUrl) {
            habilitarBotonAnterior();
        } else {
            deshabilitarBotonAnterior();
        }
        const current = document.getElementById("current");
        current.textContent = data.info.number;
    } catch (error) {
        console.error('Error al obtener el archivo JSON:', error);
        const h2 = document.createElement("h2");
        h2.className = "main__title";
        h2.style.paddingTop = "5rem";
        h2.style.paddingBottom = "5rem";
        h2.textContent = "Error de Red";
        contenedor.appendChild(h2);
    }
    finally {
        loading(false);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos("./products.json");
});

const habilitarBotonSiguiente = () => {
    const btnNext = document.getElementById("next");
    btnNext.disabled = false;
};

const deshabilitarBotonSiguiente = () => {
    const btnNext = document.getElementById("next");
    btnNext.disabled = true;
};

const habilitarBotonAnterior = () => {
    const btnPrev = document.getElementById("prev");
    btnPrev.disabled = false;
};

const deshabilitarBotonAnterior = () => {
    const btnPrev = document.getElementById("prev");
    btnPrev.disabled = true;
};

containerPagination.addEventListener("click", (event) => {
    if (nextPageUrl && event.target.matches("#next i")) {
        cargarProductos(nextPageUrl);
    } else if (prevPageUrl && event.target.matches("#prev i")) {
        cargarProductos(prevPageUrl);
    }
});

const mostrarProductos = () => {
    userCount.textContent = carrito.length;
    contenedor.textContent = "";
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
        carrito.push({ ...producto, count: 1 });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        userCount.textContent = carrito.length;
    }
};

contenedor.addEventListener("click", (event) => {
    if (event.target.matches("#btn-add-product")) {
        agregarCarrito(event);
    }
});
