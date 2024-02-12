const contenedor = document.querySelector(".container-products");
const templateProduct = document.querySelector("#card-product");
const fragment = document.createDocumentFragment();
let productos = [];   
const carrito = [];

fetch("products.json")
        .then(response => response.json()) 
        .then(data => {
           productos = data;
           mostrarProductos();
        })
        .catch(error => console.error('Error al obtener el archivo JSON:', error));

const mostrarProductos = () => {
    contenedor.textContent = "";
    if(productos.length !== 0) {
        productos.forEach(producto => {
            const clone = templateProduct.content.cloneNode(true);
            clone.querySelector('.product-card').dataset.id = producto.id;
            clone.getElementById('name').textContent = producto.name;
            clone.getElementById('img').src = producto.img;
            clone.getElementById('price').textContent = producto.price;
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
    const productFindIndex = carrito.findIndex(producto => producto.id === parseInt(event.target.dataset.id));
    if(productFindIndex !== -1) {
        carrito[productFindIndex].count++;
    } else {
        const productFind = productos.find(producto => producto.id === parseInt(event.target.dataset.id));
        carrito.push({...productFind, count: 1});
    }
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

contenedor.addEventListener("click", (event) => {
    if(event.target.matches("#btn-add-product")) {
        agregarCarrito(event);
    }
});