const form = document.querySelector(".form");
const passwordCurrent = document.querySelector("#password");
const passwordConfirm = document.querySelector("#repassword");
const userCount = document.querySelector(".user-count");
const carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
userCount.textContent = carrito.length;

const passwordVisibility = (element, passwordInput) => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        element.classList.remove("bi-eye-slash");
        element.classList.add("bi-eye");

    } else {
        passwordInput.type = "password";
        element.classList.remove("bi-eye");
        element.classList.add("bi-eye-slash");
    }
};

const handleClick = (event) => {
    const element = event.target;

    if (element.matches(".bi-eye-slash") || element.matches(".bi-eye")) {
        if (element.dataset.id === "password-current") {
            passwordVisibility(element, passwordCurrent);
        } else if (element.dataset.id === "password-confirm") {
            passwordVisibility(element, passwordConfirm);
        }
    }
    console.log()
};

form.addEventListener("click", handleClick);
