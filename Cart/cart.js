const productsSection = document.querySelector('.main__container-products');
const productsTotal = document.querySelector('.main__container-total');
const templateProduct = document.getElementById("card-product");
const templateTotal = document.getElementById("total");
const fragment = document.createDocumentFragment();
const cartItems = [];
const userCount = document.querySelector(".user-count");
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
userCount.textContent = carrito.length;


const mostrarTotal = () => {
    const total = carrito.reduce((acc, current) => {
        return acc + current.count * current.price;
    }, 0);

    productsTotal.textContent = "";
    const totalResult = total.toFixed(3);
    const cloneTotal = templateTotal.content.cloneNode(true);
    cloneTotal.querySelector('.main__subtotal-price span').textContent = totalResult;
    cloneTotal.querySelector('.main__total-price span').textContent = totalResult;
    productsTotal.appendChild(cloneTotal);
};

const mostrarProductos = () => {
    productsSection.textContent = "";
    productsTotal.textContent = "";
    if (carrito.length !== 0) {
        carrito.forEach(producto => {
            const clone = templateProduct.content.cloneNode(true);
            clone.querySelector('.main__product').dataset.id = producto.id;
            clone.querySelector('.main__product-title').textContent = producto.nameProduct;
            clone.querySelector('.main__product-img').src = producto.img;
            clone.querySelector('.main__product-img').alt = producto.img;
            clone.querySelector('.main__price span').textContent = producto.price.toFixed(3);
            clone.querySelector('.main__count').textContent = producto.count;
            clone.querySelector('.bi-dash').dataset.id = producto.id;
            clone.querySelector('.bi-plus').dataset.id = producto.id;
            clone.querySelector('.bi-trash').dataset.id = producto.id;
            fragment.appendChild(clone);
        });
        productsSection.appendChild(fragment);
        mostrarTotal();
    } else {
        const h2 = document.createElement("h2");
        const containerBody = document.querySelector(".main__container-products-total");
        containerBody.style.flexDirection = "column";
        productsSection.style.width = "100%"
        h2.className = "main__store";
        h2.style.paddingTop = "7rem"
        h2.style.paddingBottom = "7rem"
        h2.style.textAlign = "center"
        h2.textContent = "No hay Productos en el Carrito"
        productsSection.appendChild(h2);
    }
};

const incrementProductCount = (element) => {
    const productId = element.dataset.id;
    const index = carrito.findIndex(producto => producto.id === parseInt(productId));
    if (index !== -1) {
        const producto = carrito[index];
        if (producto.count < producto.stock) {
            producto.count++;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarProductos();
        } else {
            alert("¡No puedes agregar más de este producto! Stock máximo alcanzado.");
        }
    }
};

const decrementProductCount = (element) => {
    const productId = element.dataset.id;
    const index = carrito.findIndex(producto => producto.id === parseInt(productId));
    if (index !== -1) {
        if (carrito[index].count > 1) {
            carrito[index].count--;
        } else {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarProductos();
    }
};

const deleteProduct = (element) => {
    const productId = parseInt(element.dataset.id);
    const index = carrito.findIndex(producto => producto.id === productId);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductos();
};

productsSection.addEventListener("click", (event) => {
    const element = event.target;
    if (element.matches(".bi-plus")) {
        incrementProductCount(element);
    } else if (element.matches(".bi-dash")) {
        decrementProductCount(element);
    } else if (element.matches('.bi-trash')) {
        deleteProduct(element);
    }
});

productsTotal.addEventListener("click", (event) => {
    if (event.target.matches('.main__btn-finish')) {
        event.preventDefault();
        alert("¡Compra finalizada!");
    }
});

document.addEventListener("DOMContentLoaded", mostrarProductos);
