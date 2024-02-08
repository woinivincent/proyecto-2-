const hidePasswordIcon = document.getElementById('hide-password');
const showPasswordIcon = document.getElementById('show-password');
const passwordInput = document.getElementById('password');

hidePasswordIcon.addEventListener('click', function () {
    passwordInput.setAttribute('type', 'text');
    hidePasswordIcon.style.display = 'none';
    showPasswordIcon.style.display = 'inline';
});

showPasswordIcon.addEventListener('click', function () {
    passwordInput.setAttribute('type', 'password');
    showPasswordIcon.style.display = 'none';
    hidePasswordIcon.style.display = 'inline';
});




document.querySelector('.login-btn').addEventListener('click', function (event) {
    event.preventDefault();
    validateLoginForm();
});

function validateLoginForm() {
    const email = document.getElementById('mobile-email').value;
    const password = document.getElementById('password').value;
    // Validación
    if (email.trim() === "") {
        alert("Por favor, ingrese su correo electrónico");
        return false;
    }

    // Validación del formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Ingrese un correo electrónico válido");
        return false;
    }

    // Validación de la contraseña
    if (password.trim() === "") {
        alert("Por favor, ingrese su contraseña");
        return false;
    }

    // Si la validación es exitosa, redirige a la página de inicio
    window.location.href = "/index.html";

}
