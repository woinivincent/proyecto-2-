document.addEventListener("DOMContentLoaded", function () {
    const productsSection = document.querySelector('.main__container-products');
    const subtotalElement = document.querySelector('.main__subtotal-price span');
    const totalPriceElement = document.querySelector('.main__total-price span');
    const cartItems = [];


    // Agregar productos al carrito
    productsSection.addEventListener('click', function (event) {
        if (event.target.classList.contains('bi-plus')) {
            const product = event.target.closest('.main__product');
            const productName = product.querySelector('.main__product-title').textContent;
            const productPrice = parseFloat(product.querySelector('.main__price span').textContent);
            const cartItem = {
                name: productName,
                price: productPrice
            };
            cartItems.push(cartItem);
            updateCart();
        }
        const carrito = JSON.parse(localStorage.getItem("carrito"));
        
    });
     // Eliminar producto del carrito
     document.querySelector('.main__container-total').addEventListener('click', function(event) {
        if (event.target.classList.contains('bi-trash')) {
            const index = event.target.dataset.index;
            cartItems.splice(index, 1);
            updateCart();
        }
    });
    //actualizar el carrito
    function updateCart(){
        let subtotal = 0;
        cartItems.forEach((item,index)=>{
            const cartItemTemplate = document.getElementById('card-product').content.cloneNode(true);
            cartItemTemplate.querySelector('.main__product-title').textContent=item.name
            cartItemTemplate.querySelector('.main__price span').textContent=item.price
            cartItemTemplate.querySelector('.bi-trash').textContent=index
        });
        subtotalElement.textContent= subtotal.toFixed(2)
        totalPriceElement.textContent=subtotal.toFixed(2)
    }

    // finalizar compra
    const finalizarCompraButton = document.querySelector('.main__btn-finish');
    finalizarCompraButton.addEventListener('click',function(){
        alert("¡Compra finalizada!");
    })

})

