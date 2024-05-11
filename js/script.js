function selectRole(role) {
  sessionStorage.setItem("selectedRole", role);
  window.location.href = "/html/login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.forms["loginForm"];

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    if (id === "admin" && password === "admin") {
      const role = sessionStorage.getItem("selectedRole");
      if (role === "kasir") {
        window.location.href = "/html/kasir.html";
      } else if (role === "teknisi") {
        window.location.href = "/html/teknisi.html";
      } else {
        alert("Role tidak valid");
      }
    }
  });
});

function goBack() {
  window.location.href = "/html/role.html";
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    validateForm(); 
  }
}

function validateForm() {
  var id = document.getElementById("id").value;
  var password = document.getElementById("password").value;

  var idError = document.getElementById("id-error");
  var passwordError = document.getElementById("password-error");
  var commonError = document.getElementById("common-error");

  idError.innerHTML = "";
  passwordError.innerHTML = "";
  commonError.innerHTML = "";

  if (id === "" && password === "") {
    commonError.innerHTML = "ID dan password belum diisi!";
    commonError.classList.remove("hidden");
    return false;
  }

  if (id === "") {
    idError.innerHTML = "Silakan masukkan ID anda!";
    return false;
  }

  if (password === "") {
    passwordError.innerHTML = "Silakan masukkan password anda!";
    return false;
  }

  if (id !== "admin") {
    idError.innerHTML = "ID tidak valid!";
    document.getElementById("id").value = "";
    document.getElementById("password").value = "";
    return false;
  }

  if (password !== "admin") {
    passwordError.innerHTML = "Password tidak valid!";
    document.getElementById("password").value = "";
    return false;
  }

  return true;
}


const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebarToggle');

      sidebarToggle.addEventListener('click', () => {
          sidebar.classList.toggle('hidden');
      });